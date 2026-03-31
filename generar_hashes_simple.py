"""Script simple para generar hashes usando bcrypt directamente."""
import bcrypt

passwords = {
    "huancayo2025": "$$huancayo2025$$",
    "huancayo.2025": "$huancayo$2025!"
}

print("=" * 60)
print("HASHES DE CONTRASEÑAS PARA INSERTAR EN LA BASE DE DATOS")
print("=" * 60)
print()

for username, password in passwords.items():
    # Generar hash con bcrypt (formato compatible con passlib)
    password_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_bytes, salt)
    # Convertir a string (passlib espera este formato)
    hash_string = hashed.decode('utf-8')
    
    print(f"Usuario: {username}")
    print(f"Contraseña: {password}")
    print(f"Hash: {hash_string}")
    print()

print("=" * 60)
print("Copia estos hashes y úsalos en el script SQL")
print("=" * 60)

