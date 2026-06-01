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


class Dataset(Base):
    __tablename__ = "datasets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    filename = Column(String, nullable=False)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    row_count = Column(Integer, default=0)
    col_count = Column(Integer, default=0)
    preview = Column(String, default="")


class DatasetColumn(Base):
    __tablename__ = "dataset_columns"

    id = Column(Integer, primary_key=True, index=True)
    dataset_id = Column(Integer, nullable=False, index=True)
    name = Column(String, nullable=False)
    dtype = Column(String, nullable=False)
