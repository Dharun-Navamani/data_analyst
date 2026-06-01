from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_db
from models import Dataset, DatasetColumn
import os
import pandas as pd
import uuid
from datetime import datetime

router = APIRouter()

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), '..', 'data', 'uploads')
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED = ['.csv', '.tsv', '.json', '.xls', '.xlsx']
MAX_UPLOAD_SIZE = int(os.getenv('MAX_UPLOAD_SIZE', 50 * 1024 * 1024))  # 50 MB default

async def _save_file_and_parse(file: UploadFile):
    filename = file.filename
    _, ext = os.path.splitext(filename.lower())
    if ext not in ALLOWED:
        raise HTTPException(status_code=400, detail=f"Unsupported file type: {ext}")

    unique_name = f"{uuid.uuid4().hex}_{filename}"
    dest_path = os.path.join(UPLOAD_DIR, unique_name)

    # Stream file to disk to avoid large memory spikes
    with open(dest_path, 'wb') as f:
        while True:
            chunk = await file.read(1024 * 1024)
            if not chunk:
                break
            f.write(chunk)

    # enforce max size
    try:
        size = os.path.getsize(dest_path)
    except OSError:
        size = 0
    if size > MAX_UPLOAD_SIZE:
        os.remove(dest_path)
        raise HTTPException(status_code=413, detail=f"Uploaded file is too large ({size} bytes). Max is {MAX_UPLOAD_SIZE} bytes")

    # Use pandas to read and infer. Wrap in try/except to return useful errors.
    try:
        if ext in ('.csv', '.tsv'):
            sep = '\t' if ext == '.tsv' else ','
            df = pd.read_csv(dest_path, sep=sep)
        elif ext in ('.xls', '.xlsx'):
            df = pd.read_excel(dest_path)
        elif ext == '.json':
            df = pd.read_json(dest_path)
        else:
            raise HTTPException(status_code=400, detail="Unsupported format")
    except Exception as e:
        # remove the saved file on parse failure to save space
        try:
            os.remove(dest_path)
        except Exception:
            pass
        raise HTTPException(status_code=400, detail=f"Failed to parse uploaded file: {str(e)}")

    # Basic preview and schema
    preview = df.head(5).to_json(orient='records')
    row_count = int(df.shape[0])
    col_count = int(df.shape[1])
    columns = [(c, str(df[c].dtype)) for c in df.columns]

    return {
        'filename': unique_name,
        'row_count': row_count,
        'col_count': col_count,
        'preview': preview,
        'columns': columns,
        'saved_path': dest_path,
    }

@router.post('/upload')
async def upload_file(file: UploadFile = File(...), db: AsyncSession = Depends(get_db)):
    """Upload a dataset file and register metadata."""
    info = await _save_file_and_parse(file)

    dataset = Dataset(
        name=file.filename,
        filename=info['filename'],
        uploaded_at=datetime.utcnow(),
        row_count=info['row_count'],
        col_count=info['col_count'],
        preview=info['preview'][:2000],
    )
    db.add(dataset)
    await db.flush()  # get id

    for col_name, dtype in info['columns']:
        dc = DatasetColumn(dataset_id=dataset.id, name=col_name, dtype=dtype)
        db.add(dc)

    await db.commit()

    return {
        'dataset_id': dataset.id,
        'name': dataset.name,
        'rows': dataset.row_count,
        'cols': dataset.col_count,
    }

@router.get('/datasets')
async def list_datasets(db: AsyncSession = Depends(get_db)):
    result = await db.execute("SELECT id, name, filename, uploaded_at, row_count, col_count FROM datasets ORDER BY uploaded_at DESC")
    rows = result.fetchall()
    datasets = [dict(r) for r in rows]
    return datasets
