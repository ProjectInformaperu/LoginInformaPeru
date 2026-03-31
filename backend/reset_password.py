from sqlmodel import Session, select
from app.db.session import engine
from app.models.user import User
from app.core.security import get_password_hash

def reset_password(username, new_password):
    with Session(engine) as session:
        user = session.exec(select(User).where(User.username == username)).first()
        if user:
            user.hashed_password = get_password_hash(new_password)
            session.add(user)
            session.commit()
            print(f"Contraseña para {username} reseteada exitosamente.")
        else:
            print(f"Usuario {username} no encontrado.")

if __name__ == "__main__":
    reset_password("Maynas2025", "Reina2025$$")
    reset_password("admin", "Admin123!")
