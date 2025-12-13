'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import WaterCaustics from '../components/WaterCaustics';
import MiniJellyfish from '../components/MiniJellyfish';
import DepthLayers from '../components/DepthLayers';

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
    <section ref={ref} className="strip strip-navy section relative overflow-hidden">
      {/* Depth layers showing multi-layered solution approach */}
      <DepthLayers layers={5} color="rgba(26, 163, 163, 0.06)" />
      <MiniJellyfish position="right" size="sm" opacity={0.12} />
      
      <div className="section-container relative z-10">
        <div className={`reveal ${isVisible ? 'is-in' : ''}`}>
          <div className="max-w-6xl mx-auto">
            {/* Title Section */}
            <div className="text-center mb-12 sm:mb-20 px-4">
              <div className="inline-block mb-4 px-4 py-2 rounded-full bg-white/10 border border-white/20">
                <span className="text-sm uppercase tracking-widest text-teal-light font-bold">{t('eyebrow')}</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
                {t('title')}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 px-4">
              {items.map((idx) => (
                <div 
                  key={idx} 
                  className={`reveal ${isVisible ? 'is-in' : ''} group`}
                  style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-white/20 hover:border-teal/40 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl h-full">
                    <div className="flex items-start gap-4 sm:gap-6">
                      {/* Icon with coral tick */}
                      <div className="flex-shrink-0">
                        <div className="relative p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-teal/10 to-navy/10 group-hover:from-teal/20 group-hover:to-navy/20 transition-all duration-300">
                          <div className="transform group-hover:scale-110 transition-transform duration-300">
                            {icons[idx]}
                          </div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-coral to-coral-dark rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-125 transition-transform duration-300">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 group-hover:text-teal transition-colors duration-300">
                          {t(`items.${idx}.title`)}
                        </h3>
                        <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                          {t(`items.${idx}.text`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Hero Image Section */}
            <div className="mt-12 sm:mt-20 relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl mx-4">
              <Image
                src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=2070&auto=format&fit=crop"
                alt="Beautiful jellyfish in their natural habitat"
                fill
                className="object-cover"
                quality={90}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/40 to-transparent" />
              <div className="absolute inset-0 flex items-end justify-center p-6 sm:p-8 md:p-12">
                <div className="text-center max-w-3xl">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                    Protecting Infrastructure, Preserving Ocean Life
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
                    Our technology works in harmony with marine ecosystems, ensuring zero harm while delivering maximum protection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
