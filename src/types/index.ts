// =============================================================================
// Burj Al Wasl — Global TypeScript Types
// =============================================================================

// ── Common ──

export type WithClassName<T = object> = T & { className?: string };

export type WithChildren<T = object> = T & { children: React.ReactNode };

export type PropsWithClassName = { className?: string };

// ── Content Types ──

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SocialLink {
  platform: 'instagram' | 'linkedin' | 'facebook' | 'twitter' | 'youtube';
  url: string;
  label: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    region: string;
    country: string;
  };
  whatsapp?: string;
}

// ── Project Types ──

export type ProjectCategory = 'residential' | 'commercial' | 'hospitality';

export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  description: string;
  excerpt: string;
  coverImage: string;
  images: string[];
  location: string;
  completedAt: string;
  featured: boolean;
}

// ── Collection Types ──

export interface CollectionData {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  features: string[];
  category: string;
}

// ── Service Types ──

export interface ServiceData {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
  image: string;
}

// ── Testimonial Types ──

export interface TestimonialData {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  quote: string;
  rating: number;
}

// ── Blog Types ──

export interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  readingTime: number;
}

// ── Process Types ──

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: string;
}

// ── Form Types ──

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  projectType: ProjectCategory;
  message: string;
}

// ── SEO Types ──

export interface PageMetaOptions {
  title: string;
  description?: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

// ── Animation Types ──

export type AnimationDirection = 'left' | 'right' | 'up' | 'down';
export type CursorVariant = 'default' | 'hover' | 'drag' | 'hidden';

export interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export interface ParallaxOptions {
  speed?: number;
  direction?: 'x' | 'y';
}

export interface MagneticOptions {
  strength?: number;
  returnSpeed?: number;
}
