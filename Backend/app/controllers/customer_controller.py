from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.customer_schema import CustomerCreate, CustomerResponse
from app.services import customer_services
from app.db.deps import get_db

router = APIRouter(prefix = "/customers", tags = ["Customers"])

@router.post("/", response_model = CustomerResponse)
def create_customer(customer: CustomerCreate, db: Session = Depends(get_db)):
    return customer_services.create_customer(db, customer)

@router.get("/", response_model = list[CustomerResponse])
def get_customers(db: Session = Depends(get_db)):
    return customer_services.get_customers(db)

@router.get("/{customer.id}", response_model = CustomerResponse)
def get_customer(customer_id: str, db: Session = Depends(get_db)):
    return customer_services.get_customer(db, customer_id)

@router.put("/{customer.id}", response_model = CustomerResponse)
def update_customer(customer_id: str, customer: CustomerCreate, db: Session = Depends(get_db)):
    return customer_services.update_customer(db, customer_id, customer)

@router.delete("/{customer.id}")
def delete_customer(customer_id: str, db: Session = Depends(get_db)):
    customer_services.delete_customer(db, customer_id)
    return {"message": "Customer delete successfully"}