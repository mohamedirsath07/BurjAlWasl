// =============================================================================
// Burj Al Wasl — Gallery Feature Types
// =============================================================================

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category: GalleryCategory;
  tags: string[];
  blurDataURL?: string;
}

export type GalleryCategory = 'residential' | 'commercial' | 'hospitality' | 'all';

export interface GalleryFilter {
  category: GalleryCategory;
  tags: string[];
  sortBy: 'newest' | 'popular';
}

export interface LightboxState {
  isOpen: boolean;
  currentIndex: number;
  items: GalleryItem[];
}
