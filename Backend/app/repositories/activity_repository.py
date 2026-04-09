from sqlalchemy.orm import Session
from app.models.activity_model import Activity

def create_activity(db: Session, data):
    activity = Activity(**data.dict())
    db.add(activity)
    db.commit()
    db.refresh(activity)

    return activity

def get_all_activities(db: Session):
    return db.query(Activity).all()

def get_by_id(db: Session, activity_id: str):
    return db.query (Activity).filter(Activity.id == activity_id).first()

def get_by_customer(db: Session, customer_id: str):
    return db.query(Activity).filter(Activity.costumer_id == customer_id).all()

def get_by_opportunity(db: Session, opportunity_id: str):
    return db.query(Activity).filter(Activity.opportunity_id == opportunity_id).all()

def update_activity(db: Session, activity, data):
    for key, value in data.dict().items():
        setattr(activity, key, value)

    db.commit()
    db.refresh(activity)

    return activity

def delete_activity(db: Session, activity_id: str):
    db.delete(activity_id)
    db.commit()
