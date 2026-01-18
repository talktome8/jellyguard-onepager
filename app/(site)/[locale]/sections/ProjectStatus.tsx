'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import { StackedPlanesVisual } from '../components/visuals';

export default function ProjectStatus() {
  const t = useTranslations('projectStatus');
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
      <div className="section-container relative z-10 px-5 sm:px-6 md:px-8">
        <div className={`reveal ${isVisible ? 'is-in' : ''}`}>
          <div className="max-w-4xl mx-auto">
            {/* Title Section with 3D Visual */}
            <div className="text-center mb-8">
              {/* Abstract 3D Stacked Planes Visual */}
              <div className="w-36 sm:w-44 mx-auto mb-6">
                <StackedPlanesVisual variant="progress" />
              </div>
              
              <div className="inline-block mb-3 px-4 py-2 rounded-full bg-white/10 border border-white/20">
                <span className="text-xs sm:text-sm uppercase tracking-widest text-teal-light font-bold">
                  {t('eyebrow')}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {t('title')}
              </h2>
            </div>

            {/* Main Status Content */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 sm:p-8 mb-6">
              <div className="space-y-4">
                {paragraphs.map((paragraph, idx) => (
                  <p key={idx} className="text-base sm:text-lg text-white/90 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Pilot Context Subsection */}
            <div className="bg-teal/15 border border-teal/30 rounded-xl p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                {t('pilotContext.title')}
              </h3>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                {t('pilotContext.text')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
