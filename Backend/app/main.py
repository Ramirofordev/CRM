from fastapi import FastAPI
from app.db.base import Base
from app.db.session import engine
import app.db.base_class

from app.controllers.customer_controller import router as customer_router
from app.controllers.opportunity_controller import router as opportunity_router
from app.controllers.activity_controller import router as activity_router
from app.controllers.auth_controller import router as auth_controller

app = FastAPI()

app.include_router(customer_router)
app.include_router(opportunity_router)
app.include_router(activity_router)
app.include_router(auth_controller)

Base.metadata.create_all(bind = engine)

@app.get("/")
def root():
    return {"message": "CRM API running"}