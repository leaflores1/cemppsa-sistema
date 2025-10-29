from pydantic import BaseModel
from typing import List

class InstrumentOut(BaseModel):
    instrument_code: str
    name: str
    type: str

class UnitOut(BaseModel):
    unit_code: str
    description: str

class CatalogOut(BaseModel):
    instruments: List[InstrumentOut]
    units: List[UnitOut]
