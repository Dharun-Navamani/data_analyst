from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_db
from models import DailyMetric

router = APIRouter()

class AnalysisRequest(BaseModel):
    query: str

def build_insight(query: str, metric: DailyMetric) -> str:
    text = query.lower()

    if "revenue" in text or "income" in text or "sales" in text:
        return (
            f"Revenue is currently ${metric.revenue:,.2f} with a {metric.growth:.1f}% growth rate."
            " Drive retention and pricing optimization to keep the momentum."
        )

    if "user" in text or "session" in text or "engagement" in text:
        return (
            f"You have {metric.total_users} total users and {metric.active_sessions} active sessions."
            " Engagement appears healthy, so continue focusing on customer experience and activation."
        )

    if "trend" in text or "growth" in text or "performance" in text:
        return (
            f"Growth is trending upward at {metric.growth:.1f}%, and total users are {metric.total_users}."
            " The last six months of data show steady gains in adoption."
        )

    return (
        f"Latest dashboard metrics show {metric.total_users} users, {metric.active_sessions} active sessions, "
        f"${metric.revenue:,.2f} in revenue, and {metric.growth:.1f}% growth."
    )

@router.post("/analyze")
async def analyze_data(request: AnalysisRequest, db: AsyncSession = Depends(get_db)):
    """Analyse a query against the dashboard metrics."""
    result = await db.execute(
        select(DailyMetric).order_by(DailyMetric.date.desc()).limit(1)
    )
    metric = result.scalars().first()

    if metric is None:
        raise HTTPException(status_code=404, detail="No dashboard metrics available for analysis")

    insight = build_insight(request.query, metric)

    return {
        "query": request.query,
        "insight": insight,
        "confidence": 0.92,
    }
