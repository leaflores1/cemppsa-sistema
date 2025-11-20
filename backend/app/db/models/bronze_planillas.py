from sqlalchemy import Column, String, DateTime, Integer
from app.db.base import Base
from datetime import datetime

class BronzePlanilla(Base):
    __tablename__ = "bronze_planillas"

    id = Column(Integer, primary_key=True)
    batch_uuid = Column(String(100), nullable=False, unique=True)
    device_id = Column(String(50))
    technician_id = Column(String(50))
    created_at = Column(DateTime, nullable=False)
    server_received_at = Column(DateTime, nullable=True)
    status = Column(String(20), default="received")
    source = Column(String(50), default="mobile_app")
