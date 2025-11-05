'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useEffect, useRef } from 'react';

export default function FAQ() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const faqs = [
    { category: 'technical', count: 5 },
    { category: 'installation', count: 4 },
    { category: 'cost', count: 4 },
    { category: 'performance', count: 4 }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="strip strip-white section relative overflow-hidden">
      <div className="section-container">
        <div className={`reveal ${isVisible ? 'is-in' : ''}`}>
          <div className="max-w-4xl mx-auto">
            {/* Title */}
            <div className="text-center mb-12">
              <div className="mb-3 text-xs uppercase tracking-widest text-teal font-semibold">
                {t('eyebrow')}
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-navy mb-4">
                {t('title')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('subtitle')}
              </p>
            </div>

            {/* FAQ Categories */}
            <div className="space-y-3">
              {faqs.flatMap((category, catIndex) =>
                Array.from({ length: category.count }, (_, i) => {
                  const globalIndex = faqs.slice(0, catIndex).reduce((sum, c) => sum + c.count, 0) + i;
                  const isOpen = openIndex === globalIndex;
                  
                  return (
                    <div
                      key={globalIndex}
                      className="card border border-gray-200 hover:border-teal/50 transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleFAQ(globalIndex)}
                        className="w-full text-left flex items-start justify-between gap-4 p-6 group"
                        aria-expanded={isOpen}
                      >
                        <div className="flex-1">
                          <div className="text-xs uppercase tracking-wide text-teal/70 mb-1">
                            {t(`categories.${category.category}`)}
                          </div>
                          <h3 className="text-lg font-semibold text-navy group-hover:text-teal transition-colors">
                            {t(`items.${globalIndex}.question`)}
                          </h3>
                        </div>
                        <svg
                          className={`w-6 h-6 text-teal transition-transform duration-300 flex-shrink-0 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                          {t(`items.${globalIndex}.answer`)}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Still have questions CTA */}
            <div className="text-center mt-12 p-8 bg-sand/50 rounded-2xl">
              <h3 className="text-xl font-bold text-navy mb-2">
                {t('stillQuestions')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('contactPrompt')}
              </p>
              <a href="#contact" className="btn-primary inline-block">
                {t('contactButton')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
