# 14 - Contribution & Code Guidelines

## 1. Code Style Guidelines

### 1.1 TypeScript & React Standards
- **No `any` Types**: Always explicitly type component props, state objects, API responses, and database rows.
- **Functional Components**: Use arrow function React functional components (`React.FC<Props>`).
- **Tailwind Utility Formatting**: Order Tailwind CSS classes logically: Layout (`flex`, `grid`) $\rightarrow$ Sizing (`w-full`, `h-20`) $\rightarrow$ Spacing (`p-4`, `mb-6`) $\rightarrow$ Colors (`bg-surface`, `text-on-surface`) $\rightarrow$ Effects (`orange-glow`).

### 1.2 Git Commit Message Conventions
Follow standard Conventional Commits:
- `feat:` New feature implementation (e.g. `feat(catalog): add filter sidebar component`)
- `fix:` Bug fix (e.g. `fix(rfq): correct MOQ validation check`)
- `docs:` Documentation update (e.g. `docs(api): update RFQ POST schema`)
- `style:` Design / Tailwind styling tweak (e.g. `style(hero): update background dot grid pattern`)

---

## 2. Pull Request & Verification Process
1. Ensure all TypeScript files pass compilation (`npx tsc --noEmit`).
2. Verify visual parity against HTML mockups in `docs/06-design-system.md`.
3. Test API responses against schemas in `docs/09-api-specification.md`.
