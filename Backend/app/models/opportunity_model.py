from sqlalchemy import Column, String, Float, ForeignKey, Enum
import uuid

from app.db.base import Base
from app.enum.opportunities_status import OpportunityStatus

class Opportunity(Base):
    __tablename__ = "opportunities"

    id = Column(String, primary_key = True, default = lambda: str(uuid.uuid4()))
    title = Column(String, nullable = False)
    status = Column(Enum(OpportunityStatus), default = OpportunityStatus.LEAD)
    value = Column(Float, nullable = False)

    customer_id = Column(String, ForeignKey("customers.id"), nullable = False)