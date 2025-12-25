'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function ProblemSolution() {
  const t = useTranslations('problemSolution');
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

  return (
    <section ref={ref} id="problem" className="strip strip-navy section relative overflow-hidden py-12 sm:py-16 md:py-20">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/bloom4.png"
          alt="Jellyfish bloom"
          fill
          className="object-cover opacity-30"
          priority={false}
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/85 to-navy/90" />
      </div>
      
      <div className="section-container relative z-10 px-4">
        <div className={`reveal ${isVisible ? 'is-in' : ''}`}>
          <div className="max-w-5xl mx-auto">
            {/* Problem Section */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-block mb-3 sm:mb-4 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30">
                <span className="text-xs sm:text-sm uppercase tracking-widest text-red-300 font-bold">
                  {t('problem.eyebrow')}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                {t('problem.title')}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                {t('problem.text')}
              </p>
            </div>

            {/* Impact Stats - Compact Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 text-center border border-white/20">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-teal mb-1 sm:mb-2">
                    {t(`problem.stats.${idx}.value`)}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-200 leading-tight">
                    {t(`problem.stats.${idx}.label`)}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider Arrow */}
            <div className="flex justify-center mb-8 sm:mb-12">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center shadow-lg animate-bounce">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            {/* Solution Section */}
            <div 
              className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10"
              style={{
                background: 'linear-gradient(135deg, rgba(26, 163, 163, 0.25) 0%, rgba(26, 163, 163, 0.15) 100%)',
                border: '2px solid rgba(26, 163, 163, 0.5)',
                boxShadow: '0 0 60px rgba(26, 163, 163, 0.3)'
              }}
            >
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-block mb-3 sm:mb-4 px-4 py-2 rounded-full bg-teal/30 border border-teal/50">
                  <span className="text-xs sm:text-sm uppercase tracking-widest text-teal-light font-bold">
                    {t('solution.eyebrow')}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                  {t('solution.title')}
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed">
                  {t('solution.text')}
                </p>
              </div>

              {/* Solution Benefits - 2x2 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[0, 1, 2, 3].map((idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white/10 rounded-xl p-3 sm:p-4">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-teal rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white mb-1">
                        {t(`solution.benefits.${idx}.title`)}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                        {t(`solution.benefits.${idx}.description`)}
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
