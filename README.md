# DoctorBondhu Backend

A **multi-tenant SaaS clinic management backend** built with **NestJS**, **Prisma**, and **PostgreSQL**.

The system is designed for **small clinics** to manage patients, appointments, prescriptions, and staff while maintaining strict **tenant isolation** and **role-based access control**.

This project follows **clean layered architecture** and **SOLID principles** to ensure scalability, maintainability, and testability.

---

# Project Goals

- Build a **production-grade SaaS backend**
- Enforce **multi-tenant architecture**
- Follow **SOLID principles strictly**
- Maintain **clear separation of concerns**
- Use **repository abstraction over ORM**
- Design a system that can scale to microservices later

---

# Tech Stack

### Backend

- NestJS
- TypeScript

### Database

- PostgreSQL
- Prisma ORM

### Authentication

- JWT Authentication
- Role-Based Access Control (RBAC)

### Architecture

- Modular Monolith
- Layered Architecture

---

# System Architecture

The application follows a **Layered Architecture** pattern.

```
Controller → Service → Repository Interface → Repository Implementation → Database
```

### Controller

Handles HTTP requests and responses.

### Service

Contains business logic and orchestrates application behavior.

### Repository Interface

Defines database access contracts.

### Repository Implementation

Implements database operations using Prisma.

### Database

PostgreSQL database accessed through Prisma.

---

# Multi-Tenant Strategy

The system supports **multiple clinics within a single database**.

Each business entity contains a `clinicId`.

Example:

```
Patient
Appointment
Prescription
```

All queries are scoped by:

```
clinicId
```

Tenant isolation is enforced through:

- **Tenant Guard**
- **Repository Query Filters**

Example query constraint:

```
WHERE clinicId = currentClinicId
```

This ensures that **data from one clinic is never accessible by another clinic**.

---

# Project Structure

```
src/
│
├── main.ts
├── app.module.ts
│
├── config/
│   └── configuration.ts
│
├── common/
│   ├── decorators/
│   ├── guards/
│   ├── interceptors/
│   ├── filters/
│   ├── constants/
│   └── interfaces/
│
├── infrastructure/
│   ├── prisma/
│   │    ├── prisma.module.ts
│   │    └── prisma.service.ts
│   │
│   └── repositories/
│
├── modules/
│   ├── auth/
│   ├── users/
│   ├── clinics/
│   ├── patients/
│   ├── appointments/
│   ├── prescriptions/
│   ├── billing/
│   └── audit/
│
└── database/
    └── prisma.schema
```

---

# Module Structure

Each module follows a **consistent internal structure**.

Example: `patients` module

```
patients/
│
├── controllers/
│   └── patients.controller.ts
│
├── services/
│   └── patients.service.ts
│
├── repositories/
│   ├── interfaces/
│   │   └── patient.repository.interface.ts
│   │
│   └── prisma-patient.repository.ts
│
├── dto/
│
└── patients.module.ts
```

---

# Code Flow Example

Example: **Create Patient**

```
HTTP Request
     │
     ▼
PatientsController
     │
     ▼
PatientsService
     │
     ▼
PatientRepository Interface
     │
     ▼
PrismaPatientRepository
     │
     ▼
PostgreSQL Database
```

Each layer has a **single responsibility**.

---

# SOLID Principles

The codebase strictly follows **SOLID design principles**.

### Single Responsibility Principle

Each class has one responsibility.

Example:

- Controller → request handling
- Service → business logic
- Repository → data access

### Open/Closed Principle

Modules can be extended without modifying existing code.

### Liskov Substitution Principle

Repository implementations can be replaced without breaking services.

### Interface Segregation Principle

Services depend only on required interfaces.

### Dependency Inversion Principle

Services depend on **repository interfaces**, not concrete implementations.

---

# Repository Pattern

Services **never access Prisma directly**.

Instead, they depend on repository interfaces.

Example:

```
PatientsService
     ↓
IPatientRepository
     ↓
PrismaPatientRepository
```

This improves:

- Testability
- Maintainability
- Flexibility

---

# Guards

The system uses multiple guards for request validation.

### JwtAuthGuard

Validates authentication.

### TenantGuard

Ensures requests belong to a specific clinic.

### RolesGuard

Validates role-based permissions.

---

# Database Schema

Prisma schema is located at:

```
database/prisma.schema
```

Core models include:

- User
- Clinic
- ClinicMember
- Patient
- Appointment
- Prescription
- Subscription
- AuditLog

All business entities include:

```
clinicId
```

for tenant isolation.

---

# Development Setup

### 1. Install dependencies

```
npm install
```

### 2. Configure environment variables

Create a `.env` file.

```
DATABASE_URL="postgresql://user:password@localhost:5432/clinicos"
JWT_SECRET="your_secret"
```

---

### 3. Run database migrations

```
npx prisma migrate dev
```

---

### 4. Generate Prisma client

```
npx prisma generate
```

---

### 5. Start development server

```
npm run start:dev
```

---

# Future Improvements

- Subscription billing integration
- Email notification service
- Audit logging system
- Background job queue
- API rate limiting
- Multi-branch clinics
- Microservice extraction

---

# Project Status

Active development.

This project is intended as a **production-quality SaaS backend architecture example** demonstrating scalable NestJS system design.

---

# License

MIT License
