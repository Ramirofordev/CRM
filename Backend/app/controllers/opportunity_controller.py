from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.opportunity_schema import OpportunityCreate, OpportunityResponse, OpportunityStatusUpdate
from app.services import opportunity_services
from app.core.deps import get_current_user
from app.db.deps import get_db

router = APIRouter(prefix = "/opportunities", tags = ["Opportunities"], dependencies = [Depends(get_current_user)])

@router.post("/", response_model = OpportunityResponse, status_code = 201)
def create_opportunity(data: OpportunityCreate, db: Session = Depends(get_db)):
    return opportunity_services.create_opportunity(db, data)

@router.get("/", response_model = list[OpportunityResponse])
def get_opportunities(db: Session = Depends(get_db)):
    return opportunity_services.get_opportunities(db)

@router.get("/{opportunity_id}", response_model = OpportunityResponse)
def get_opportunity(opportunity_id: str, db: Session = Depends(get_db)):
    return opportunity_services.get_opportunity(db, opportunity_id)

@router.put("/{opportunity_id}", response_model = OpportunityResponse)
def update_opportunity(opportunity_id: str, data: OpportunityCreate, db: Session = Depends(get_db)):
    return opportunity_services.update_opportunity(db, opportunity_id, data)

@router.patch("/{opportunity_id}/status", response_model = OpportunityResponse)
def change_status(opportunity_id: str, data: OpportunityStatusUpdate, db: Session = Depends(get_db)):
    return opportunity_services.update_status(db, opportunity_id, data.status)

@router.delete("/{opportunity_id}")
def delete_opportunity(opportunity_id: str, db: Session = Depends(get_db)):
    opportunity_services.delete_opportunity(db, opportunity_id)
    return {"message": "Opportunity deleted"}