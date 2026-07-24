# 06 — Shared UI Components & Layout Prompt

## Objective
Build all atomic UI and layout components following the design system specifications in `docs/06-design-system.md`.

## Instructions for AI Agent
1. `LogoIcon.tsx`: Implement official animated SVG shield logo component matching Section 1.1 of `docs/06-design-system.md`.
2. Core UI Controls: Build `Button.tsx` (Primary Safety Orange `.orange-glow` & Secondary Outline), `Input.tsx` (JetBrains Mono uppercase label + focus highlight), `Select.tsx`, `Textarea.tsx`, `Checkbox.tsx` (`.rounded-none`), `GlassCard.tsx` (`.industrial-glass`), `Badge.tsx` (`.led-active` tag option), `Breadcrumbs.tsx`.
3. `TopNavBar.tsx`: Implement sticky `h-20` header with dynamic scroll listener (`shadow-xl bg-surface/95 backdrop-blur-md`), integrated search bar, logo emblem, nav links, language/cart buttons, Login button, and `Bulk Quote` CTA.
4. `Footer.tsx`: Implement footer with copyright statement, legal compliance links, and social share icons.
5. `WhatsAppButton.tsx`: Build floating, site-wide one-click WhatsApp chat button linking to WhatsApp Web API (`https://wa.me/97145550192`).
