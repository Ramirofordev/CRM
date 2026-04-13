from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.sqlite import BLOB
import uuid

from app.db.base import Base

class Customer(Base):
    __tablename__ = "customers"

    id = Column(String, primary_key = True, default = lambda: str(uuid.uuid4()))
    name = Column(String, nullable = False)
    email = Column(String, nullable = False)
    phone = Column(String, nullable = True)
    address = Column(String, nullable = True) 

    owner_id = Column(String, ForeignKey("users.id"))