from sqlalchemy import Column, String, DateTime, ForeignKey, Enum
import uuid
from datetime import datetime

from app.db.base import Base
from app.enum.activity_enum import ActivityStatus, ActivityType

class Activity(Base):
    __tablename__ = "activities"

    id = Column(String, primary_key = True, default = lambda: str(uuid.uuid4()))
    title = Column(String, nullable = False)
    description = Column(String, nullable = True)

    type = Column(Enum(ActivityType), nullable = False)
    status = Column(Enum(ActivityStatus), default = ActivityStatus.PENDING)

    due_date = Column(DateTime, nullable = True)

    customer_id = Column(String, ForeignKey("customers.id"), nullable = True)
    opportunity_id = Column(String, ForeignKey("opportunities.id"), nullable = True)

    created_at = Column(DateTime, default = datetime.utcnow())