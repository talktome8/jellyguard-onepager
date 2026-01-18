'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';

export default function WhatIsJellyGuard() {
  const t = useTranslations('whatIsJellyGuard');
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
    <section ref={ref} className="strip strip-navy section relative overflow-hidden py-12 sm:py-16">
      <div className="section-container relative z-10 px-4">
        <div className={`reveal ${isVisible ? 'is-in' : ''}`}>
          <div className="max-w-4xl mx-auto">
            {/* Title Section */}
            <div className="text-center mb-8">
              <div className="inline-block mb-3 px-4 py-2 rounded-full bg-teal/20 border border-teal/40">
                <span className="text-xs sm:text-sm uppercase tracking-widest text-teal-light font-bold">
                  {t('eyebrow')}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {t('title')}
              </h2>
            </div>

            {/* Content */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 sm:p-8">
              <div className="space-y-4">
                {paragraphs.map((paragraph, idx) => (
                  <p key={idx} className="text-base sm:text-lg text-white/90 leading-relaxed">
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
