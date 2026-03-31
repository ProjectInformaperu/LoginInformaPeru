from datetime import timedelta
from typing import Optional

from fastapi import HTTPException, status
from sqlmodel import Session, select

from app.core.config import get_settings
from app.core.security import (
    create_access_token,
    get_password_hash,
    verify_password,
)
from app.models import Role, User

settings = get_settings()


def get_user_by_username(session: Session, username: str) -> Optional[User]:
    return session.exec(select(User).where(User.username == username)).first()


def authenticate_user(session: Session, username: str, password: str) -> User:
    user = get_user_by_username(session, username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario o contraseña incorrectos",
        )
    if not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario o contraseña incorrectos",
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Usuario inactivo",
        )
    return user


def generate_user_token(user: User) -> str:
    expires_delta = timedelta(minutes=settings.jwt_access_token_expire_minutes)
    return create_access_token(
        {"sub": user.username}, expires_delta=expires_delta
    )


def create_user(
    session: Session,
    *,
    username: str,
    password: str,
    email: Optional[str] = None,
    full_name: Optional[str] = None,
    roles: Optional[list[str]] = None,
) -> User:
    if get_user_by_username(session, username):
        raise ValueError("El usuario ya existe")

    db_roles: list[Role] = []
    if roles:
        for role_name in roles:
            role = session.exec(
                select(Role).where(Role.name == role_name)
            ).first()
            if not role:
                role = Role(name=role_name)
                session.add(role)
            db_roles.append(role)

    user = User(
        username=username,
        email=email,
        full_name=full_name,
        hashed_password=get_password_hash(password),
        roles=db_roles,
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

