import { useState } from 'react';
import type { DragEvent } from 'react';
import apiClient from '../api/client';

export default function DataUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const dt = e.dataTransfer;
    if (!dt) return;
    const fileList = Array.from(dt.files);
    setFiles(fileList);
  }

  function onDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  async function upload() {
    if (files.length === 0) return;
    setUploading(true);
    setMessage('');

    const form = new FormData();
    form.append('file', files[0]);

    try {
      const res = await apiClient.post('/api/upload/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(`Uploaded: ${res.data.name} (${res.data.rows} rows)`);
      setFiles([]);
    } catch (err) {
      setMessage('Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Upload dataset</h2>
        <p className="text-sm text-slate-500">Drag and drop a CSV, TSV, Excel, or JSON file here.</p>

        <div onDrop={onDrop} onDragOver={onDragOver} className="mt-6 rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center">
          <p className="text-sm text-slate-500">Drop files here or click to choose</p>
          <input type="file" className="mt-4" onChange={(e) => setFiles(Array.from(e.target.files || []))} />
          <div className="mt-4">
            {files.map((f) => (
              <div key={f.name} className="text-sm text-slate-700">{f.name} · {Math.round(f.size/1024)} KB</div>
            ))}
          </div>

          <div className="mt-6">
            <button onClick={upload} disabled={uploading || files.length===0} className="rounded-2xl bg-blue-600 px-4 py-2 text-white">
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>

          {message && <p className="mt-4 text-sm text-slate-600">{message}</p>}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Uploaded datasets</h3>
        <DatasetList />
      </div>
    </div>
  );
}

function DatasetList() {
  const [items, setItems] = useState<any[]>([]);

  async function load() {
    try {
      const res = await apiClient.get('/api/upload/datasets');
      setItems(res.data);
    } catch (err) {
      setItems([]);
    }
  }

  return (
    <div className="mt-4">
      <button onClick={load} className="rounded-2xl bg-slate-50 px-3 py-2 text-sm">Refresh</button>
      <div className="mt-4 space-y-2">
        {items.map(it => (
          <div key={it.id} className="rounded-lg border p-3 text-sm">{it.name} · {it.row_count} rows</div>
        ))}
      </div>
    </div>
  );
}
