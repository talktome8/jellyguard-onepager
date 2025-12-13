'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
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
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-8 sm:gap-12 items-center">
              {/* Left: Visual */}
              <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl order-2 sm:order-1">
                <Image
                  src="/images/bloom4.png"
                  alt="Massive jellyfish bloom causing problems"
                  fill
                  className="object-cover"
                  priority
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/30 to-transparent" />
              </div>
              
              {/* Right: Content */}
              <div className="text-center sm:text-left order-1 sm:order-2 px-4 sm:px-0">
                <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-teal/10 border border-teal/20">
                  <span className="text-xs sm:text-sm uppercase tracking-widest text-teal-dark font-bold">{t('eyebrow')}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-navy mb-6 sm:mb-8 leading-tight tracking-tight">
                  {t('title')}
                </h2>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg border border-navy/10">
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-700 leading-relaxed">
                    {t('text')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
