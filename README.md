# FinTrack

FinTrack is a full-stack personal finance management application built with **Spring Boot**, **React/Vite**, **PostgreSQL**, and **JWT authentication**.

The application allows users to manage their income, expenses, categories, budgets, and profile information. Administrators can manage users, view platform statistics, receive customer contact messages, and update their administrator profile and password.

---

## 🚀 Features

### User Features

* User registration
* User login
* JWT-based authentication
* User profile management
* Change password
* Dashboard
* Income management
* Expense management
* Category management
* Budget management
* Financial analysis
* Contact Us form
* Customer messages stored in the backend

### Admin Features

* Separate administrator login
* JWT-based admin authentication
* Admin dashboard
* Platform statistics
* Total users
* Active users
* Inactive users
* Income record count
* Expense record count
* User management
* Activate users
* Deactivate users
* Delete users
* View customer contact messages
* Mark contact messages as read
* Delete contact messages
* Update administrator profile
* Change administrator password

---

# 🏗️ Project Architecture

The project contains two main applications:

```text
FinTrack
│
├── fintrack-backend
│   └── Spring Boot REST API
│
└── fintrack-frontend
    └── React + Vite application
```

---

# 🔧 Backend

## Technologies

* Java
* Spring Boot
* Spring Web
* Spring Data JPA
* Spring Security
* JWT
* BCrypt Password Encoding
* PostgreSQL
* Maven
* Swagger / OpenAPI

---

## Backend Package Structure

The backend uses a simple Spring Boot layered structure.

```text
src/main/java/com/fintrack
│
├── FintrackBackendApplication.java
│
├── config
│   ├── CorsConfig.java
│   └── DataInitializer.java
│
├── controller
│   ├── AdminController.java
│   ├── AdminProfileController.java
│   ├── AdminUserController.java
│   ├── AnalysisController.java
│   ├── AuthController.java
│   ├── BudgetController.java
│   ├── CategoryController.java
│   ├── ContactMessageController.java
│   ├── DashboardController.java
│   ├── ExpenseController.java
│   ├── ExportController.java
│   ├── IncomeController.java
│   └── UserController.java
│
├── dto
│   ├── AdminCreateRequest.java
│   ├── AdminDashboardResponse.java
│   ├── AdminProfileRequest.java
│   ├── AnalysisResponse.java
│   ├── AuthResponse.java
│   ├── BudgetRequest.java
│   ├── BudgetResponse.java
│   ├── CategoryRequest.java
│   ├── CategoryResponse.java
│   ├── UserResponse.java
│   └── UserUpdateRequest.java
│
├── entity
│   ├── User.java
│   ├── Income.java
│   ├── Expense.java
│   ├── Category.java
│   ├── Budget.java
│   └── ContactMessage.java
│
├── repository
│   ├── UserRepository.java
│   ├── IncomeRepository.java
│   ├── ExpenseRepository.java
│   ├── CategoryRepository.java
│   ├── BudgetRepository.java
│   └── ContactMessageRepository.java
│
├── service
│   ├── UserService.java
│   ├── IncomeService.java
│   ├── ExpenseService.java
│   ├── CategoryService.java
│   ├── BudgetService.java
│   ├── DashboardService.java
│   └── ContactMessageService.java
│
└── security
    ├── SecurityConfig.java
    ├── JwtAuthenticationFilter.java
    ├── JwtService.java
    └── CustomUserDetailsService.java
```

---

# 🔐 Security

FinTrack uses JWT authentication.

The authentication flow is:

```text
Login
  ↓
Backend validates credentials
  ↓
JWT token generated
  ↓
Frontend stores token
  ↓
Frontend sends:
Authorization: Bearer <token>
  ↓
JwtAuthenticationFilter
  ↓
JWT validation
  ↓
Spring Security
  ↓
Controller
```

Passwords are stored using BCrypt hashing.

---

# 🔑 Public API Endpoints

