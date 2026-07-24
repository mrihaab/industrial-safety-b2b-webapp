# 05 - Business & Code Rules

## 1. Project Workflow & Implementation Rules
- **Rule 1.1 — No Unauthorized Code Generation**: No source code implementation should begin until documentation sign-off is granted by the user.
- **Rule 1.2 — Reference Design Parity**: UI mockups provided in the HTML files are the **Highest Priority Authority**. Build strictly to match layout, colors, typography, and styling — **do NOT redesign**.
- **Rule 1.3 — Verbatim About Us Copy**: Text on the `/about` page must render verbatim as provided in Section 4 of the client developer brief.
- **Rule 1.4 — Source of Truth Priority Hierarchy**: In the event of any conflict during development, adhere strictly to the following priority order:
  1. **HTML Mockups** (Highest Priority)
  2. **Client PDF Brief**
  3. **Latest files inside `/docs`**
  4. **Assets**
  5. **`archive-docs/`** (Reference only)
  *(If any conflict occurs, the higher priority source always wins. Never guess UI or business logic if a reference already exists.)*

---

## 2. Business Logic Rules (B2B E-Commerce & RFQ Engine)

### 2.1 Minimum Order Quantity (MOQ) Validation
- **BR-2.1 MOQ Enforcement**: The product detail bulk order box must validate that `quantity >= product.moq` (default MOQ = 50 pairs/units). Quantities entered below MOQ must automatically reset to the MOQ limit.
- **BR-2.2 Size & Option Selection**: B2B bulk orders must capture size range selections (e.g., `Assorted S/M/L/XL`, `Large Only`, `Medium Only`).

### 2.2 RFQ Notification Pipeline
- **BR-3.1 Dual Notification Dispatch**: Upon successful RFQ submission, the server must execute two actions:
  1. Record inquiry row in database table `rfq_inquiries`.
  2. Send email notification to sales desk (`bulk@ghulamsafety.com`) via Nodemailer SMTP.
  3. Return a pre-formatted WhatsApp Web API link (`https://wa.me/97145550192?text=...`) containing encoded quote request details.

### 2.3 Category Mapping Rules
- **BR-4.1 Category Integrity**: Products must map to valid category nodes within the 3 parent branches (Working Gloves, Sports Gloves, Workwear / Safety Wear).
- **BR-4.2 Short Description Tag Mapping**: Every product must display its category-specific short description tag (e.g. `Precision Handling` for Assembly Gloves, `Heat Protection` for Welding Gloves).

---

## 3. Technology & Coding Rules

### 3.1 Frontend Coding Rules (React + TS + Tailwind)
- **CR-1.1 Strict Typing**: Do not use `any` type in TypeScript. Define strict interfaces for products, categories, RFQs, and user state.
- **CR-1.2 Token Consistency**: Use exact Tailwind Material Design 3 color tokens (`bg-surface`, `bg-primary-container`, `text-on-surface`, `border-outline-variant`).
- **CR-1.3 Reusable Components**: Decouple UI components into reusable atomic elements under `src/components/ui/`.

### 3.2 Backend Coding Rules (Node + Express + TS + MySQL)
- **CR-2.1 Controller-Service Separation**: Controllers handle HTTP requests/responses; services execute business logic; models manage SQL queries.
- **CR-2.2 SQL Injection Protection**: Use parameterized queries (`mysql2` placeholders `?`) for all SQL executions.
- **CR-2.3 JWT Authentication Guard**: Secure all `/api/v1/admin/*` endpoints with `authMiddleware` JWT verification.
