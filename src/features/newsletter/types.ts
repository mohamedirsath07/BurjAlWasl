// =============================================================================
// Burj Al Wasl — Newsletter Feature Types
// =============================================================================

export interface SubscriptionData {
  email: string;
  source: 'footer' | 'popup' | 'blog';
}

export type SubscriptionStatus = 'idle' | 'submitting' | 'success' | 'error';