The following endpoints are publicly accessible:

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/admin/login
POST /api/admin/create

POST /api/contact
```

Swagger/OpenAPI:

```text
/swagger-ui/**
/v3/api-docs/**
```

---

# 👑 Admin Security

Admin endpoints require the `ADMIN` role.

```text
/api/admin/**
```

Example:

```text
Authorization: Bearer <ADMIN_JWT_TOKEN>
```

Spring Security checks:

```java
.hasRole("ADMIN")
```

Regular authenticated users cannot access admin endpoints.

---

# 👤 User Security

The following areas require authentication:

```text
/api/incomes/**
/api/expenses/**
/api/categories/**
/api/budgets/**
/api/users/**
/api/dashboard
```

---

# 📩 Contact Messages

Users can submit messages from the Contact Us page.

```text
POST /api/contact
```

Administrators can view the messages from:

```text
Admin Dashboard
    ↓
Contact Messages
```

Admin functionality includes:

```text
View messages
Mark as Read
Delete message
```

The dashboard also displays:

```text
Total Messages
New Messages
```

---

# 👨‍💼 Admin Profile

Administrators can update their profile from:

```text
Admin Dashboard
    ↓
Update Profile
```

The profile page supports:

### Update Profile

```text
Full Name
Email
```

### Change Password

```text
Current Password
New Password
Confirm New Password
```

Password requirements:

```text
Minimum 6 characters
New password must be different
Current password must be correct
```

The password is encoded using BCrypt before being stored.

---

# 🗄️ Database

FinTrack uses PostgreSQL.

Main database entities:

```text
users
income
expenses
categories
budgets
contact_messages
```

The `users` table contains:

```text
id
full_name
email
password
role
active
created_at
```

Example roles:

```text
USER
ADMIN
```

---

# ⚙️ Backend Configuration

Configure PostgreSQL in:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/fintrack
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080
```

Do not commit real database passwords or JWT secrets to a public repository.

---

# ▶️ Run Backend

Open the backend project in Spring Tool Suite / Eclipse or IntelliJ.

Run:

```text
FintrackBackendApplication.java
```

The backend runs on:

```text
http://localhost:8080
```

---

# 💻 Frontend

## Technologies

* React
* Vite
* JavaScript
* React Router
* CSS
* Fetch API

---

# 📁 Frontend Structure

```text
fintrack-frontend
│
├── src
│   │
│   ├── components
│   │
│   ├── pages
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Income.jsx
│   │   ├── Expense.jsx
│   │   ├── Categories.jsx
│   │   ├── Budgets.jsx
│   │   ├── Contact.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── AdminProfile.jsx
│   │
│   ├── services
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public
├── package.json
└── vite.config.js
```

---

# ▶️ Run Frontend

Open the frontend project.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend normally runs at:

```text
http://localhost:5173
```

---

# 🔗 Frontend + Backend

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:8080
```

API base URL:

```text
http://localhost:8080/api
```

---

# 🧭 Important Routes

## User Routes

```text
/
 /login
 /register
 /dashboard
 /income
 /expenses
 /categories
 /budgets
 /contact
 /profile
```

## Admin Routes

```text
/admin/login
/admin/dashboard
/admin/users
/admin/profile
```

The Admin Dashboard contains:

```text
Platform Statistics
User Management
Contact Messages
Update Profile
```

The Admin Dashboard does not contain separate Category Management or Budget Management navigation buttons.

---

# 📊 Admin Dashboard

The administrator dashboard displays:

```text
Total Users
Active Users
Inactive Users
Income Records
Expense Records
```

Management options:

```text
User Management
Contact Messages
Update Profile
```

---

# 🔄 Admin Contact Message Flow

```text
User
 │
 │ submits Contact Us form
 ▼
POST /api/contact
 │
 ▼
ContactMessage
 │
 ▼
PostgreSQL
 │
 ▼
Admin Dashboard
 │
 ├── View message
 ├── Mark as Read
 └── Delete
```

---

# 🔄 Admin Profile Flow

```text
Admin Login
     ↓
JWT Token
     ↓
Admin Dashboard
     ↓
Update Profile
     ↓
/admin/profile
     ↓
GET profile
     ↓
Update name/email
     ↓
Change password if required
```

Password change:

```text
Current Password
       ↓
BCrypt verification
       ↓
New Password
       ↓
BCrypt encoding
       ↓
Database
```

---

# 🧪 Testing

Before testing, make sure:

```text
PostgreSQL is running
Backend is running on port 8080
Frontend is running on port 5173
```

Test user flow:

```text
Register
   ↓
Login
   ↓
Dashboard
   ↓
Income / Expense / Budget
   ↓
Profile
```

Test admin flow:

```text
Admin Login
   ↓
Admin Dashboard
   ↓
User Management
   ↓
Contact Messages
   ↓
Update Profile
   ↓
Change Password
```

---

# 🐛 Troubleshooting

## 403 Forbidden

Check:

```text
Authorization header
JWT token
User role
Spring Security configuration
```

For admin requests, the JWT must contain the admin role.

Expected authority:

```text
ROLE_ADMIN
```

Spring Security configuration:

```java
.requestMatchers("/api/admin/**")
.hasRole("ADMIN")
```

---

## Contact Message 403

Make sure:

```text
POST /api/contact
```

is included in the public endpoints:

```java
.requestMatchers(
    "/api/contact"
).permitAll()
```

If the endpoint is public, a user does not need to be logged in to submit the Contact Us form.

---

## CORS Error

Verify the backend CORS configuration allows:

```text
http://localhost:5173
```

The frontend and backend are running on different ports, so CORS must be configured correctly.

---

## JWT Not Working

Open browser Developer Tools:

```text
F12
→ Network
→ Select API request
→ Headers
```

Check:

```text
Authorization: Bearer <token>
```

Also check the backend console for JWT authentication messages.

---

# 🔒 Security Notes

Never commit:

```text
Database passwords
JWT secrets
Production credentials
API keys
```

For production, use environment variables or a secure secrets-management solution.

---

# 📦 Build

## Backend

Using Maven:

```bash
mvn clean package
```

Run the generated application:

```bash
java -jar target/fintrack-backend.jar
```

The exact JAR filename depends on the Maven project configuration.

## Frontend

Build:

```bash
npm run build
```

Preview:

```bash
npm run preview
```

---

# 🌐 Production Architecture

A production deployment can use:

```text
                    Internet
                       │
                       ▼
                 React Frontend
                       │
                       │ REST API
                       ▼
                Spring Boot API
                       │
              ┌────────┴────────┐
              │                 │
              ▼                 ▼
         PostgreSQL          JWT Security
```

---

# 📌 Development Ports

| Application | Port |
| ----------- | ---: |
| React/Vite  | 5173 |
| Spring Boot | 8080 |
| PostgreSQL  | 5432 |

---

# 👥 Roles

FinTrack currently supports:

```text
USER
ADMIN
```

### USER

Can access personal financial functionality.

### ADMIN

Can:

```text
Manage users
View platform statistics
View customer contact messages
Mark messages as read
Delete messages
Update administrator profile
Change administrator password
```

---

# 📝 Project Status

FinTrack currently includes:

* JWT authentication
* User authentication
* Admin authentication
* User management
* Income management
* Expense management
* Category management
* Budget management
* Dashboard statistics
* Contact Us
* Admin contact-message management
* Admin profile update
* Admin password change
* PostgreSQL persistence
* Spring Security
* BCrypt password hashing
* React/Vite frontend

---

# 👨‍💻 FinTrack

**FinTrack — Personal Finance Management System**

Built with:

```text
React + Vite
Spring Boot
Spring Security
JWT
Spring Data JPA
PostgreSQL
```
