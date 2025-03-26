from sqlalchemy.orm import Session
from ddbb.database.models.Ticket import Ticket
from ..schemas.ticket import TicketCreate, TicketUpdate
from ddbb.database.models.TicketStatus import TicketStatus

import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


def create_ticket(db: Session, ticket: TicketCreate):
    """
    Crea un nuevo ticket en la base de datos.

    Args:
    - db (Session): Sesión de la base de datos.
    - ticket (TicketCreate): Datos del ticket a crear.

    Returns:
    - Ticket: El ticket creado, con sus datos actualizados en la base de datos.
    """
    try:
        status = db.query(TicketStatus).filter(
            TicketStatus.id == ticket.status).first()

        if not status:
            status = create_ticket_status(db)

        db_ticket = Ticket(
            title=ticket.title,
            description=ticket.description,
            status=status,
            user_id=ticket.user_id
        )
        print(db_ticket)
        if not db_ticket.status:

            raise ValueError("Status not provided, setting to open")
        db.add(db_ticket)
        db.commit()
        db.refresh(db_ticket)
        logger.debug(f"Ticket created: {db_ticket}")
        return db_ticket
    except Exception as e:
        logger.error(f"Error creating ticket: {e}")
        return None


def create_ticket_status(db):
    """
    Crea un estado de ticket si no existe ya en la base de datos.

    Args:
    - db (Session): Sesión de la base de datos.

    Returns:
    - TicketStatus: El estado de ticket creado o existente.
    """
    estados_a_verificar = ["open", "closed", "in_progress"]
    estado_objeto = None

    for estado in estados_a_verificar:
        estado_objeto = db.query(TicketStatus).filter(
            TicketStatus.name == estado).first()
        if not estado_objeto:
            # Si el estado no existe, lo creamos
            db.add(TicketStatus(name=estado))
            db.commit()
            estado_objeto = db.query(TicketStatus).filter(
                TicketStatus.name == estado).first()

        # Si encontramos el estado, no hace falta seguir buscando
        if estado_objeto:
            break

    if not estado_objeto:
        raise ValueError("No se pudo crear ni encontrar un estado válido")

    return estado_objeto


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
    logger.debug(f"Ticket found: {db_ticket}")
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
        logger.debug(f"Ticket updated: {db_ticket}")
        return db_ticket

    logger.error(f"Ticket with id {ticket_id} not found")
    return None
