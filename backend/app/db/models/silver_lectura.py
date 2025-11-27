from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey, String
from app.db.base import Base

class SilverLectura(Base):
    __tablename__ = "silver_lecturas"

    id = Column(Integer, primary_key=True)
    planilla_id = Column(Integer, ForeignKey("silver_planillas.id"))
    instrumento_id = Column(Integer)  # FK lógico a catalogo_instrumentos.id
    variable_id = Column(Integer)     # FK lógico a catalogo_variables.id
    unidad_id = Column(Integer)       # FK lógico a catalogo_unidades.id
    valor = Column(Float)
    fecha = Column(DateTime)
    origen = Column(String(50))  # app/manual
