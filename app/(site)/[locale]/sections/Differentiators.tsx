'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import WaterCaustics from '../components/WaterCaustics';
import MiniJellyfish from '../components/MiniJellyfish';

export default function Differentiators() {
  const t = useTranslations('why');
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

  const items = [0, 1, 2, 3];
  
  const icons = [
    // Low-power icon
    <svg key="power" className="w-8 h-8 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>,
    // Eco-friendly icon
    <svg key="eco" className="w-8 h-8 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    // Scalable icon
    <svg key="scale" className="w-8 h-8 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>,
    // Proven icon
    <svg key="proven" className="w-8 h-8 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>,
  ];

  return (
    <section ref={ref} className="strip strip-sand section relative overflow-hidden">
      {/* Water caustics and jellyfish */}
      <WaterCaustics />
      <MiniJellyfish position="right" size="sm" opacity={0.12} />
      
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((idx) => (
                <div 
                  key={idx} 
                  className={`reveal ${isVisible ? 'is-in' : ''} card-glass card-hover`}
                  style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon with coral tick - animate on hover */}
                    <div className="flex-shrink-0">
                      <div className="relative transition-transform duration-300 group-hover:scale-110">
                        {icons[idx]}
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-coral rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-125">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div>
                      <h3 className="text-xl font-bold text-navy mb-2 transition-colors duration-300 group-hover:text-teal">
                        {t(`items.${idx}.title`)}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {t(`items.${idx}.text`)}
                      </p>
                    </div>
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
