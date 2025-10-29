from sqlalchemy import Column, Integer, String, DateTime, Float, Text, UniqueConstraint
from app.db.base import Base

class FileRegistry(Base):
    __tablename__ = "file_registry"
    id = Column(Integer, primary_key=True)
    batch_uuid = Column(String(36), nullable=False, unique=True)
    device_id = Column(String(100), nullable=False)
    technician_id = Column(String(100), nullable=False)
    created_at = Column(DateTime, nullable=False)
    server_received_at = Column(DateTime, nullable=False)
    status = Column(String(20), nullable=False)  # received | duplicate | error | processed
    source = Column(String(30), nullable=True)   # app | dat | csv | email

class ReadingRaw(Base):
    __tablename__ = "readings_raw"
    id = Column(Integer, primary_key=True)
    batch_uuid = Column(String(36), nullable=False)
    client_row_id = Column(Integer, nullable=False)
    instrument_code = Column(String(50), nullable=False)
    parameter = Column(String(50), nullable=False)
    unit = Column(String(20), nullable=False)
    value = Column(Float, nullable=False)
    measured_at = Column(DateTime, nullable=False)
    notes = Column(Text, nullable=True)
    row_hash = Column(String(64), nullable=True)   # opcional
    inserted_at = Column(DateTime, nullable=False)

    __table_args__ = (UniqueConstraint("batch_uuid","client_row_id", name="uq_batch_row"),)
