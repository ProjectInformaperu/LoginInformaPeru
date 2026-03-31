from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int = Field(..., description="Expiration time in seconds")


class TokenPayload(BaseModel):
    sub: Optional[str] = None
    exp: Optional[int] = None
    iat: Optional[int] = None


class LoginRequest(BaseModel):
    username: str
    password: str


class UserRoleRead(BaseModel):
    name: str
    description: Optional[str] = None


class UserRead(BaseModel):
    id: int
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    is_active: bool
    dashboard_type: Optional[str] = None
    roles: List[UserRoleRead] = []

    class Config:
        from_attributes = True

