// =============================================================================
// Burj Al Wasl — Landing Page Content
// =============================================================================
// Single source of truth for all landing copy. Keeps section components clean.
// =============================================================================

import {
  Blinds,
  Building2,
  CalendarCheck,
  Check,
  Cpu,
  Layers,
  Ruler,
  ShieldCheck,
  Sparkles,
  Sun,
  Truck,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

// ── Navigation ──

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

// ── Hero stats ──

export interface Stat {
  value: string;
  label: string;
}

export const HERO_STATS: Stat[] = [
  { value: '12+', label: 'Years crafting interiors' },
  { value: '3,500+', label: 'Projects delivered' },
  { value: '98%', label: 'Client satisfaction' },
  { value: '5★', label: 'Average client rating' },
];

// ── Trust bar (marquee) ──

export const TRUST_BADGES: string[] = [
  'Luxury Residences',
  'Five-Star Hospitality',
  'Corporate Interiors',
  'Royal Villas',
  'Boutique Retail',
  'Yacht & Marine',
  'Smart Homes',
  'Commercial Towers',
];

// ── Services / Features ──

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FEATURES: Feature[] = [
  {
    icon: Layers,
    title: 'Bespoke Curtains & Drapery',
    description:
      'Custom-tailored curtains in premium fabrics, engineered to frame your space with effortless elegance and precise light control.',
  },
  {
    icon: Blinds,
    title: 'Blinds & Shades',
    description:
      'Roman, roller, zebra and Venetian systems finished to international standards for privacy, acoustics and daylight balance.',
  },
  {
    icon: Cpu,
    title: 'Smart Motorization',
    description:
      'Whole-home automation with app, voice and scene control. Schedule daylight and nighttime modes across every room.',
  },
  {
    icon: Sun,
    title: 'Sun & Glare Protection',
    description:
      'Technical solar fabrics that cut heat gain and UV while preserving your view, keeping interiors cool and protected.',
  },
  {
    icon: Building2,
    title: 'Commercial Fit-Out',
    description:
      'Turnkey window treatments for hotels, offices and towers, delivered on schedule and to specification at any scale.',
  },
  {
    icon: Ruler,
    title: 'Design Consultation',
    description:
      'On-site measurement and material styling with a dedicated advisor who translates your brief into a finished vision.',
  },
];

// ── How it works ──

export interface ProcessStep {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    icon: CalendarCheck,
    step: '01',
    title: 'Consultation',
    description: 'Book a free visit. We assess your space, light and style preferences.',
  },
  {
    icon: Ruler,
    step: '02',
    title: 'Measure & Design',
    description: 'Precise laser measurement and curated fabric and hardware selections.',
  },
  {
    icon: Wrench,
    step: '03',
    title: 'Craft & Install',
    description: 'Made-to-measure production and clean, professional installation.',
  },
  {
    icon: ShieldCheck,
    step: '04',
    title: 'Aftercare',
    description: 'Warranty, maintenance and support that keeps everything flawless.',
  },
];

// ── Showcase gallery ──

export interface ShowcaseItem {
  src: string;
  title: string;
  category: string;
}

export const SHOWCASE: ShowcaseItem[] = [
  { src: '/home-hall-interiro.jpeg', title: 'Grand Hall Drapery', category: 'Luxury Villa' },
  { src: '/curtain-hotel.jpeg', title: 'Hospitality Suite', category: 'Five-Star Hotel' },
  { src: '/room-interior.jpeg', title: 'Bedroom Blackout', category: 'Residence' },
  { src: '/interiro.jpeg', title: 'Living Space', category: 'Penthouse' },
  { src: '/sofa-deco.jpeg', title: 'Soft Furnishings', category: 'Interior Styling' },
  { src: '/daytime-nightime-screen.jpeg', title: 'Motorized Day/Night', category: 'Smart Home' },
];

