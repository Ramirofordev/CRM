from sqlalchemy.orm import Session
from app.models.user_model import User

def create_user(db: Session, email: str, hashed_password: str):
    user = User(email = email, password = hashed_password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_by_id(db: Session, user_id: str):
    return db.query(User).filter(User.id == user_id).first()
