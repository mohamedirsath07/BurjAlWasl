import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ConsultationData {
  propertyType: string;
  serviceRequired: string;
  budgetRange: string;
  timeline: string;
  location: string;
  inspirationLinks: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactMethod: string;
  consultationTime: string;
}

interface ConsultationState {
  currentStep: number;
  data: ConsultationData;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (partialData: Partial<ConsultationData>) => void;
  resetForm: () => void;
}

const initialData: ConsultationData = {
  propertyType: '',
  serviceRequired: '',
  budgetRange: '',
  timeline: '',
  location: '',
  inspirationLinks: [''], // Start with one empty link input
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  contactMethod: '',
  consultationTime: ''
};

export const useConsultationStore = create<ConsultationState>()(
  persist(
    (set) => ({
      currentStep: 1,
      data: initialData,
      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 6) })), // 6 is success screen
      prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
      updateData: (partialData) => 
        set((state) => ({ 
          data: { ...state.data, ...partialData } 
        })),
      resetForm: () => set({ currentStep: 1, data: initialData })
    }),
    {
      name: 'burj-al-wasl-consultation-storage', // saves to localStorage
    }
  )
);
