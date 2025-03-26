from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class CommentCreate(BaseModel):
    content: str
    author: Optional[str] = None  # Autor opcional
    # Fecha de creación automática
    created_at: Optional[str] = datetime.now().isoformat()

    class Config:
        from_attributes = True


class CommentUpdate(BaseModel):
    content: Optional[str] = None
    author: Optional[str] = None
    created_at: Optional[str] = None

    class Config:
        from_attributes = True
