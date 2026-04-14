from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.customer_schema import CustomerCreate, CustomerResponse
from app.services import customer_services
from app.core.deps import get_current_user
from app.db.deps import get_db

router = APIRouter(prefix = "/customers", tags = ["Customers"])

@router.post("/", response_model = CustomerResponse, status_code = 201)
def create_customer(customer: CustomerCreate, db: Session = Depends(get_db), user = Depends(get_current_user)):
    return customer_services.create_customer(db, customer, user)

@router.get("/", response_model = list[CustomerResponse])
def get_customers(db: Session = Depends(get_db), user = Depends(get_current_user)):
    return customer_services.get_customers(db, user)

@router.get("/{customer_id}", response_model = CustomerResponse)
def get_customer(customer_id: str, db: Session = Depends(get_db), user = Depends(get_current_user)):
    return customer_services.get_customer(db, customer_id, user)

@router.put("/{customer_id}", response_model = CustomerResponse)
def update_customer(customer_id: str, customer: CustomerCreate, db: Session = Depends(get_db), user = Depends(get_current_user)):
    return customer_services.update_customer(db, customer_id, customer, user)

@router.delete("/{customer_id}")
def delete_customer(customer_id: str, db: Session = Depends(get_db), user = Depends(get_current_user)):
    customer_services.delete_customer(db, customer_id, user)
    return {"message": "Customer deleted successfully"}