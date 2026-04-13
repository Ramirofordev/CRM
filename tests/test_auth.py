from fastapi.testclient import TestClient
from app.main import app
import uuid

def get_email():
    return f"{uuid.uuid4()}@test.com"

client = TestClient(app)

def create_user(email, password):
    return client.post("/auth/register", json = {
        "email": email,
        "password": password
    })

def login_user(email, password):
    res = client.post("/auth/login", json = {
        "email": email,
        "password": password
    })
    return res.json()["access_token"]

def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}