from pydantic import BaseModel
from app.enum.opportunities_status import OpportunityStatus

class OpportunityCreate(BaseModel):
    title: str
    value: float
    customer_id: str


class OpportunityResponse(BaseModel):
    id: str
    title: str
    status: OpportunityStatus
    value: float
    customer_id: str

    class Config:
        form_attributes: True

class OpportunityStatusUpdate(BaseModel):
    status: OpportunityStatus