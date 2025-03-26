from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.ddbb.database.models.Ticket import Ticket
from schemas.ticket import TicketCreate, TicketUpdate
from services.ticket_service import create_ticket, get_ticket_by_id, update_ticket
from backend.ddbb.database.db_postgres import get_db


router = APIRouter()


@router.post("/", response_model=Ticket)
def create_new_ticket(ticket: TicketCreate, db: Session = Depends(get_db)):
    return create_ticket(db=db, ticket=ticket)


@router.get("/{ticket_id}", response_model=Ticket)
def get_ticket(ticket_id: int, db: Session = Depends(get_db)):
    db_ticket = get_ticket_by_id(db=db, ticket_id=ticket_id)
    if not db_ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return db_ticket
