'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import CurrentFlow from '../components/CurrentFlow';
import Image from 'next/image';

export default function Promise() {
  const t = useTranslations('promise');
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
    <section 
      ref={ref} 
      className="strip strip-navy section relative overflow-hidden"
      style={{
        borderTop: '5px solid #1aa3a3',
        borderBottom: '5px solid #1aa3a3',
        boxShadow: '0 0 100px rgba(26, 163, 163, 0.5), 0 20px 60px rgba(0, 0, 0, 0.8)'
      }}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/bloom5.png"
          alt="Jellyfish bloom"
          fill
          className="object-cover opacity-40"
          priority={false}
          quality={95}
        />
      </div>
      
      <CurrentFlow />
      
      <div className="section-container relative z-10">
        <div className={`reveal ${isVisible ? 'is-in' : ''}`}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div 
                className="inline-block mb-6 px-6 py-3 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #1aa3a3 0%, #22b9b9 50%, #1aa3a3 100%)',
                  border: '2px solid #7dd3d3',
                  boxShadow: '0 0 30px rgba(26, 163, 163, 0.6)'
                }}
              >
                <span className="text-sm uppercase tracking-widest font-bold text-white">
                  {t('eyebrow')}
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white drop-shadow-2xl">
                {t('title')}
              </h2>
            </div>
            <div 
              className="rounded-3xl p-8 md:p-12"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.12) 100%)',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 40px rgba(26, 163, 163, 0.3)'
              }}
            >
              <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-center text-white font-light">
                {t('text')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
