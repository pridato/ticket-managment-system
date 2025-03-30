from typing import Dict, Set
from fastapi import WebSocket
from services.notification_service.app.models.notification import Notification
import asyncio


class EventBus:
    def __init__(self):
        self.subscribers: Dict[str, Set[WebSocket]] = {}
        self.queue = asyncio.Queue()

    async def subscribe(self, user_id: str, websocket: WebSocket):
        """
        Suscribe a una notificación.

        Suscribe un websocket a recibir notificaciones de un usuario.

        Args:
        - user_id (str): El id del usuario al que se desea suscribir notificaciones.
        - websocket (WebSocket): El websocket al que se va a notificar.
        """
        if user_id not in self.subscribers:
            self.subscribers[user_id] = set()
        self.subscribers[user_id].add(websocket)

    async def unsubscribe(self, user_id: str, websocket: WebSocket):
        """
        Desuscribe a una notificación.

        Desuscribe un websocket de recibir notificaciones de un usuario.

        Args:
        - user_id (str): El id del usuario al que se desea desuscribir notificaciones.
        - websocket (WebSocket): El websocket al que se va a desnotificar.
        """
        if user_id in self.subscribers:
            self.subscribers[user_id].remove(websocket)
            if not self.subscribers[user_id]:
                del self.subscribers[user_id]

    async def publish(self, notification: Notification):
        """
        Publica una notificación.

        Publica una notificación en la cola para ser enviada a los suscriptores.

        Args:
        - notification (Notification): La notificación a publicar.
        """
        await self.queue.put(notification)

    async def broadcast_notifications(self):
        """
        Envía notificaciones a los suscriptores.

        Envía notificaciones a los suscriptores de manera asíncrona.
        """
        while True:
            notification = await self.queue.get()
            if notification.user_id in self.subscribers:
                dead_sockets = set()
                for websocket in self.subscribers[notification.user_id]:
                    try:
                        await websocket.send_json(notification.dict())
                    except:
                        dead_sockets.add(websocket)

                for dead_socket in dead_sockets:
                    await self.unsubscribe(notification.user_id, dead_socket)

    async def get_notifications(self, user_id: str):
        """
        Obtiene las notificaciones para el usuario especificado.

        Obtiene las notificaciones para el usuario especificado.

        Args:
        - user_id (str): El id del usuario al que se van a obtener las notificaciones.
        Returns:
        - List[Notification]: Las notificaciones del usuario.
        """
        return self.subscribers.get(user_id, set())
