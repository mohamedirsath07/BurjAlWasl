# Burj Al Wasl — Frontend Architecture

> Production-grade frontend architecture for an international premium interior solutions agency.

## Quick Links

| Document | Description |
|----------|-------------|
| [Folder Structure](./folder-structure.md) | Complete project directory layout |
| [Component Architecture](./component-architecture.md) | Atomic design system with component contracts |
| [Feature Architecture](./feature-architecture.md) | Feature-based module design |
| [State Management](./state-management.md) | State strategy with Zustand + React patterns |
| [Routing](./routing.md) | Next.js App Router route map |
| [SEO Architecture](./seo-architecture.md) | Metadata, structured data, sitemap |
| [Animation Architecture](./animation-architecture.md) | GSAP + Framer Motion animation system |
| [Asset Organization](./asset-organization.md) | Image, video, font, and icon strategy |
| [Coding Conventions](./coding-conventions.md) | TypeScript, React, and CSS standards |
| [Naming Conventions](./naming-conventions.md) | Files, components, git branches, commits |
| [Hooks Reference](./hooks-reference.md) | Reusable custom hooks library |
| [Utilities Reference](./utilities-reference.md) | Utility functions library |
| [Development Roadmap](./development-roadmap.md) | Phased build plan from scaffold to deployment |

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 15.x |
| Language | TypeScript | 6.x |
| Styling | Tailwind CSS | v4.x |
| Animation | GSAP + Framer Motion | 3.x / 11.x |
| State | Zustand | 5.x |
| Linting | ESLint + Prettier | Latest |
| Package Manager | npm | 10.x |

## Architecture Principles

1. **Server-first rendering** — Use React Server Components by default; add `'use client'` only when interactivity is needed.
2. **Atomic Design** — Build from atoms → molecules → organisms → pages.
3. **Feature colocation** — Domain logic lives in `features/`, not scattered across the tree.
4. **Type safety everywhere** — No `any`, explicit return types, interface-first prop design.
5. **Accessibility by default** — WCAG 2.1 AA compliance, reduced motion support.
6. **Performance budget** — Lighthouse 95+ across all categories.
7. **Progressive enhancement** — Core content works without JavaScript.
