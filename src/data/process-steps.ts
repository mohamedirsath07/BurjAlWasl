// =============================================================================
// Burj Al Wasl — Process Steps Data
// =============================================================================

import type { ProcessStep } from '@/types';

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Consultation',
    description:
      'We begin with an in-depth consultation at your space — understanding your vision, lifestyle, and light requirements. Every detail matters.',
    icon: 'message-circle',
  },
  {
    number: 2,
    title: 'Measurement & Design',
    description:
      'Our specialists take precise measurements and present curated fabric samples, design options, and technical solutions tailored to your space.',
    icon: 'ruler',
  },
  {
    number: 3,
    title: 'Craftsmanship',
    description:
      'Your selections are custom-manufactured to international standards. Every stitch, pleat, and fold is executed with meticulous precision.',
    icon: 'scissors',
  },
  {
    number: 4,
    title: 'Installation',
    description:
      'Our certified installation team fits your window treatments with surgical precision, ensuring flawless operation and a perfect finish.',
    icon: 'wrench',
  },
  {
    number: 5,
    title: 'Aftercare',
    description:
      'We stand behind our work with comprehensive warranties and maintenance support. Your investment is protected for years to come.',
    icon: 'shield-check',
  },
];
