# Este archivo fuerza la carga de todos los modelos para Alembic
from app.db.models.bronze_lectura_raw import BronzeLecturaRaw
from app.db.models.bronze_planillas import BronzePlanilla
from app.db.models.silver_planilla import SilverPlanilla
from app.db.models.silver_lectura import SilverLectura
from app.db.models.silver_excepcion import SilverExcepcion
from app.db.models.gold_serie_diaria import GoldSerieDiaria
from app.db.models.gold_reporte import GoldReporte
from app.db.models.catalog import CatalogInstrumento, CatalogUnit
