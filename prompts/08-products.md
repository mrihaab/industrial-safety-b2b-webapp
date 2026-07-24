# 08 — Product Catalog & Filtering Implementation Prompt

## Objective
Build the Product Catalog & Listing Page (`/products`) matching the `ProductCatalog.tsx` mockup reference and API specifications.

## Instructions for AI Agent
1. Header & Controls: Render catalog headline ("PPE & Safety Gear"), results counter ("Showing 1-12 of 148 industrial-grade solutions"), and sort dropdown bar (`Sort By: Performance Tier`).
2. `FilterSidebar.tsx`: Implement sticky 64-width filter sidebar with square checkboxes (`.rounded-none`) for Protection Level (Level 5, Level 3, Tactical), Material (Kevlar, Polycarbonate, High-Vis), and Certification (ANSI Z87.1, CE EN 388, ISO 9001), plus `Clear All` button. Sync state with URL search params (`useSearchParams`).
3. `ProductCardGrid.tsx`: Implement 3-column product grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`). Card features:
   - LED status tag overlay (`.led-active` - `Safety-System-Active`, or `Limited Stock`).
   - Image container with scale zoom and grayscale-to-color hover transition.
   - Title, Price (`$42.00`), description (`line-clamp-2`), compliance badges (`CE EN 388`, `Level 5 Cut`), and `ADD TO ORDER` orange glow button.
4. `Pagination.tsx`: Implement page navigation controls with active page box and previous/next chevron buttons.
5. API Binding: Connect to `GET /api/v1/products` passing pagination, search keyword, category, filter parameters, and sort selection.
