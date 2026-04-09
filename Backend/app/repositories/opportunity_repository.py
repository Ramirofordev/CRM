from sqlalchemy.orm import Session
from app.models.opportunity_model import Opportunity

def create_opportunity(db: Session, data):
    opportunity = Opportunity(**data.dict())
    db.add(opportunity)
    db.commit()

    db.refresh(opportunity)
    return opportunity

def get_all_opportunities(db: Session):
    return db.query(Opportunity).all()

def get_by_id(db: Session, opportunity_id: str):
    return db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()

def update_opportunity(db: Session, opportunity, data):
    for key, value in data.dict().items():
        setattr(opportunity, key, value)

    db.commit()
    db.refresh(opportunity)
    return opportunity

def delete_opportunity(db: Session, opportunity):
    db.delete(opportunity)
    db.commit()