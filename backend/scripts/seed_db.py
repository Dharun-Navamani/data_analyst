import asyncio
import sys
import os

# Add backend directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from datetime import datetime, timedelta
from core.database import engine, Base
from models import DailyMetric
from sqlalchemy.ext.asyncio import AsyncSession

async def main():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSession(engine) as session:
        # Check if we already have data
        from sqlalchemy import select
        result = await session.execute(select(DailyMetric).limit(1))
        if result.scalar_one_or_none():
            print("Database already seeded.")
            return

        print("Seeding database with mock data...")
        
        # Create some historical data for charts
        base_date = datetime.utcnow() - timedelta(days=180)
        
        # Monthly data points for the chart: Jan, Feb, Mar, Apr, May, Jun (approx)
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
        values = [400, 300, 550, 480, 600, 800]
        
        for i, (month_name, value) in enumerate(zip(months, values)):
            metric_date = base_date + timedelta(days=i*30)
            metric = DailyMetric(
                date=metric_date,
                total_users=1050 + (value - 800), # relative to final
                active_sessions=42 + (value - 800) // 10,
                revenue=15000.50 + (value - 800) * 10,
                growth=12.5 + (value - 800) / 100
            )
            session.add(metric)
            
        # Add the current metric
        current_metric = DailyMetric(
            date=datetime.utcnow(),
            total_users=1050,
            active_sessions=42,
            revenue=15000.50,
            growth=12.5
        )
        session.add(current_metric)
        
        await session.commit()
        print("Database seeded successfully.")

if __name__ == "__main__":
    asyncio.run(main())
