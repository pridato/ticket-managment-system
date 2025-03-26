from sqlalchemy import Column, Integer, String, DateTime
from .base import Base
from datetime import datetime
from sqlalchemy.orm import relationship


class TicketStatus(Base):
    """
    Modelo de estado de ticket para la base de datos.

    Atributos:
    - id (Integer): Identificador único del estado de ticket, clave primaria e índice.
    - name (String): Nombre del estado de ticket, único y no nulo.

    Relaciones:
    - tickets (relationship): Relación con el modelo Ticket, que se popula mutuamente.
    """
    __tablename__ = "ticket_statuses"

    id = Column(Integer, primary_key=True, index=True, default=0)
    name = Column(String, unique=True, nullable=False, default="open")

    tickets = relationship("Ticket", back_populates="status")
