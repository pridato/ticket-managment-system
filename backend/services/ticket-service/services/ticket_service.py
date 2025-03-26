from sqlalchemy.orm import Session
from backend.ddbb.database.models.Ticket import Ticket
from schemas.ticket import TicketCreate, TicketUpdate
from backend.ddbb.database.models.TicketStatus import TicketStatus


def create_ticket(db: Session, ticket: TicketCreate):
    """
    Crea un nuevo ticket en la base de datos.

    Args:
    - db (Session): Sesión de la base de datos.
    - ticket (TicketCreate): Datos del ticket a crear.

    Returns:
    - Ticket: El ticket creado, con sus datos actualizados en la base de datos.
    """
    db_ticket = Ticket(**ticket.dict())
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    return db_ticket


def get_ticket_by_id(db: Session, ticket_id: int):
    """
    Obtiene un ticket por su ID desde la base de datos.

    Args:
    - db (Session): Sesión de la base de datos.
    - ticket_id (int): Identificador del ticket a obtener.

    Returns:
    - Ticket: El ticket correspondiente al ID proporcionado, o None si no se encuentra el ticket.
    """
    # Obtener el ticket de la base de datos por su ID
    db_ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    return db_ticket


def update_ticket(db: Session, ticket_id: int, ticket: TicketUpdate):
    """
    Actualiza un ticket existente en la base de datos.

    Args:
    - db (Session): Sesión de la base de datos.
    - ticket_id (int): Identificador del ticket a actualizar.
    - ticket (TicketUpdate): Datos del ticket actualizados.

    Returns:
    - Ticket: El ticket actualizado, o None si no se encuentra el ticket.
    """

    # obtenemos el ticket de la base de datos
    db_ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if db_ticket:
        # actualizamos los campos del ticket con los nuevos valores
        for field, value in ticket.model_dump(exclude_unset=True).items():
            setattr(db_ticket, field, value)  # actualizamos el campo

        # actualizamos el estado del ticket si se ha proporcionado
        if ticket.status:
            db_ticket.status = TicketStatus(ticket.status)
        db.commit()
        db.refresh(db_ticket)
        return db_ticket
    return None
