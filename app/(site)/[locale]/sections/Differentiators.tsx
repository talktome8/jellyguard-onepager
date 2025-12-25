'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import DepthLayers from '../components/DepthLayers';
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
    <svg key="power" className="w-6 h-6 sm:w-8 sm:h-8 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>,
    // Eco-friendly icon
    <svg key="eco" className="w-6 h-6 sm:w-8 sm:h-8 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    // Scalable icon
    <svg key="scale" className="w-6 h-6 sm:w-8 sm:h-8 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>,
    // Proven icon
    <svg key="proven" className="w-6 h-6 sm:w-8 sm:h-8 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>,
  ];

  return (
    <section ref={ref} className="strip strip-navy section relative overflow-hidden py-10 sm:py-14 md:py-16">
      {/* Depth layers showing multi-layered solution approach */}
      <DepthLayers layers={5} color="rgba(26, 163, 163, 0.06)" />
      <MiniJellyfish position="right" size="sm" opacity={0.12} />
      
      <div className="section-container relative z-10 px-4">
        <div className={`reveal ${isVisible ? 'is-in' : ''}`}>
          <div className="max-w-5xl mx-auto">
            {/* Title Section */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-block mb-3 px-4 py-2 rounded-full bg-white/10 border border-white/20">
                <span className="text-xs sm:text-sm uppercase tracking-widest text-teal-light font-bold">{t('eyebrow')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight drop-shadow-lg">
                {t('title')}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {items.map((idx) => (
                <div 
                  key={idx} 
                  className={`reveal ${isVisible ? 'is-in' : ''} group`}
                  style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 hover:border-teal/40 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl h-full">
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Icon with coral tick */}
                      <div className="flex-shrink-0">
                        <div className="relative p-2 sm:p-3 rounded-xl bg-gradient-to-br from-teal/10 to-navy/10 group-hover:from-teal/20 group-hover:to-navy/20 transition-all duration-300">
                          <div className="transform group-hover:scale-110 transition-transform duration-300">
                            {icons[idx]}
                          </div>
                          <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-coral to-coral-dark rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-125 transition-transform duration-300">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2 group-hover:text-teal transition-colors duration-300">
                          {t(`items.${idx}.title`)}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-100 leading-relaxed">
                          {t(`items.${idx}.text`)}
                        </p>
                      </div>
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
