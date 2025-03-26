from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.ddbb.database.models.Comment import Comment
from schemas.comment import CommentCreate, CommentUpdate
from services.comment_service import create_comment, update_comment, get_comments_by_ticket_id
from backend.ddbb.database.db_postgres import get_db


router = APIRouter()


@router.post("/{ticket_id}/comments/", response_model=Comment)
def create_new_comment(ticket_id: int, comment: CommentCreate, db: Session = Depends(get_db)):
    return create_comment(db=db, ticket_id=ticket_id, comment=comment)


@router.get("/{ticket_id}/comments/", response_model=list[Comment])
def get_ticket_comments(ticket_id: int, db: Session = Depends(get_db)):
    comments = get_comments_by_ticket_id(db=db, ticket_id=ticket_id)
    if not comments:
        raise HTTPException(
            status_code=404, detail="No comments found for this ticket")
    return comments


@router.put("/comments/{comment_id}", response_model=Comment)
def update_existing_comment(comment_id: int, comment: CommentUpdate, db: Session = Depends(get_db)):
    db_comment = update_comment(db=db, comment_id=comment_id, comment=comment)
    if db_comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    return db_comment
