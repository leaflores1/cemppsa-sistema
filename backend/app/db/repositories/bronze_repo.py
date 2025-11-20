from sqlalchemy.orm import Session
from app.db.models.bronze_planillas import BronzePlanilla
from app.db.models.bronze_lectura_raw import BronzeLecturaRaw

class BronzeRepository:

    def crear_planilla(self, db: Session, batch_uuid: str, fuente: str):
        planilla = BronzePlanilla(batch_uuid=batch_uuid, fuente=fuente)
        db.add(planilla)
        db.commit()
        db.refresh(planilla)
        return planilla

    def agregar_lecturas(self, db: Session, planilla_id: int, lecturas: list):
        rows = [
            BronzeLecturaRaw(
            batch_uuid = l["batch_uuid"],
            client_row_id = l["client_row_id"],
            instrument_code = l["instrument_code"],
            parameter = l["parameter"],
            unit = l["unit"],
            value = l["value"],
            measured_at = l["measured_at"],
            notes = l.get("notes", None)
    )
    for l in lecturas
]


        db.bulk_save_objects(rows)
        db.commit()
        return True

    def listar_planillas(self, db: Session):
        return db.query(BronzePlanilla).order_by(BronzePlanilla.creado_en.desc()).all()
