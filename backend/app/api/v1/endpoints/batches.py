from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.repositories import batch_repo

router = APIRouter()

@router.get("/batches")
def batches(db: Session = Depends(get_db)):
    items = batch_repo.list_batches(db)
    return [
        {
            "batch_uuid": i.batch_uuid,
            "status": i.status,
            "source": i.source,
            "created_at": i.created_at,
            "server_received_at": i.server_received_at
        } for i in items
    ]

@router.get("/batches/{batch_uuid}")
def batch_detail(batch_uuid: str, db: Session = Depends(get_db)):
    fr, rows = batch_repo.get_batch(db, batch_uuid)
    if not fr:
        raise HTTPException(status_code=404, detail="batch not found")
    return {
        "file_registry": {
            "batch_uuid": fr.batch_uuid,
            "status": fr.status,
            "source": fr.source,
            "created_at": fr.created_at,
            "server_received_at": fr.server_received_at
        },
        "rows": [
            {
                "client_row_id": r.client_row_id,
                "instrument_code": r.instrument_code,
                "parameter": r.parameter,
                "unit": r.unit,
                "value": r.value,
                "measured_at": r.measured_at,
                "notes": r.notes
            } for r in rows
        ]
    }
