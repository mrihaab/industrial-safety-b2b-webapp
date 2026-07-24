# 11 - Quality Assurance & Testing Plan

## 1. QA Strategy Overview
Quality Assurance for **Ghulam Safety Hub** spans visual design parity audits, API integration testing, B2B workflow verification, and cross-device responsiveness testing.

---

## 2. Test Suites & Verification Criteria

| Test Level | Scope | Tools & Method | Success Criteria |
| :--- | :--- | :--- | :--- |
| **Visual Design Audit** | UI Match against 5 mockup HTML files | Visual Pixel Diff / Eyeball Audit | 100% visual parity for typography, colors, padding, and hover states. |
| **Backend Unit Testing** | Zod input schemas, helper functions | Jest / Vitest | 100% pass rate on payload validations. |
| **API Endpoint Testing** | Controllers & SQL Pool | Postman / Supertest | All REST routes return expected HTTP status codes (`200`, `201`, `400`, `401`, `404`). |
| **RFQ Flow Testing** | B2B quote form & order box | Manual & Automated E2E | Inquiry stored in MySQL, email sent via SMTP, WhatsApp URL generated correctly. |
| **MOQ Validation Test** | Quantity input on detail page | Manual Input Simulation | Input enforces minimum MOQ (50 pairs); values below 50 auto-correct. |
| **Responsive Layout Test**| Mobile, Tablet, Desktop viewports | Chrome DevTools Responsive Mode | Header collapses to burger menu; grids scale correctly (`1col` $\rightarrow$ `2col` $\rightarrow$ `3col`). |

---

## 3. SEO & Accessibility Checklist
- **Lighthouse Performance Score**: Target $>90$ on desktop.
- **Alt Text Coverage**: 100% of product images must contain descriptive `alt` tags (e.g. "TitanFlex Heavy Duty Industrial Gloves").
- **Heading Hierarchy**: Exactly one `<h1>` per page with proper `<h2>` and `<h3>` nesting.
