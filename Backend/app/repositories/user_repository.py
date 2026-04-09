from sqlalchemy.orm import Session
from app.models.user_model import User

def create_user(db: Session, email: str, hashed_password: str):
    user = User(email = email, password = hashed_password)
    db.add(User)
    db.commit()
    db.refresh(user)
    return user

def get_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()
