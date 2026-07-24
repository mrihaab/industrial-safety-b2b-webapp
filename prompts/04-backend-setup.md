# 04 — Backend API Server & Database Setup Prompt

## Objective
Initialize the Express.js + TypeScript REST API server in `backend/`, configure the `mysql2` connection pool connecting to MySQL in XAMPP, setup environment variable validation, and configure static file serving for image uploads.

## Instructions for AI Agent
1. Scaffolding: Initialize Node.js + TypeScript project in `backend/` with `express`, `mysql2`, `cors`, `dotenv`, `jsonwebtoken`, `bcryptjs`, `multer`, `nodemailer`, and `zod`.
2. Database Pool: Build `backend/src/config/db.ts` configuring MySQL pool connection to XAMPP database `ghulam_safety_hub`.
3. Server Entrypoint: Create `backend/src/server.ts` with CORS, JSON body parser, static `/uploads` route, health check endpoint (`GET /api/v1/health`), and global error handling middleware.
4. Database Execution: Execute DDL migration script from `docs/08-database.md` creating all 8 database tables (`users`, `categories`, `products`, `product_images`, `product_specs`, `product_features`, `rfq_inquiries`, `rfq_items`).
