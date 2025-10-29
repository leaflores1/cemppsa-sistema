from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.catalog import CatalogOut
from app.services.catalog_service import get_catalog

router = APIRouter()

@router.get("/catalog", response_model=CatalogOut)
def catalog(db: Session = Depends(get_db)):
    return get_catalog(db)
