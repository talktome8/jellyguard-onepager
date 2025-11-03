'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import ContactForm from '../components/ContactForm';
import TestimonialBar from '../components/TestimonialBar';
import RippleEffect from '../components/RippleEffect';

export default function FinalCTA() {
  const t = useTranslations('cta');
  const tTrust = useTranslations('trust');
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
    <>
      {/* Trust strip - HIDDEN until real testimonials available */}
      {/* <TestimonialBar /> */}
      
      <section ref={ref} id="contact" className="strip strip-white section relative overflow-hidden">
        {/* Converging ripples calling to action */}
        <RippleEffect frequency={1800} color="rgba(26, 163, 163, 0.1)" />
        <div className="section-container">
          <div className={`reveal ${isVisible ? 'is-in' : ''}`}>
            <div className="max-w-4xl mx-auto">
              {/* Title Section */}
              <div className="text-center mb-8">
                <div className="mb-3 text-xs uppercase tracking-widest text-teal font-semibold">
                  {t('eyebrow')}
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-navy mb-4">
                  {t('title')}
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-6 font-medium">
                  {t('text')}
                </p>

                {/* Urgency & Guarantee Badges */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <div className="flex items-center gap-2 text-sm text-coral font-semibold bg-coral/10 px-4 py-2 rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {t('urgency')}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-teal font-semibold bg-teal/10 px-4 py-2 rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {t('guarantee')}
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-3 justify-center mb-8 text-xs text-slate-600 font-medium">
                  {(tTrust.raw('certifications') as string[]).map((cert, idx) => (
                    <div key={idx} className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                      <svg className="w-3 h-3 text-teal" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {cert}
                    </div>
                  ))}
                </div>
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
    </>
  );
}
