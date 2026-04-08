from sqlalchemy.orm import Session
from app.repositories import customer_repository

def create_customer(db: Session, customer_data):

    if not customer_data.email:
        raise ValueError("Email is required")
    
    return customer_repository.create_customer(db, customer_data)


def get_customers(db: Session):
    return customer_repository.get_all_customers(db)

def get_customer(db: Session, customer_id: str):
    customer = customer_repository.get_by_id(db, customer_id)

    if not customer:
        raise ValueError("Customer not found")
    
    return customer

def update_customer(db: Session, customer_id: str, update_data):
    customer = customer_repository.get_by_id(db, customer_id)

    if not customer:
        raise ValueError("Customer not found")
    
    return customer_repository.update_customer(db, customer, update_data)

def delete_customer(db: Session, customer_id: str):
    customer = customer_repository.get_by_id(db, customer_id)

    if not customer:
        raise ValueError("Customer not found")
    
    customer_repository.delete_customer(db, customer)
