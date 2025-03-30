from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from services.notification_service.app.services.event_bus import EventBus
from logging import getLogger
from services.notification_service.app.models.notification import Notification

logger = getLogger(__name__)


router = APIRouter()
event_bus = EventBus()


@router.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    """
    Endpoint de websocket para recibir notificaciones.

    Se suscribe al evento de notificación para el usuario especificado y espera a recibir
    eventos de notificación. Cuando se produce un evento, se envía a través del websocket.

    Si se produce una desconexión del websocket, se desuscribe el usuario de las notificaciones.

    :param websocket: El websocket al que se va a conectar.
    :param user_id: El id del usuario al que se van a suscribir las notificaciones.
    """
    await event_bus.subscribe(user_id, websocket)
    try:
        while True:
            data = await websocket.receive_json()
            await event_bus.publish(data)
            logger.info(f"Published event: {data}")
            raise WebSocketDisconnect(1000)
    except WebSocketDisconnect:
        await event_bus.unsubscribe(user_id, websocket)
        logger.info(f"Unsubscribed user {user_id}")

    logger.info(f"Closed connection for user {user_id}")


@router.post("/notify")
async def send_notification(notification: Notification):
    """
    Publica una notificación para el usuario especificado.

    El endpoint publica una notificación para el usuario especificado y devuelve un
    mensaje de confirmación.

    :param notification: La notificación a publicar.
    :return: Un mensaje de confirmación.
    """
    await event_bus.publish(notification)
    logger.info(f"Published notification: {notification}")
    return {"status": "notification queued", "notification": notification}


@router.get("/notifications/{user_id}")
async def get_notifications(user_id: str):
    """
    Obtiene las notificaciones para el usuario especificado.

    El endpoint devuelve las notificaciones para el usuario especificado.

    :param user_id: El id del usuario al que se van a obtener las notificaciones.
    :return: Las notificaciones del usuario.
    """
    return await event_bus.get_notifications(user_id)
