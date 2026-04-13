from pydantic import BaseModel, ConfigDict
from app.enum.opportunities_status import OpportunityStatus

class OpportunityCreate(BaseModel):
    title: str
    value: float | None = 0
    customer_id: str


class OpportunityResponse(BaseModel):
    id: str
    title: str
    status: OpportunityStatus
    value: float | None = 0
    customer_id: str
    owner_id: str

    model_config = ConfigDict(from_attributes = True)

class OpportunityStatusUpdate(BaseModel):
    status: OpportunityStatus