export interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  coverColor: string;
  description: string;
  services: string[];
  metrics: { label: string; value: string }[];
  gallery: { type: 'image' | 'video', src: string, alt?: string }[];
}

export const portfolioData: Project[] = [
  {
    slug: 'fintech-revolution',
    title: 'Fintech Revolution',
    client: 'Global Bank',
    category: 'Web App',
    year: '2025',
    coverColor: 'bg-[#1a1a1a]',
    description: 'A complete reimagining of the banking experience for digital natives. We designed and engineered a platform that processes millions of transactions with zero latency, wrapped in an award-winning interface.',
    services: ['UX/UI Design', 'Frontend Engineering', 'Design Systems', 'Strategy'],
    metrics: [
      { label: 'Increase in Conversion', value: '+300%' },
      { label: 'App Store Rating', value: '4.9' },
      { label: 'Active Users', value: '2.5M' },
    ],
    gallery: [
      { type: 'image', src: '/placeholder-1.jpg' },
      { type: 'image', src: '/placeholder-2.jpg' },
    ]
  },
  {
    slug: 'luxury-automotive',
    title: 'Luxury Automotive',
    client: 'EV Brand',
    category: 'E-Commerce',
    year: '2024',
    coverColor: 'bg-[#0f172a]',
    description: 'We built a fully immersive 3D car configurator using WebGL and React Three Fiber, allowing customers to customize their electric vehicles in real-time before ordering.',
    services: ['WebGL', 'E-Commerce', 'Interaction Design'],
    metrics: [
      { label: 'Time on Site', value: '+14m' },
      { label: 'Pre-orders', value: '$45M' },
    ],
    gallery: [
      { type: 'image', src: '/placeholder-3.jpg' },
    ]
  },
  {
    slug: 'health-wellness',
    title: 'Health & Wellness',
    client: 'Zoya Resort',
    category: 'Branding & Platform',
    year: '2024',
    coverColor: 'bg-[#1e1b4b]',
    description: 'For Zoya Health & Wellbeing Resort, we delivered a digital presence as serene as their physical locations. The platform features an integrated booking engine and bespoke content management system.',
    services: ['Brand Identity', 'Web Development', 'CMS Architecture'],
    metrics: [
      { label: 'Direct Bookings', value: '+85%' },
      { label: 'Bounce Rate', value: '-40%' },
    ],
    gallery: [
      { type: 'image', src: '/placeholder-4.jpg' },
    ]
  },
];
