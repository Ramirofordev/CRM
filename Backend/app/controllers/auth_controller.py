from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.user_schema import UserCreate, UserLogin, Token
from app.services import auth_services
from app.db.deps import get_db

router = APIRouter(prefix = "/auth", tags = ["Auth"])

@router.post("/register")
def register(data: UserCreate, db: Session = Depends(get_db)):
    return auth_services.register_user(db, data)

@router.post("/login", response_model = Token)
def login(data: UserLogin, db: Session = Depends(get_db)):
    return auth_services.login_user(db, data)