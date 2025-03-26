from pydantic import BaseModel
from datetime import datetime


class CommentBase(BaseModel):
    id: int
    content: str
    created_at: datetime
    ticket_id: int
    user_id: int

    class Config:
        from_attributes = True
