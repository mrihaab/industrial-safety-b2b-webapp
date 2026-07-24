# 09 - REST API Specification

## 1. Global API Standards
- **Base URL**: `/api/v1`
- **Content Type**: `application/json`
- **Authentication**: Bearer Token (`Authorization: Bearer <JWT_TOKEN>`)

---

## 2. API Endpoint Reference

### 2.1 Catalog & Products API

#### `GET /api/v1/products`
Retrieves paginated product list with search and filter parameters.
- **Query Parameters**:
  - `page` (*number*): Page number (default `1`).
  - `limit` (*number*): Items per page (default `12`).
  - `search` (*string*): Keyword query.
  - `category` (*string*): Filter category slug.
  - `protection_level` (*string*): Level 5, Level 3, Tactical.
  - `material` (*string*): Kevlar, Polycarbonate, High-Vis.
  - `certification` (*string*): ANSI/ISEA Z87.1, CE EN 388, ISO 9001.
  - `sort` (*string*): `performance`, `newest`, `price_high_low`.
- **Response `200 OK`**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "sku": "GSH-GLV-001",
      "title": "TitanFlex Armor Gloves",
      "slug": "titanflex-armor-gloves",
      "price": 42.00,
      "status_tag": "Safety-System-Active",
      "short_tag": "Precision Handling",
      "image_url": "/uploads/titanflex-gloves.jpg",
      "certifications": ["CE EN 388", "Level 5 Cut"]
    }
  ],
  "pagination": { "total": 148, "page": 1, "totalPages": 13 }
}
```

#### `GET /api/v1/products/:slug`
Fetches complete product details, gallery images, 2x2 spec matrix, and engineering features.
- **Response `200 OK`**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "GSH Elite Industrial Gloves",
    "series_name": "Heavy Duty Series",
    "price": 42.00,
    "moq": 50,
    "stock_status": "IN STOCK",
    "description": "Designed for high-precision industrial environments...",
    "gallery": [
      { "url": "/uploads/gsh-glove-1.jpg", "is_primary": true },
      { "url": "/uploads/gsh-glove-video.mp4", "is_video": true }
    ],
    "specs": [
      { "key": "Impact Protection", "value": "Level 3 (EN 388)" },
      { "key": "Thermal Resistance", "value": "Up to 250°C" }
    ],
    "features": [
      { "title": "Anatomical Fit", "description": "Contoured design...", "icon": "construction" }
    ]
  }
}
```

---

### 2.2 RFQ & Bulk Quotation API

#### `POST /api/v1/rfq`
Submits B2B bulk quotation inquiry.
- **Request Body**:
```json
{
  "company_name": "Global Logistics Corp",
  "business_email": "procurement@corp.com",
  "industry_segment": "Oil & Gas",
  "monthly_volume": "$10k - $50k",
  "detailed_requirements": "Require 500 pairs of GSH Elite Gloves size L...",
  "items": [
    { "product_id": 1, "quantity": 100, "size_range": "Assorted S/M/L/XL" }
  ]
}
```
- **Response `201 Created`**:
```json
{
  "success": true,
  "message": "RFQ inquiry received successfully.",
  "inquiry_id": 1042,
  "whatsapp_redirect_url": "https://wa.me/97145550192?text=RFQ%201042%20Global%20Logistics%20Corp"
}
```

---

### 2.3 Admin API (Protected)

#### `POST /api/v1/admin/auth/login`
Authenticates administrator credentials.
- **Response `200 OK`**: `{ "success": true, "token": "eyJhbGciOi..." }`

#### `POST /api/v1/admin/products`
Adds new product item with image file uploads (`Multipart/form-data`).
