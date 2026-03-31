# InformaPeru Monorepo

Monorepo que agrupa el nuevo frontend (React + Vite + TypeScript) y backend (FastAPI + SQLModel) para el sistema de InformaPeru.

## Deploy en RENDER

SECRET_KEY:a43711fd73ea39a1b85956c7eebb2cfd

## Estructura

- `frontend/`: Aplicación React.
- `backend/`: API FastAPI con integración a base de datos PostgreSQL (configurable).

## Requisitos previos

- Node.js 20+
- Python 3.12+
- Docker (opcional para ejecución con contenedores)

## Puesta en marcha local

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

El backend expone Swagger UI en `http://localhost:8000/docs`.

## Variables de entorno

Duplica `backend/.env.example` a `backend/.env` y ajusta las variables para tu entorno.

## Ejecución con Docker

Para levantar un entorno completo (FastAPI + PostgreSQL) con Docker Compose:

```bash
docker compose up --build
```

Esto levanta:

- `db`: PostgreSQL 15 (puerto 5432 configurable).
- `backend`: FastAPI en `http://localhost:8000`.

Las variables utilizadas por defecto están en `backend/.env.docker`. Puedes sobreescribirlas mediante un archivo `.env` en la raíz o exportándolas en tu shell.

## Credenciales y Configuración de Base de Datos

### PostgreSQL

| Parámetro | Valor |
|-----------|-------|
| **Host (desde Docker)** | `db` |
| **Host (desde fuera de Docker)** | `localhost` |
| **Puerto externo** | `5433` |
| **Puerto interno** | `5432` |
| **Base de datos** | `informaperu` |
| **Usuario** | `informaperu` |
| **Contraseña** | `informaperu` |

**Connection String:**
```
postgresql://informaperu:informaperu@localhost:5433/informaperu
```

### pgAdmin 4

| Parámetro | Valor |
|-----------|-------|
| **URL** | `http://localhost:5050` |
| **Email** | `admin@informaperu.com` |
| **Contraseña** | `admin123` |

**Para conectar pgAdmin a PostgreSQL:**
1. Accede a `http://localhost:5050`
2. Login con las credenciales de pgAdmin
3. Click derecho en "Servers" → "Register" → "Server"
4. Pestaña General: Name = `InformaPeru DB`
5. Pestaña Connection:
   - Host: `db`
   - Port: `5432`
   - Maintenance DB: `informaperu`
   - Username: `informaperu`
   - Password: `informaperu`
   - ✅ Save password

## Usuarios de la Aplicación

| Usuario | Contraseña | Rol | Dashboard |
|---------|------------|-----|-----------|
| `admin` | `Admin123!` | ADMIN | General |
| `Maynas2025` | `Reina2025$$` | CLIENT | Maynas |
| `huancayo2025` | `$$huancayo2025$$` | CLIENT | Huancayo |
| `huancayo.2025` | `$huancayo$2025!` | CLIENT | Huancayo |
| `proempresa2025` | `$proempresa.2025$` | CLIENT | Proempresa |

## Puertos expuestos

| Servicio | Puerto |
|----------|--------|
| Frontend (dev) | `5173` |
| Backend API | `8080` |
| PostgreSQL | `5433` |
| pgAdmin | `5050` |

