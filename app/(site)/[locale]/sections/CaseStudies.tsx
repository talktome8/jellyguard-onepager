'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function CaseStudies() {
  const t = useTranslations('caseStudies');
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
    <section ref={ref} className="strip strip-navy section relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className={`reveal ${isVisible ? 'is-in' : ''}`}>
          {/* Title */}
          <div className="text-center mb-16 px-4">
            <div className="mb-3 text-xs uppercase tracking-widest text-teal font-bold drop-shadow">
              {t('eyebrow')}
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 drop-shadow-lg">
              {t('title')}
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto drop-shadow">
              {t('subtitle')}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 max-w-6xl mx-auto px-4">
            {[0, 1, 2].map((idx) => {
              const images = [
                '/images/bloom1.png',
                '/images/bloom2.png',
                '/images/bloom3.png'
              ];
              return (
                <div key={idx} className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 text-center group hover:shadow-xl transition-all duration-300 rounded-2xl border border-white/40">
                  {/* Beautiful jellyfish image for all cards */}
                  <div className="relative h-40 sm:h-48 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 overflow-hidden rounded-t-2xl">
                    <Image
                      src={images[idx]!}
                      alt={`Jellyfish bloom ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-transparent" />
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold text-navy mb-3">
                    {t(`stats.${idx}.value`)}
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-navy mb-2">
                    {t(`stats.${idx}.label`)}
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    {t(`stats.${idx}.description`)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Problems Section */}
          <div className="max-w-6xl mx-auto mb-16 px-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12 drop-shadow-lg">
              {t('problems.title')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="bg-white/95 border-2 border-red-500 p-5 sm:p-6 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <h4 className="text-base sm:text-lg font-bold text-navy">
                      {t(`problems.items.${idx}.problem`)}
                    </h4>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {t(`problems.items.${idx}.why`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Solution Section */}
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-gradient-to-br from-teal/95 to-teal-dark/95 p-8 sm:p-12 border-2 border-teal rounded-2xl backdrop-blur-sm shadow-2xl">
              <div className="text-center mb-8 sm:mb-10">
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3 drop-shadow-lg">
                  {t('solution.title')}
                </h3>
                <p className="text-xl sm:text-2xl text-white font-bold drop-shadow">
                  {t('solution.subtitle')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {[0, 1, 2, 3].map((idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white mb-2 drop-shadow">
                        {t(`solution.benefits.${idx}.title`)}
                      </h4>
                      <p className="text-white text-sm leading-relaxed drop-shadow">
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
