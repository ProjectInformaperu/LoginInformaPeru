from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

from app.api.deps import get_current_active_user, get_db
from app.core.config import get_settings
from app.core.security import create_access_token
from app.schemas import (
    LoginRequest,
    Token,
    UserRead,
)
from app.services import user_service

router = APIRouter()
settings = get_settings()


@router.post("/login", response_model=Token, summary="Autentica un usuario")
def login(
    credentials: LoginRequest,
    session: Session = Depends(get_db),
) -> Token:
    user = user_service.authenticate_user(
        session, credentials.username, credentials.password
    )

    expires_delta = timedelta(minutes=settings.jwt_access_token_expire_minutes)
    access_token = create_access_token(
        {"sub": user.username}, expires_delta=expires_delta
    )
    return Token(
        access_token=access_token,
        expires_in=int(expires_delta.total_seconds()),
    )


@router.get(
    "/me",
    response_model=UserRead,
    summary="Obtiene la información del usuario autenticado",
)
def read_current_user(
    current_user=Depends(get_current_active_user),
) -> UserRead:
    return current_user

