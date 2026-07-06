// =============================================================================
// Burj Al Wasl — Navigation Data
// =============================================================================

import type { NavItem, SocialLink } from '@/types';

export const mainNavigation: NavItem[] = [
  { label: 'Expertise', href: '/services' },
  { label: 'Collections', href: '/collections' },
  { label: 'Projects', href: '/projects' },
  { label: 'Process', href: '/process' },
  { label: 'Contact', href: '/contact' },
];

export const footerNavigation = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Process', href: '/process' },
    { label: 'Blog', href: '/blog' },
  ] satisfies NavItem[],

  services: [
    { label: 'Residential', href: '/services/residential' },
    { label: 'Commercial', href: '/services/commercial' },
    { label: 'Hospitality', href: '/services/hospitality' },
    { label: 'Motorized Systems', href: '/services/motorized' },
  ] satisfies NavItem[],

  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ] satisfies NavItem[],
} as const;

export const socialLinks: SocialLink[] = [
  { platform: 'instagram', url: 'https://instagram.com/burjalwasl', label: 'Follow us on Instagram' },
  { platform: 'linkedin', url: 'https://linkedin.com/company/burjalwasl', label: 'Connect on LinkedIn' },
  { platform: 'facebook', url: 'https://facebook.com/burjalwasl', label: 'Like us on Facebook' },
];
