// =============================================================================
// Burj Al Wasl — Booking Feature Types
// =============================================================================
// See: architecture/feature-architecture.md
// =============================================================================

import type { ProjectCategory } from '@/types';

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  projectType: ProjectCategory;
  date: Date;
  timeSlot: TimeSlot;
  message?: string;
}

export interface TimeSlot {
  id: string;
  start: string;
  end: string;
  available: boolean;
}

export type BookingStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface BookingState {
  data: Partial<BookingFormData>;
  status: BookingStatus;
  currentStep: number;
  error?: string;
}
