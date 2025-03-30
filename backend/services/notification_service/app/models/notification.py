from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class Notification(BaseModel):
    user_id: str
    message: str
    ticket_id: Optional[str]
    created_at: datetime = datetime.now()
    read: bool = False
    notification_type: str
