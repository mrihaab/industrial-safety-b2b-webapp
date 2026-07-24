# 13 — Code Refactoring & Optimization Prompt

## Objective
Refactor and optimize frontend and backend codebases for performance, clean architecture, strict type safety, and maintainability.

## Instructions for AI Agent
1. Frontend Optimization:
   - Extract inline styles into Tailwind utility classes or design system variables.
   - Memoize heavy grid renders using `React.memo` or `useMemo`.
   - Implement lazy loading (`React.lazy` & `Suspense`) for secondary routes (`/about`, `/contact`, `/admin/*`).
   - Audit image loading (`loading="lazy"` & WebP image formats).
2. Backend Optimization:
   - Audit SQL query performance; ensure indexes on `category_id`, `slug`, `sku`, and `business_email` are utilized.
   - Ensure central error handling middleware intercepts all async controller errors without crashing Node.js process.
   - Remove unused dependencies and code comments.
3. Code Cleanliness: Run ESLint and TypeScript compiler check (`npx tsc --noEmit`); ensure zero warnings or errors.
