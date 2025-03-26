from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from .base import Base
from sqlalchemy.orm import relationship
from .Role import Role


class User(Base):
    """
    Modelo de usuario para la base de datos.

    Atributos:
    - id (Integer): Identificador único del usuario, clave primaria e índice.
    - username (String): Nombre de usuario, único y no nulo.
    - email (String): Correo electrónico del usuario, único y no nulo.
    - hashed_password (String): Contraseña del usuario, no nula.
    - is_active (Boolean): Estado de activación del usuario, con valor predeterminado a Verdadero.
    - full_name (String): Nombre completo del usuario, no nulo.
    - phone (String): Teléfono del usuario, no nulo.
    - role_id (Integer): Identificador del rol del usuario, no nulo.

    Relaciones:
    - role (relationship): Relación con el modelo Role, que se popula mutuamente.
    - tickets (relationship): Relación con el modelo Ticket, que se popula mutuamente.
    - comments (relationship): Relación con el modelo Comment, que se popula mutuamente.
    - activity_logs (relationship): Relación con el modelo ActivityLog, que se popula mutuamente.
    - notifications (relationship): Relación con el modelo Notification, que se popula mutuamente.
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    full_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    role_id = Column(Integer, ForeignKey("roles.id"), nullable=False)

    role = relationship("Role", back_populates="users")
    tickets = relationship("Ticket", back_populates="user")
    comments = relationship("Comment", back_populates="user")
    activity_logs = relationship("ActivityLog", back_populates="user")
    notifications = relationship("Notification", back_populates="user")
