from pydantic import BaseModel
from datetime import datetime


class TicketBase(BaseModel):
    """
    Modelo base para los tickets. FUNCIONAL API.

    Atributos:
    - id (int): Identificador único del ticket.
    - title (str): Título del ticket.
    - description (str): Descripción del ticket.
    - created_at (datetime): Fecha y hora de creación del ticket.
    - updated_at (datetime): Fecha y hora de última actualización del ticket.
    - user_id (int): Identificador del usuario relacionado.
    - status_id (int): Identificador del estado del ticket.
    """
    id: int
    title: str
    description: str
    created_at: datetime
    updated_at: datetime
    user_id: int
    status_id: int

    class Config:
        from_attributes = True
