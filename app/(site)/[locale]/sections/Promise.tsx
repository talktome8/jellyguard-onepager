'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import CurrentFlow from '../components/CurrentFlow';

export default function Promise() {
  const t = useTranslations('promise');
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
      {/* Current flow animation showing how the system works with natural currents */}
      <CurrentFlow />
      
      {/* Radial gradient for spotlight effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,163,163,0.15)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="section-container relative z-10">
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
