# Ghulam Safety Hub — Commercial Full-Stack B2B Web Application

## 1. Project Overview
**Ghulam Safety Hub** is an import/export business based in Pakistan specializing in industrial safety equipment, workwear, safety gloves, coveralls, and Personal Protective Equipment (PPE). This project establishes a commercial B2B web application targeting both local (Pakistan) and international enterprise buyers across manufacturing, oil & gas, construction, and high-consequence industries.

> [!IMPORTANT]
> **Source of Truth Priority Note**:  
> The files inside `/docs` are the official **Source of Truth** for this project. Historical drafts are preserved inside `/archive-docs` and must not be used for implementation.

---

## 2. Technology Stack
- **Frontend**: React.js (v18), TypeScript (v5), Tailwind CSS (v3 with Material Design 3 tokens), Google Fonts (Inter & JetBrains Mono), Material Symbols Outlined icons.
- **Backend**: Node.js (v20 LTS), Express.js (v4), TypeScript (v5), JWT authentication, Nodemailer SMTP.
- **Database**: MySQL (v8.0 via local XAMPP environment).

---

## 3. Folder Structure

```text
rihaabproject/
├── docs/                             # Official Frozen Source of Truth Technical Documentation
│   ├── 00-project-overview.md
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
├── archive-docs/                     # Historical Drafts (DO NOT USE FOR CODING)
├── references/                       # Reference HTML Mockups & Assets
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

## 4. Documentation Index

| File | Title | Description |
| :--- | :--- | :--- |
| **[00-project-overview.md](file:///c:/Users/My%20PC/OneDrive/Desktop/rihaabproject/docs/00-project-overview.md)** | Project Overview | Scope, tech stack, reading order, implementation rules. |
| **[01-project-requirements.md](file:///c:/Users/My%20PC/OneDrive/Desktop/rihaabproject/docs/01-project-requirements.md)** | Requirements | B2B user roles, 15 features, category tree, verbatim copy. |
| **[02-architecture.md](file:///c:/Users/My%20PC/OneDrive/Desktop/rihaabproject/docs/02-architecture.md)** | Architecture | High-level 3-tier architecture, data flow diagrams. |
| **[03-tech-stack.md](file:///c:/Users/My%20PC/OneDrive/Desktop/rihaabproject/docs/03-tech-stack.md)** | Tech Stack | React, TypeScript, Tailwind, Express, Node, MySQL specs. |
| **[04-folder-structure.md](file:///c:/Users/My%20PC/OneDrive/Desktop/rihaabproject/docs/04-folder-structure.md)** | Folder Structure | Project directory organization and module layout. |
| **[05-rules.md](file:///c:/Users/My%20PC/OneDrive/Desktop/rihaabproject/docs/05-rules.md)** | Rules & Constraints | Design parity rules, MOQ limits, dual notification logic. |
| **[06-design-system.md](file:///c:/Users/My%20PC/OneDrive/Desktop/rihaabproject/docs/06-design-system.md)** | Design System | MD3 color palette, typography, custom utility classes, logo SVG. |
| **[07-phases.md](file:///c:/Users/My%20PC/OneDrive/Desktop/rihaabproject/docs/07-phases.md)** | Roadmap & Phases | 5-stage development roadmap and verification criteria. |
| **[08-database.md](file:///c:/Users/My%20PC/OneDrive/Desktop/rihaabproject/docs/08-database.md)** | Database Schema | MySQL ER diagram, 8 tables, ANSI SQL DDL migration script. |
| **[09-api-specification.md](file:///c:/Users/My%20PC/OneDrive/Desktop/rihaabproject/docs/09-api-specification.md)** | API Specification | REST API endpoints, query params, JSON schemas. |
| **[10-deployment.md](file:///c:/Users/My%20PC/OneDrive/Desktop/rihaabproject/docs/10-deployment.md)** | Deployment Guide | Local XAMPP setup, `.env` config, PM2/Nginx cloud plan. |
| **[11-testing.md](file:///c:/Users/My%20PC/OneDrive/Desktop/rihaabproject/docs/11-testing.md)** | Testing & QA Plan | Visual parity audits, API tests, MOQ check, SEO & accessibility. |
| **[12-memory.md](file:///c:/Users/My%20PC/OneDrive/Desktop/rihaabproject/docs/12-memory.md)** | State & Memory | React state lifetimes, URL parameter sync, DB pool config. |
| **[13-tasks.md](file:///c:/Users/My%20PC/OneDrive/Desktop/rihaabproject/docs/13-tasks.md)** | Task Breakdown | Work Breakdown Structure (WBS) across Modules A, B, C, D. |
| **[14-contributing.md](file:///c:/Users/My%20PC/OneDrive/Desktop/rihaabproject/docs/14-contributing.md)** | Contributing | TypeScript coding standards and commit conventions. |
| **[15-architect-review-report.md](file:///c:/Users/My%20PC/OneDrive/Desktop/rihaabproject/docs/15-architect-review-report.md)** | Architect Review | Senior Software Architect review and formal approval report. |

---

## 5. Getting Started

### Local Prerequisites:
- Node.js v20.x LTS
- XAMPP v8.2 (Apache & MySQL enabled)
- Git

### Database Setup:
1. Start MySQL in XAMPP Control Panel.
2. Create database `ghulam_safety_hub`.
3. Import DDL script from `docs/08-database.md`.

---

## 6. Development Workflow

Development is executed in step-by-step sequential tasks using the prompt files in `/prompts`:
- Task 02: `prompts/02-project-setup.md`
- Task 03: `prompts/03-frontend-setup.md`
- Task 04: `prompts/04-backend-setup.md`
- ... up to Deployment (`prompts/14-deployment.md`).

---

## 7. License
This project is proprietary software belonging to **Ghulam Safety Hub**. All rights reserved.
