from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import router as api_router
from app.core.config import get_settings
from app.db.session import init_db


def create_application() -> FastAPI:
    settings = get_settings()
    
    # Configurar CORS origins
    cors_origins = settings.cors_origins if settings.cors_origins else ["*"]
    
    # Log para debugging
    print(f"🌍 Environment: {settings.environment}")
    print(f"🔒 CORS Origins configurados: {cors_origins}")
    print(f"🔒 BACKEND_CORS_ORIGINS raw: {settings.backend_cors_origins}")
    
    # Crear aplicación SIN middleware en el constructor
    application = FastAPI(
        title="InformaPeru API",
        version="0.1.0",
        debug=settings.debug,
    )
    
    # Agregar CORS middleware DESPUÉS de crear la app
    application.add_middleware(
        CORSMiddleware,
        allow_origins=cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["*"],
    )

    application.include_router(api_router, prefix=settings.api_prefix)

    @application.on_event("startup")
    def on_startup() -> None:
        try:
            init_db()
        except Exception as exc:
            print(f"[startup] init_db error: {exc}")

    return application


app = create_application()


@app.get("/health", tags=["health"])
async def health_check() -> dict[str, str]:
    return {"status": "ok"}

