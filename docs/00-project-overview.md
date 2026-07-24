# 00 - Project Overview & Execution Framework

## 1. Project Purpose
**Ghulam Safety Hub** is an import/export enterprise based in Pakistan specializing in industrial safety equipment, workwear, safety gloves, coveralls, and Personal Protective Equipment (PPE). The primary objective of this project is to establish a modern, commercial full-stack B2B web application targeting both local (Pakistan) and international industrial buyers.

---

## 2. Project Scope
The platform provides a comprehensive B2B portal including:
- High-impact dark-themed landing page with product showcases and interactive global logistics metrics.
- Comprehensive product catalog with protection level, material, and certification filtering.
- Technical product detail pages with multi-image/video galleries, 2x2 engineering specification matrices, MOQ quantity validation, and technical spec PDF downloads.
- Enterprise Request for Quote (RFQ) pipeline with automated email notifications and pre-filled WhatsApp Web API quote generators.
- Verbatim company background ("About Us") and contact pages with Google Maps integration.
- Authenticated back-office Admin Panel for catalog management (CRUD), image uploads, and inquiry tracking.

---

## 3. Technology Stack Summary

| Layer | Technology | Usage / Specification |
| :--- | :--- | :--- |
| **Frontend** | React.js (v18) + TypeScript (v5) | Component-driven UI application |
| **CSS Framework** | Tailwind CSS (v3) | Utility-first styling with Material Design 3 tokens |
| **Backend API** | Node.js (v20 LTS) + Express.js (v4) | RESTful API server with TypeScript |
| **Database** | MySQL (v8.0 via XAMPP) | Relational storage for catalog, categories, and inquiries |
| **Authentication** | JWT (`jsonwebtoken`) + `bcryptjs` | Protected Admin Panel authentication |
| **Services** | Nodemailer SMTP & WhatsApp Web API | RFQ notification dispatch |

---

## 4. Directory & Folder Structure Overview

```text
rihaabproject/
├── docs/                             # Official Frozen Source of Truth Documentation
│   ├── 00-project-overview.md        # This Document
│   ├── 01-project-requirements.md
│   ├── 02-architecture.md
│   ├── 03-tech-stack.md
│   ├── 04-folder-structure.md
│   ├── 05-rules.md
│   ├── 06-design-system.md
│   ├── 07-phases.md
│   ├── 08-database.md
│   ├── 09-api-specification.md
│   ├── 10-deployment.md
│   ├── 11-testing.md
│   ├── 12-memory.md
│   ├── 13-tasks.md
│   ├── 14-contributing.md
│   ├── 15-architect-review-report.md
│   └── README.md
├── archive-docs/                     # Historical Drafts (DO NOT USE FOR IMPLEMENTATION)
├── references/                       # Reference Assets & Mockups
│   ├── html-mockups/
│   ├── assets/
│   │   ├── logos/
│   │   ├── images/
│   │   └── icons/
│   └── client-pdf/
├── prompts/                          # AI-Assisted Step-by-Step Task Prompts
├── frontend/                         # React Frontend Application (Target)
└── backend/                          # Express Node.js API Server (Target)
```

---

## 5. Documentation Reading Order

For onboarding or AI-assisted development, review documentation in the following sequence:

1. **`docs/00-project-overview.md`**: High-level purpose, scope, and implementation rules.
2. **`docs/01-project-requirements.md`**: Client brief, user roles, 15 mandatory features, category tree.
3. **`docs/06-design-system.md`**: Material Design 3 color palette, typography, custom utility classes, logo SVG.
4. **`docs/02-architecture.md`** & **`docs/03-tech-stack.md`**: System architecture, layer decoupling, stack specs.
5. **`docs/08-database.md`** & **`docs/09-api-specification.md`**: MySQL ER diagram, DDL script, REST API contracts.
6. **`docs/05-rules.md`** & **`docs/13-tasks.md`**: Business validation constraints and work breakdown structure.

---

## 6. Source of Truth Priority Hierarchy

In the event of any conflict during development, adhere strictly to the following priority order:

1. **HTML Mockups (Highest Priority)**
2. **Client PDF Brief**
3. **Latest files inside `/docs`**
4. **Assets**
5. **`archive-docs/` (Reference only)**

*Note: If any conflict occurs, the higher priority source always wins. Never guess UI or business logic if a reference already exists.*

---

## 7. Development Workflow

1. **Step-by-Step Prompt Execution**: Execute development in isolated, sequential tasks using `prompts/02-project-setup.md` through `prompts/14-deployment.md`.
2. **Design Parity Check**: Compare built UI components visually against HTML mockups.
3. **Quality Assurance**: Run API tests, MOQ input validation, and responsive viewport checks before committing code.

---

## 8. Mandatory Rules Before Implementation

1. **No Redesigning**: The UI design is locked. Do NOT alter layout, color schemes, or typography.
2. **Strict TypeScript**: Do NOT use `any` types.
3. **Verbatim Copy**: Use verbatim copy on `/about`.
4. **No Implementation Code in Prep Pass**: Repository setup and documentation freeze must be completed before writing application code.
