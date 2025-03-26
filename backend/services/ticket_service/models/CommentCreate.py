from pydantic import BaseModel


class CommentCreate(BaseModel):
    content: str
    ticket_id: int
    user_id: int

    class Config:
        from_attributes = True
