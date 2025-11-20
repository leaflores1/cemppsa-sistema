from sqlalchemy import Column, Integer, Float, Date, ForeignKey
from app.db.base import Base

class GoldSerieDiaria(Base):
    __tablename__ = "gold_series_diarias"

    id = Column(Integer, primary_key=True)
    reporte_id = Column(Integer, ForeignKey("gold_reportes.id"))
    instrumento_id = Column(Integer)  # FK lógico a catalogo_instrumentos
    fecha = Column(Date)
    valor = Column(Float)
