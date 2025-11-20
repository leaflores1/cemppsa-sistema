from sqlalchemy.orm import Session
from typing import Dict
from app.db.repositories.silver_repo import SilverRepository
from app.db.models.bronze_planillas import BronzePlanilla
from app.db.models.bronze_lectura_raw import BronzeLecturaRaw

silver_repo = SilverRepository()

class SilverService:

    def promover_desde_bronze(self, db: Session, batch_uuid: str) -> Dict:
        # 1) buscar planilla bronze
        bronze_planilla = (
            db.query(BronzePlanilla)
            .filter(BronzePlanilla.batch_uuid == batch_uuid)
            .first()
        )
        if not bronze_planilla:
            return {"status": "error", "detail": "batch_uuid no encontrado en Bronze"}

        # 2) crear planilla silver
        silver_planilla = silver_repo.crear_planilla_desde_bronze(db, bronze_planilla)

        # 3) copiar lecturas
        lecturas_bronze = (
            db.query(BronzeLecturaRaw)
            .filter(BronzeLecturaRaw.planilla_id == bronze_planilla.id)
            .all()
        )
        silver_repo.copiar_lecturas_desde_bronze(
            db, silver_planilla.id, lecturas_bronze
        )

        return {
            "status": "ok",
            "silver_planilla_id": silver_planilla.id,
            "batch_uuid": batch_uuid,
            "lecturas_copiadas": len(lecturas_bronze),
        }

    def listar_planillas(self, db: Session):
        return silver_repo.listar_planillas(db)
