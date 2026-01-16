'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';

export default function CircularEconomy() {
  const t = useTranslations('circularEconomy');
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

  const badges = [
    { icon: '🔄', key: 'circular' },
    { icon: '🌊', key: 'blueEconomy' },
    { icon: '🌱', key: 'greenTech' },
    { icon: '♻️', key: 'zeroWaste' },
  ];

  return (
    <section ref={ref} className="strip strip-white section relative overflow-hidden py-10 sm:py-14 md:py-16">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-teal/5 via-transparent to-blue-500/5" />
      
      <div className="section-container relative z-10 px-4">
        <div className={`reveal ${isVisible ? 'is-in' : ''}`}>
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-block mb-3 px-4 py-2 rounded-full bg-gradient-to-r from-teal/20 to-blue-500/20 border border-teal/30">
                <span className="text-xs sm:text-sm uppercase tracking-widest text-teal-dark font-bold">
                  {t('eyebrow')}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-4 leading-tight">
                {t('title')}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
                {t('subtitle')}
              </p>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
              {badges.map((badge, idx) => (
                <div 
                  key={badge.key}
                  className={`reveal ${isVisible ? 'is-in' : ''} bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center border border-gray-200 shadow-md hover:shadow-xl hover:border-teal/40 transition-all duration-300 transform hover:-translate-y-1`}
                  style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
                >
                  <div className="text-3xl sm:text-4xl mb-2">{badge.icon}</div>
                  <div className="text-sm sm:text-base font-bold text-navy">
                    {t(`badges.${badge.key}.title`)}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 hidden sm:block">
                    {t(`badges.${badge.key}.description`)}
                  </div>
                </div>
              ))}
            </div>

            {/* Main Value Proposition Card */}
            <div 
              className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center"
              style={{
                background: 'linear-gradient(135deg, #0b1b2b 0%, #1a3a4a 100%)',
                boxShadow: '0 20px 60px rgba(11, 27, 43, 0.3)'
              }}
            >
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-teal to-blue-500 flex items-center justify-center">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                {t('biomass.title')}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-white max-w-2xl mx-auto mb-6 leading-relaxed">
                {t('biomass.text')}
              </p>
              
              {/* Applications Row */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {[0, 1, 2, 3].map((idx) => (
                  <div 
                    key={idx}
                    className="px-3 sm:px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-xs sm:text-sm font-medium"
                  >
                    {t(`biomass.applications.${idx}`)}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 text-xs sm:text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{t('certifications.0')}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{t('certifications.1')}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{t('certifications.2')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
