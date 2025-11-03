'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

export default function StickyCtaButton() {
  const t = useTranslations('hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past the hero section (roughly 800px)
      const heroHeight = 800;
      const contactSection = document.getElementById('contact');
      const contactTop = contactSection?.getBoundingClientRect().top ?? Infinity;
      
      // Show if past hero but before contact form is visible
      setIsVisible(window.scrollY > heroHeight && contactTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`sticky-cta ${isVisible ? 'visible' : ''}`}>
      <a 
        href="#contact" 
        className="sticky-cta-button"
        aria-label="Schedule consultation"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {t('cta_primary')}
      </a>
    </div>
  );
}
