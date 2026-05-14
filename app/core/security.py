from datetime import datetime, timedelta, timezone
from jose import jwt
import hashlib
from passlib.context import CryptContext

from app.core.config import get_settings

settings = get_settings()
SECRET_KEY = settings.secret_key

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes = ["bcrypt"], deprecated = "auto")

def normalize_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def hash_password(password: str) -> str:
    normalized = normalize_password(password)
    normalized = normalized[:72]
    return pwd_context.hash(normalized)

def verify_password(password: str, hashed: str) -> bool:
    normalized = normalize_password(password)
    normalized = normalized[:72]
    return pwd_context.verify(normalized, hashed)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes = ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm = ALGORITHM)
