# CRM Public MVP - Product Backlog

---

## 1. Backlog Structure 

The backlog is organized into:
- **Epics** (high-level features)
- **User Stories** (functional requirements)
- **Tasks** (technical implementation)

All items are prioritized based on business value and development dependencies.

---

## EPIC 1 - Project Foundation

#### Objective

Establish a robust backend architecture and development environment.

#### User Stories
- As a developer, I want to initialize the backend project so that development can begin.
- As a system, I want to connect to a database to persist data reliably.

#### Tasks
- Initialize FastAPI project
- Define project structure (controllers, services, repositories, etc.)
- Set up virtual environment and dependencies
- Configure PostgreSQL database
- Configure SQLAlchemy ORM
- Set up environment variables (.env)
- Configure Alembic for database migrations
- Implement database connection and session management
- Run and validate initial server setup

---

## EPIC 2 - User Management

#### Objective 

Enable user registration and secure authentication.

#### User Stories
- As a user, I want to register an account so that I can access the system.
- As a user, I want to log in securely.
- As a system, I want to protect private endpoints from unauthorized accesss.

#### Tasks
- Create User model
- Implement password hashing (bcrypt)
- Implement user repository layer
- Implement user service layer
- Implement user controller
- Create register endpoint
- Create login endpoint (JWT-based authentication)
- Implement authentication middleware
- Protect private routes

---

## EPIC 3 - Customer Management

#### Objective

Allow users to manage customer data efficiently.

#### User Stories
- As a user, I want to create a customer.
- As a user, I want to view all customers.
- As a user, I want to update customer information.
- As a user, I want to delete a customer.

#### Tasks
- Create Customer model
- Define Customer schema (DTO)
- Implement repository layer
- Implement service layer
- Implement controller endpoints:
  - POST /customers
  - GET /customers
  - GET /customers/{id}
  - PUT /customers/{id}
  - DELETE /customers/{id}
- Add input validation
- Implement basic error handling

---

## EPIC 4 - Opportunity Management

#### Objective

Manage sales opportunities and track pipeline stages.

#### User Stories
- As a user, I want to create an opportunity linked to a costumer.
- As a user, I want to update the status of an opportunity.
- As a user, I want to view all opportunities.

#### Tasks
- Create Opportunity model
- Define OpportunityStatus enum
- Define schema (DTO)
- Implement repository layer
- Implement service layer
- Implement controller endpoints:
  - POST /opportunities
  - GET /opportunities
  - PUT /opportunities/{id}
  - DELETE /opportunities/{id}
- Implement relationship with Costumer
- Validate costumer existence before creation

---

## EPIC 5 - Activity Management

#### Objective

Track and manage interactions with customers and opportunities.

#### User Stories
- As a user, I want to create an activity.
- As a user, I want to associate activities with customers or opportunities.
- As a user, I want to track activity status.

#### Tasks
- Create Activity model
- Define ActivityType enum
- Define ActivityStatus enum
- Define schema (DTO)
- Implement repository layer
- Implement service layer
- Implement controller endpoints:
  - POST /activities
  - GET /activities
  - PUT /activities/{id}
  - DELETE /activities/{id}
- Implement relationships (Customer / Opportunity)
- Validate references

---

## EPIC 6 - Frontend (React)

#### Objective

Provice a basic user interface to interact with the API.

#### User Stories
- As a user, I want to view customers in the UI.
- As a user, I want to create customers through a form.
- As a user, I want to view opportunities.

#### Tasks 
- Initialize React project
- Define frontend structure
- Create API service layer
- Implement customer list view
- Implement customer form (create/edit)
- Implement opportunity list view
- Connect frontend to backend API

---

## EPIC 7 - Quality & Improvements

#### Objective

Ensure code quality, consistency, and maintainability.

#### User Stories
- As a developer, I want reliable and maintainable code.
- As a system, I want consistent and predictable behavior.

#### Tasks
- Implement basic unit tests (pytest)
- Add global error handling
- Standardize API responses
- Implement logging
- Refactor code when necessary

---

## Priority Summary

| Priority | Epic                   |
| -------- | ---------------------- |
| High     | Project Foundation     |
| High     | Customer Management    |
| High     | Opportunity Management | 
| Medium   | Activity Management    |
| Medium   | User Management        |
| Low      | Frontend               |
| Low      | Quality & Improvements |

---

## Recommended Sprint Breakdown

#### Sprint 1 
- Project setup
- Database configuration
- Customer model and CRUD

#### Sprint 2
- Opportunity model

#### Sprint 3
- Activity model

#### Sprint 4
- User authentication

#### Sprint 5 
- Frontend integration

---

## Conclusion

This product backlog provides a structured and prioritized roadmap for building the CRM MVP,
ensuring incremental delivery, maintainable architecture, and alignment with Agile development practices.