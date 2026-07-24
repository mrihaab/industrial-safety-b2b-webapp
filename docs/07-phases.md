# 07 - Development Phases & Project Roadmap

## 1. Overview
The development lifecycle for **Ghulam Safety Hub** follows a structured multi-phase methodology.

---

## 2. Master Roadmap

```mermaid
gantt
    title Ghulam Safety Hub Full-Stack Roadmap
    dateFormat  YYYY-MM-DD
    section Phase 1: Planning & Specs
    UI Audit & Comprehensive Docs          :done, p1, 2026-07-24, 2026-07-25
    section Phase 2: DB & API Core
    MySQL Schema Setup & Node/Express Server:active, p2, 2026-07-26, 2026-07-30
    section Phase 3: React UI Components
    React Components & Tailwind Page Build  :future, p3, 2026-07-31, 2026-08-07
    section Phase 4: Integration & Admin
    API Integration, RFQ Pipeline & Admin   :future, p4, 2026-08-08, 2026-08-14
    section Phase 5: Testing & Deployment
    E2E Verification, SEO & Production Launch:future, p5, 2026-08-15, 2026-08-20
```

---

## 3. Phase Deliverables & Verification Criteria

### Phase 1: Analysis & Complete System Documentation (Completed)
- **Deliverables**: Audited 4 HTML mockups, logo SVG asset, and client PDF brief. Generated 15 comprehensive technical documentation files in `docs/`.
- **Verification**: Complete documentation parity with zero early code generation.

### Phase 2: Database Schema & Backend API Setup (Next Phase)
- **Deliverables**: MySQL DDL database script execution via XAMPP, Node.js + Express + TypeScript project setup, database connection pool, Zod validation schemas, API controllers (`ProductController`, `RFQController`, `AdminController`).
- **Verification**: Postman / REST Client API integration tests returning `200 OK` and valid JSON responses.

### Phase 3: Frontend Component & Page Build
- **Deliverables**: React + Vite + TypeScript frontend initialization, Tailwind CSS MD3 design system config, construction of atomic UI components (`TopNavBar`, `Footer`, `ProductCardGrid`, `BulkOrderCard`, `FilterSidebar`), implementation of 7 client pages (Home, About Us, Catalog, Detail, RFQ, Contact, Admin Login).
- **Verification**: Pixel-perfect visual comparison against provided HTML mockups across Mobile, Tablet, and Desktop viewports.

### Phase 4: Full-Stack Integration & Admin Panel
- **Deliverables**: React state integration with Express API endpoints, RFQ form submission handling with dual Email/WhatsApp notifications, Admin Panel CRUD product management, image file upload via Multer.
- **Verification**: Complete end-to-end B2B inquiry lifecycle testing from customer submission to admin review.

### Phase 5: SEO, Optimization & Deployment
- **Deliverables**: Meta tags & JSON-LD structured data injection, responsive layout audits, client sign-off, production build generation.
- **Verification**: Google Lighthouse performance score $>90$, zero console errors.
