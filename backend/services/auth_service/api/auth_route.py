from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Any
from ddbb.database.db_postgres import get_db
from ..schemas.user import UserCreate, UserLogin
from ..schemas.token import Token
from ..services.auth_service import authenticate_user, create_access_token, create_user, get_password_hash, login_user, forgot_password_s
from ddbb.database.models.User import User
from ..services.email_service import send_password_reset_email


router = APIRouter()


@router.post("/register", response_model=Token)
def register(user: UserCreate, db: Session = Depends(get_db)):
    """
    Ruta para registrar un nuevo usuario.
    """
    return create_user(user=user, db=db)


@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    """
    Ruta para iniciar sesión de un usuario.
    """
    return login_user(user_login=user, db=db)


@router.post("/forgot-password")
def forgot_password(email: str, db: Session = Depends(get_db)):
    """
    Ruta para solicitar el restablecimiento de la contraseña.
    Envía un correo electrónico con instrucciones.
    """
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Llamamos al servicio para enviar el correo de recuperación
    forgot_password_s(db, email)
    return {"msg": "Password reset email sent."}
