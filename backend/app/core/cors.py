from fastapi.middleware.cors import CORSMiddleware

def setup_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],   # en prod: restringir a dominios internos/VPN
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
