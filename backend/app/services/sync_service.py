from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.schemas.sync import SyncBatchIn, SyncBatchOut, RowStatus
from app.db.repositories import bronze_repo

def save_batch(db: Session, batch: SyncBatchIn) -> SyncBatchOut:
    exists = bronze_repo.get_file_registry_by_uuid(db, str(batch.batch_uuid))
    rows_status = []

    if exists:
        # idempotente: no vuelvas a insertar
        for r in batch.readings:
            rows_status.append(RowStatus(client_row_id=r.client_row_id, status="duplicate"))
        return SyncBatchOut(batch_uuid=batch.batch_uuid, status="duplicate", saved=0, rows=rows_status)

    bronze_repo.insert_file_registry(
        db,
        batch_uuid=str(batch.batch_uuid),
        device_id=batch.device_id,
        technician_id=batch.technician_id,
        created_at=batch.created_at,
        status="received",
        source="app"
    )

    saved = 0
    now = datetime.now(timezone.utc)
    for r in batch.readings:
        bronze_repo.insert_reading_raw(db, {
            "batch_uuid": str(batch.batch_uuid),
            "client_row_id": r.client_row_id,
            "instrument_code": r.instrument_code,
            "parameter": r.parameter,
            "unit": r.unit,
            "value": r.value,
            "measured_at": r.measured_at,
            "notes": r.notes,
            "row_hash": None,
            "inserted_at": now
        })
        rows_status.append(RowStatus(client_row_id=r.client_row_id, status="ok"))
        saved += 1

    bronze_repo.commit(db)
    return SyncBatchOut(batch_uuid=batch.batch_uuid, status="received", saved=saved, rows=rows_status)
