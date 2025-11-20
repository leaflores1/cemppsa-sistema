from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.silver_service import SilverService

router = APIRouter(prefix="/silver", tags=["Silver"])

silver_service = SilverService()

@router.post("/planillas/{batch_uuid}/promover")
def promover_planilla(batch_uuid: str, db: Session = Depends(get_db)):
    """
    Toma una planilla desde Bronze (por batch_uuid) y la copia a Silver.
    Usado por el módulo 'Laboratorio'.
    """
    return silver_service.promover_desde_bronze(db, batch_uuid)

@router.get("/planillas")
def listar_planillas_silver(db: Session = Depends(get_db)):
    return silver_service.listar_planillas(db)
