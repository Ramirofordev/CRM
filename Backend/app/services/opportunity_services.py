from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repositories import opportunity_repository, customer_repository
from app.enum.opportunities_status import OpportunityStatus
from app.services.auth_services import check_ownership

def create_opportunity(db: Session, data, user):
    customer = customer_repository.get_by_id(db, data.customer_id)

    if not customer:
        raise HTTPException(status_code = 404, detail = "Customer not found")
    
    check_ownership(customer, user)
    
    data_dict = data.model_dump()
    data_dict["owner_id"] = user.id
    
    return opportunity_repository.create_opportunity(db, data_dict)

def get_opportunities(db: Session, user):
    if user.role == "admin":
        return opportunity_repository.get_all_opportunities(db)

    return opportunity_repository.get_by_owner(db, user.id)

def get_opportunity(db: Session, opportunity_id: str, user):
    opportunity = opportunity_repository.get_by_id(db, opportunity_id)

    if not opportunity or opportunity.owner_id != user.id:
        raise HTTPException(status_code = 404, detail = "Opportunity not found")
    
    check_ownership(opportunity, user)
    
    return opportunity

def update_opportunity(db: Session, opportunity_id: str, data, user):
    opportunity = opportunity_repository.get_by_id(db, opportunity_id)

    if not opportunity:
        raise HTTPException(status_code = 404, detail = "Opportunity not found")
    
    check_ownership(opportunity, user)
    
    return opportunity_repository.update_opportunity(db, opportunity, data)

def update_status(db: Session, opportunity_id: str, new_status: OpportunityStatus, user):
    opportunity = opportunity_repository.get_by_id(db, opportunity_id)

    if not opportunity:
        raise HTTPException(status_code = 404, detail = "Opportunity not found")
    
    check_ownership(opportunity, user)
    
    current_status = opportunity.status

    # Transition rules
    allowed_transitions = {
        OpportunityStatus.LEAD: [OpportunityStatus.CONTACTED],
        OpportunityStatus.CONTACTED: [OpportunityStatus.PROPOSAL],
        OpportunityStatus.PROPOSAL: [OpportunityStatus.WON, OpportunityStatus.LOST],
        OpportunityStatus.WON: [],
        OpportunityStatus.LOST: [],
    }

    if new_status not in allowed_transitions[current_status]:
        raise HTTPException(status_code = 400, detail = f"Invalid transition form {current_status} to {new_status}")
    
    opportunity.status = new_status
    db.commit()
    db.refresh(opportunity)

    return opportunity

def delete_opportunity(db: Session, opportunity_id: str, user):
    opportunity = opportunity_repository.get_by_id(db, opportunity_id)

    if not opportunity:
        raise HTTPException(status_code = 404, detail = "Opportunity not found")
    
    check_ownership(opportunity, user)
    
    opportunity_repository.delete_opportunity(db, opportunity)

