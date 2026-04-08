# Sprint Planning - Sprint 1

## Sprint Goal

Establish the backend foundation and deliver a fully functinal **Customer CRUD API**.

---

## Sprint Scope

Focus on:
- Project setup
- Database configuration
- Customer module (end-to-end)

---

## Selected User Stories
- Initialize backend project
- Configure database connection
- Create and manage customers

---

## Task Breakdown (ordered)

#### 1. Project Setup
- Initialize FastAPI project
- Create folder structure (controller, services, repositories, etc.)
- Install dependencies
- Configure environment variables

#### 2. Database Setup
- Configure PostgreSQL connection
- Set up SQLAlchemy base and session
- Configure Alembic
- Run initial migration

#### 3. Customer Module

##### Model
- Define Customer model (fields, types)

##### Schema
- Create CustomerCreate
- Create CustomerResponse

##### Respository
- Implement:
  - create_customer
  - get_all_customers
  - get_customer_by_id
  - update_customer
  - delete_customer

##### Service
- Add business logic
  - validate data
  - handle not found errors

##### Controller
- Implement endpoints:
  - POST /customers
  - GET /customers
  - GET /customers/{id}
  - PUT /customers/{id}
  - DELETE /customers/{id}

---

## Estimated Effort

| Task Area       | Estimated Time  |
| --------------- | --------------- |
| Setup           | 2 - 3 hours     |
| Database        | 2 - 3 hours     |
| Customer Module | 5 - 7 hours     |
| **Total**       | 10 - 13 hours   |

---

## Definition of Done
- Code follows defines architecure
- Endpoints work correctly
- Data is persisted in database
- Basic validaton implemented
- No runtime errors
- Tested manually via API docs
