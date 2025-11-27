from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional, List
from datetime import date
from fastapi.responses import Response

from app.db.session import get_db
from app.schemas.consultas import (
    ConsultaRequest,
    ConsultaResponse,
    InstrumentoStats,
    ExportRequest
)
from app.services.consulta_service import ConsultaService

router = APIRouter()

@router.post("/explorar", response_model=ConsultaResponse)
def explorar_datos(
    consulta: ConsultaRequest,
    db: Session = Depends(get_db)
):
    """
    Explora datos con filtros (Bronze/Silver/Gold)
    """
    service = ConsultaService(db)
    return service.ejecutar_consulta(consulta)

@router.get("/instrumentos/{instrument_code}/lecturas")
def obtener_lecturas(
    instrument_code: str,
    fecha_inicio: Optional[date] = None,
    fecha_fin: Optional[date] = None,
    parametro: Optional[str] = None,
    capa: str = Query("bronze", regex="^(bronze|silver|gold)$"),
    limit: int = Query(100, le=1000),
    db: Session = Depends(get_db)
):
    service = ConsultaService(db)
    return service.obtener_lecturas_instrumento(
        instrument_code, fecha_inicio, fecha_fin, parametro, capa, limit
    )

@router.get("/instrumentos/{instrument_code}/stats", response_model=InstrumentoStats)
def obtener_estadisticas(
    instrument_code: str,
    fecha_inicio: Optional[date] = None,
    fecha_fin: Optional[date] = None,
    db: Session = Depends(get_db)
):
    service = ConsultaService(db)
    return service.calcular_estadisticas(instrument_code, fecha_inicio, fecha_fin)

@router.post("/export/csv")
def exportar_csv(
    export_req: ExportRequest,
    db: Session = Depends(get_db)
):
    service = ConsultaService(db)
    csv_content = service.exportar_a_csv(export_req)
    
    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={
            "Content-Disposition": f"attachment; filename=consulta.csv"
        }
    )

########################################################################################3333
