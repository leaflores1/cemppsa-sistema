from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.db.base import Base

class SilverPlanilla(Base):
    __tablename__ = "silver_planillas"

    id = Column(Integer, primary_key=True, autoincrement=True)
    batch_uuid = Column(String(64), nullable=False, index=True)
    estado = Column(String(50), default="en_revision")  # en_revision, aprobada, rechazada
    creado_en = Column(DateTime, default=datetime.utcnow)
    aprobado_por = Column(String(100), nullable=True)
    aprobado_en = Column(DateTime, nullable=True)
