from sqlalchemy import Column, Integer, String, Date, DateTime
from datetime import datetime
from app.db.base import Base

class GoldReporte(Base):
    __tablename__ = "gold_reportes"

    id = Column(Integer, primary_key=True, autoincrement=True)
    titulo = Column(String(200), nullable=False)
    periodo_inicio = Column(Date, nullable=False)
    periodo_fin = Column(Date, nullable=False)
    generado_por = Column(String(100), nullable=True)
    generado_en = Column(DateTime, default=datetime.utcnow)
    ruta_pdf = Column(String(500), nullable=True)  # luego la completarás
    tipo_reporte = Column(String(50), nullable=True)  # mensual_orsep, interno, etc.
