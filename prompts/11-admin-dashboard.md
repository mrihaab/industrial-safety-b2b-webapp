# 11 — Admin Dashboard & Catalog Management Prompt

## Objective
Build the secure Admin Dashboard (`/admin/dashboard`) allowing administrators to manage product inventory, upload images, review B2B inquiries, and edit site copy.

## Instructions for AI Agent
1. Protected Layout: Wrap `/admin/*` routes in `AdminLayout.tsx` with sidebar navigation (`Products`, `Inquiries`, `Site Content`, `Logout`) guarded by JWT authentication check.
2. Product Inventory Table (`/admin/products`): Implement catalog table listing product SKU, title, category, price, MOQ, stock status, and actions (`Edit`, `Delete`).
3. Add/Edit Product Modal Form: Build product form with input fields for title, series name, price, MOQ, stock status, category selection, specs matrix items, features list, and file input for uploading images via `Multer` (`POST /api/v1/admin/products`).
4. Inquiry Management Table (`/admin/inquiries`): Render table listing received B2B RFQs (Company Name, Email, Industry, Volume, Detailed Requirements, Status `pending`/`processed`).
5. Site Content Editor: Build simple content editor for updating landing stats and site contact details.
