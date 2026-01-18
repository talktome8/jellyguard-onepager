'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import ContactForm from '../components/ContactForm';
import RippleEffect from '../components/RippleEffect';

export default function FinalCTA() {
  const t = useTranslations('cta');
  const tTrust = useTranslations('trust');
  const tEngagement = useTranslations('ctaEngagement');
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
    <section ref={ref} id="contact" className="strip strip-white section relative overflow-hidden">
      {/* Converging ripples calling to action */}
      <RippleEffect frequency={1800} color="rgba(26, 163, 163, 0.1)" />
      <div className="section-container">
        <div className={`reveal ${isVisible ? 'is-in' : ''}`}>
          <div className="max-w-4xl mx-auto">
            {/* Title Section with Enhanced Urgency */}
            <div className="text-center mb-8">
              <div className="mb-3 text-xs uppercase tracking-widest text-teal font-semibold">
                {t('eyebrow')}
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-navy mb-4">
                {t('title')}
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 font-medium">
                {t('text')}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 justify-center mb-6 text-xs text-slate-600 font-medium">
                {(tTrust.raw('certifications') as string[]).map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                    <svg className="w-3 h-3 text-teal" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {cert}
                  </div>
                ))}
              </div>

              {/* Engagement Text */}
              <p className="text-base text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                {tEngagement('text')}
              </p>
            </div>
            
            <ContactForm />

            {/* Partners Note */}
            <div className="text-center mt-8 text-sm text-slate-600 italic font-medium">
              {tTrust('partners')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
