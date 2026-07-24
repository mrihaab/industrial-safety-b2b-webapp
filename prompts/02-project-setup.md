# 02 — Workspace & Project Setup Prompt

## Objective
Initialize the root workspace directory structure, create `frontend/` and `backend/` packages, and set up git configuration following `docs/04-folder-structure.md`.

## Instructions for AI Agent
1. Create root directory structure containing `frontend/` and `backend/` as defined in `docs/04-folder-structure.md`.
2. Create `.gitignore` in the project root excluding `node_modules/`, `dist/`, `.env`, `backend/uploads/`, and build artifacts.
3. Configure `package.json` at root if using workspace scripts to run both frontend and backend concurrently (`npm run dev`).
4. Output setup verification status.
