# Studio X - Premium Digital Agency Platform

This is the foundational codebase for Studio X, a high-end digital product studio targeting international enterprise clients.

## Architecture

*   **Framework:** Next.js 16 (App Router)
*   **Styling:** Tailwind CSS v4
*   **Motion & Animation:** Framer Motion (Page Transitions, Scroll Parallax)
*   **Typography:** `@tailwindcss/typography` (Prose) + Inter & Space Grotesk
*   **Accessibility:** Full `useReducedMotion` support for vestibular disorder compliance.
*   **SEO:** Dynamic `sitemap.ts` and `robots.ts` generation.

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Run the development server:**
    ```bash
    npm run dev
    ```
3.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Data Structure

The platform is currently operating on a Headless architecture using local mock data. 
*   **Portfolio:** `src/data/portfolio.ts`
*   **Insights:** `src/data/insights.ts`

When you are ready to scale, swap these imports for a Headless CMS SDK (like Sanity.io or Contentful). The dynamic routes (`[slug]/page.tsx`) are already engineered to generate static parameters (`generateStaticParams`) for maximum performance.

## Deployment (Vercel)

This Next.js application is heavily optimized for Edge deployment on Vercel.

1.  Push this repository to GitHub, GitLab, or Bitbucket.
2.  Import the repository into [Vercel](https://vercel.com).
3.  Set the Framework Preset to **Next.js**.
4.  Deploy.

Vercel will automatically detect the static routes and deploy them to the Edge Network, resulting in global TTFB (Time to First Byte) latency of under 50ms.

---
*Engineered for Excellence.*
