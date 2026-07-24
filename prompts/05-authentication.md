# 05 — Admin Authentication & Security Prompt

## Objective
Implement JWT-based authentication for the Store Administrator in the Express backend and React frontend.

## Instructions for AI Agent
1. Backend Auth Routes: Implement `POST /api/v1/admin/auth/login` validating admin credentials against `users` table password hash using `bcryptjs`.
2. Token Generation: Issue signed JWT Bearer token with 24-hour expiration.
3. Auth Middleware: Create `backend/src/middlewares/authMiddleware.ts` to protect `/api/v1/admin/*` endpoints.
4. Frontend Auth State: Build `AuthContext` in React frontend storing JWT in `localStorage` / cookie, providing `login()`, `logout()`, and `isAuthenticated` state guards.
5. Admin Login UI: Build `/admin/login` page styled with dark industrial theme and soft orange focus inputs.
