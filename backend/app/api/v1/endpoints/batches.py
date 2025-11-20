from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.bronze_service import BronzeService

router = APIRouter()
bronze_service = BronzeService()

@router.post("/")
def recibir_desde_app(payload: dict, db: Session = Depends(get_db)):
    return bronze_service.recibir_planilla(db, payload)

@router.get("/")
def listar_para_consola(db: Session = Depends(get_db)):
    return bronze_service.obtener_bandeja(db)
