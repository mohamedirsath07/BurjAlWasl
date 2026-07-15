export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  coverColor: string;
  content: string; // HTML/Markdown string placeholder
}

export const insightsData: Insight[] = [
  {
    slug: 'the-death-of-generic-saas',
    title: 'The Death of Generic SaaS: Why Cinematic Design is the New Standard',
    excerpt: 'In a market flooded with identical dashboards, the only remaining moat is how your product makes the user feel.',
    category: 'Product Strategy',
    date: 'Oct 12, 2025',
    readTime: '6 min read',
    author: 'Studio X Leadership',
    coverColor: 'bg-[#1a1a1a]',
    content: `
      <h2>The Commoditization of Code</h2>
      <p>Ten years ago, simply having a working web application was a competitive advantage. Today, with the rise of modern frameworks and AI-assisted development, the barrier to entry for building a SaaS product is effectively zero.</p>
      <p>When every competitor has the exact same feature set, what determines who wins the enterprise contract? <strong>Perception.</strong></p>
      <h2>The Cinematic Pivot</h2>
      <p>We are seeing a massive shift towards "Cinematic Design" in B2B software. This means applying the principles of high-end consumer luxury—smooth motion, intentional friction, massive typography, and uncompromising performance—to enterprise tools.</p>
      <p>A $100k/year enterprise software contract shouldn't feel like a spreadsheet. It should feel like stepping into a Tesla.</p>
    `
  },
  {
    slug: 'nextjs-performance-at-scale',
    title: 'Next.js 15 at Scale: Architecting for Zero Latency',
    excerpt: 'How we leverage React Server Components, Edge Caching, and aggressive static generation to build platforms that load instantly anywhere in the world.',
    category: 'Engineering',
    date: 'Sep 28, 2025',
    readTime: '8 min read',
    author: 'Engineering Team',
    coverColor: 'bg-[#0f172a]',
    content: `
      <h2>Beyond the Lighthouse Score</h2>
      <p>A 100/100 Lighthouse score is table stakes. What matters is perceived performance—how quickly does the user feel the application responding to their intent?</p>
      <p>By heavily utilizing React Server Components (RSC), we can stream data to the client in chunks, ensuring that the critical rendering path is never blocked by a slow database query.</p>
      <h2>The Edge is Now</h2>
      <p>Deploying middleware to the Edge allows us to personalize content (like pricing and localization) before the request ever hits our origin servers. This results in global latency of under 50ms for our largest enterprise clients.</p>
    `
  },
  {
    slug: 'building-trust-through-accessibility',
    title: 'Silent Luxury includes Everyone: Engineering Accessibility',
    excerpt: 'Accessibility is often treated as a compliance checklist. We treat it as a core pillar of premium engineering.',
    category: 'UX Design',
    date: 'Sep 05, 2025',
    readTime: '5 min read',
    author: 'UX Research',
    coverColor: 'bg-[#1e1b4b]',
    content: `
      <h2>The Myth of "Boring" Accessibility</h2>
      <p>There is a pervasive myth in the design industry that WCAG compliance forces you to build "boring" websites. This is a failure of imagination, not a limitation of the standard.</p>
      <p>At Studio X, we use tools like <code>useReducedMotion</code> to gracefully degrade complex WebGL animations for users with vestibular disorders, without compromising the core aesthetic for others.</p>
      <h2>Contrast as a Design Token</h2>
      <p>High contrast isn't just for visually impaired users; it's for the CEO trying to read your dashboard on their phone in bright sunlight. By mapping our color systems to strict contrast ratios, we ensure our products perform flawlessly in any environment.</p>
    `
  }
];
