# 12 — Testing, Visual Parity & QA Prompt

## Objective
Execute comprehensive visual design audits, API testing, B2B workflow verification, and responsive layout checks following `docs/11-testing.md`.

## Instructions for AI Agent
1. Visual Parity Audit: Compare rendered React pages against the 5 HTML mockup references. Verify exact colors (`#051424`, `#ff6b00`, `#ffb693`, `#d4e4fa`, `#273647`), font family usage (`Inter` & `JetBrains Mono`), and button hover states.
2. B2B RFQ Flow Verification: Test submitting an inquiry via `RFQForm`. Verify:
   - Record created in MySQL database table `rfq_inquiries`.
   - Email dispatch triggered via Nodemailer SMTP.
   - WhatsApp URL constructed with encoded message parameter.
3. MOQ Validation Audit: Test quantity input on product detail page; verify input auto-corrects values entered below product MOQ limit (50).
4. Responsive Verification: Test viewports at `375px` (Mobile), `768px` (Tablet), `1024px` (Laptop), and `1440px` (Desktop). Verify header collapses to burger menu and product grids scale (`1col` $\rightarrow$ `2col` $\rightarrow$ `3col`).
5. SEO Audit: Verify page titles, meta descriptions, image `alt` attributes, and JSON-LD schema tags.
