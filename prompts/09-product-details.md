# 09 — Product Detail Page Implementation Prompt

## Objective
Build the Product Detail Page (`/products/:slug`) matching the `ProductDetail.tsx` mockup reference and bulk quotation logic.

## Instructions for AI Agent
1. `Breadcrumbs.tsx`: Render navigation path (`Products > PPE Gear > GSH Elite Industrial Gloves`).
2. `ProductGallery.tsx`: Implement 2-column layout left side gallery featuring main image viewer with zoom on hover, `NEW ARRIVAL` overlay badge, and 4-column thumbnail grid with interactive source swapping + video play trigger (`play_circle`).
3. Technical Overview & Rating: Render series subtitle (`HEAVY DUTY SERIES`), product title, star review rating `(124 Global Reviews)`, `IN STOCK` green badge (`text-[#4ade80]`), and detailed engineering description.
4. `SpecMatrix.tsx`: Implement 2x2 grid (`grid-cols-2 gap-px bg-outline-variant industrial-border`) showing Impact Protection, Abrasion Rating, Thermal Resistance, and Material Composition.
5. `BulkOrderCard.tsx`: Build bulk distributor order box:
   - Display MOQ alert (`MOQ: 50 Units`) & volume discount alert.
   - Quantity input (validates `quantity >= 50`; auto-corrects values below MOQ) + Size range dropdown (`Assorted S/M/L/XL`).
   - Dual CTAs: `REQUEST WHOLESALE QUOTE` (orange glow button) + `Technical Specs PDF` (dark outline button with `download` icon).
6. `FeatureCards.tsx`: Implement 3-column asymmetric engineering specifications section with accent bar (`w-12 h-[2px] bg-primary`) featuring Anatomical Fit (`construction`), Fluid Resistance (`water_drop`), and Reinforced Core (`shield`).
7. `ComplianceEmblemRow.tsx`: Render lab compliance section with circular emblem badges (`CE`, `ISO`, `ANSI`, `UKCA`).
8. API Binding: Connect to `GET /api/v1/products/:slug` and `POST /api/v1/rfq`.
