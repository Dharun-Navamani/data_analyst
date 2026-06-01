from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_db
from models import DailyMetric

router = APIRouter()

@router.get("/stats")
async def get_dashboard_stats(db: AsyncSession = Depends(get_db)):
    """Fetch the latest dashboard stats from the database."""
    result = await db.execute(
        select(DailyMetric).order_by(DailyMetric.date.desc()).limit(1)
    )
    metric = result.scalars().first()

    if metric is None:
        raise HTTPException(status_code=404, detail="No dashboard metrics found")

    return {
        "total_users": metric.total_users,
        "active_sessions": metric.active_sessions,
        "revenue": round(metric.revenue, 2),
        "growth": round(metric.growth, 2),
    }

@router.get("/chart-data")
async def get_chart_data(db: AsyncSession = Depends(get_db)):
    """Return the most recent six metric points for the chart."""
    result = await db.execute(
        select(DailyMetric).order_by(DailyMetric.date.asc())
    )
    metrics = result.scalars().all()

    if not metrics:
        raise HTTPException(status_code=404, detail="No chart data available")

    chart_data = [
        {
            "name": metric.date.strftime("%b"),
            "users": metric.total_users,
            "revenue": round(metric.revenue, 2),
            "active_sessions": metric.active_sessions,
        }
        for metric in metrics[-6:]
    ]

    return chart_data
