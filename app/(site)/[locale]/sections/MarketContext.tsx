'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';

export default function MarketContext() {
  const t = useTranslations('marketContext');
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

  const paragraphs = t.raw('paragraphs') as string[];

  return (
    <section ref={ref} className="strip strip-white section relative overflow-hidden py-12 sm:py-16">
      <div className="section-container relative z-10 px-4">
        <div className={`reveal ${isVisible ? 'is-in' : ''}`}>
          <div className="max-w-4xl mx-auto">
            {/* Title Section */}
            <div className="text-center mb-8">
              <div className="inline-block mb-3 px-4 py-2 rounded-full bg-blue-50 border border-blue-200">
                <span className="text-xs sm:text-sm uppercase tracking-widest text-blue-700 font-bold">
                  {t('eyebrow')}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-6 leading-tight">
                {t('title')}
              </h2>
            </div>

            {/* Content */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
              <div className="space-y-4">
                {paragraphs.map((paragraph, idx) => (
                  <p key={idx} className="text-base sm:text-lg text-slate-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
