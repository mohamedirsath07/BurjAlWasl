// =============================================================================
// Burj Al Wasl — SEO Metadata Factory
// =============================================================================
// Centralized metadata generation for all pages.
// See: architecture/seo-architecture.md
// =============================================================================

import { type Metadata } from 'next';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, DEFAULT_OG_IMAGE, DEFAULT_LOCALE } from '../constants';
import type { PageMetaOptions } from '@/types';

/**
 * Create consistent page metadata for any route.
 * All pages should use this factory for metadata generation.
 *
 * @example
 * // In a page.tsx:
 * export const metadata = createPageMetadata({
 *   title: 'Premium Collections',
 *   description: 'Explore our curated collection...',
 *   path: '/collections',
 * });
 */
export function createPageMetadata(options: PageMetaOptions): Metadata {
  const description = options.description || SITE_DESCRIPTION;

  return {
    title: options.title,
    description,
    alternates: {
      canonical: `${SITE_URL}${options.path}`,
    },
    openGraph: {
      title: options.title,
      description,
      url: `${SITE_URL}${options.path}`,
      siteName: SITE_NAME,
      images: [
        {
          url: options.ogImage || DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: options.title,
        },
      ],
      locale: DEFAULT_LOCALE,
      type: options.type || 'website',
      ...(options.publishedTime && { publishedTime: options.publishedTime }),
      ...(options.modifiedTime && { modifiedTime: options.modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: options.title,
      description,
      images: [options.ogImage || DEFAULT_OG_IMAGE],
    },
    robots: {
      index: !options.noIndex,
      follow: true,
      googleBot: {
        index: !options.noIndex,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Root layout metadata template.
 * Applied as defaults for all pages via Next.js metadata merging.
 */
export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Premium Window Treatments Dubai`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'premium curtains dubai',
    'luxury window treatments uae',
    'motorized blinds dubai',
    'bespoke curtains business bay',
    'commercial window solutions',
    'interior design dubai',
    'blackout curtains uae',
    'sheer drapes dubai',
  ],
  authors: [{ name: 'Burj Al Wasl Trading L.L.C' }],
  creator: SITE_NAME,
  publisher: 'Burj Al Wasl Trading L.L.C',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
