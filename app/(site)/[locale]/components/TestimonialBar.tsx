'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

export default function TestimonialBar() {
  const t = useTranslations('testimonials');
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = t.raw('items') as Array<{quote: string, author: string, company: string}>;

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="bg-gradient-to-r from-navy to-teal py-12 overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-6">
          <h3 className="text-sm uppercase tracking-widest text-white/80 font-semibold mb-2">
            {t('title')}
          </h3>
        </div>
        
        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="min-w-full px-8">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-xl md:text-2xl text-white font-medium mb-6 italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-white/90">
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-white/70">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
