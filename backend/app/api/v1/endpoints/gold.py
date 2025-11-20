from fastapi import APIRouter, Depends
from pydantic import BaseModel
from datetime import date
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.gold_service import GoldService

router = APIRouter(prefix="/gold", tags=["Gold"])

gold_service = GoldService()

class ReporteRequest(BaseModel):
    titulo: str
    periodo_inicio: date
    periodo_fin: date
    generado_por: str
    tipo_reporte: str = "mensual_orsep"

@router.post("/reportes")
def generar_reporte(req: ReporteRequest, db: Session = Depends(get_db)):
    """
    Genera un reporte (cabecera en gold_reportes + series en gold_series_diarias).
    Luego podrás agregar generación de PDF.
    """
    return gold_service.generar_reporte_mensual(
        db=db,
        titulo=req.titulo,
        periodo_inicio=req.periodo_inicio,
        periodo_fin=req.periodo_fin,
        generado_por=req.generado_por,
        tipo_reporte=req.tipo_reporte,
    )

@router.get("/reportes")
def listar_reportes(db: Session = Depends(get_db)):
    return gold_service.listar_reportes(db)
