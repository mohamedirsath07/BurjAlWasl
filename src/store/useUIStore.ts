// =============================================================================
// Burj Al Wasl — UI Store (Zustand)
// =============================================================================
// Cross-component UI state management.
// See: architecture/state-management.md for full spec.
//
// TODO: Install zustand in Phase 0 scaffold
// =============================================================================

// import { create } from 'zustand';

export type CursorVariant = 'default' | 'hover' | 'drag' | 'hidden';

export interface UIState {
  // Navigation
  isMobileMenuOpen: boolean;
  isScrolled: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  setScrolled: (scrolled: boolean) => void;

  // Modals
  activeModal: string | null;
  openModal: (id: string) => void;
  closeModal: () => void;

  // Scroll Lock
  isScrollLocked: boolean;
  lockScroll: () => void;
  unlockScroll: () => void;

  // Custom Cursor
  cursorVariant: CursorVariant;
  setCursorVariant: (variant: CursorVariant) => void;
}

// TODO: Uncomment when zustand is installed
// export const useUIStore = create<UIState>((set) => ({
//   isMobileMenuOpen: false,
//   isScrolled: false,
//   toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
//   closeMobileMenu: () => set({ isMobileMenuOpen: false }),
//   setScrolled: (scrolled) => set({ isScrolled: scrolled }),
//   activeModal: null,
//   openModal: (id) => set({ activeModal: id, isScrollLocked: true }),
//   closeModal: () => set({ activeModal: null, isScrollLocked: false }),
//   isScrollLocked: false,
//   lockScroll: () => set({ isScrollLocked: true }),
//   unlockScroll: () => set({ isScrollLocked: false }),
//   cursorVariant: 'default',
//   setCursorVariant: (variant) => set({ cursorVariant: variant }),
// }));
