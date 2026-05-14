from fastapi import FastAPI
from app.db.base import Base
from app.db.session import engine
from fastapi.middleware.cors import CORSMiddleware
import app.db.base_class

from app.core.config import get_settings
from app.controllers.customer_controller import router as customer_router
from app.controllers.opportunity_controller import router as opportunity_router
from app.controllers.activity_controller import router as activity_router
from app.controllers.auth_controller import router as auth_controller

settings = get_settings()

app = FastAPI()

app.include_router(customer_router)
app.include_router(opportunity_router)
app.include_router(activity_router)
app.include_router(auth_controller)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

if not settings.skip_create_all:
    Base.metadata.create_all(bind = engine)

@app.get("/")
def root():
    return {"message": "CRM API running"}

@app.get("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host = "0.0.0.0", port = 8000)