// ── Testimonials ──

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Burj Al Wasl transformed our villa completely. The motorized drapery and finish quality rival anything we saw in Europe. Truly international standard.',
    name: 'Aisha Al Mansoori',
    role: 'Private Villa, Emirates Hills',
    avatar: '/img-1.jpeg',
    rating: 5,
  },
  {
    quote:
      'They fitted out 240 rooms across our property on time and on budget. Communication was flawless and the craftsmanship is impeccable.',
    name: 'James Whitfield',
    role: 'GM, Downtown Hotel Group',
    avatar: '/img-2.jpeg',
    rating: 5,
  },
  {
    quote:
      'From consultation to installation, the team was meticulous. The smart automation setup is seamless and the fabrics are stunning.',
    name: 'Rohan Mehta',
    role: 'Homeowner, Palm Jumeirah',
    avatar: '/img-4.jpeg',
    rating: 5,
  },
  {
    quote:
      'A genuinely premium experience. Their designers understood our brand and delivered an interior that impresses every client who visits.',
    name: 'Sara Khalifa',
    role: 'Head of Design, Business Bay Tower',
    avatar: '/sofa-home-deco.jpeg',
    rating: 5,
  },
];

// ── Pricing ──

export interface PricingTier {
  name: string;
  tagline: string;
  price: string;
  period: string;
  featured: boolean;
  cta: string;
  features: string[];
}

export const PRICING: PricingTier[] = [
  {
    name: 'Essential',
    tagline: 'For single rooms & apartments',
    price: 'From AED 1,200',
    period: 'per room',
    featured: false,
    cta: 'Get a quote',
    features: [
      'Free on-site consultation',
      'Standard fabric collection',
      'Precise measurement',
      'Professional installation',
      '1-year workmanship warranty',
    ],
  },
  {
    name: 'Signature',
    tagline: 'For full homes & villas',
    price: 'From AED 4,500',
    period: 'per project',
    featured: true,
    cta: 'Book consultation',
    features: [
      'Everything in Essential',
      'Premium & designer fabrics',
      'Motorized track options',
      'Dedicated design advisor',
      '3-year warranty & aftercare',
      'Priority scheduling',
    ],
  },
  {
    name: 'Enterprise',
    tagline: 'For hospitality & commercial',
    price: 'Custom',
    period: 'tailored quote',
    featured: false,
    cta: 'Talk to sales',
    features: [
      'Everything in Signature',
      'Bulk & phased delivery',
      'Full smart automation',
      'Project management team',
      'Contract SLA & support',
    ],
  },
];

// ── FAQ ──

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: 'Do you offer free consultations and measurements?',
    answer:
      'Yes. Every project starts with a complimentary on-site visit where our advisor measures your space, reviews lighting and discusses fabric and style options with no obligation.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Most residential projects are completed within 2 to 3 weeks from confirmation. Made-to-measure production time depends on fabric selection, and we always agree a clear timeline up front.',
  },
  {
    question: 'Can you motorize curtains in an existing home?',
    answer:
      'Absolutely. We retrofit smart motorized tracks with app, remote and voice control into existing spaces, and integrate with popular smart-home platforms.',
  },
  {
    question: 'Do you handle large commercial and hospitality projects?',
    answer:
      'We do. Our Enterprise service covers hotels, towers and offices with phased delivery, dedicated project management and contract-level support and SLAs.',
  },
  {
    question: 'What warranty and aftercare do you provide?',
    answer:
      'All installations include a workmanship warranty, from one year on Essential up to three years on Signature, plus ongoing maintenance and support options.',
  },
  {
    question: 'Which areas do you serve?',
    answer:
      'We serve Dubai and the wider UAE, delivering the same international-standard craftsmanship to residences and commercial spaces across the region.',
  },
];

// ── CTA highlights ──

export const CTA_HIGHLIGHTS: { icon: LucideIcon; label: string }[] = [
  { icon: Check, label: 'Free consultation' },
  { icon: Truck, label: 'On-time delivery' },
  { icon: Sparkles, label: 'Premium finish' },
];
