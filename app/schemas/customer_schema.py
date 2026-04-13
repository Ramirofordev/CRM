from pydantic import BaseModel
from typing import Optional

class CustomerCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    address: Optional[str] = None

class CustomerResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str] 
    address: Optional[str]

class Config:
    form_attributes = True