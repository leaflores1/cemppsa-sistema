from sqlalchemy.orm import Session
from app.db.models.bronze import FileRegistry, ReadingRaw

def list_batches(db: Session, limit: int = 50):
    return db.query(FileRegistry).order_by(FileRegistry.id.desc()).limit(limit).all()

def get_batch(db: Session, batch_uuid: str):
    fr = db.query(FileRegistry).filter(FileRegistry.batch_uuid==batch_uuid).first()
    if not fr:
        return None, []
    rows = db.query(ReadingRaw).filter(ReadingRaw.batch_uuid==batch_uuid)\
                               .order_by(ReadingRaw.client_row_id).all()
    return fr, rows
