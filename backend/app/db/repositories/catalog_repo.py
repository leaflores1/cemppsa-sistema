from sqlalchemy.orm import Session
from app.db.models.catalog import CatalogInstrumento, CatalogUnit

def list_instruments(db: Session):
    return db.query(CatalogInstrumento).order_by(CatalogInstrumento.instrument_code).all()

def list_units(db: Session):
    return db.query(CatalogUnit).order_by(CatalogUnit.unit_code).all()
