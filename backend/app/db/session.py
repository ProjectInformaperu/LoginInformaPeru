from collections.abc import Generator

from sqlmodel import Session, SQLModel, create_engine

from app.core.config import get_settings
from app.db.seed import seed_default_user

settings = get_settings()


def _normalize_database_url(url: str) -> str:
    """Convierte postgresql:// a postgresql+psycopg2:// para compatibilidad con Render."""
    url_str = str(url)
    if url_str.startswith("postgresql://") and "+" not in url_str:
        # Render proporciona postgresql:// pero necesitamos psycopg2
        return url_str.replace("postgresql://", "postgresql+psycopg2://", 1)
    return url_str


if settings.database_url:
    db_url = _normalize_database_url(settings.database_url)
    engine = create_engine(db_url, echo=settings.debug)
else:
    engine = create_engine("sqlite:///./app.db", echo=settings.debug)


def init_db() -> None:
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        seed_default_user(session)


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session

