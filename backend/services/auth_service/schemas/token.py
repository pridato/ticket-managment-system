from pydantic import BaseModel, EmailStr


class Token(BaseModel):
    access_token: str
    token_type: str

    class Config:
        orm_mode = True
