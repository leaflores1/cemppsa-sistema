from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from datetime import datetime
from app.db.base import Base

class SilverExcepcion(Base):
    __tablename__ = "silver_excepciones"

    id = Column(Integer, primary_key=True)
    planilla_id = Column(Integer, ForeignKey("silver_planillas.id"))
    tipo = Column(String(50))          # fuera_rango, dato_faltante, etc.
    detalle = Column(Text)
    creado_en = Column(DateTime, default=datetime.utcnow)
