from fastapi import APIRouter
from app.api.v1.endpoints import batches, catalog, sync, silver, gold, consultas

api_router = APIRouter()

api_router.include_router(batches.router, prefix="/batches", tags=["Batches"])
api_router.include_router(catalog.router, prefix="/catalog", tags=["Catalog"])
api_router.include_router(sync.router, prefix="/sync", tags=["Sync"])
api_router.include_router(consultas.router, tags=["Consultas"])  # ← AGREGAR ESTO
api_router.include_router(silver.router)
api_router.include_router(gold.router)

