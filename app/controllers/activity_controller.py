from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.activity_schema import ActivityCreate, ActivityResponse, ActivityStatusUpdate
from app.services import activity_services
from app.core.deps import get_current_user
from app.db.deps import get_db

router = APIRouter(prefix = "/activities", tags = ["Activities"])

@router.post("/", response_model = ActivityResponse, status_code = 201)
def create_activity(data: ActivityCreate, db: Session = Depends(get_db), user = Depends(get_current_user)):
    return activity_services.create_activity(db, data, user)

@router.get("/", response_model = list[ActivityResponse])
def get_activities(db: Session = Depends(get_db), user = Depends(get_current_user)):
    return activity_services.get_activities(db, user)

@router.get("/customer/{customer_id}", response_model = list[ActivityResponse])
def get_by_customer(customer_id: str, db: Session = Depends(get_db), user = Depends(get_current_user)):
    return activity_services.get_activity_by_customer(db, customer_id, user)

@router.get("/opportunity/{opportunity_id}", response_model = list[ActivityResponse])
def get_by_opportunity(opportunity_id: str, db: Session = Depends(get_db), user = Depends(get_current_user)):
    return activity_services.get_activity_by_opportunity(db, opportunity_id, user)

@router.get("/{activity_id}", response_model = ActivityResponse)
def get_activity(activity_id: str, db: Session = Depends(get_db), user = Depends(get_current_user)):
    return activity_services.get_activity(db, activity_id, user)

@router.put("/{activity_id}", response_model = ActivityResponse)
def update_activity(activity_id: str, data: ActivityCreate, db: Session = Depends(get_db), user = Depends(get_current_user)):
    return activity_services.update_activity(db, activity_id, data, user)

@router.patch("/{activity_id}/status", response_model = ActivityResponse)
def change_status(activity_id: str, data: ActivityStatusUpdateº, db: Session = Depends(get_db), user = Depends(get_current_user)):
    return activity_services.update_status(db, activity_id, data.status, user)

@router.delete("/{activity_id}")
def delete_activity(activity_id: str, db: Session = Depends(get_db), user = Depends(get_current_user)):
    activity_services.delete_activity(db, activity_id, user)
    return {"message": "Activity deleted"} 