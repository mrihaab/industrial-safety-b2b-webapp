# 04 - Project Folder Structure & Module Architecture

## 1. Directory Tree Overview

```text
rihaabproject/
├── docs/                               # System Documentation Suite (15 Files)
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
│   └── README.md
├── frontend/                           # React.js + TypeScript + Tailwind Frontend
│   ├── public/
│   │   ├── favicon.ico
│   │   └── uploads/                    # Local static assets & catalog previews
│   ├── src/
│   │   ├── assets/                     # SVG icons, logos, static graphics
│   │   │   ├── logo-icon.svg           # Brand Shield Logo with animated core
│   │   │   └── hero-grid.svg
│   │   ├── components/                 # Atomic UI Components
│   │   │   ├── ui/
│   │   │   │   ├── Button.tsx          # Safety Orange primary & Outline secondary
│   │   │   │   ├── Input.tsx           # JetBrains Mono label + focus highlight
│   │   │   │   ├── Select.tsx          # Dark container select dropdown
│   │   │   │   ├── Textarea.tsx        # Styled multiline requirement box
│   │   │   │   ├── Checkbox.tsx        # Square industrial checkbox (.rounded-none)
│   │   │   │   ├── GlassCard.tsx       # .industrial-glass card wrapper
│   │   │   │   ├── BorderCard.tsx      # .industrial-border container
│   │   │   │   ├── Badge.tsx           # Status tags (.led-active option)
│   │   │   │   ├── Breadcrumbs.tsx     # Navigation path with chevron
│   │   │   │   └── WhatsAppButton.tsx  # Floating site-wide chat button
│   │   │   ├── layout/
│   │   │   │   ├── TopNavBar.tsx       # Sticky h-20 header with SearchBar
│   │   │   │   ├── Footer.tsx          # Bottom compliance links & social icons
│   │   │   │   └── AdminLayout.tsx     # Sidebar layout for Admin Panel
│   │   │   ├── home/
│   │   │   │   ├── HeroBanner.tsx      # Hero with status pulse & dual CTAs
│   │   │   │   ├── StatsBar.tsx        # 4-column metric counter bar
│   │   │   │   ├── FeaturedBento.tsx   # 12-column asymmetric product bento grid
│   │   │   │   ├── ExportMap.tsx       # 3D global logistics map section
│   │   │   │   ├── CertGrid.tsx        # 6-column lab certification emblems
│   │   │   │   └── SalesBanner.tsx     # High-vis orange sales quote CTA
│   │   │   ├── catalog/
│   │   │   │   ├── FilterSidebar.tsx   # Protection, Material & Cert checkboxes
│   │   │   │   ├── SortSelectBar.tsx   # Sort options bar
│   │   │   │   ├── ProductGrid.tsx     # 3-column product grid with hover zoom
│   │   │   │   └── Pagination.tsx      # Page navigation step controls
│   │   │   ├── product-detail/
│   │   │   │   ├── Gallery.tsx         # Main viewer + thumbnails + video trigger
│   │   │   │   ├── SpecMatrix.tsx      # 2x2 engineering specification grid
│   │   │   │   ├── BulkOrderBox.tsx    # MOQ validator, qty & size selector, quote CTA
│   │   │   │   └── FeatureCards.tsx    # 3-column asymmetric feature cards
│   │   │   └── rfq/
│   │   │       ├── RFQForm.tsx         # Enterprise quote inquiry form
│   │   │       ├── HubMap.tsx          # Distribution hub live status list
│   │   │       └── DirectSupport.tsx   # Sales hotline & email contact card
│   │   ├── pages/                      # Application Route Pages
│   │   │   ├── HomePage.tsx            # /
│   │   │   ├── AboutPage.tsx           # /about (Verbatim copy)
│   │   │   ├── CatalogPage.tsx         # /products
│   │   │   ├── ProductDetailPage.tsx   # /products/:slug
│   │   │   ├── RFQPage.tsx             # /rfq
│   │   │   ├── ContactPage.tsx         # /contact (Google Maps embed)
│   │   │   └── admin/
│   │   │       ├── AdminLoginPage.tsx  # /admin/login
│   │   │       ├── DashboardPage.tsx   # /admin/dashboard
│   │   │       ├── ProductsPage.tsx    # /admin/products (CRUD)
│   │   │       └── InquiriesPage.tsx   # /admin/inquiries
│   │   ├── services/                   # Axios / Fetch API integrations
│   │   │   ├── api.ts                  # Base API client instance
│   │   │   ├── productService.ts
│   │   │   └── rfqService.ts
│   │   ├── types/                      # TypeScript Interface Definitions
│   │   │   ├── product.ts
│   │   │   ├── category.ts
│   │   │   ├── rfq.ts
│   │   │   └── user.ts
│   │   ├── App.tsx                     # React Router V6 Config
│   │   └── main.tsx                    # React Entrypoint
│   ├── package.json
│   ├── tailwind.config.js              # Source of Truth MD3 Config
│   └── tsconfig.json
├── backend/                            # Express.js + TypeScript API Server
│   ├── uploads/                        # Server uploaded product image files
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts                   # mysql2 Connection Pool
│   │   │   └── env.ts                  # Environment variables schema validation
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── productController.ts
│   │   │   ├── categoryController.ts
│   │   │   ├── rfqController.ts
│   │   │   └── adminController.ts
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.ts       # JWT Bearer Token Validator
│   │   │   ├── uploadMiddleware.ts     # Multer Storage Config
│   │   │   └── errorHandler.ts
│   │   ├── models/                     # Raw SQL / Query Builder Models
│   │   │   ├── productModel.ts
│   │   │   ├── categoryModel.ts
│   │   │   └── rfqModel.ts
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── productRoutes.ts
│   │   │   ├── categoryRoutes.ts
│   │   │   ├── rfqRoutes.ts
│   │   │   └── adminRoutes.ts
│   │   ├── services/
│   │   │   ├── emailService.ts         # Nodemailer SMTP RFQ Notifications
│   │   │   └── whatsappService.ts      # WhatsApp Link Generator
│   │   └── server.ts                   # Express App Entrypoint
│   ├── package.json
│   └── tsconfig.json
└── README.md                           # Master Project Readme
```
