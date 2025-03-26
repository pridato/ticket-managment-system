import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import HTTPException

from ..app.config import EMAIL_HOST, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD


def send_password_reset_email(to_email: str, reset_link: str):
    """
    Envía un correo electrónico para restablecer la contraseña a una dirección específica.

    Args:
    - to_email (str): La dirección de correo electrónico del destinatario.
    - reset_link (str): El enlace para restablecer la contraseña.

    Raises:
    - HTTPException: Si ocurre un error al enviar el correo electrónico.
    """
    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USERNAME
        msg['To'] = to_email
        msg['Subject'] = 'Recuperación de contraseña'

        body = f'Para restablecer tu contraseña, haz clic en el siguiente enlace: {reset_link}'
        msg.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls()
            server.login(EMAIL_USERNAME, EMAIL_PASSWORD)
            server.sendmail(EMAIL_USERNAME, to_email, msg.as_string())
    except Exception as e:
        raise HTTPException(
            status_code=500, detail="Error al enviar el correo")
