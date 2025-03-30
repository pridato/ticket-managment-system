from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings
from app.models.notification import Notification
from datetime import datetime
from typing import List, Optional


class NotificationService:
    def __init__(self, client: AsyncIOMotorClient):
        self.client = client
        self.db = self.client[settings.DB_NAME]
        self.notifications = self.db["notifications"]

    async def create_notification(self, user_id: str, mensaje: str, ticket_id: Optional[str] = None) -> Notification:
        """
        Crea una nueva notificación y la guarda en la base de datos.

        Args:
        - user_id (str): El id del usuario al que pertenece la notificación.
        - mensaje (str): El mensaje de la notificación.
        - ticket_id (Optional[str], opcional): El id del tiquete relacionado con la notificación. Defaults to None.

        Returns:
        - Notification: La notificación creada.
        """
        notificacion = Notification(
            user_id=user_id,
            mensaje=mensaje,
            ticket_id=ticket_id,
            created_at=datetime.now()
        )
        await self.notifications.insert_one(notificacion.dict())
        return notificacion

    async def get_notifications(self, user_id: str) -> List[Notification]:
        """
        Obtiene las notificaciones de un usuario ordenadas por fecha de creación en orden descendiente.

        Args:
        - user_id (str): El id del usuario al que se le quieren obtener las notificaciones.

        Returns:
        - List[Notification]: Las notificaciones del usuario.
        """
        cursor = self.notifications.find({"user_id": user_id}).sort(
            "created_at", -1).limit(10)
        return [Notification(**doc) async for doc in cursor]

    async def mark_as_read(self, notification_id: str):
        """
        Marca una notificación como leida.

        Args:
        - notification_id (str): El id de la notificación a marcar como leida.
        """
        await self.notifications.update_one(
            {"_id": notification_id},
            {"$set": {"read": True}}
        )
