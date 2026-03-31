from sqlmodel import Session, select

from app.core.security import get_password_hash
from app.models import Role, User


def _get_or_create_role(session: Session, name: str, description: str | None = None) -> Role:
    role = session.exec(select(Role).where(Role.name == name)).first()
    if role:
        return role
    role = Role(name=name, description=description)
    session.add(role)
    session.commit()
    session.refresh(role)
    return role


def seed_default_user(session: Session) -> None:
    users_to_seed = [
        {
            "username": "admin",
            "email": "admin@informaperu.local",
            "full_name": "Administrador",
            "password": "Admin123!",
            "roles": ["ADMIN"],
        },
        {
            "username": "Maynas2025",
            "email": "maynas2025@informaperu.local",
            "full_name": "InformaPerú Maynas",
            "password": "Reina2025$$",
            "roles": ["CLIENT"],
        },
        # Usuarios HUANCAYO
        {
            "username": "huancayo2025",
            "email": "huancayo2025@informaperu.local",
            "full_name": "InformaPerú Huancayo",
            "password": "$$huancayo2025$$",
            "roles": ["CLIENT"],
        },
        {
            "username": "huancayo.2025",
            "email": "huancayo.2025@informaperu.local",
            "full_name": "InformaPerú Huancayo",
            "password": "$huancayo$2025!",
            "roles": ["CLIENT"],
        },
        # Usuario PROEMPRESA
        {
            "username": "proempresa2025",
            "email": "proempresa2025@informaperu.local",
            "full_name": "InformaPerú Proempresa",
            "password": "$proempresa.2025$",
            "roles": ["CLIENT"],
        },
    ]

    for user_data in users_to_seed:
        existing = session.exec(select(User).where(User.username == user_data["username"])).first()
        if existing:
            continue

        roles = [
            _get_or_create_role(
                session,
                role_name,
                "Administrador del sistema" if role_name == "ADMIN" else "Cliente",
            )
            for role_name in user_data["roles"]
        ]

        user = User(
            username=user_data["username"],
            email=user_data["email"],
            full_name=user_data["full_name"],
            hashed_password=get_password_hash(user_data["password"]),
            roles=roles,
        )
        session.add(user)

    session.commit()
