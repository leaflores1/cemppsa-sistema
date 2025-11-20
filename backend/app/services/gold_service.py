from sqlalchemy.orm import Session
from datetime import date
from typing import Dict
from app.db.repositories.gold_repo import GoldRepository
from app.db.models.silver_lectura import SilverLectura

gold_repo = GoldRepository()

class GoldService:

    def generar_reporte_mensual(
        self,
        db: Session,
        titulo: str,
        periodo_inicio: date,
        periodo_fin: date,
        generado_por: str,
        tipo_reporte: str = "mensual_orsep",
    ) -> Dict:

        # 1) crear cabecera del reporte
        reporte = gold_repo.crear_reporte(
            db=db,
            titulo=titulo,
            periodo_inicio=periodo_inicio,
            periodo_fin=periodo_fin,
            generado_por=generado_por,
            tipo_reporte=tipo_reporte,
        )

        # 2) ejemplo tonto: promediamos lecturas por instrumento+dia
        query = (
            db.query(
                SilverLectura.instrumento_id,
                SilverLectura.fecha,
                SilverLectura.valor,
            )
            .filter(SilverLectura.fecha >= periodo_inicio)
            .filter(SilverLectura.fecha <= periodo_fin)
        )

        # TODO: aquí podrías hacer agrupaciones reales con func.avg, etc.
        series = []
        for row in query:
            series.append(
                {
                    "instrumento_id": row.instrumento_id,
                    "fecha": row.fecha.date(),
                    "valor": row.valor,
                }
            )

        gold_repo.guardar_series_diarias(db, reporte.id, series)

        return {
            "status": "ok",
            "reporte_id": reporte.id,
            "registros_series": len(series),
        }

    def listar_reportes(self, db: Session):
        return gold_repo.listar_reportes(db)
