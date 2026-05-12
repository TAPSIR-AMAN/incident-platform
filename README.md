# Multi-Tenant Incident Response Platform

## Overview
A full-stack multi-tenant SaaS incident management platform where organizations can manage incidents independently with strict tenant isolation.

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Context API

### Backend
- Node.js
- Express.js
- Prisma ORM
- JWT Authentication

### Database
- MySQL (Railway)

### Deployment
- Frontend: Render
- Backend: Render

---

# Features

## Authentication
- JWT Authentication
- Role-based access control
- Admin / Manager / User roles

## Incident Management
- Create incidents
- Fetch incidents
- Update status
- Comments system
- Tenant-specific isolation

## Multi-Tenant Isolation
All queries are tenant-scoped using tenantId from authenticated JWT payload.

Example:
- Users can only access incidents belonging to their organization.
- Cross-tenant access is prevented at query level.

---

# Folder Structure

/client
/server

---

# API Endpoints

## Auth
POST /api/auth/register
POST /api/auth/login

## Incidents
GET /api/incidents
POST /api/incidents
POST /api/incidents/:id/comments

---

# Setup Instructions

## Backend

cd server
npm install
npm run dev

## Frontend

cd client
npm install
npm run dev

---

# Environment Variables

## Backend (.env)

PORT=5000

DATABASE_URL=your_database_url

JWT_SECRET=your_secret

---

# Deployment Links

## Frontend
your_frontend_url

## Backend
your_backend_url

---

# Engineering Decisions

## Tenant Isolation
Tenant isolation is enforced using tenantId extracted from JWT middleware and applied in all database queries.

## Concurrent Updates
Incident model includes a version field for optimistic concurrency control preparation.

## Auditability
Incident comments and timestamps preserve activity history.

## Scalability
- Stateless JWT auth
- Tenant-scoped database queries
- Prisma ORM
- Ready for pagination and indexing improvements

---

# AI Usage Disclosure

AI tools used:
- ChatGPT

AI-assisted areas:
- Architecture guidance
- Debugging support
- Deployment guidance

Manually implemented:
- Backend APIs
- Frontend integration
- Database schema
- Authentication flow
- Tenant isolation logic

---

# Future Improvements
- Swagger/OpenAPI documentation
- Real-time websocket updates
- Pagination
- Notifications
- File attachments