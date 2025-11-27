from sqlalchemy import Column, Integer, String
from app.db.base import Base

class CatalogInstrumento(Base):
    __tablename__ = "catalog_instruments"
    id = Column(Integer, primary_key=True)
    instrument_code = Column(String(50), unique=True, nullable=False)
    name = Column(String(120), nullable=False)
    type = Column(String(50), nullable=False)   # piezometro, aforador, etc.

class CatalogUnit(Base):
    __tablename__ = "catalog_units"
    id = Column(Integer, primary_key=True)
    unit_code = Column(String(20), nullable=False)
    description = Column(String(120), nullable=False)
