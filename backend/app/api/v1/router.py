from fastapi import APIRouter
from .endpoints import sync, catalog, batches

api_router = APIRouter(prefix="/api/v1")

# Incluir los routers de cada módulo
api_router.include_router(sync.router, tags=["sync"])
api_router.include_router(catalog.router, tags=["catalog"])
api_router.include_router(batches.router, tags=["batches"])