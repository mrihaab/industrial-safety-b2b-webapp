# 01 — Project Analysis & Audit Verification Prompt

## Objective
Analyze the complete project documentation suite located in `docs/` (files 01 through 14) and summarize the readiness of the project structure before code execution.

## Instructions for AI Agent
1. Inspect `docs/01-project-requirements.md` and confirm all 15 mandatory pages/features, user roles, product category tree, and verbatim About Us copy.
2. Inspect `docs/06-design-system.md` and verify exact Material Design 3 color hex values (`#051424`, `#ff6b00`, `#ffb693`, `#d4e4fa`, `#273647`), custom utility classes (`.industrial-grid`, `.industrial-glass`, `.led-active`, `.glow-orange`), and the official logo SVG asset.
3. Inspect `docs/08-database.md` and verify the MySQL database tables (`users`, `categories`, `products`, `product_images`, `product_specs`, `product_features`, `rfq_inquiries`, `rfq_items`).
4. Output a comprehensive Project Analysis Summary confirming that zero design deviations will take place during coding.
