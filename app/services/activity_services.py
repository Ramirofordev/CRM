from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repositories import activity_repository, customer_repository, opportunity_repository
from app.services.auth_services import check_ownership

def create_activity(db: Session, data, user):

    if not data.customer_id and not data.opportunity_id:
        raise HTTPException(status_code = 400, detail = "Activity must have a customer or opportunity")
    
    if data.customer_id and data.opportunity_id:
        raise HTTPException(status_code = 400, detail = "Activity cannot have both customer and opportunity")
    
    if data.customer_id:
        customer = customer_repository.get_by_id(db, data.customer_id)
        if not customer:
            raise HTTPException(status_code = 404, detail = "Customer not found")
        
        check_ownership(customer, user)
        
    if data.opportunity_id:
        opportunity = opportunity_repository.get_by_id(db, data.opportunity_id)
        if not opportunity:
            raise HTTPException(status_code = 404, detail = "Opportunity not found")
        
    
        check_ownership(opportunity, user)
        
    data_dict = data.model_dump()
    data_dict["owner_id"] = user.id
        
    return activity_repository.create_activity(db, data_dict)

def get_activities(db: Session, user):
    if user.role == "admin":
        return activity_repository.get_all_activities(db)
    
    return activity_repository.get_by_owner(db, user.id)

def get_activity(db: Session, activity_id: str, user):
    activity = activity_repository.get_by_id(db, activity_id)

    if not activity:
        raise HTTPException(status_code = 404, detail = "Activity not found")
    
    check_ownership(activity, user)
    
    return activity

def get_activity_by_customer(db: Session, customer_id, user):
    activities = activity_repository.get_by_customer(db, customer_id)

    for activity in activities:
        check_ownership(activity, user)

    return activities

def get_activity_by_opportunity(db: Session, opportunity_id, user):
    activities = activity_repository.get_by_opportunity(db, opportunity_id)

    for activity in activities:
        check_ownership(activity, user)

    return activities

def update_activity(db: Session, activity_id: str, data, user):
    activity = activity_repository.get_by_id(db, activity_id)

    if not activity:
        raise HTTPException(status_code = 404, detail = "Activity not found")
    
    customer_id = data.customer_id
    opportunity_id = data.opportunity_id

    if not customer_id and not opportunity_id:
        raise HTTPException(status_code = 400, detail = "Activity must have a customer or opportunity")
    
    if customer_id and opportunity_id:
        raise HTTPException(status_code = 400, detail = "Activity cannot have both customer and opportunity")
    
    check_ownership(activity, user)

    return activity_repository.update_activity(db, activity, data)

def update_status(db: Session, activity_id: str, new_status: ActivityStatus, user):
    activity = activity_repository.get_by_id(db, activity_id)

    if not activity:
        raise HTTPException(status_code = 404, detail = "Activity not found")

    check_ownership(activity, user)

    current_status = activity.status

    activity.status = new_status
    db.commit()
    db.refresh(activity)

    return activity

def delete_activity(db: Session, activity_id: str, user):
    activity = activity_repository.get_by_id(db, activity_id)

    if not activity:
        raise HTTPException(status_code = 404, detail = "Activity not found")
    
    check_ownership(activity, user)
    
    return activity_repository.delete_activity(db, activity)