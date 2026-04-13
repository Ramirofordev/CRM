from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from app.enum.activity_enum import ActivityType, ActivityStatus

class ActivityCreate(BaseModel):
    title: str
    description: Optional[str] = None
    type: ActivityType | None = ActivityType.CALL
    due_date: Optional[datetime] = None

    customer_id: Optional[str] = None
    opportunity_id: Optional[str] = None

class ActivityResponse(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    type: ActivityType | None = ActivityType.CALL
    due_date: Optional[datetime] = None

    customer_id: Optional[str] = None
    opportunity_id: Optional[str] = None

    class Config:
        from_attributes = True