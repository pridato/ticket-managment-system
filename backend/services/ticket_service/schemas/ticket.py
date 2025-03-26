from pydantic import BaseModel
from enum import Enum
from typing import Optional


class TicketStatus(str, Enum):
    """
    Enum para definir los estados posibles de un ticket.
    """
    OPEN = "Open"
    IN_PROGRESS = "In Progress"
    CLOSED = "Closed"


class TicketCreate(BaseModel):
    """
    Modelo para crear un nuevo ticket.
    """
    title: str
    description: str
    status: Optional[TicketStatus] = TicketStatus.OPEN

    class Config:
        """
        Configuración del modelo.
        """
        from_attributes = True  # permite usar el modelo con SQLAlchemy


class TicketUpdate(BaseModel):
    title: Optional[str]  # El título puede actualizarse
    description: Optional[str]  # La descripción también puede actualizarse
    status: Optional[TicketStatus]  # El estado también puede actualizarse

    class Config:
        from_attributes = True
