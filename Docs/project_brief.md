# CRM Public MVP - Project Objetives Document

---

## 1. Executive Summary

This project aims to develop a **Public CRM (Customer Relationship Management) MVP** designed to
manage customer relationships, sales opportunities, and commercial activities through a scalable backend API
and a functional frontend interface.

The system will follow **Agile (Scrum) methodology**, applying **SOLID principles** and clean architecture
to ensure maintainability, scalability, and profressional-grade code quality.

---

## 2. General Objective

To design and implement a **minimum viable CRM system** that supports the core sales workflow:
 - Customer acquisition → Opportunity management → Activity tracking → Deal closure

---

## 3. Specific Objectives

- Develop a RESTful API using a modern, scalable backend framework
- Implement clean architecture with clear separation of concerns
- Enable management of customers, opportunities, and activities
- Provide a basic but functional user interface
- Ensure the system is extensible for future features and integrations
- Apply Agile practices, including sprint planning and iterative delivery

---

## 4. Target Users

- Small and medium-sized business (SMBs)
- Freelancers and independent professionals
- Small sales teams requiring a lightweight CRM solution

---

## 5. Problem Statement

Many small organizations lack structured tools to manage customer relationship and
sales processes. This leads to:
- Disorganized customer data
- Inefficient sales tracking
- Missed follow-ups and lost opportunities

This CRM aims to centralize and streamline these processes.

---

## 6. MVP Scope

#### Included Features
- Customer management (CRUD operations)
- Opportunity management with pipeline stages
- Activity tracking linked to customers or opportunities
- Basic user management (authentication optional in early stage)
- Relational data structure between entities

#### Excluded Features (Future Iterations)
- Workflow automation
- Third-party integrations (email, marketing tools, etc.)
- Advanced reporting and analytics
- Role-based access control (advanced permissions)
- Notificiations and alerts

---

## 7. Functional Overview

The system will support the following workflow:
1. Create and manage customers
2. Create opportunities associated with customers
3. Track opportunity progress through defined stages
4. Register activities (calls, meetings, tasks)
5. Maintain traceability of interactions

---

## 8. Success Metrics

The MVP will be considered succesfull if:
- Customers can be created, updated, retrieved, and deleted without errors
- Opportunities can be created and moved across pipeline stages
- Activities can be registered and linked correctly
- The full workflow (customer -> opportunity -> activity) is functional
- The API is stable and properly structured

---

## 9. Technical Approach

#### Backend
- Language: Python
- Framework: FastAPI
- ORM: SQLAlchemy
- Database: PostgreSQL

#### Frontend
- Library: React

#### Architecture
- Layered architecture (Controller -> Service -> Repository)
- Separation of concerns
- Use of DTOs and validation schemas

---

## 10. Development Methodology

The project will follow **Scrum methodology**, including:
- Sprint planning
- Incremental delivery
- Iterative development
- Continuous improvement

Pair programming will be used during development, with a focus on:
- Code quality
- Design decisions
- Best practices

---

## 11. Roadmap (High-Level)

#### Phase 1 - Backend Foundation
- Project setup
- Database configuration
- Core architecture implementation

#### Phase 2 - Core Features
- Customer module
- Opportunity module
- Activity module

#### Phase 3 - Frontend Integration
- Basic UI implementation
- API consumption

#### Phase 4 - Enhancements
- Authentication
- UI improvements
- Initial testing

---

## 12. Conclusion

This MVP is designed to deliver a **lean but functional CRM system** that demonstrates:
- Strong backend architecture
- Practical application of software enginnering principles
- Readiness for real-world extension and scaling

It serves both as a usable product and a professional-level portfolio project.