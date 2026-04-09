from sqlalchemy.orm import Session
from app.models.customer_model import Customer

def create_customer(db: Session, customer_data):
    customer = Customer(**customer_data.dict())
    db.add(customer)
    db.commit()
    db.refresh(customer)
    return customer

def get_all_customers(db: Session):
    return db.query(Customer).all()

def get_by_id(db: Session, customer_id: str):
    return db.query(Customer).filter(Customer.id == customer_id).first()

def get_by_email(db: Session, customer_email: str):
    return db.query(Customer).filter(Customer.email == customer_email).first()

def update_customer(db: Session, customer, update_data):
    for key, value in update_data.dict().items():
        setattr(customer, key, value)

    db.commit()
    db.refresh(customer)

    return customer

def delete_customer(db: Session, customer):
    db.delete(customer)
    db.commit()