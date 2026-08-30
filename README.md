# Ghulam Safety Hub — Commercial B2B Web Application

## Overview
**Ghulam Safety Hub** is a full-stack enterprise B2B web application designed for an industrial safety equipment and Personal Protective Equipment (PPE) import/export enterprise. The platform serves both regional and international enterprise buyers with features including dynamic product catalog management, RFQ (Request for Quote) inquiry generation, interactive cart estimation, and a protected Admin Control Center.

---

## 🛠️ Tech Stack

### Frontend
- **Framework & Language**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom MD3 industrial safety design tokens
- **Icons & Fonts**: Google Material Symbols Outlined, Inter & JetBrains Mono fonts
- **Routing & State**: React Router v6, React Context API for Cart & Auth management
- **Build Tool**: Vite

### Backend
- **Runtime & Framework**: Node.js v20 (LTS) with Express.js & TypeScript
- **Authentication**: JWT (JSON Web Tokens) & Bcrypt password hashing
- **File Uploads**: Multer with disk storage for multi-photo product galleries
- **Validation**: Zod schema validation
- **Mailing**: Nodemailer SMTP integration

### Database
- **Engine**: MySQL 8.0 (Relational schema with foreign key constraints, batch query optimization, and dynamic seed scripts)

---

## 📁 Repository Structure

```text
industrial-safety-b2b-webapp/
├── frontend/                 # React + TypeScript Frontend Client
│   ├── src/
│   │   ├── components/       # UI Components (Catalog, Layout, Product, UI)
│   │   ├── contexts/         # Cart & Auth React Contexts
│   │   ├── pages/            # Public & Admin Views (Home, Catalog, Detail, RFQ, Cart, Admin)
│   │   ├── routes/           # AppRoutes with Protected Route Guards
│   │   ├── services/         # API Service Layer
│   │   └── utils/            # Utility Helpers & Formatters
│   ├── public/               # Static Public Assets
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── backend/                  # Node.js + Express + TypeScript API Server
│   ├── src/
│   │   ├── config/           # Database Connection & Seed Scripts
│   │   ├── controllers/      # Request Handlers (Products, Categories, RFQs, Auth)
│   │   ├── middleware/       # JWT Auth & Upload Middlewares
│   │   ├── models/           # Data Access Layer & MySQL Queries
│   │   ├── routes/           # REST API Route Definitions
│   │   ├── services/         # Business Logic Layer
│   │   ├── types/            # TypeScript Interfaces & DTOs
│   │   ├── validators/       # Zod Schema Validation
│   │   └── server.ts         # Express Application Entry Point
│   ├── uploads/              # Local Storage for Uploaded Media Files
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## ⚡ Key Features

1. **Industrial Product Catalog & Filtering**: Multi-criteria search and filter by category division, stock status, and safety certifications (CE, ISO, ANSI, EN 388).
2. **Dynamic Product Detail Views**: Interactive size selection with auto-switching size-specific product photos, specification breakdowns, and downloadable TDS datasheets.
3. **Wholesale Bulk RFQ System**: Integrated RFQ inquiry workflow allowing enterprise buyers to build custom quote requests with quantity volume tiers and submission verification.
4. **Admin Control Center**: Protected administrative dashboard for real-time inventory metrics, product CRUD with multi-image upload manager, category management, and RFQ inquiry lifecycle tracking.
5. **Secure Authentication & Authorization**: JWT-based session security with protected administrative sub-routes and automated token invalidation.
6. **Fully Responsive Design**: Fluid responsive layout engineered for mobile, tablet, and desktop screens with zero horizontal overflow.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ or v20 LTS recommended)
- MySQL Server (v8.0+ or local XAMPP environment)

### 1. Backend Setup
```bash
cd backend
npm install
```
Configure your environment variables in `.env`:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=ghulam_safety_hub
JWT_SECRET=your_jwt_secret_key
```

Initialize the database schema and seed data:
```bash
npm run seed
```

Start the backend development server:
```bash
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```
Configure your frontend environment variables in `.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

Start the frontend development server:
```bash
npm run dev
```

---

## 📜 License & Author

Developed by **M.RIHAAB SAEED** for **Ghulam Safety Hub**.  
All Rights Reserved. See the [LICENSE](LICENSE) file for details.
