# 03 - Technology Stack Specification

## 1. Stack Overview

| Tier | Technology | Version / Spec | Purpose & Usage |
| :--- | :--- | :--- | :--- |
| **Frontend Core** | React.js | v18.x | Component-driven user interface |
| **Frontend Language** | TypeScript | v5.x | Strict static typing for state, props, and API schemas |
| **CSS Framework** | Tailwind CSS | v3.x | Utility-first styling with custom MD3 token config |
| **Icon Library** | Material Symbols Outlined | Google Fonts CDN | Industrial iconography engine |
| **Typography Engine** | Google Fonts | Inter & JetBrains Mono | UI text (`Inter`) & numeric/code accents (`JetBrains Mono`) |
| **Backend Runtime** | Node.js | v20.x LTS | Asynchronous JavaScript runtime |
| **Backend Framework** | Express.js | v4.x | RESTful API routing, controller, and middleware stack |
| **Backend Language** | TypeScript | v5.x | Strict typing for controllers, models, and services |
| **Database Engine** | MySQL | v8.0 / XAMPP v8.2 | Relational storage for products, categories, RFQs, admin |
| **DB Driver / Pool** | `mysql2` | v3.x | Parameterized SQL query execution and pool management |
| **Authentication** | JWT (`jsonwebtoken`) | v9.x | Admin authentication and session management |
| **Password Hashing** | `bcryptjs` | v2.4.x | Secure hashing for admin passwords |
| **File Uploads** | `multer` | v1.4.x | Multipart image upload handling for catalog items |
| **Email Service** | `nodemailer` | v6.x | SMTP notification dispatch for B2B RFQs |

---

## 2. Frontend Configuration & Extensions

### 2.1 Tailwind CSS Configuration Baseline
```javascript
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface": "#051424",
        "background": "#051424",
        "surface-container-lowest": "#010f1f",
        "surface-container-low": "#0d1c2d",
        "surface-container": "#122131",
        "surface-container-high": "#1c2b3c",
        "surface-container-highest": "#273647",
        "surface-variant": "#273647",
        "primary": "#ffb693",
        "primary-container": "#ff6b00",
        "on-primary-container": "#572000",
        "on-surface": "#d4e4fa",
        "on-surface-variant": "#e2bfb0",
        "outline": "#a98a7d",
        "outline-variant": "#5a4136",
        "error": "#ffb4ab",
        "error-container": "#93000a",
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      fontFamily: {
        "body-lg": ["Inter", "sans-serif"],
        "display-lg": ["Inter", "sans-serif"],
        "headline-lg": ["Inter", "sans-serif"],
        "title-md": ["Inter", "sans-serif"],
        "label-caps": ["JetBrains Mono", "monospace"]
      }
    }
  }
}
```

---

## 3. Backend Runtime & Dependency Requirements

```json
{
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "mysql2": "^3.9.7",
    "nodemailer": "^6.9.13",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/jsonwebtoken": "^9.0.6",
    "@types/multer": "^1.4.11",
    "@types/node": "^20.12.12",
    "@types/nodemailer": "^6.4.15",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.4.5"
  }
}
```
