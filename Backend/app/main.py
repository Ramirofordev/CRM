from fastapi import FastAPI
from app.db.base import Base
from app.db.session import engine
import app.db.base_class

from app.controllers.customer_controller import router as customer_router

app = FastAPI()

app.include_router(customer_router)

Base.metadata.create_all(bind = engine)

@app.get("/")
def root():
    return {"message": "CRM API running"}