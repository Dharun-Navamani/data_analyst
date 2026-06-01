from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from core.database import Base

class DailyMetric(Base):
    __tablename__ = "daily_metrics"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, default=datetime.utcnow, unique=True)
    total_users = Column(Integer, default=0)
    active_sessions = Column(Integer, default=0)
    revenue = Column(Float, default=0.0)
    growth = Column(Float, default=0.0)
