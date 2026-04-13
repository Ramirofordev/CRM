from sqlalchemy.orm import Session
from app.repositories import customer_repository
from fastapi import HTTPException

from app.services.auth_services import check_ownership

def create_customer(db: Session, customer_data, user):
    existing = customer_repository.get_by_email(db, customer_data.email)

    if existing:
        raise HTTPException(status_code = 400, detail = "Email already exists")
    
    data_dict = customer_data.model_dump()
    data_dict["owner_id"] = user.id
    
    return customer_repository.create_customer(db, data_dict)

def get_customers(db: Session, user):
    if user.role == "admin":
        return customer_repository.get_all_customers(db)

    return customer_repository.get_by_owner(db, user.id)    

def get_customer(db: Session, customer_id: str, user):
    customer = customer_repository.get_by_id(db, customer_id)

    if not customer:
        raise HTTPException(status_code = 404, detail = "Customer not found")
    
    check_ownership(customer, user)
    
    return customer

def update_customer(db: Session, customer_id: str, update_data, user):
    customer = customer_repository.get_by_id(db, customer_id)

    if not customer:
        raise HTTPException(status_code = 404, detail = "Customer not found")
    
    check_ownership(customer, user)
    
    return customer_repository.update_customer(db, customer, update_data)

def delete_customer(db: Session, customer_id: str, user):
    customer = customer_repository.get_by_id(db, customer_id)

    if not customer:
        raise HTTPException(status_code = 404, detail = "Customer not found")
    
    check_ownership(customer, user)
    
    customer_repository.delete_customer(db, customer)
