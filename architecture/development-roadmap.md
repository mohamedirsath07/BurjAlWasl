# Development Roadmap

## Overview

8-phase roadmap from architectural scaffold to production deployment. Estimated 32 working days for a senior developer or 2-person team.

---

## Phase 0: Scaffold & Infrastructure (Days 1–2)

**Goal**: Working Next.js 15 project with complete tooling and design system foundation.

- [ ] Initialize Next.js 15 with App Router (`npx create-next-app@latest`)
- [ ] Configure TypeScript (`tsconfig.json` with strict mode, path aliases)
- [ ] Configure Tailwind v4 with custom design tokens
- [ ] Set up PostCSS configuration
- [ ] Create design system CSS files:
  - [ ] `styles/design-tokens.css` — All CSS custom properties
  - [ ] `styles/typography.css` — Font scale and text styles
  - [ ] `styles/animations.css` — `@keyframes` definitions
  - [ ] `styles/utilities.css` — Custom utility classes
- [ ] Set up ESLint + Prettier + Husky + lint-staged
- [ ] Create `lib/cn.ts` (clsx + tailwind-merge)
- [ ] Create `lib/fonts.ts` (Inter + Playfair Display via next/font)
- [ ] Create `lib/constants.ts` (SITE_URL, brand info)
- [ ] Create root `layout.tsx` (HTML structure, fonts, metadata, providers)
- [ ] Create `loading.tsx`, `not-found.tsx`, `error.tsx` shells
- [ ] Configure `next.config.ts` (images, headers, redirects)
- [ ] Set up Git branching strategy (main → develop → feature/*)
- [ ] Create `.env.example` with all required variables
- [ ] Verify `npm run dev` starts successfully

**Exit Criteria**: `npm run dev` shows a styled "Coming Soon" page at `/`. All tooling passes.

---

## Phase 1: Design System & Atoms (Days 3–5)

**Goal**: All atomic components built, tested, and documented.

- [ ] Build `Button` atom
  - [ ] All 4 variants (primary, secondary, ghost, outline)
  - [ ] All 3 sizes (sm, md, lg)
  - [ ] Magnetic hover effect
  - [ ] Loading state with spinner
  - [ ] Link mode (renders as `<Link>`)
  - [ ] External link mode (target="_blank")
- [ ] Build `Heading` atom (display/xl/lg/md/sm/xs sizes, semantic level decoupled from visual)
- [ ] Build `Text` atom (lg/md/sm/xs sizes, color variants)
- [ ] Build `Badge` atom (variants, sizes, optional icon)
- [ ] Build `Icon` atom (Lucide icon wrapper with consistent sizing)
- [ ] Build `Logo` component (full logo + mark-only, light/dark theme)
- [ ] Build `Divider` atom (horizontal/vertical, decorative variant)
- [ ] Build `Skeleton` atom (loading placeholder rectangles)
- [ ] Create barrel exports (`components/atoms/index.ts`)
- [ ] Build `SectionHeader` molecule (eyebrow + title + subtitle, animated variant)
- [ ] Validate all atoms render correctly across breakpoints
- [ ] Validate design tokens match brand guidelines

**Exit Criteria**: Import any atom from `@/components/atoms` and it renders with correct brand styling.

---

## Phase 2: Core Layout Components (Days 6–8)

**Goal**: Full page layout shell with navigation, footer, smooth scroll, and cursor.

- [ ] Build `Navbar` organism
  - [ ] Desktop: horizontal links + CTA button
  - [ ] Mobile: full-screen overlay with clip-path animation
  - [ ] Scroll behavior: transparent → frosted glass transition
  - [ ] Active link highlighting
- [ ] Build `MobileMenu` sub-component (staggered link reveals)
- [ ] Build `Footer` organism (4-column grid, social links, legal links)
- [ ] Build `CustomCursor` shared component (outer circle + inner dot, hover states)
- [ ] Build `SmoothScroll` provider (Lenis integration)
- [ ] Build `PageTransition` wrapper (Framer Motion AnimatePresence)
- [ ] Build `ScrollProgress` indicator (top progress bar)
- [ ] Build `BackToTop` button (appears after scroll threshold)
- [ ] Integrate Zustand `useUIStore` for nav/modal/cursor coordination
- [ ] Build `useLockScroll` hook for mobile menu and modals
- [ ] Wire up root layout with all layout components
- [ ] Test responsive behavior across all breakpoints

**Exit Criteria**: Navigate between pages with smooth transitions. Navbar and footer render correctly on all devices.

---

## Phase 3: Homepage Sections (Days 9–14)

**Goal**: Complete homepage with all sections, animations, and interactions.

- [ ] Build `Hero` organism
  - [ ] Parallax background image
  - [ ] Text line-by-line reveal (GSAP timeline)
  - [ ] CTA button with magnetic effect
  - [ ] Floating accent card
  - [ ] Reduced motion fallback
- [ ] Build `VideoShowcase` organism
  - [ ] Scroll-expanding video (GSAP ScrollTrigger)
  - [ ] Play/pause toggle
  - [ ] Section header with text reveal
- [ ] Build `ExpertiseSection` organism
  - [ ] Alternating layout (image left/right)
  - [ ] Parallax images with clip-path reveal
  - [ ] Numbered sections (01, 02, etc.)
  - [ ] Content slide-in animation
- [ ] Build `CollectionsGrid` organism
  - [ ] Responsive grid with hover effects
  - [ ] Image scale + overlay on hover
  - [ ] Link to individual collection pages
- [ ] Build `ProcessTimeline` organism
  - [ ] Horizontal scroll or vertical stepped design
  - [ ] Step-by-step reveal on scroll
  - [ ] Number indicators + descriptions
- [ ] Build `TestimonialsCarousel` organism
  - [ ] Auto-playing carousel
  - [ ] Drag/swipe gesture support
  - [ ] Client avatar + quote + name
- [ ] Build `CTABanner` organism
  - [ ] Full-width background with overlay
  - [ ] Headline + CTA button
- [ ] Compose homepage `page.tsx` with all sections
- [ ] Performance audit: Lighthouse check on homepage

**Exit Criteria**: Homepage looks and feels like a premium agency site. All animations are smooth at 60fps. Lighthouse performance > 90.

---

## Phase 4: Inner Pages (Days 15–20)

**Goal**: All content pages built with consistent styling and SEO metadata.

- [ ] Build `/about` page
  - [ ] Company story section
  - [ ] Values/mission cards
  - [ ] Team section with portraits
- [ ] Build `/collections` page
  - [ ] Filterable grid (URL state for filters)
  - [ ] Card hover effects
  - [ ] Pagination or infinite scroll
- [ ] Build `/collections/[slug]` page
  - [ ] Full gallery with lightbox
  - [ ] Product details
  - [ ] Related collections
- [ ] Build `/projects` page
  - [ ] Portfolio grid with category filters
  - [ ] Masonry or uniform grid layout
- [ ] Build `/projects/[slug]` page
  - [ ] Case study layout (hero image + content + gallery)
  - [ ] Before/after comparisons (if applicable)
  - [ ] Related projects
- [ ] Build `/services` page
  - [ ] Service cards grid
  - [ ] Feature highlights
- [ ] Build `/services/[slug]` page
  - [ ] Service detail with process steps
  - [ ] Gallery of related work
- [ ] Build `/process` page
  - [ ] Step-by-step process visualization
  - [ ] Timeline or numbered sections
- [ ] Build `/contact` page
  - [ ] Contact form with validation
  - [ ] Map integration (or static map image)
  - [ ] Contact information cards
- [ ] Build `/blog` page + `/blog/[slug]` (if blog is in scope)
- [ ] Add `generateStaticParams` for all dynamic routes
- [ ] Add `generateMetadata` for all pages

**Exit Criteria**: All pages render, link correctly, and have proper metadata.

---

## Phase 5: Features & Integrations (Days 21–24)

**Goal**: All interactive features working end-to-end.

- [ ] Implement `booking` feature module
  - [ ] BookingModal multi-step flow
  - [ ] Date and time selection
  - [ ] Form validation (Zod)
  - [ ] API integration
- [ ] Implement `gallery` feature module
  - [ ] Lightbox with keyboard navigation
  - [ ] Image zoom
  - [ ] Filter bar with URL state
  - [ ] Image preloading
- [ ] Implement `newsletter` feature module
  - [ ] Inline form (footer)
  - [ ] Success animation
  - [ ] API integration
- [ ] Set up API routes
  - [ ] `/api/contact` — Contact form handler (email notification)
  - [ ] `/api/revalidate` — ISR webhook
- [ ] Integrate analytics (GA4 or Vercel Analytics)
- [ ] Add WhatsApp floating button
- [ ] Add cookie consent banner (if required by UAE law)

**Exit Criteria**: Contact form submits successfully. Gallery lightbox works with keyboard. Booking flow completes end-to-end.

---

## Phase 6: SEO & Performance (Days 25–27)

**Goal**: Lighthouse 95+ across all categories. Complete SEO coverage.

- [ ] Implement `generateMetadata` for every page
- [ ] Add JSON-LD structured data
  - [ ] Organization schema (root layout)
  - [ ] LocalBusiness schema (contact page)
  - [ ] Product schema (collection pages)
  - [ ] Breadcrumb schema (all inner pages)
  - [ ] Article schema (blog posts)
- [ ] Generate sitemap (`app/sitemap.ts`)
- [ ] Generate robots.txt (`app/robots.ts`)
- [ ] Create OG images for key pages
- [ ] Run Lighthouse audits and fix issues:
  - [ ] Performance: LCP < 2.5s, FID < 100ms, CLS < 0.1
  - [ ] Accessibility: Score ≥ 95
  - [ ] Best Practices: Score ≥ 95
  - [ ] SEO: Score ≥ 95
- [ ] Optimize images (WebP/AVIF, blur placeholders, responsive sizes)
- [ ] Implement resource prefetching strategy
- [ ] Configure caching headers in `next.config.ts`
- [ ] Add Sentry error tracking (optional)
- [ ] Verify Core Web Vitals in Chrome DevTools

**Exit Criteria**: All Lighthouse scores ≥ 95. All pages have correct metadata and structured data.

---

## Phase 7: QA & Polish (Days 28–30)

**Goal**: Production-quality across all devices, browsers, and accessibility requirements.

- [ ] Cross-browser testing
  - [ ] Chrome (latest)
  - [ ] Safari (macOS + iOS)
  - [ ] Firefox (latest)
  - [ ] Edge (latest)
- [ ] Mobile responsiveness audit
  - [ ] iPhone SE (375px)
  - [ ] iPhone 14 Pro (393px)
  - [ ] iPad (768px)
  - [ ] iPad Pro (1024px)
  - [ ] Desktop (1280px, 1440px, 1920px)
- [ ] Accessibility audit
  - [ ] Keyboard navigation (Tab, Enter, Escape)
  - [ ] Screen reader testing (VoiceOver / NVDA)
  - [ ] Focus management in modals
  - [ ] Color contrast ratios (WCAG 2.1 AA)
  - [ ] Reduced motion testing
- [ ] Animation polish
  - [ ] 60fps verification on target devices
  - [ ] No layout shifts during animations
  - [ ] Smooth page transitions
- [ ] Content review
  - [ ] All copy finalized and proofread
  - [ ] All images at correct resolution
  - [ ] All links working (no 404s)
  - [ ] All forms submitting correctly
- [ ] RTL layout preparation (if Arabic support planned)
- [ ] Performance budget validation
  - [ ] Total JS bundle < 200KB gzipped
  - [ ] First load < 100KB gzipped
  - [ ] No unused CSS/JS

**Exit Criteria**: Zero critical bugs. All accessibility tests pass. All animations smooth.

---

## Phase 8: Deployment (Days 31–32)

**Goal**: Live production site with monitoring and CI/CD.

- [ ] Configure production environment variables
- [ ] Set up Vercel project (or target platform)
  - [ ] Connect GitHub repository
  - [ ] Configure environment variables
  - [ ] Set up preview deployments for PRs
- [ ] Configure custom domain
  - [ ] DNS records (A/CNAME)
  - [ ] SSL certificate (automatic on Vercel)
  - [ ] www → non-www redirect (or vice versa)
- [ ] Deploy to staging environment
  - [ ] Full QA pass on staging
  - [ ] Client/stakeholder UAT sign-off
- [ ] Deploy to production
  - [ ] Verify all pages load correctly
  - [ ] Verify all forms work
  - [ ] Verify analytics tracking
  - [ ] Verify sitemap.xml is accessible
  - [ ] Submit sitemap to Google Search Console
- [ ] Post-launch checklist
  - [ ] Google Search Console verification
  - [ ] Google Analytics verification
  - [ ] Uptime monitoring (UptimeRobot or similar)
  - [ ] Error tracking active (Sentry)
  - [ ] Performance monitoring dashboard
  - [ ] Hotfix deployment procedure documented

**Exit Criteria**: Site is live, monitored, and performing well. Team has a clear process for future updates.

---

## Milestone Summary

| Phase | Duration | Key Deliverable |
|-------|----------|----------------|
| 0 - Scaffold | 2 days | Working Next.js project with tooling |
| 1 - Atoms | 3 days | Complete design system components |
| 2 - Layout | 3 days | Full page shell with nav/footer |
| 3 - Homepage | 6 days | Complete homepage with animations |
| 4 - Inner Pages | 6 days | All content pages |
| 5 - Features | 4 days | Booking, gallery, newsletter |
| 6 - SEO/Perf | 3 days | Lighthouse 95+, full SEO |
| 7 - QA | 3 days | Cross-browser, accessibility |
| 8 - Deploy | 2 days | Live production site |
| **Total** | **32 days** | **Production-grade agency website** |
