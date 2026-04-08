# Technical Architecture

## Overview 

The system follows a **layered architecture** with clear separation of concerns.

---

## Architecture Pattern

> Controller -> Service -> Repository -> Database

---

## Layered Description

#### Controllers
- Handle HTTP requests and responses
- Call service layer
- No business logic

#### Services
- Contain business logic
- Validate rules and workflows
- Coordinate repositories

#### Repositories
- Handle database operations (CRUD)
- Isolate persistance logic

#### Models
- ORM entities (SQLAlchemy)
- Represent database tables

#### Schemas (DTOs)
- Input validation
- Response serialization

---

## Project Structure

app/
├── controllers/
├── services/
├── repositories/
├── models/
├── schemas/
├── enums/
├── core/
└── db/

---

## Key Design Decisions

#### 1. Separation of Concerns

Each layer has a single responsibility.

#### 2. Dependecy Flow
- Controllers depend on services
- Services depend on repositories
- Repositories depend on database

#### 3. Validation Strategy
- Use schemas (Pydantic) for input validation
- Business validation handled in services

#### 4. Database Strategy
- PostgreSQL as primary database
- SQLAlchemy as ORM
- Alembic for migrations

#### 5. API Design
- RESTful endpoints
- JSON-based communication