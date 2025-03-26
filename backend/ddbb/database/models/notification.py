from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .base import Base


class Notification(Base):
    """
    Modelo de notificación para la base de datos.

    Atributos:
    - id (Integer): Identificador único de la notificación, clave primaria e índice.
    - message (String): Mensaje de la notificación, no nulo.
    - is_read (Boolean): Estado de lectura de la notificación, con valor predeterminado a Falso.
    - created_at (DateTime): Fecha y hora de creación de la notificación, con valor predeterminado a la fecha y hora actuales.
    - user_id (Integer): Identificador del usuario relacionado, clave foránea a la tabla de usuarios, no nula.

    Relaciones:
    - user (relationship): Relación con el modelo User, que se popula mutuamente.
    """
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    message = Column(String, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    user = relationship("User", back_populates="notifications")
