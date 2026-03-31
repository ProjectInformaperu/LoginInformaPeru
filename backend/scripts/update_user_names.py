"""
Script para actualizar los nombres de usuario en el servidor.
Ejecutar desde dentro del contenedor backend:

docker exec -it informaperu-backend python /app/update_user_names.py
"""
from sqlmodel import Session, select
from app.db.session import engine
from app.models import User

updates = [
    ("huancayo2025", "InformaPerú Huancayo"),
    ("huancayo.2025", "InformaPerú Huancayo"),
    ("proempresa2025", "InformaPerú Proempresa"),
    ("Maynas2025", "InformaPerú Maynas"),
    ("admin", "Administrador"),
]

with Session(engine) as session:
    for username, new_name in updates:
        user = session.exec(select(User).where(User.username == username)).first()
        if user:
            old_name = user.full_name
            user.full_name = new_name
            print(f"✅ {username}: '{old_name}' -> '{new_name}'")
        else:
            print(f"⚠️ Usuario '{username}' no encontrado")
    session.commit()
    print("\n🎉 ¡Actualización completada!")
