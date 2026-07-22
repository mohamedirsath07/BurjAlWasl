'use client';

import React from 'react';
import { useConsultationStore } from '@/store/useConsultationStore';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { Layers, Settings, Maximize, PaintBucket, Grid, Scissors } from 'lucide-react';
import { MagneticButton } from '@/components/atoms/MagneticButton';

const serviceOptions = [
  { id: 'Curtains', icon: Layers, label: 'Luxury Curtains' },
  { id: 'Motorized', icon: Settings, label: 'Motorized Systems' },
  { id: 'Blinds', icon: Maximize, label: 'Custom Blinds' },
  { id: 'Wallpaper', icon: PaintBucket, label: 'Premium Wallpapers' },
  { id: 'Flooring', icon: Grid, label: 'Hardwood / Flooring' },
  { id: 'Upholstery', icon: Scissors, label: 'Custom Upholstery' }
];

export function Step2Service() {
  const { data, updateData, nextStep, prevStep } = useConsultationStore();

  const handleSelect = (id: string) => {
    updateData({ serviceRequired: id });
    setTimeout(() => {
      nextStep();
    }, 400); // Auto-advance
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
        <h2 className="font-heading text-3xl md:text-4xl font-light text-[#0f2a4a] mb-4">What service do you need?</h2>
        <p className="text-slate-500 font-light">Select your primary area of focus for this consultation.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {serviceOptions.map((option) => {
          const isSelected = data.serviceRequired === option.id;
          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={cn(
                "flex flex-col items-center gap-4 p-8 rounded-xl border transition-all duration-300 text-center group",
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
              <h3 className={cn(
                "font-bold text-xs tracking-widest uppercase transition-colors",
                isSelected ? "text-[#c5a55a]" : "text-[#0f2a4a]"
              )}>
                {option.label}
              </h3>
            </button>
          );
        })}
      </div>

      <div className="mt-12 flex items-center justify-between">
        <button 
          onClick={prevStep}
          className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-[#0f2a4a] transition-colors"
        >
          Back
        </button>
        <MagneticButton 
          variant="primary" 
          onClick={nextStep} 
          disabled={!data.serviceRequired}
          className={cn("px-8 py-4 text-xs tracking-widest", !data.serviceRequired && "opacity-50 pointer-events-none")}
        >
          Continue
        </MagneticButton>
      </div>
    </motion.div>
  );
}
