'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import WaveFlow from '../components/WaveFlow';
import CoralGrowth from '../components/CoralGrowth';

export default function SafetyEcology() {
  const t = useTranslations('safety');
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
      {/* Gentle waves showing harmony with nature */}
      <WaveFlow direction="left" speed={0.6} amplitude={12} color="rgba(136, 212, 235, 0.1)" />
      {/* Growing coral animation - symbolizing conservation and marine life protection */}
      <CoralGrowth />
      <div className="section-container relative z-10">
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
            
            <div className="card border-2 border-teal/30 bg-white">
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('text')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
