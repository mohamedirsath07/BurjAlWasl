'use client';

import { create } from 'zustand';
import type { CursorVariant } from '@/types';

interface UIState {
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

export const useUIStore = create<UIState>((set) => ({
  // Navigation
  isMobileMenuOpen: false,
  isScrolled: false,
  toggleMobileMenu: () =>
    set((state) => ({
      isMobileMenuOpen: !state.isMobileMenuOpen,
      isScrollLocked: !state.isMobileMenuOpen,
    })),
  closeMobileMenu: () =>
    set({ isMobileMenuOpen: false, isScrollLocked: false }),
  setScrolled: (scrolled) => set({ isScrolled: scrolled }),

  // Modals
  activeModal: null,
  openModal: (id) => set({ activeModal: id, isScrollLocked: true }),
  closeModal: () => set({ activeModal: null, isScrollLocked: false }),

  // Scroll Lock
  isScrollLocked: false,
  lockScroll: () => set({ isScrollLocked: true }),
  unlockScroll: () => set({ isScrollLocked: false }),

  // Cursor
  cursorVariant: 'default',
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
}));
