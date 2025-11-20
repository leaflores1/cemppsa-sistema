from fastapi import FastAPI
from app.core.config import settings
from app.api.v1.router import api_router
from app.core.cors import setup_cors

app = FastAPI(title="CEMPPSA API")
setup_cors(app)
app.include_router(api_router, prefix="/api/v1")

# healthcheck simple
@app.get("/health")
def health():
    return {"status": "ok"}
