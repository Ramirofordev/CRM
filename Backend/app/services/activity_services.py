from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repositories import activity_repository, customer_repository, opportunity_repository

def create_activity(db: Session, data):

    if not data.customer_id and not data.opportunity_id:
        raise HTTPException(status_code = 400, detail = "Activity must have a customer or opportunity")
    
    if data.customer_id and data.opportunity_id:
        raise HTTPException(status_code = 400, detail = "Activity cannot have both customer and opportunity")
    
    if data.customer_id:
        customer = customer_repository.get_by_id(db, data.customer_id)
        if not customer:
            raise HTTPException(status_code = 404, detail = "Customer not found")
        
    if data.opportunity_id:
        opportunity = opportunity_repository.get_by_id(db, data.opportunity_id)
        if not opportunity:
            raise HTTPException(status_code = 404, detail = "Opportunity not found")
        
    return activity_repository.create_activity(db, data)

def get_activities(db: Session):
    return activity_repository.get_all_activities(db)

def get_activity(db: Session, activity_id: str):
    activity = activity_repository.get_by_id(db, activity_id)

    if not activity:
        raise HTTPException(status_code = 404, detail = "Activity not found")
    
    return activity

def get_activity_by_customer(db: Session, customer_id):
    return activity_repository.get_by_costumer(db, customer_id)

def get_activity_by_opportunity(db: Session, opportunity_id):
    return activity_repository.get_by_opportunity(db, opportunity_id)

def update_activity(db: Session, activity_id: str, data):
    activity = activity_repository.get_by_id(db, activity_id)

    if not activity:
        raise HTTPException(status_code = 404, detail = "Activity not found")
    
    customer_id = data.customer_id
    opportunity_id = data.opportunity_id

    if not customer_id and not opportunity_id:
        raise HTTPException(status_code = 400, detail = "Activity must have a customer or opportunity")
    
    if customer_id and opportunity_id:
        raise HTTPException(status_code = 400, detail = "Activity cannot have both customer and opportunity")

    return activity_repository.update_activity(db, activity, data)

def delete_activity(db: Session, activity_id: str):
    activity = activity_repository.get_by_id(db, activity_id)

    if not activity:
        raise HTTPException(status_code = 404, detail = "Activity not found")
    
    return activity_repository.delete_activity(db, activity)
    
    


