from pydantic import BaseModel


class TicketCreate(BaseModel):
    """
    Modelo de creación de ticket. Se utiliza para la creación de nuevos tickets. API

    Atributos:
    - title (str): Título del ticket.
    - description (str): Descripción del ticket.
    - user_id (int): Identificador del usuario relacionado.
    - status_id (int): Identificador del estado del ticket.
    """
    title: str
    description: str
    user_id: int
    status_id: int

    class Config:
        from_attributes = True
