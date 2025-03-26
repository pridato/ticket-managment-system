import os
from dotenv import load_dotenv

load_dotenv()

# Configuración de JWT
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "supersecretkey")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_EXPIRATION_MINUTES = int(os.getenv("JWT_EXPIRATION_MINUTES", 30))

# Configuración del correo (SMTP)
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.mailtrap.io")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", 587))
EMAIL_USERNAME = os.getenv("EMAIL_USERNAME", "your_username")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "your_password")
