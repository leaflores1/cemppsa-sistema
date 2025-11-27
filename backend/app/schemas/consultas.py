# backend/app/schemas/consultas.py
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime, date
from enum import Enum

class CapaDatos(str, Enum):
    BRONZE = "bronze"
    SILVER = "silver"
    GOLD = "gold"

class TipoInstrumento(str, Enum):
    PIEZOMETRO = "piezometro"
    AFORADOR = "aforador"
    FREATIMETRO = "freatimetro"
    ASENTIMETRO = "asentimetro"
    CLINOMETRO = "clinometro"
    TRIAXIAL = "triaxial"
    TERMOMETRO = "termometro"

class ConsultaRequest(BaseModel):
    """Request para consultar datos"""
    capa: CapaDatos = Field(default=CapaDatos.SILVER, description="Capa de datos a consultar")
    tipo_instrumento: Optional[TipoInstrumento] = Field(None, description="Tipo de instrumento")
    instrument_codes: Optional[List[str]] = Field(None, description="Códigos específicos")
    parametros: Optional[List[str]] = Field(None, description="Parámetros a filtrar (presion, caudal, etc)")
    fecha_inicio: Optional[date] = None
    fecha_fin: Optional[date] = None
    limit: int = Field(default=100, le=5000, description="Límite de registros")
    offset: int = Field(default=0, ge=0)
    order_by: str = Field(default="measured_at", description="Campo para ordenar")
    order_desc: bool = Field(default=True, description="Orden descendente")

class LecturaOut(BaseModel):
    """Respuesta de una lectura individual"""
    id: int
    batch_uuid: str
    instrument_code: str
    parameter: str
    unit: str
    value: float
    measured_at: datetime
    notes: Optional[str]
    
    class Config:
        from_attributes = True

class ConsultaResponse(BaseModel):
    """Respuesta de una consulta"""
    total: int
    offset: int
    limit: int
    capa: str
    lecturas: List[LecturaOut]
    metadata: Dict[str, Any] = Field(default_factory=dict)

class InstrumentoStats(BaseModel):
    """Estadísticas de un instrumento"""
    instrument_code: str
    parameter: str
    fecha_inicio: date
    fecha_fin: date
    count: int
    min_value: Optional[float]
    max_value: Optional[float]
    avg_value: Optional[float]
    last_value: Optional[float]
    last_measured_at: Optional[datetime]

class ExportRequest(BaseModel):
    """Request para exportación"""
    consulta: ConsultaRequest
    formato: str = Field(default="csv", pattern="^(csv|excel|json)$")
    incluir_metadata: bool = Field(default=True)
    separador: str = Field(default=",")