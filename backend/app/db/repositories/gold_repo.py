from sqlalchemy.orm import Session
from typing import List
from datetime import date
from app.db.models.gold_reporte import GoldReporte
from app.db.models.gold_serie_diaria import GoldSerieDiaria
from app.db.models.silver_lectura import SilverLectura

class GoldRepository:

    def crear_reporte(
        self,
        db: Session,
        titulo: str,
        periodo_inicio: date,
        periodo_fin: date,
        generado_por: str,
        tipo_reporte: str,
        ruta_pdf: str | None = None,
    ) -> GoldReporte:
        rep = GoldReporte(
            titulo=titulo,
            periodo_inicio=periodo_inicio,
            periodo_fin=periodo_fin,
            generado_por=generado_por,
            tipo_reporte=tipo_reporte,
            ruta_pdf=ruta_pdf,
        )
        db.add(rep)
        db.commit()
        db.refresh(rep)
        return rep

    def guardar_series_diarias(
        self,
        db: Session,
        reporte_id: int,
        series: List[dict],
    ):
        """
        series = [
          {"instrumento_id": 1, "fecha": date(2025,1,1), "valor": 123.4},
          ...
        ]
        """
        rows = [
            GoldSerieDiaria(
                reporte_id=reporte_id,
                instrumento_id=s["instrumento_id"],
                fecha=s["fecha"],
                valor=s["valor"],
            )
            for s in series
        ]
        db.bulk_save_objects(rows)
        db.commit()

    def listar_reportes(self, db: Session):
        return db.query(GoldReporte).order_by(GoldReporte.generado_en.desc()).all()
