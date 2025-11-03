'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';

export default function FourSteps() {
  const t = useTranslations('steps');
  const [focusedStep, setFocusedStep] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const labels = [t('labels.0'), t('labels.1'), t('labels.2'), t('labels.3')];
  const descriptions = [t('descriptions.0'), t('descriptions.1'), t('descriptions.2'), t('descriptions.3')];
  
  const stepIcons = [
    // Monitor icon (radar)
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" key="monitor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>,
    // Guide icon (compass)
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" key="guide">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>,
    // Concentrate icon (layers)
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" key="concentrate">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>,
    // Remove icon (checkmark)
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" key="remove">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
  ];

  // Micro-illustrations (simple decorative elements)
  const microIllustrations = [
    // Waves for monitor
    <svg className="w-12 h-12 text-teal/20 absolute -top-2 -right-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" key="waves">
      <path d="M2 12c2-1 4-1 6 0s4 1 6 0 4-1 6 0" strokeWidth={1} />
      <path d="M2 16c2-1 4-1 6 0s4 1 6 0 4-1 6 0" strokeWidth={1} />
    </svg>,
    // Up arrow for guide
    <svg className="w-12 h-12 text-teal/20 absolute -top-2 -right-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" key="arrow">
      <path d="M12 5v14M5 12l7-7 7 7" strokeWidth={1} />
    </svg>,
    // Droplet for concentrate
    <svg className="w-12 h-12 text-teal/20 absolute -top-2 -right-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" key="droplet">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" strokeWidth={1} />
    </svg>,
    // Star for remove
    <svg className="w-12 h-12 text-teal/20 absolute -top-2 -right-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" key="star">
      <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9" strokeWidth={1} />
    </svg>,
  ];

  return (
    <section ref={ref} className="strip strip-white section relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[linear-gradient(to_right,#1aa3a3_1px,transparent_1px),linear-gradient(to_bottom,#1aa3a3_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="section-container relative z-10">
        <div className={`reveal ${isVisible ? 'is-in' : ''}`}>
          <div className="max-w-6xl mx-auto">
            {/* Title Section */}
            <div className="text-center mb-16">
              <div className="mb-3 text-xs uppercase tracking-widest text-teal font-semibold">
                {t('eyebrow')}
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-navy mb-4">
                {t('title')}
              </h2>
            </div>
            
            <div className="relative">
              {/* Thin connector line behind cards on md+ */}
              <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-coral/40 to-transparent" />
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                {[0, 1, 2, 3].map((idx) => (
                  <div 
                    key={idx}
                    className={`reveal ${isVisible ? 'is-in' : ''} flex flex-col items-center`}
                    style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
                    onFocus={() => setFocusedStep(idx)}
                    onBlur={() => setFocusedStep(null)}
                    onMouseEnter={() => setFocusedStep(idx)}
                    onMouseLeave={() => setFocusedStep(null)}
                  >
                    {/* Numbered badge with icon */}
                    <div className="relative mb-6 z-10">
                      <div className="w-20 h-20 bg-teal rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:scale-110">
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
                        {labels[idx]}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {descriptions[idx]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
