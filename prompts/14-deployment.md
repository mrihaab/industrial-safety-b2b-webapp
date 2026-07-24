# 14 — Deployment & Production Launch Prompt

## Objective
Build production static assets and deploy backend API server following `docs/10-deployment.md`.

## Instructions for AI Agent
1. Frontend Build: Execute `npm run build` in `frontend/` to generate optimized production static build in `frontend/dist/`.
2. Backend Compilation: Execute `npm run build` in `backend/` compiling TypeScript into production JavaScript in `backend/dist/`.
3. PM2 Process Setup: Generate `ecosystem.config.js` for managing backend API process via PM2 (`pm2 start ecosystem.config.js`).
4. Nginx Server Configuration: Generate sample Nginx configuration serving `frontend/dist/` static bundle and reverse-proxying `/api` requests to Express port `5000`.
5. Environment Check: Ensure production `.env` variables contain strong `JWT_SECRET`, production database credentials, and valid SMTP credentials.
