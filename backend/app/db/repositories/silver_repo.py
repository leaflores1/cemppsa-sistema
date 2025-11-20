from sqlalchemy.orm import Session
from typing import List
from app.db.models.silver_planilla import SilverPlanilla
from app.db.models.silver_lectura import SilverLectura
from app.db.models.silver_excepcion import SilverExcepcion
from app.db.models.bronze_planillas import BronzePlanilla
from app.db.models.bronze_lectura_raw import BronzeLecturaRaw

class SilverRepository:

    def crear_planilla_desde_bronze(
        self, db: Session, bronze_planilla: BronzePlanilla
    ) -> SilverPlanilla:
        silver = SilverPlanilla(
            batch_uuid=bronze_planilla.batch_uuid,
            estado="en_revision",
        )
        db.add(silver)
        db.commit()
        db.refresh(silver)
        return silver

    def copiar_lecturas_desde_bronze(
        self, db: Session, silver_planilla_id: int, bronze_lecturas: List[BronzeLecturaRaw]
    ):
        rows = []
        for br in bronze_lecturas:
            row = SilverLectura(
                planilla_id=silver_planilla_id,
                instrumento_id=None,     # luego haremos el mapeo real
                variable_id=None,
                unidad_id=br.unidad_id,
                valor=br.valor,
                fecha=br.fecha,
                origen=br.origen,
            )
            rows.append(row)
        db.bulk_save_objects(rows)
        db.commit()

    def crear_excepcion(self, db: Session, planilla_id: int, tipo: str, detalle: str):
        exc = SilverExcepcion(planilla_id=planilla_id, tipo=tipo, detalle=detalle)
        db.add(exc)
        db.commit()
        db.refresh(exc)
        return exc

    def get_planilla_por_batch(self, db: Session, batch_uuid: str):
        return (
            db.query(SilverPlanilla)
            .filter(SilverPlanilla.batch_uuid == batch_uuid)
            .first()
        )

    def listar_planillas(self, db: Session):
        return (
            db.query(SilverPlanilla)
            .order_by(SilverPlanilla.creado_en.desc())
            .all()
        )
