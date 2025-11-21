'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';

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
          <div className="text-center mb-16">
            <div className="mb-3 text-xs uppercase tracking-widest text-teal font-semibold">
              {t('eyebrow')}
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              {t('title')}
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="card-glass bg-white/10 p-8 text-center">
                <div className="text-5xl font-bold text-teal mb-3">
                  {t(`stats.${idx}.value`)}
                </div>
                <div className="text-xl font-semibold text-white mb-2">
                  {t(`stats.${idx}.label`)}
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  {t(`stats.${idx}.description`)}
                </p>
              </div>
            ))}
          </div>

          {/* Problems Section */}
          <div className="max-w-5xl mx-auto mb-16">
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              {t('problems.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="bg-white/5 border-2 border-red-500/30 p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-8 h-8 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <h4 className="text-lg font-bold text-white">
                      {t(`problems.items.${idx}.problem`)}
                    </h4>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {t(`problems.items.${idx}.why`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Solution Section */}
          <div className="max-w-5xl mx-auto">
            <div className="card-glass bg-gradient-to-br from-teal/20 to-blue-500/20 p-12 border-2 border-teal/30">
              <div className="text-center mb-10">
                <h3 className="text-4xl font-bold text-white mb-3">
                  {t('solution.title')}
                </h3>
                <p className="text-2xl text-teal font-semibold">
                  {t('solution.subtitle')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[0, 1, 2, 3].map((idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-teal/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">
                        {t(`solution.benefits.${idx}.title`)}
                      </h4>
                      <p className="text-white/80 text-sm leading-relaxed">
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
