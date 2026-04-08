# Data Model

## Overview

The system is based on four core entities:
- User
- Costumer
- Opportunity
- Activity

---

## Entity Definitions

#### User

Fields:
- id (UUID, PK)
- name (string)
- email (string, unique)
- password (string, hashed)
- phone (string)
- role (string)
- profile_image (string, optional)
- created_at (datetime)

#### Customer

Fields:
- id (UUID, PK)
- name (string)
- email (string)
- phone (string)
- address (string)
- company (string, optional)
- created_at (datetime)

#### Opportunity

Fields:
- id (UUID, PK)
- title (string)
- status (enum)
- value (decimal)
- customer_id (FK -> Customer)
- assigned_user_id (FK -> User)
- created_at (datetime)

#### Opportunity Status (Enum)
- LEAD
- CONTACTED
- PROPOSAL
- WON
- LOST

#### Activity 

Fields:
- id (UUID, PK)
- title (string)
- description (text)
- type (enum)
- status (enum)
- due_date (datetime)
- customer_id (FK, nullable)
- opportunity_id (FK, nullable)
- assigned_user_id (FK -> User)
- created_at (datetime)

#### ActivityType (Enum)
- CALL
- MEETING
- TASK
- EMAIL

#### ActivityStatus (Enum)
- PENDING
- DONE

---

## Relationships
- One User -> Many Opportunities
- One User -> Many Activities
- One Customer -> Many Opportunities
- One Customer -> Many Activities
- One Opportunity -> Many Activities

---

## Relationship Summary

User
 ├── Opportunities
 └── Activities

Customer
 ├── Opportunities
 └── Activities

Opportunity
 └── Activities

 --- 

 ## Design Considerations
- UUIDs for scalability and security
- Nullable relationships in Activity for flexibility
- Enums to enforce consistency
- Clear separation between entities

--- 

## Conclusion

The three documents provide:
- Clear execution plan (Sprint Planning)
- Solid technical foundation (Architecture)
- Well-defined data structured (Data Model)