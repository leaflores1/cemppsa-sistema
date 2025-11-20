# app/services/sync_service.py

from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.schemas.sync import SyncBatchIn, SyncBatchOut, RowStatus
from app.db.models.bronze_planillas import BronzePlanilla
from app.db.models.bronze_lectura_raw import BronzeLecturaRaw

def save_batch(db: Session, batch: SyncBatchIn) -> SyncBatchOut:
    # ¿Existe una planilla con ese batch_uuid?
    exists = db.query(BronzePlanilla).filter(
        BronzePlanilla.batch_uuid == str(batch.batch_uuid)
    ).first()

    rows_status = []

    if exists:
        # comportamiento idempotente
        for r in batch.readings:
            rows_status.append(RowStatus(client_row_id=r.client_row_id, status="duplicate"))
        return SyncBatchOut(
            batch_uuid=batch.batch_uuid,
            status="duplicate",
            saved=0,
            rows=rows_status,
        )

    # Crear planilla en bronze_planillas
    planilla = BronzePlanilla(
        batch_uuid=str(batch.batch_uuid),
        device_id=batch.device_id,
        technician_id=batch.technician_id,
        created_at=batch.created_at,
        server_received_at=datetime.now(timezone.utc),
        status="received",
        source="mobile_app"
    )

    db.add(planilla)
    db.commit()
    db.refresh(planilla)

    # Insertar lecturas en bronze_lecturas_raw
    now = datetime.now(timezone.utc)
    saved = 0

    for r in batch.readings:
        lectura = BronzeLecturaRaw(
            batch_uuid=str(batch.batch_uuid),
            client_row_id=r.client_row_id,
            instrument_code=r.instrument_code,
            parameter=r.parameter,
            unit=r.unit,
            value=r.value,
            measured_at=r.measured_at,
            notes=r.notes,
            inserted_at=now
        )

        db.add(lectura)
        rows_status.append(RowStatus(client_row_id=r.client_row_id, status="ok"))
        saved += 1

    db.commit()

    return SyncBatchOut(
        batch_uuid=batch.batch_uuid,
        status="received",
        saved=saved,
        rows=rows_status
    )
