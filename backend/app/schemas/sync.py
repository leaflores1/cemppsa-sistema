from typing import Optional, List
from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, Field, field_validator

class ReadingIn(BaseModel):
    client_row_id: int
    instrument_code: str
    parameter: str
    unit: str
    value: float
    measured_at: datetime
    notes: Optional[str] = None

class SyncBatchIn(BaseModel):
    batch_uuid: UUID
    device_id: str
    technician_id: str
    created_at: datetime
    readings: List[ReadingIn]

    @field_validator("readings")
    @classmethod
    def check_readings_not_empty(cls, v):
        if not v:
            raise ValueError("Debe contener al menos una lectura")
        return v

class RowStatus(BaseModel):
    client_row_id: int
    status: str
    message: Optional[str] = None

class SyncBatchOut(BaseModel):
    batch_uuid: UUID
    status: str
    saved: int
    errors: List[str] = Field(default_factory=list)
    rows: List[RowStatus] = Field(default_factory=list)
