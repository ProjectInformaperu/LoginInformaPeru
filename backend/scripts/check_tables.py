"""Script para verificar y crear las tablas si no existen."""
from app.db.session import engine, init_db
from sqlmodel import SQLModel

if __name__ == "__main__":
    print("🔍 Verificando tablas...")
    
    # Crear todas las tablas
    print("📦 Creando tablas si no existen...")
    SQLModel.metadata.create_all(engine)
    
    # Ejecutar seeding
    print("🌱 Ejecutando seeding de usuarios...")
    init_db()
    
    print("✅ ¡Completado! Las tablas deberían estar creadas ahora.")

