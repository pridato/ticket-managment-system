from sqlalchemy import Column, Integer, String, Boolean
from .base import Base
from sqlalchemy.orm import relationship


class Role(Base):
    """
    Modelo de rol para la base de datos.

    Atributos:
    - id (Integer): Identificador único del rol, clave primaria e índice.
    - name (String): Nombre del rol, único y no nulo.
    """
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)

    users = relationship("User", back_populates="role")
