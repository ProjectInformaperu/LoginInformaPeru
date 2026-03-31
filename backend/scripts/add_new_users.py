"""Script para agregar los nuevos usuarios de HUANCAYO y PROEMPRESA a la base de datos."""
import sys
import os

# Agregar el directorio padre al path para poder importar los módulos
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from sqlmodel import Session, select
from app.db.session import engine, get_session
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


def add_new_users():
    """Agregar los nuevos usuarios de Huancayo y Proempresa."""
    
    new_users = [
        # HUANCAYO - Usuario 1
        {
            "username": "huancayo2025",
            "email": "huancayo2025@informaperu.local",
            "full_name": "InformaPerú Huancayo",
            "password": "$$huancayo2025$$",
            "roles": ["CLIENT"],
        },
        # HUANCAYO - Usuario 2
        {
            "username": "huancayo.2025",
            "email": "huancayo.2025@informaperu.local",
            "full_name": "InformaPerú Huancayo",
            "password": "$huancayo$2025!",
            "roles": ["CLIENT"],
        },
        # PROEMPRESA
        {
            "username": "proempresa2025",
            "email": "proempresa2025@informaperu.local",
            "full_name": "InformaPerú Proempresa",
            "password": "$proempresa.2025$",
            "roles": ["CLIENT"],
        },
    ]
    
    with Session(engine) as session:
        for user_data in new_users:
            # Verificar si el usuario ya existe
            existing = session.exec(
                select(User).where(User.username == user_data["username"])
            ).first()
            
            if existing:
                print(f"⚠️  Usuario '{user_data['username']}' ya existe. Saltando...")
                continue
            
            # Obtener o crear roles
            roles = [
                _get_or_create_role(
                    session,
                    role_name,
                    "Cliente" if role_name == "CLIENT" else "Administrador del sistema",
                )
                for role_name in user_data["roles"]
            ]
            
            # Crear el usuario
            hashed_password = get_password_hash(user_data["password"])
            user = User(
                username=user_data["username"],
                email=user_data["email"],
                full_name=user_data["full_name"],
                hashed_password=hashed_password,
                roles=roles,
            )
            session.add(user)
            print(f"✅ Usuario '{user_data['username']}' creado exitosamente")
        
        session.commit()
        print("\n🎉 ¡Todos los usuarios han sido procesados!")


if __name__ == "__main__":
    print("=" * 60)
    print("AGREGANDO NUEVOS USUARIOS DE HUANCAYO Y PROEMPRESA")
    print("=" * 60)
    print()
    add_new_users()
