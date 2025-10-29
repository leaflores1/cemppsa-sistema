from sqlalchemy.orm import Session
from app.db.models.catalog import CatalogInstrument, CatalogUnit

def list_instruments(db: Session):
    return db.query(CatalogInstrument).order_by(CatalogInstrument.instrument_code).all()

def list_units(db: Session):
    return db.query(CatalogUnit).order_by(CatalogUnit.unit_code).all()
