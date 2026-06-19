# Military Tech London Event App

A full-stack event registration and visitor management platform built with Next.js, TypeScript, PostgreSQL, and Docker.

---

# Features

## Public Area

* Event landing page
* Multi-step registration form
* Visitor registration
* Country autocomplete selection
* Email validation
* Duplicate email protection
* Server-side validation

## Admin Panel

* Secure admin authentication
* Cookie-based session management
* Role Based Access Control (RBAC)

### Roles

* SUPER_ADMIN
* ADMIN
* VIEWER

---

## Visitors Management

* Create visitor registrations
* View visitors
* Search visitors
* Country information
* Visitor email management

---

## Admin Users Management

* Create admin users
* View admin users
* Change user roles
* Delete admin users
* Duplicate email protection

---

## Statistics Dashboard

* Total visitors
* Visitors registered in the last 24 hours
* Visitors grouped by country
* World map visualization
* Registration analytics

---

# Architecture

The project follows a layered architecture:

Route Handlers → Services → Repositories → PostgreSQL

### Responsibilities

#### Route Handlers

Responsible for:

* HTTP requests and responses
* Status codes
* Error handling

#### Services

Responsible for:

* Business logic
* Validation
* Authorization rules

#### Repositories

Responsible for:

* Database access
* SQL queries
* Data persistence

---

# Tech Stack

* Next.js App Router
* TypeScript
* PostgreSQL
* Docker
* bcryptjs
* react-svg-worldmap
* world-countries

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
cd <project-folder>
```

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file based on `.env.example`.

Example:

```env
DATABASE_URL=postgresql://postgres:admin@localhost:5436/military_tech

DEFAULT_ADMIN_EMAIL=admin@example.com
DEFAULT_ADMIN_PASSWORD=admin123
```

---

# Database Setup

## Start PostgreSQL

```bash
docker compose up -d
```

Verify container status:

```bash
docker ps
```

---

## Run Migrations and Seed

```bash
npm run db:setup
```

This command executes:

```bash
npm run db:migrate
npm run db:seed
```

The seed script creates the initial SUPER_ADMIN account using the environment variables.

Passwords are hashed using bcrypt before being stored in the database.

---

# Run Application

Development mode:

```bash
npm run dev
```

Application URL:

```txt
http://localhost:3000
```

Admin Login:

```txt
http://localhost:3000/login
```

---

# Default Super Admin

Email:

```txt
admin@example.com
```

Password:

```txt
admin123
```

---

# Project Structure

```txt
app/
├── admin/
├── api/
├── login/

components/

repositories/
├── admin.repository.ts
├── visitor.repository.ts

services/
├── admin.service.ts
├── visitor.service.ts

lib/

data/
├── countries.ts

database/
├── migrations/
└── scripts/

docker-compose.yml
```

---

# Roles

## SUPER_ADMIN

Can:

* Manage admin users
* Manage visitors
* View statistics

## ADMIN

Can:

* Manage visitors
* View statistics

## VIEWER

Can:

* View visitors
* View statistics

---

# Security

* Password hashing with bcrypt
* Cookie-based authentication
* Role-based authorization
* Email uniqueness validation
* Server-side input validation
* Protection against duplicate registrations

---

# Development

Run development server:

```bash
npm run dev
```

Build application:

```bash
npm run build
```

Run production build:

```bash
npm start
```
