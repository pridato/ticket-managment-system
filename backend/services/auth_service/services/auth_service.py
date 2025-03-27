from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from ddbb.database.models.User import User
from ..schemas.user import UserCreate, UserLogin
from ..schemas.token import Token
from . import email_service
from ..app.config import JWT_SECRET_KEY, JWT_ALGORITHM, JWT_EXPIRATION_MINUTES

import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=JWT_EXPIRATION_MINUTES)):
    """
    Crea un token de acceso JWT basado en los datos proporcionados y un período de expiración.

    Args:
    - data (dict): Diccionario que contiene los datos a codificar en el token.
    - expires_delta (timedelta, optional): Tiempo de expiración del token. Defaults to timedelta(minutes=JWT_EXPIRATION_MINUTES).

    Returns:
    - str: El token de acceso JWT codificado.
    """
    to_encode = data.copy()
    expire = datetime.now() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY,
                             algorithm=JWT_ALGORITHM)

    logger.debug(f"Token created: {encoded_jwt}")

    return encoded_jwt


def verify_password(plain_password, hashed_password):
    """
    Verifica si la contraseña en texto plano coincide con la contraseña hash.

    Args:
    - plain_password (str): Contraseña en texto plano.
    - hashed_password (str): Contraseña hash.

    Returns:
    - bool: True si la contraseña en texto plano coincide con la contraseña hash, False en caso contrario.
    """
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    """
    Genera el hash de una contraseña utilizando el contexto de contraseña.

    Args:
    - password (str): La contraseña a ser hash.

    Returns:
    - str: El hash de la contraseña.
    """
    return pwd_context.hash(password)


def authenticate_user(db: Session, email: str, password: str):
    """
    Autentica un usuario basado en su correo electrónico y contraseña.

    Args:
    - db (Session): Sesión de la base de datos.
    - email (str): Correo electrónico del usuario.
    - password (str): Contraseña del usuario.

    Returns:
    - User or None: El usuario autenticado si la autenticación es exitosa, None en caso contrario.
    """
    user = db.query(User).filter(User.email == email).first()
    logger.info(f"User found: {user}")
    if user and verify_password(password, user.hashed_password):
        return user
    logger.error("User not found or password incorrect")
    return None


def create_user(db: Session, user: UserCreate):
    """
    Crea un nuevo usuario en la base de datos.

    Args:
    - db (Session): Sesión de la base de datos.
    - user (UserCreate): Modelo de usuario a ser creado.

    Raises:
    - HTTPException: Si el usuario ya existe.

    Returns:
    - User: El usuario creado.
    """
    logger.info(f"Creating user: {user}")
    db_user = db.query(User).filter(User.email == user.email).first()
    logger.info(f"User found: {db_user} expected None")
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="El usuario ya existe")

    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        full_name=user.full_name,
        username=user.username,
        phone=user.phone,
        hashed_password=hashed_password,
        is_active=True,
        role_id=1
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    logger.info(f"User created: {db_user}")
    return db_user


def login_user(db: Session, user_login: UserLogin):
    """
    Autentica a un usuario y genera un token de acceso.

    Args:
    - db (Session): Sesión de la base de datos.
    - user_login (UserLogin): Modelo de inicio de sesión del usuario.

    Raises:
    - HTTPException: Si las credenciales son incorrectas.

    Returns:
    - Token: El token de acceso.
    """
    user = authenticate_user(db, user_login.email, user_login.password)
    logger.info(f"User authenticated: {user}")
    if not user:
        logger.error("Credentials incorrect")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales incorrectas")

    access_token = create_access_token(data={"sub": user.email})
    logger.info(f"Token created: {access_token}")
    return Token(access_token=access_token, token_type="bearer")


def forgot_password_s(db: Session, email: str):
    """
    Envía un correo electrónico para restablecer la contraseña a una dirección específica.

    Args:
    - db (Session): Sesión de la base de datos.
    - email (str): La dirección de correo electrónico del destinatario.

    Raises:
    - HTTPException: Si el usuario no existe.

    Returns:
    - dict: Un diccionario con un mensaje de confirmación.
    """
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")

    # Aquí enviarías el correo con el enlace para cambiar la contraseña
    reset_link = f"https://your-app.com/reset-password/{user.id}"
    email_service.send_password_reset_email(email, reset_link)
    return {"msg": "Correo de recuperación enviado"}
