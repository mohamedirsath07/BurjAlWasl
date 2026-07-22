'use client';

import React from 'react';
import { useConsultationStore } from '@/store/useConsultationStore';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { Home, Building2, Briefcase, Hotel, Building } from 'lucide-react';
import { MagneticButton } from '@/components/atoms/MagneticButton';

const propertyOptions = [
  { id: 'Villa', icon: Home, label: 'Luxury Villa' },
  { id: 'Apartment', icon: Building2, label: 'Premium Apartment' },
  { id: 'Office', icon: Briefcase, label: 'Corporate Office' },
  { id: 'Hotel', icon: Hotel, label: 'Hospitality / Hotel' },
  { id: 'Commercial', icon: Building, label: 'Commercial Space' }
];

export function Step1Property() {
  const { data, updateData, nextStep } = useConsultationStore();

  const handleSelect = (id: string) => {
    updateData({ propertyType: id });
    setTimeout(() => {
      nextStep();
    }, 400); // Auto-advance after a brief delay for luxury feel
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-4xl font-light text-[#0f2a4a] mb-4">What type of space are we designing?</h2>
        <p className="text-slate-500 font-light">Select the property type to help us assign the right specialist.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {propertyOptions.map((option) => {
          const isSelected = data.propertyType === option.id;
          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={cn(
                "flex items-center gap-6 p-6 rounded-xl border transition-all duration-300 text-left group",
                isSelected 
                  ? "border-[#c5a55a] bg-[#c5a55a]/5 shadow-lg" 
                  : "border-black/5 hover:border-[#c5a55a]/50 hover:bg-slate-50 hover:shadow-md"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                isSelected ? "bg-[#c5a55a] text-white" : "bg-[#0f2a4a]/5 text-[#0f2a4a] group-hover:bg-[#c5a55a]/10 group-hover:text-[#c5a55a]"
              )}>
                <option.icon strokeWidth={1.5} size={24} />
              </div>
              <div>
                <h3 className={cn(
                  "font-bold text-sm tracking-wide transition-colors",
                  isSelected ? "text-[#c5a55a]" : "text-[#0f2a4a]"
                )}>
                  {option.label}
                </h3>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-12 flex justify-end">
        <MagneticButton 
          variant="primary" 
          onClick={nextStep} 
          disabled={!data.propertyType}
          className={cn("px-8 py-4 text-xs tracking-widest", !data.propertyType && "opacity-50 pointer-events-none")}
        >
          Continue
        </MagneticButton>
      </div>
    </motion.div>
  );
}
