'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import WorldMapOverlay from '../components/WorldMapOverlay';
import WaterCaustics from '../components/WaterCaustics';
import MiniJellyfish from '../components/MiniJellyfish';
import SwirlEffect from '../components/SwirlEffect';
import PlanktonDrift from '../components/PlanktonDrift';

export default function GlobalImpact() {
  const t = useTranslations('impact');
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
      {/* Swirling particles showing the growing global crisis */}
      <SwirlEffect intensity="high" color="rgba(255, 127, 102, 0.08)" />
      
      {/* Bioluminescent plankton drift - representing living marine ecosystem */}
      <PlanktonDrift />
      
      {/* Mini jellyfish decorations */}
      <MiniJellyfish position="left" size="sm" opacity={0.08} />
      <MiniJellyfish position="right" size="md" opacity={0.1} />
      
      {/* Faint dotted world map overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <defs>
            <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#1aa3a3" />
            </pattern>
          </defs>
          {/* Rough continent shapes */}
          <ellipse cx="300" cy="200" rx="200" ry="150" fill="url(#dotPattern)" />
          <ellipse cx="600" cy="250" rx="180" ry="120" fill="url(#dotPattern)" />
          <ellipse cx="900" cy="300" rx="220" ry="140" fill="url(#dotPattern)" />
          <ellipse cx="500" cy="450" rx="160" ry="100" fill="url(#dotPattern)" />
        </svg>
      </div>
      
      <div className="section-container relative z-10">
        <div className={`reveal ${isVisible ? 'is-in' : ''}`}>
          <div className="max-w-6xl mx-auto">
            {/* Title Section */}
            <div className="text-center mb-12">
              <div className="mb-3 text-xs uppercase tracking-widest text-teal font-semibold">
                {t('eyebrow')}
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-navy mb-4">
                {t('title')}
              </h2>
            </div>
            
            {/* Three compact stat badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[0, 1, 2].map((idx) => (
                <div 
                  key={idx} 
                  className="group px-6 py-3 card-glass rounded-full text-sm font-semibold text-navy flex items-center gap-2 hover:-translate-y-0.5 transition-transform duration-300"
                >
                  <svg className="w-5 h-5 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t(`badges.${idx}`)}</span>
                </div>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {/* Left Column - Problem */}
              <div className={`reveal ${isVisible ? 'is-in' : ''} card-glass transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`} style={{ animationDelay: '0.1s' }}>
                <h3 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center text-coral text-sm">!</span>
                  The Problem
                </h3>
                <ul className="space-y-4">
                  {[0, 1, 2].map((idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 bg-coral rounded-full mt-2"></span>
                      <span className="text-slate-700 font-medium">{t(`problem_points.${idx}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column - Solution */}
              <div className={`reveal ${isVisible ? 'is-in' : ''} card-glass bg-teal/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`} style={{ animationDelay: '0.2s' }}>
                <h3 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center text-teal text-sm">✓</span>
                  Our Solution
                </h3>
                <ul className="space-y-4">
                  {[0, 1, 2].map((idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2"></span>
                      <span className="text-slate-700 font-semibold">{t(`solution_points.${idx}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
