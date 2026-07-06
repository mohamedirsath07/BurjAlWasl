// =============================================================================
// Burj Al Wasl — Services Data
// =============================================================================

import type { ServiceData } from '@/types';

export const services: ServiceData[] = [
  {
    id: 'svc-residential',
    title: 'Residential Sanctuaries',
    slug: 'residential',
    description:
      'We craft perfect rest environments. Our premium blackout solutions, layered with elegant sheer drapes, offer ultimate light control and privacy, transforming intimate spaces into serene escapes.',
    icon: 'home',
    features: [
      'Master bedroom blackout curtains',
      'Living room sheer drapes',
      'Children\'s room themed curtains',
      'Bathroom roller blinds',
      'Custom fabric selection',
    ],
    image: '/images/projects/residential/cover.webp',
  },
  {
    id: 'svc-commercial',
    title: 'Corporate & Hospitality',
    slug: 'commercial',
    description:
      'Elevating boardrooms and commercial spaces with sophisticated, fire-retardant sheer tracks. We provide professional aesthetics that inspire productivity while effectively managing glare and temperature.',
    icon: 'building',
    features: [
      'Office partition curtains',
      'Boardroom blackout solutions',
      'Reception area treatments',
      'Fire-retardant fabrics',
      'Bulk commercial projects',
    ],
    image: '/images/projects/commercial/cover.webp',
  },
  {
    id: 'svc-hospitality',
    title: 'Hospitality Excellence',
    slug: 'hospitality',
    description:
      'Luxury hotel suites and restaurant environments deserve window treatments that match their prestige. We deliver at scale without compromising on quality or design.',
    icon: 'star',
    features: [
      'Hotel suite curtain systems',
      'Restaurant window treatments',
      'Spa and wellness areas',
      'Lobby and entrance features',
      'Bulk hospitality orders',
    ],
    image: '/images/projects/hospitality/cover.webp',
  },
  {
    id: 'svc-motorized',
    title: 'Motorized Systems',
    slug: 'motorized',
    description:
      'State-of-the-art motorized curtain tracks and blinds with smart home integration. Silent operation, precise control, and seamless automation for the modern luxury lifestyle.',
    icon: 'zap',
    features: [
      'Silent motorized tracks',
      'Smart home integration',
      'Remote & app control',
      'Scheduled automation',
      'Battery & hardwired options',
    ],
    image: '/images/projects/motorized/cover.webp',
  },
];
