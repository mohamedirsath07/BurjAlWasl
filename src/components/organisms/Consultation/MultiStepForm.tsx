'use client';

import React from 'react';
import { useConsultationStore } from '@/store/useConsultationStore';
import { AnimatePresence } from 'framer-motion';
import { StepIndicator } from './StepIndicator';
import { Step1Property } from './Step1Property';
import { Step2Service } from './Step2Service';
import { Step3Details } from './Step3Details';
import { Step4Inspiration } from './Step4Inspiration';
import { Step5Contact } from './Step5Contact';
import { ConsultationSuccess } from './ConsultationSuccess';

export function MultiStepForm() {
  const { currentStep } = useConsultationStore();

  return (
    <section className="py-24 bg-white relative min-h-[800px]">
      <StepIndicator />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <AnimatePresence mode="wait">
          {currentStep === 1 && <Step1Property key="step1" />}
          {currentStep === 2 && <Step2Service key="step2" />}
          {currentStep === 3 && <Step3Details key="step3" />}
          {currentStep === 4 && <Step4Inspiration key="step4" />}
          {currentStep === 5 && <Step5Contact key="step5" />}
          {currentStep === 6 && <ConsultationSuccess key="success" />}
        </AnimatePresence>
      </div>
    </section>
  );
}
