import os
from datetime import datetime, timedelta

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.dashboard import router as dashboard_router
from api.ai_analysis import router as ai_analysis_router
from api.upload import router as upload_router
from core.database import engine, Base
from models import DailyMetric

app = FastAPI(
    title="AI Dashboard API",
    description="API for the AI Dashboard Data application",
    version="1.0.0"
)

@app.on_event("startup")
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSession(engine) as session:
        result = await session.execute(select(DailyMetric).limit(1))
        if result.scalars().first() is None:
            base_date = datetime.utcnow() - timedelta(days=180)
            months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
            values = [400, 300, 550, 480, 600, 800]

            for i, value in enumerate(values):
                metric_date = base_date + timedelta(days=i * 30)
                session.add(
                    DailyMetric(
                        date=metric_date,
                        total_users=1050 + (value - 800),
                        active_sessions=42 + (value - 800) // 10,
                        revenue=15000.50 + (value - 800) * 10,
                        growth=12.5 + (value - 800) / 100,
                    )
                )

            session.add(
                DailyMetric(
                    date=datetime.utcnow(),
                    total_users=1050,
                    active_sessions=42,
                    revenue=15000.50,
                    growth=12.5,
                )
            )
            await session.commit()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if os.getenv('ALLOW_ALL_ORIGINS', 'true').lower() == 'true' else ["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard_router, prefix="/api/dashboard", tags=["Dashboard"])
app.include_router(ai_analysis_router, prefix="/api/ai", tags=["AI Analysis"])
app.include_router(upload_router, prefix="/api/upload", tags=["Upload"])

@app.get("/")
async def root():
    return {"message": "Welcome to the AI Dashboard API"}
