'use client';

import React from 'react';
import { useConsultationStore } from '@/store/useConsultationStore';
import { cn } from '@/lib/cn';

export function StepIndicator() {
  const { currentStep } = useConsultationStore();
  const totalSteps = 5;

  // Don't show indicator on success screen
  if (currentStep > totalSteps) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-6 mb-16">
      <div className="flex items-center justify-between relative">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/10 -translate-y-1/2 z-0" />
        
        {/* Progress Line */}
        <div 
          className="absolute top-1/2 left-0 h-[1px] bg-[#c5a55a] -translate-y-1/2 z-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />

        {/* Step Nodes */}
        {Array.from({ length: totalSteps }).map((_, i) => {
          const stepNumber = i + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={stepNumber} className="relative z-10 flex flex-col items-center">
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold tracking-widest transition-all duration-500",
                  isActive ? "bg-[#0f2a4a] text-white border-2 border-[#0f2a4a] scale-110" :
                  isCompleted ? "bg-[#c5a55a] text-white border-2 border-[#c5a55a]" :
                  "bg-white text-slate-400 border border-black/10"
                )}
              >
                {stepNumber}
              </div>
              <span className={cn(
                "absolute -bottom-8 text-[9px] uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-500",
                isActive ? "text-[#0f2a4a] font-bold" : "text-slate-400 font-medium"
              )}>
                {stepNumber === 1 && "Property"}
                {stepNumber === 2 && "Service"}
                {stepNumber === 3 && "Details"}
                {stepNumber === 4 && "Inspiration"}
                {stepNumber === 5 && "Contact"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
