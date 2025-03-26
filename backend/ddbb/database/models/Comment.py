from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey
from .base import Base
from datetime import datetime
from sqlalchemy.orm import relationship


class Comment(Base):
    """
    Modelo de comentario para la base de datos.

    Atributos:
    - id (Integer): Identificador único del comentario, clave primaria e índice.
    - content (Text): Contenido del comentario, no nulo.
    - created_at (DateTime): Fecha y hora de creación del comentario, con valor predeterminado a la fecha y hora actuales.
    - ticket_id (Integer): Identificador del ticket relacionado, clave foránea a la tabla de tickets, no nula.
    - user_id (Integer): Identificador del usuario relacionado, clave foránea a la tabla de usuarios, no nula.

    Relaciones:
    - ticket (relationship): Relación con el modelo Ticket, que se popula mutuamente.
    - user (relationship): Relación con el modelo User, que se popula mutuamente.
    """
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    ticket_id = Column(Integer, ForeignKey("tickets.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    ticket = relationship("Ticket", back_populates="comments")
    user = relationship("User", back_populates="comments")
