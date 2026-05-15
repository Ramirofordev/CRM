import os
from functools import lru_cache

from dotenv import load_dotenv

load_dotenv()


class Settings:
    def __init__(self):
        self.env = os.getenv("ENV", "development")
        self.database_url = os.getenv("DATABASE_URL", "sqlite:///./crm.db")
        self.secret_key = os.getenv("SECRET_KEY")
        self.cors_origins = [
            origin.strip()
            for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
            if origin.strip()
        ]
        self.cors_origin_regex = os.getenv("CORS_ORIGIN_REGEX") or None
        self.skip_create_all = os.getenv("SKIP_CREATE_ALL") == "1" or self.env == "production"

    def validate(self):
        if self.env == "production" and not self.secret_key:
            raise ValueError("SECRET_KEY must be set in production")
        if self.env == "production" and self.database_url.startswith("sqlite"):
            raise ValueError("DATABASE_URL must point to PostgreSQL in production")
        if not self.secret_key:
            self.secret_key = "testsecretkey"

    @property
    def database_connect_args(self):
        if self.database_url.startswith(("postgresql://", "postgresql+psycopg2://")):
            return {"sslmode": "require"}
        return {}


@lru_cache
def get_settings():
    settings = Settings()
    settings.validate()
    return settings
