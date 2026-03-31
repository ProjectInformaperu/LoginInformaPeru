from fastapi import APIRouter

from app.api.routes import auth

router = APIRouter()

router.include_router(auth.router, prefix="/auth", tags=["auth"])


@router.get("/", tags=["root"])
async def root() -> dict[str, str]:
    return {"message": "Welcome to InformaPeru API"}

