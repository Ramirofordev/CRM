from datetime import datetime, timedelta
from jose import jwt
import hashlib
import os
from passlib.context import CryptContext

SECRET_KEY = os.getenv("SECRET_KEY", "testsecretkey") 

if os.getenv("ENV") == "production" and not SECRET_KEY:
    raise ValueError("SECRET_KEY not set")

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
    expire = datetime.utcnow() + timedelta(minutes = ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm = ALGORITHM)
