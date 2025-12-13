'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';

export default function TechnicalSpecs() {
  const t = useTranslations('technical');
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
    <section ref={ref} className="strip strip-sand section relative overflow-hidden">
      <div className="section-container">
        <div className={`reveal ${isVisible ? 'is-in' : ''}`}>
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <div className="text-center mb-12">
              <div className="mb-3 text-xs uppercase tracking-widest text-teal font-semibold">
                {t('eyebrow')}
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-navy mb-4">
                {t('title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('subtitle')}
              </p>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {[0, 1, 2, 3].map((idx) => (
                <div key={idx} className="card text-center hover-lift">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal mb-2">
                    {t(`metrics.${idx}.value`)}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide">
                    {t(`metrics.${idx}.label`)}
                  </div>
                </div>
              ))}
            </div>

            {/* Specifications Table */}
            <div className="card mb-12 overflow-hidden">
              <table className="w-full">
                <thead className="bg-navy text-white">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold">{t('table.category')}</th>
                    <th className="text-left py-4 px-6 font-semibold">{t('table.specification')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => (
                    <tr key={idx} className="hover:bg-sand/30 transition-colors">
                      <td className="py-4 px-6 font-semibold text-navy">
                        {t(`specs.${idx}.category`)}
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        {t(`specs.${idx}.value`)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Comparison Table */}
            <div>
              <h3 className="text-2xl font-bold text-navy mb-6 text-center">
                {t('comparisonTitle')}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full card">
                  <thead className="bg-teal text-white">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold">{t('comparison.feature')}</th>
                      <th className="text-center py-4 px-4 font-semibold bg-teal">JellyGuard</th>
                      <th className="text-center py-4 px-4 font-semibold">{t('comparison.chemical')}</th>
                      <th className="text-center py-4 px-4 font-semibold">{t('comparison.mechanical')}</th>
                      <th className="text-center py-4 px-4 font-semibold">{t('comparison.manual')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[0, 1, 2, 3, 4, 5].map((idx) => (
                      <tr key={idx} className="hover:bg-sand/20 transition-colors">
                        <td className="py-4 px-6 font-medium text-navy">
                          {t(`comparison.rows.${idx}.feature`)}
                        </td>
                        <td className="py-4 px-4 text-center bg-teal/5">
                          {t(`comparison.rows.${idx}.jellyguard`) === 'check' ? (
                            <svg className="w-6 h-6 text-teal mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-sm">{t(`comparison.rows.${idx}.jellyguard`)}</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center text-gray-600 text-sm">
                          {t(`comparison.rows.${idx}.chemical`) === 'cross' ? (
                            <svg className="w-6 h-6 text-red-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          ) : (
                            <span>{t(`comparison.rows.${idx}.chemical`)}</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center text-gray-600 text-sm">
                          {t(`comparison.rows.${idx}.mechanical`) === 'cross' ? (
                            <svg className="w-6 h-6 text-red-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          ) : (
                            <span>{t(`comparison.rows.${idx}.mechanical`)}</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center text-gray-600 text-sm">
                          {t(`comparison.rows.${idx}.manual`) === 'cross' ? (
                            <svg className="w-6 h-6 text-red-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          ) : (
                            <span>{t(`comparison.rows.${idx}.manual`)}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
