from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repositories import opportunity_repository, customer_repository
from app.enum.opportunities_status import OpportunityStatus

def create_opportunity(db: Session, data):
    customer = customer_repository.get_by_id(db, data.customer_id)

    if not customer:
        raise HTTPException(status_code = 404, detail = "Customer not found")
    
    return opportunity_repository.create_opportunity(db, data)

def get_opportunities(db: Session):
    return opportunity_repository.get_all_opportunities(db)

def get_opportunity(db: Session, opportunity_id: str):
    opportunity = opportunity_repository.get_by_id(db, opportunity_id)

    if not opportunity:
        raise HTTPException(status_code = 404, detail = "Opportunity not found")
    
    return opportunity

def update_opportunity(db: Session, opportunity_id: str, data):
    opportunity = opportunity_repository.get_by_id(db, opportunity_id)

    if not opportunity:
        raise HTTPException(status_code = 404, detail = "Opportunity not found")
    
    return opportunity_repository.update_opportunity(db, opportunity, data)

def update_status(db: Session, opportunity_id: str, new_status: OpportunityStatus):
    opportunity = opportunity_repository.get_by_id(db, opportunity_id)

    if not opportunity:
        raise HTTPException(status_code = 404, detail = "Opportunity not found")
    
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

def delete_opportunity(db: Session, opportunity_id: str):
    opportunity = opportunity_repository.get_by_id(db, opportunity_id)

    if not opportunity:
        raise HTTPException(status_code = 404, detail = "Opportunity not found")
    
    opportunity_repository.delete_opportunity(db, opportunity)

