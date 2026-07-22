'use client';

import React from 'react';
import { useConsultationStore } from '@/store/useConsultationStore';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { MagneticButton } from '@/components/atoms/MagneticButton';

export function Step3Details() {
  const { data, updateData, nextStep, prevStep } = useConsultationStore();

  const isComplete = data.budgetRange && data.timeline && data.location;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-4xl font-light text-[#0f2a4a] mb-4">Project Details</h2>
        <p className="text-slate-500 font-light">Help us understand the scale and urgency of your requirement.</p>
      </div>

      <div className="space-y-8">
        
        {/* Budget Range */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#0f2a4a] mb-4">Estimated Budget (AED)</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['10k - 50k', '50k - 150k', '150k - 500k', '500k+'].map((budget) => (
              <button
                key={budget}
                onClick={() => updateData({ budgetRange: budget })}
                className={cn(
                  "py-3 px-4 rounded-lg border text-sm transition-all",
                  data.budgetRange === budget 
                    ? "border-[#c5a55a] bg-[#c5a55a] text-white shadow-md" 
                    : "border-black/10 text-slate-500 hover:border-[#c5a55a]/50"
                )}
              >
                {budget}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#0f2a4a] mb-4">Expected Timeline</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['ASAP', 'Within 1 Month', '1 - 3 Months', 'Planning Phase'].map((time) => (
              <button
                key={time}
                onClick={() => updateData({ timeline: time })}
                className={cn(
                  "py-3 px-4 rounded-lg border text-sm transition-all",
                  data.timeline === time 
                    ? "border-[#c5a55a] bg-[#c5a55a] text-white shadow-md" 
                    : "border-black/10 text-slate-500 hover:border-[#c5a55a]/50"
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#0f2a4a] mb-4">Project Location (Neighborhood/City)</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => updateData({ location: e.target.value })}
            placeholder="e.g. Palm Jumeirah, Downtown Dubai"
            className="w-full bg-slate-50 border border-black/10 rounded-lg px-6 py-4 text-slate-700 focus:outline-none focus:border-[#c5a55a] transition-colors"
          />
        </div>

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
          disabled={!isComplete}
          className={cn("px-8 py-4 text-xs tracking-widest", !isComplete && "opacity-50 pointer-events-none")}
        >
          Continue
        </MagneticButton>
      </div>
    </motion.div>
  );
}
