from sqlalchemy.orm import Session
from ddbb.database.models.Comment import Comment
from ..schemas.comment import CommentCreate, CommentUpdate


def create_comment(db: Session, ticket_id: int, comment: CommentCreate):
    """
    Crea un nuevo comentario para un ticket.

    Args:
    - db (Session): La sesión de base de datos.
    - ticket_id (int): El ID del ticket al que se asociará el comentario.
    - comment (CommentCreate): Los datos del comentario a crear.

    Returns:
    - Comment: El comentario creado, con los datos de la base de datos.
    """
    db_comment = Comment(
        ticket_id=ticket_id,
        content=comment.content,
        author=comment.author,
        created_at=comment.created_at
    )
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment


def get_comments_by_ticket_id(db: Session, ticket_id: int):
    """
    Obtiene todos los comentarios asociados a un ticket.

    Args:
    - db (Session): La sesión de base de datos.
    - ticket_id (int): El ID del ticket.

    Returns:
    - List[Comment]: Lista de comentarios asociados al ticket.
    """
    return db.query(Comment).filter(Comment.ticket_id == ticket_id).all()


def update_comment(db: Session, comment_id: int, comment: CommentUpdate):
    """
    Actualiza un comentario existente.

    Args:
    - db (Session): La sesión de base de datos.
    - comment_id (int): El ID del comentario a actualizar.
    - comment (CommentUpdate): Los datos a actualizar.

    Returns:
    - Comment: El comentario actualizado, o None si no se encuentra.
    """
    db_comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if db_comment:
        for field, value in comment.dict(exclude_unset=True).items():
            setattr(db_comment, field, value)  # Actualizamos el campo
        db.commit()
        db.refresh(db_comment)
        return db_comment
    return None
