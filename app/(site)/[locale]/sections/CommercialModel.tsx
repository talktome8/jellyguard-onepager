'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';

export default function CommercialModel() {
  const t = useTranslations('commercial');
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
    <section ref={ref} className="strip strip-navy section">
      <div className="section-container">
        <div className={`reveal ${isVisible ? 'is-in' : ''}`}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-3 text-xs uppercase tracking-widest text-teal font-semibold">
              {t('eyebrow')}
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              {t('title')}
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-white/90">
              {t('text')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
