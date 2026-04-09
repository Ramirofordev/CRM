from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repositories import user_repository
from app.core.security import hash_password, verify_password, create_access_token

def register_user(db: Session, data):
    existing = user_repository.get_by_email(db, data.email)

    if existing:
        raise HTTPException(status_code = 400, detail = "Email already registered")
    
    hashed = hash_password(data.password)
    user = user_repository.create_user(db, data.email, hashed)

    return user

def login_user(db: Session, data):
    user = user_repository.get_by_email(db, data.email)

    if not user:
        raise HTTPException(status_code = 401, detail = "Invalid credentials")
    
    if not verify_password(data.password == user.password):
        raise HTTPException(status_code = 401, detail = "Invalid credentials")
    
    token = create_access_token({"sub": user.id})
    
    return {"access_token": token, "token_type": "bearer"}