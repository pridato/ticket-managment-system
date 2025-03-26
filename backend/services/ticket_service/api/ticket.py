from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.TicketBase import TicketBase
from ..schemas.ticket import TicketCreate
from ..services.ticket_service import create_ticket, get_ticket_by_id, update_ticket
from ddbb.database.db_postgres import get_db

import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

router = APIRouter()


@router.post("/", response_model=TicketBase)
def create_new_ticket(ticket: TicketCreate, db: Session = Depends(get_db)):
    ticket = create_ticket(db=db, ticket=ticket)
    if not ticket:
        logger.error(f"Error creating ticket")
        raise HTTPException(status_code=500, detail="Error creating ticket")
    return ticket


@router.get("/{ticket_id}", response_model=TicketBase)
def get_ticket(ticket_id: int, db: Session = Depends(get_db)):
    db_ticket = get_ticket_by_id(db=db, ticket_id=ticket_id)
    if not db_ticket:
        logger.error(f"Ticket with id {ticket_id} not found")
        raise HTTPException(status_code=404, detail="Ticket not found")
    return db_ticket
