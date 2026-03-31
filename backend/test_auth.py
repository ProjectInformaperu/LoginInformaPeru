from sqlmodel import Session
from app.db.session import engine
engine.echo = False
from app.services.user_service import authenticate_user

def test_login(username, password):
    with Session(engine) as session:
        try:
            user = authenticate_user(session, username, password)
            print(f"Éxito: Usuario {user.username} autenticado correctamente.")
        except Exception as e:
            print(f"Error al autenticar {username}: {e}")

if __name__ == "__main__":
    # Test Maynas2025
    test_login("Maynas2025", "Reina2025$$")
    # Test admin
    test_login("admin", "Admin123!")
