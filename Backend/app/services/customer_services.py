from sqlalchemy.orm import Session
from app.repositories import customer_repository
from fastapi import HTTPException

def create_customer(db: Session, customer_data):
    existing = customer_repository.get_by_email(db, customer_data.email)

    if existing:
        raise HTTPException(status_code = 400, detail = "Email already exists")
    
    return customer_repository.create_customer(db, customer_data)


def get_customers(db: Session):
    return customer_repository.get_all_customers(db)

def get_customer(db: Session, customer_id: str):
    customer = customer_repository.get_by_id(db, customer_id)

    if not customer:
        raise HTTPException(status_code = 404, detail = "Customer not found")
    
    return customer

def update_customer(db: Session, customer_id: str, update_data):
    customer = customer_repository.get_by_id(db, customer_id)

    if not customer:
        raise HTTPException(status_code = 404, detail = "Customer not found")
    
    return customer_repository.update_customer(db, customer, update_data)

def delete_customer(db: Session, customer_id: str):
    customer = customer_repository.get_by_id(db, customer_id)

    if not customer:
        raise HTTPException(status_code = 404, detail = "Customer not found")
    
    customer_repository.delete_customer(db, customer)
