from sqlmodel import Session, select
from app.db.session import engine
engine.echo = False
from app.models.user import User

def check_users():
    with Session(engine) as session:
        statement = select(User)
        users = session.exec(statement).all()
        print(f"Total usuarios: {len(users)}")
        for user in users:
            print(f"- {user.username} (Activo: {user.is_active})")

if __name__ == "__main__":
    try:
        check_users()
    except Exception as e:
        print(f"Error: {e}")
