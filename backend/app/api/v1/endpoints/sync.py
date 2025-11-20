from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.sync import SyncBatchIn, SyncBatchOut
from app.services.sync_service import save_batch

router = APIRouter()

@router.post("", response_model=SyncBatchOut)
def sync(batch: SyncBatchIn, db: Session = Depends(get_db)):
    return save_batch(db, batch)
