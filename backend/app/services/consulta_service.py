from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from typing import Optional, List
from datetime import date, datetime
import csv
import io

from app.schemas.consultas import (
    ConsultaRequest, 
    ConsultaResponse, 
    LecturaOut,
    InstrumentoStats,
    ExportRequest
)
from app.db.models.bronze_lectura_raw import BronzeLecturaRaw
from app.db.models.silver_lectura import SilverLectura
from app.db.models.gold_serie_diaria import GoldSerieDiaria

class ConsultaService:
    def __init__(self, db: Session):
        self.db = db

    def ejecutar_consulta(self, req: ConsultaRequest) -> ConsultaResponse:
        """
        Ejecuta consulta según la capa seleccionada
        """
        if req.capa == "bronze":
            return self._consultar_bronze(req)
        elif req.capa == "silver":
            return self._consultar_silver(req)
        elif req.capa == "gold":
            return self._consultar_gold(req)
        else:
            raise ValueError(f"Capa '{req.capa}' no válida")

    def _consultar_bronze(self, req: ConsultaRequest) -> ConsultaResponse:
        """
        Consulta datos de Bronze (crudos desde app móvil)
        """
        query = self.db.query(BronzeLecturaRaw)

        # Filtros
        if req.fecha_inicio:
            query = query.filter(BronzeLecturaRaw.measured_at >= req.fecha_inicio)
        
        if req.fecha_fin:
            query = query.filter(BronzeLecturaRaw.measured_at <= req.fecha_fin)
        
        if req.instrument_codes:
            query = query.filter(BronzeLecturaRaw.instrument_code.in_(req.instrument_codes))
        
        if req.parametros:
            query = query.filter(BronzeLecturaRaw.parameter.in_(req.parametros))

        # Total
        total = query.count()

        # Paginación
        lecturas_raw = (
            query
            .order_by(BronzeLecturaRaw.measured_at.desc())
            .offset(req.offset)
            .limit(req.limit)
            .all()
        )

        # Mapear a schema
        lecturas = [
            LecturaOut(
                id=l.id,
                batch_uuid=l.batch_uuid,
                instrument_code=l.instrument_code,
                parameter=l.parameter,
                unit=l.unit,
                value=l.value,
                measured_at=l.measured_at.isoformat() if l.measured_at else "",
                notes=l.notes
            )
            for l in lecturas_raw
        ]

        return ConsultaResponse(
            status="ok",
            capa="bronze",
            total=total,
            offset=req.offset,
            limit=req.limit,
            lecturas=lecturas
        )

    def _consultar_silver(self, req: ConsultaRequest) -> ConsultaResponse:
        """
        Consulta datos de Silver (limpios y normalizados)
        """
        query = self.db.query(SilverLectura)

        if req.fecha_inicio:
            query = query.filter(SilverLectura.fecha >= req.fecha_inicio)
        
        if req.fecha_fin:
            query = query.filter(SilverLectura.fecha <= req.fecha_fin)

        # TODO: agregar joins con catalog_instruments para filtrar por código
        
        total = query.count()
        lecturas_raw = query.order_by(SilverLectura.fecha.desc()).offset(req.offset).limit(req.limit).all()

        lecturas = [
            LecturaOut(
                id=l.id,
                batch_uuid="",  # Silver no tiene batch_uuid directo
                instrument_code=f"INST_{l.instrumento_id}",
                parameter=f"VAR_{l.variable_id}",
                unit=f"UNIT_{l.unidad_id}",
                value=l.valor,
                measured_at=l.fecha.isoformat() if l.fecha else "",
                notes=None
            )
            for l in lecturas_raw
        ]

        return ConsultaResponse(
            status="ok",
            capa="silver",
            total=total,
            offset=req.offset,
            limit=req.limit,
            lecturas=lecturas
        )

    def _consultar_gold(self, req: ConsultaRequest) -> ConsultaResponse:
        """
        Consulta datos de Gold (agregados/reportes)
        """
        # Por ahora retorna vacío ya que Gold está para reportes
        return ConsultaResponse(
            status="ok",
            capa="gold",
            total=0,
            offset=0,
            limit=req.limit,
            lecturas=[]
        )

    def obtener_lecturas_instrumento(
        self,
        instrument_code: str,
        fecha_inicio: Optional[date],
        fecha_fin: Optional[date],
        parametro: Optional[str],
        capa: str,
        limit: int
    ):
        """
        Obtiene lecturas de un instrumento específico
        """
        req = ConsultaRequest(
            capa=capa,
            instrument_codes=[instrument_code],
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin,
            parametros=[parametro] if parametro else None,
            limit=limit
        )
        return self.ejecutar_consulta(req)

    def calcular_estadisticas(
        self,
        instrument_code: str,
        fecha_inicio: Optional[date],
        fecha_fin: Optional[date]
    ) -> InstrumentoStats:
        """
        Calcula estadísticas de un instrumento
        """
        query = self.db.query(
            func.count(BronzeLecturaRaw.id).label("count"),
            func.min(BronzeLecturaRaw.value).label("min_value"),
            func.max(BronzeLecturaRaw.value).label("max_value"),
            func.avg(BronzeLecturaRaw.value).label("avg_value"),
        ).filter(BronzeLecturaRaw.instrument_code == instrument_code)

        if fecha_inicio:
            query = query.filter(BronzeLecturaRaw.measured_at >= fecha_inicio)
        if fecha_fin:
            query = query.filter(BronzeLecturaRaw.measured_at <= fecha_fin)

        stats = query.first()

        # Última lectura
        last = (
            self.db.query(BronzeLecturaRaw)
            .filter(BronzeLecturaRaw.instrument_code == instrument_code)
            .order_by(BronzeLecturaRaw.measured_at.desc())
            .first()
        )

        return InstrumentoStats(
            instrument_code=instrument_code,
            parameter="mixto",  # TODO: agrupar por parámetro
            count=stats.count or 0,
            min_value=float(stats.min_value) if stats.min_value else None,
            max_value=float(stats.max_value) if stats.max_value else None,
            avg_value=float(stats.avg_value) if stats.avg_value else None,
            last_value=float(last.value) if last else None,
            last_measured_at=last.measured_at.isoformat() if last and last.measured_at else None
        )

    def exportar_a_csv(self, export_req: ExportRequest) -> str:
        """
        Exporta consulta a CSV
        """
        resultado = self.ejecutar_consulta(export_req.consulta)
        
        output = io.StringIO()
        writer = csv.writer(output)
        
        # Encabezados
        writer.writerow([
            "ID",
            "Batch UUID",
            "Instrumento",
            "Parámetro",
            "Valor",
            "Unidad",
            "Fecha Medición",
            "Notas"
        ])
        
        # Datos
        for lectura in resultado.lecturas:
            writer.writerow([
                lectura.id,
                lectura.batch_uuid,
                lectura.instrument_code,
                lectura.parameter,
                lectura.value,
                lectura.unit,
                lectura.measured_at,
                lectura.notes or ""
            ])
        
        return output.getvalue()