'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import { FlowDistortionVisual } from '../components/visuals';

export default function OperationalChallenge() {
  const t = useTranslations('problemFraming');
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

  const consequenceItems = t.raw('consequences.items') as string[];

  return (
    <section ref={ref} className="strip strip-white section relative overflow-hidden py-12 sm:py-16">
      <div className="section-container relative z-10 px-5 sm:px-6 md:px-8">
        <div className={`reveal ${isVisible ? 'is-in' : ''}`}>
          <div className="max-w-4xl mx-auto">
            {/* Title Section with 3D Visual */}
            <div className="text-center mb-8">
              {/* Abstract 3D Flow Distortion Visual */}
              <div className="w-32 sm:w-40 mx-auto mb-6">
                <FlowDistortionVisual variant="challenge" />
              </div>
              
              <div className="inline-block mb-3 px-4 py-2 rounded-full bg-amber-50 border border-amber-200">
                <span className="text-xs sm:text-sm uppercase tracking-widest text-amber-700 font-bold">
                  {t('eyebrow')}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-6 leading-tight">
                {t('title')}
              </h2>
            </div>

            {/* Content */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
              <div className="space-y-5">
                {/* Intro paragraph */}
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                  {t('intro')}
                </p>
                
                {/* Consequences with bullet list */}
                <div>
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-3">
                    {t('consequences.intro')}
                  </p>
                  <ul className="space-y-2 ml-4">
                    {consequenceItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-amber-600" />
                        <span className="text-base sm:text-lg text-slate-700 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Conclusion paragraph */}
                <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium border-l-4 border-amber-400 pl-4">
                  {t('conclusion')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
