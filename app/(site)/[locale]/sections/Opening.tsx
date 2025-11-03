'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import BubbleRise from '../components/BubbleRise';

export default function Opening() {
  const t = useTranslations('opening');
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
    <section ref={ref} id="opening" className="strip strip-white section relative overflow-hidden">
      {/* Bubble rise animation showing jellyfish blooms rising */}
      <BubbleRise density="high" color="rgba(26, 163, 163, 0.12)" />
      
      <div className="section-container relative z-10">
        <div className={`reveal ${isVisible ? 'is-in' : ''}`}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-3 text-xs uppercase tracking-widest text-teal font-semibold">
              {t('eyebrow')}
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-navy mb-6">
              {t('title')}
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {t('text')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
