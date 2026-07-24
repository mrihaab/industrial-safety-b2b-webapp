# 03 — Frontend Environment & Design System Setup Prompt

## Objective
Initialize the React.js + Vite + TypeScript application in `frontend/`, configure Tailwind CSS with exact Material Design 3 tokens, font imports, and global custom utilities.

## Instructions for AI Agent
1. Scaffolding: Create Vite React TypeScript application in `frontend/`.
2. Dependencies: Install `react-router-dom`, `lucide-react` (or Google Material Symbols CDN import), `clsx`, `tailwind-merge`.
3. Typography: Import Google Fonts `Inter` (400, 600, 700, 800) and `JetBrains Mono` (600) plus Material Symbols Outlined stylesheet in `index.html`.
4. Tailwind Config: Configure `tailwind.config.js` with exact colors (`surface: #051424`, `primary-container: #ff6b00`, `primary: #ffb693`, `on-surface: #d4e4fa`, `surface-variant: #273647`) and font families as specified in `docs/06-design-system.md`.
5. Custom Utilities: Add `.industrial-grid`, `.industrial-glass`, `.industrial-border`, `.led-active`, and `.glow-orange` in `index.css`.
