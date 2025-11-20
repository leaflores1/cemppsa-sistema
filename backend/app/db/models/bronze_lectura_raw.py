from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey, String, UniqueConstraint, Text
from app.db.base import Base

from sqlalchemy import Column, Integer, Float, DateTime, String, Text
from app.db.base import Base

class BronzeLecturaRaw(Base):
    __tablename__ = "bronze_lecturas_raw"

    id = Column(Integer, primary_key=True)
    batch_uuid = Column(String(100), nullable=False)
    client_row_id = Column(Integer)
    instrument_code = Column(String(100), nullable=False)
    parameter = Column(String(100), nullable=False)
    unit = Column(String(20))
    value = Column(Float)
    measured_at = Column(DateTime)
    notes = Column(Text)
    row_hash = Column(String(255))
    inserted_at = Column(DateTime)
