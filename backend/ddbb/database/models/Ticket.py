from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Text
from .base import Base
from datetime import datetime
from sqlalchemy.orm import relationship


class Ticket(Base):
    """
    Modelo de ticket para la base de datos.

    Atributos:
    - id (Integer): Identificador único del ticket, clave primaria e índice.
    - title (String): Título del ticket, no nulo.
    - description (Text): Descripción del ticket, no nula.
    - created_at (DateTime): Fecha y hora de creación del ticket, con valor predeterminado a la fecha y hora actuales.
    - updated_at (DateTime): Fecha y hora de actualización del ticket, con valor predeterminado a la fecha y hora actuales y actualización automática.
    - user_id (Integer): Identificador del usuario relacionado, clave foránea a la tabla de usuarios, no nula.
    - status_id (Integer): Identificador del estado del ticket, clave foránea a la tabla de estados de ticket, no nula.

    Relaciones:
    - user (relationship): Relación con el modelo User, que se popula mutuamente.
    - status (relationship): Relación con el modelo TicketStatus, que se popula mutuamente.
    - comments (relationship): Relación con el modelo Comment, que se popula mutuamente.
    """
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now,
                        onupdate=datetime.now)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status_id = Column(Integer, ForeignKey(
        "ticket_statuses.id"), nullable=False)

    user = relationship("User", back_populates="tickets")
    status = relationship("TicketStatus", back_populates="tickets")
    comments = relationship("Comment", back_populates="ticket")
