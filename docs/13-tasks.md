# 13 - Implementation Task Breakdown

## 1. Executive Work Breakdown Structure (WBS)

### Module A: Project Setup & Database Layer
- [x] **Task A.1**: Audit HTML mockups, logo SVG, and developer brief.
- [x] **Task A.2**: Generate master technical documentation suite in `docs/`.
- [ ] **Task A.3**: Initialize Node.js + Express + TypeScript project structure in `backend/`.
- [ ] **Task A.4**: Setup MySQL database `ghulam_safety_hub` in XAMPP and run DDL migration script.
- [ ] **Task A.5**: Configure `mysql2` connection pool in `backend/src/config/db.ts`.

### Module B: Express REST API Development
- [ ] **Task B.1**: Create `ProductModel` and `ProductController` (`GET /api/v1/products`, `GET /api/v1/products/:slug`).
- [ ] **Task B.2**: Implement Category Tree controller (`GET /api/v1/categories`).
- [ ] **Task B.3**: Build RFQ Submission endpoint (`POST /api/v1/rfq`) with Zod schema validation.
- [ ] **Task B.4**: Integrate Nodemailer SMTP service for email notifications.
- [ ] **Task B.5**: Build Admin Auth controller (`POST /api/v1/admin/auth/login`) with bcrypt and JWT.
- [ ] **Task B.6**: Implement Admin Product CRUD endpoints with Multer image upload handling.

### Module C: React Frontend Application Development
- [ ] **Task C.1**: Initialize React + Vite + TypeScript project structure in `frontend/`.
- [ ] **Task C.2**: Configure Tailwind CSS with Material Design 3 color tokens & custom utility classes.
- [ ] **Task C.3**: Build atomic UI components (`Button`, `Input`, `GlassCard`, `Badge`, `LogoIcon`).
- [ ] **Task C.4**: Implement `TopNavBar` (with SearchBar) & `Footer` layouts.
- [ ] **Task C.5**: Build **Home Page** matching `Home.tsx` mockup (Hero, Stats, Bento Grid, Map, Certifications, Sales CTA).
- [ ] **Task C.6**: Build **About Us Page** using verbatim client copy.
- [ ] **Task C.7**: Build **Product Catalog Page** with `FilterSidebar`, `SortSelectBar`, 3-column `ProductGrid`, and `Pagination`.
- [ ] **Task C.8**: Build **Product Detail Page** with `ProductGallery`, 2x2 `SpecMatrix`, MOQ `BulkOrderBox`, and 3-column `FeatureCards`.
- [ ] **Task C.9**: Build **Logistics & RFQ Page** with 2-column form, distribution hubs map, and direct support hotline.
- [ ] **Task C.10**: Build **Contact Us Page** with Google Maps embed and contact form.
- [ ] **Task C.11**: Implement site-wide floating **WhatsApp Chat Button**.
- [ ] **Task C.12**: Build protected **Admin Panel Dashboard** (Login, Product List, Product Add/Edit Form, Inquiry Table).

### Module D: Testing, Polish & Final Launch
- [ ] **Task D.1**: Execute visual design audit comparing built pages against HTML mockups.
- [ ] **Task D.2**: Test RFQ workflow end-to-end (DB storage, Email dispatch, WhatsApp link generation).
- [ ] **Task D.3**: Audit responsive layouts on mobile, tablet, and desktop viewports.
- [ ] **Task D.4**: Inject SEO meta tags, OpenGraph tags, and JSON-LD schema.
