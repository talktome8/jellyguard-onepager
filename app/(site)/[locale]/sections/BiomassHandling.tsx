'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';

export default function BiomassHandling() {
  const t = useTranslations('biomassHandling');
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
    <section ref={ref} className="strip strip-navy section relative overflow-hidden py-10 sm:py-12">
      <div className="section-container relative z-10 px-5 sm:px-6 md:px-8">
        <div className={`reveal ${isVisible ? 'is-in' : ''}`}>
          <div className="max-w-4xl mx-auto">
            {/* Title Section */}
            <div className="text-center mb-6">
              <div className="inline-block mb-3 px-4 py-2 rounded-full bg-white/10 border border-white/20">
                <span className="text-xs sm:text-sm uppercase tracking-widest text-white/70 font-bold">
                  {t('eyebrow')}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                {t('title')}
              </h2>
            </div>

            {/* Content */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 sm:p-6">
              <div className="space-y-3">
                {paragraphs.map((paragraph, idx) => (
                  <p key={idx} className="text-sm sm:text-base text-white/80 leading-relaxed">
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
