'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import RippleEffect from '../components/RippleEffect';

export default function WhoWeServe() {
  const t = useTranslations('serve');
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
      {/* Ripple effect showing expanding reach and impact */}
      <RippleEffect frequency={2500} color="rgba(26, 163, 163, 0.12)" />
      <div className="section-container">
        <div className={`reveal ${isVisible ? 'is-in' : ''}`}>
          <div className="max-w-4xl mx-auto">
            {/* Title Section */}
            <div className="text-center mb-12">
              <div className="mb-3 text-xs uppercase tracking-widest text-teal font-semibold">
                {t('eyebrow')}
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-navy mb-4">
                {t('title')}
              </h2>
            </div>
            
            <div className="card mb-6 hover-lift">
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('text_primary')}
              </p>
            </div>

            <div className="card-soft">
              <p className="text-gray-700 leading-relaxed">
                {t('text_secondary')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
