from sqlalchemy.orm import Session
from datetime import datetime, timezone
from app.db.models.bronze import FileRegistry, ReadingRaw

def get_file_registry_by_uuid(db: Session, batch_uuid: str):
    return db.query(FileRegistry).filter(FileRegistry.batch_uuid==batch_uuid).one_or_none()

def insert_file_registry(db: Session, *, batch_uuid:str, device_id:str, technician_id:str, created_at:datetime, status:str, source:str="app"):
    fr = FileRegistry(
        batch_uuid=batch_uuid,
        device_id=device_id,
        technician_id=technician_id,
        created_at=created_at,
        server_received_at=datetime.now(timezone.utc),
        status=status,
        source=source
    )
    db.add(fr)
    db.flush()
    return fr

def insert_reading_raw(db: Session, r: dict):
    row = ReadingRaw(**r)
    db.add(row)

def commit(db: Session):
    db.commit()
