from sqlalchemy.orm import Session
from app.schemas.catalog import CatalogOut, InstrumentOut, UnitOut
from app.db.repositories import catalog_repo

def get_catalog(db: Session) -> CatalogOut:
    ins = catalog_repo.list_instruments(db)
    units = catalog_repo.list_units(db)
    return CatalogOut(
        instruments=[InstrumentOut(instrument_code=i.instrument_code, name=i.name, type=i.type) for i in ins],
        units=[UnitOut(unit_code=u.unit_code, description=u.description) for u in units]
    )
