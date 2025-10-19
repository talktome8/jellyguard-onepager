'use client';

import { useTranslations } from 'next-intl';
import SectionTitle from '../components/SectionTitle';
import { useState } from 'react';

export default function FourSteps() {
  const t = useTranslations('fourSteps');
  const [focusedStep, setFocusedStep] = useState<number | null>(null);

  const steps = [0, 1, 2, 3];
  
  const stepIcons = [
    // Sense icon (radar)
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" key="sense">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>,
    // Lift icon (arrow up)
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" key="lift">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>,
    // Skim icon (layers)
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" key="skim">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>,
    // Process icon (checkmark)
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" key="process">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
  ];

  // Micro-illustrations (simple decorative elements)
  const microIllustrations = [
    // Waves for sense
    <svg className="w-12 h-12 text-teal/20 absolute -top-2 -right-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" key="waves">
      <path d="M2 12c2-1 4-1 6 0s4 1 6 0 4-1 6 0" strokeWidth={1} />
      <path d="M2 16c2-1 4-1 6 0s4 1 6 0 4-1 6 0" strokeWidth={1} />
    </svg>,
    // Up arrow for lift
    <svg className="w-12 h-12 text-teal/20 absolute -top-2 -right-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" key="arrow">
      <path d="M12 5v14M5 12l7-7 7 7" strokeWidth={1} />
    </svg>,
    // Droplet for skim
    <svg className="w-12 h-12 text-teal/20 absolute -top-2 -right-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" key="droplet">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" strokeWidth={1} />
    </svg>,
    // Star for process
    <svg className="w-12 h-12 text-teal/20 absolute -top-2 -right-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" key="star">
      <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9" strokeWidth={1} />
    </svg>,
  ];

  return (
    <section className="strip strip-white section">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          <SectionTitle 
            kicker="HOW IT WORKS"
            title={t('title')}
            centered
            icon="wave"
          />
          
          <div className="relative">
            {/* Thin connector line behind cards on md+ */}
            <div 
              className="hidden md:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coral/40 to-transparent" 
              style={{ left: '12.5%', right: '12.5%' }} 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {steps.map((idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col items-center"
                  onFocus={() => setFocusedStep(idx)}
                  onBlur={() => setFocusedStep(null)}
                  onMouseEnter={() => setFocusedStep(idx)}
                  onMouseLeave={() => setFocusedStep(null)}
                >
                  {/* Numbered badge with icon */}
                  <div className="relative mb-6 z-10">
                    <div className="w-20 h-20 bg-teal rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                      {stepIcons[idx]}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-coral rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                      {idx + 1}
                    </div>
                    {/* Sparkle on focus */}
                    {focusedStep === idx && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-sparkle" />
                    )}
                  </div>
                  
                  {/* Card content with hover lift and micro-illustration */}
                  <div className="card-glass text-center w-full relative transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-within:-translate-y-0.5 focus-within:shadow-lg overflow-hidden">
                    {microIllustrations[idx]}
                    <h3 className="text-xl font-bold text-navy mb-2">
                      {t(`steps.${idx}.label`)}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t(`steps.${idx}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
