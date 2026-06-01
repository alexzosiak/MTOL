# Military Tech London Event App

Fullstack event registration platform built with Next.js, PostgreSQL, Docker and TypeScript.

## Features

### Public Area

* Event landing page
* Multi-step registration form
* Visitor registration
* Validation

### Admin Panel

* Admin authentication
* Cookie-based session
* Role Based Access Control (RBAC)

Roles:

* SUPER_ADMIN
* ADMIN
* VIEWER

### Visitors Management

* Create visitor
* View visitors
* Search visitors
* Edit visitor
* Delete visitor

### Admin Users Management

* Create admin user
* View admin users
* Change role
* Delete admin user

### Statistics

* Total visitors
* Visitors registered in the last 24 hours
* Visitors by country
* World map visualization

---

# Tech Stack

* Next.js App Router
* TypeScript
* PostgreSQL
* Docker
* CSS Modules
* bcryptjs
* react-svg-worldmap

---

# Installation

## 1. Clone repository

```bash
git clone <repository-url>
cd <project-folder>
```

## 2. Install dependencies

```bash
npm install
```

## 3. Create environment file

Create `.env` file from `.env.example`

Example:

```env
DATABASE_URL=postgresql://postgres:admin@localhost:5436/military_tech
```

---

# Database Setup

## Start PostgreSQL

```bash
docker compose up -d
```

Verify container is running:

```bash
docker ps
```

---

## Run database migrations

```bash
docker exec -i military_tech_database psql -U postgres -d military_tech < database/migrations/001_init.sql
```

---

## Seed initial admin user

```bash
docker exec -i military_tech_database psql -U postgres -d military_tech < database/seeds/001_super_admin.sql
```

---

# Start Application

```bash
npm run dev
```

Application:

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
├── register/

components/

lib/

database/
├── migrations/
└── seeds/

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

# Notes

* Database schema is created through SQL migrations.
* Initial data is created through SQL seed files.
* Authentication is cookie-based.
* Authorization is implemented using role-based access control.
* Passwords are stored as bcrypt hashes.

---

# Development

Run development server:

```bash
npm run dev
```

Build project:

```bash
npm run build
```

Run production build:

```bash
npm start
```

