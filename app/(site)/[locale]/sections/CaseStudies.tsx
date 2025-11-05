'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';

export default function CaseStudies() {
  const t = useTranslations('caseStudies');
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCase, setActiveCase] = useState(0);

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

  const cases = [0, 1, 2];

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

          {/* Case Study Tabs */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {cases.map((idx) => (
              <button
                key={idx}
                onClick={() => setActiveCase(idx)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCase === idx
                    ? 'bg-teal text-white shadow-lg scale-105'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {t(`cases.${idx}.industry`)}
              </button>
            ))}
          </div>

          {/* Active Case Study */}
          <div className="max-w-5xl mx-auto">
            <div className="card-glass bg-white/95 p-8 md:p-12">
              {/* Company Info */}
              <div className="flex items-start gap-4 mb-8 pb-8 border-b border-gray-200">
                <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-navy mb-2">
                    {t(`cases.${activeCase}.company`)}
                  </h3>
                  <p className="text-gray-600">
                    {t(`cases.${activeCase}.location`)} • {t(`cases.${activeCase}.size`)}
                  </p>
                </div>
              </div>

              {/* Challenge */}
              <div className="mb-8">
                <h4 className="text-sm uppercase tracking-wide text-teal font-semibold mb-3">
                  {t('challengeLabel')}
                </h4>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {t(`cases.${activeCase}.challenge`)}
                </p>
              </div>

              {/* Solution */}
              <div className="mb-8">
                <h4 className="text-sm uppercase tracking-wide text-teal font-semibold mb-3">
                  {t('solutionLabel')}
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {t(`cases.${activeCase}.solution`)}
                </p>
              </div>

              {/* Results - Metrics Grid */}
              <div className="mb-8">
                <h4 className="text-sm uppercase tracking-wide text-teal font-semibold mb-6">
                  {t('resultsLabel')}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[0, 1, 2, 3].map((metricIdx) => (
                    <div key={metricIdx} className="text-center p-4 bg-sand/30 rounded-xl">
                      <div className="text-3xl md:text-4xl font-bold text-teal mb-2">
                        {t(`cases.${activeCase}.metrics.${metricIdx}.value`)}
                      </div>
                      <div className="text-sm text-gray-600 leading-tight">
                        {t(`cases.${activeCase}.metrics.${metricIdx}.label`)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-teal/5 border-l-4 border-teal p-6 rounded-r-xl">
                <div className="flex items-start gap-3 mb-3">
                  <svg className="w-8 h-8 text-teal flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <div>
                    <p className="text-gray-800 italic leading-relaxed mb-3">
                      {t(`cases.${activeCase}.testimonial.quote`)}
                    </p>
                    <p className="text-sm font-semibold text-navy">
                      {t(`cases.${activeCase}.testimonial.author`)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t(`cases.${activeCase}.testimonial.role`)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
