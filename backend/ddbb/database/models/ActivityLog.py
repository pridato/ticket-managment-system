from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from .base import Base
from datetime import datetime
from sqlalchemy.orm import relationship


class ActivityLog(Base):
    """
    Modelo de registro de actividad para la base de datos.

    Atributos:
    - id (Integer): Identificador único del registro de actividad, clave primaria e índice.
    - action (String): Acción realizada, no nula.
    - timestamp (DateTime): Hora y fecha de la acción, con valor predeterminado a la fecha y hora actuales.
    - user_id (Integer): Identificador del usuario relacionado, clave foránea a la tabla de usuarios, puede ser nula.
    """
    __tablename__ = "activity_logs"

    id = Column(Integer, primary_key=True, index=True)
    action = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    user = relationship("User", back_populates="activity_logs")
