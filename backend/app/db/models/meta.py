from sqlalchemy import Column, Integer, String, DateTime
from app.db.base import Base

class ETLJob(Base):
    __tablename__ = "etl_jobs"
    id = Column(Integer, primary_key=True)
    batch_uuid = Column(String(36), nullable=True)  # por lote o global
    status = Column(String(20), nullable=False)     # queued|running|success|failed
    started_at = Column(DateTime, nullable=True)
    finished_at = Column(DateTime, nullable=True)
    message = Column(String(255), nullable=True)
