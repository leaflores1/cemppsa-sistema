from sqlalchemy.orm import Session
from datetime import datetime
from app.db.repositories.bronze_repo import BronzeRepository
from app.db.models.bronze_lectura_raw import BronzeLecturaRaw
from app.db.models.bronze_planillas import BronzePlanilla

bronze_repo = BronzeRepository()

class BronzeService:

    def recibir_planilla(self, db: Session, payload: dict):

        planilla = BronzePlanilla(
            batch_uuid = payload["batch_uuid"],
            device_id = payload["device_id"],
            technician_id = payload["technician_id"],
            created_at = payload["created_at"],
            server_received_at = datetime.utcnow(),
            status = "received",
            source = "mobile_app"
        )

        db.add(planilla)
        db.commit()
        db.refresh(planilla)

        lecturas = payload["readings"]

        rows = [
            BronzeLecturaRaw(
                batch_uuid = payload["batch_uuid"],
                client_row_id = l["client_row_id"],
                instrument_code = l["instrument_code"],
                parameter = l["parameter"],
                unit = l["unit"],
                value = l["value"],
                measured_at = l["measured_at"],
                notes = l.get("notes")
            )
            for l in lecturas
        ]

        db.bulk_save_objects(rows)
        db.commit()

        return {
            "status": "ok",
            "batch_uuid": payload["batch_uuid"],
            "lecturas_guardadas": len(lecturas)
        }
    
    def obtener_bandeja(self, db: Session):
        from app.db.models.bronze_planillas import BronzePlanilla

        rows = db.query(BronzePlanilla).order_by(BronzePlanilla.id.desc()).all()

        return [
            {
                "batch_uuid": r.batch_uuid,
                "device_id": r.device_id,
                "technician_id": r.technician_id,
                "created_at": r.created_at,
                "server_received_at": r.server_received_at,
                "status": r.status,
                "source": r.source
            }
            for r in rows
        ]

