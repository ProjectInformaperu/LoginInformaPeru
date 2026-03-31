from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class UserRole(SQLModel, table=True):
    user_id: Optional[int] = Field(
        default=None, foreign_key="user.id", primary_key=True
    )
    role_id: Optional[int] = Field(
        default=None, foreign_key="role.id", primary_key=True
    )


class Role(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True, max_length=50)
    description: Optional[str] = Field(default=None, max_length=255)

    users: List["User"] = Relationship(
        back_populates="roles", link_model=UserRole
    )


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True, max_length=150)
    email: Optional[str] = Field(default=None, unique=True, max_length=255)
    full_name: Optional[str] = Field(default=None, max_length=255)
    hashed_password: str
    is_active: bool = Field(default=True)
    dashboard_type: Optional[str] = Field(
        default=None, max_length=50, description="Tipo de dashboard a mostrar"
    )

    roles: List[Role] = Relationship(
        back_populates="users", link_model=UserRole
    )

