from sqlalchemy.orm import Session
from app.db.models.bronze import BronzePlanilla, BronzeLecturaRaw

def list_batches(db: Session, limit: int = 50):
    return db.query(BronzePlanilla).order_by(BronzePlanilla.id.desc()).limit(limit).all()

def get_batch(db: Session, batch_uuid: str):
    fr = db.query(BronzePlanilla).filter_by(batch_uuid=batch_uuid).first()
    if not fr:
        return None, []
    rows = db.query(BronzeLecturaRaw).filter_by(batch_uuid=batch_uuid).order_by(BronzeLecturaRaw.client_row_id).all()
    return fr, rows
