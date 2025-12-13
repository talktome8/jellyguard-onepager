'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

// Generate consistent particle positions (not random on every render)
const PARTICLE_POSITIONS = Array.from({ length: 15 }, (_, i) => ({
  left: (i * 7.3 + 13) % 100, // Pseudo-random but deterministic
  top: (i * 11.7 + 19) % 100,
  delay: (i * 0.4) % 5,
  duration: 8 + (i % 8),
}));

export default function Hero() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Only mount particles on client side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Smooth scroll tracking with spring physics for buttery smooth motion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Apply spring physics for natural, sophisticated motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Sophisticated parallax transforms with varying speeds for depth
  const backgroundY = useTransform(smoothProgress, [0, 1], ['0%', '50%']);
  const meshY = useTransform(smoothProgress, [0, 1], ['0%', '30%']);
  const particlesY = useTransform(smoothProgress, [0, 1], ['0%', '40%']);
  const waveY = useTransform(smoothProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(smoothProgress, [0, 1], ['0%', '15%']);
  const contentOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const contentScale = useTransform(smoothProgress, [0, 0.5], [1, 0.95]);

  return (
    <div ref={sectionRef} className="relative">
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-20 sm:py-24">
        {/* Underwater jellyfish background image */}
        <div className="absolute inset-0 -z-30">
          <Image
            src="/images/bloom8.png"
            alt="Underwater jellyfish bloom"
            fill
            className="object-cover opacity-25"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#c8e9f5]/98 via-[#a8dff0]/95 to-[#88d4eb]/98" />
          <div className="absolute inset-0 bg-white/15" />
        </div>
        
        {/* Animated gradient mesh background with parallax */}
        <motion.div className="absolute inset-0 -z-20" style={{ y: backgroundY }}>
          {/* Base gradient sea with animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#c8e9f5] via-[#a8dff0] to-[#88d4eb] animate-[gradient_15s_ease_infinite] bg-[length:200%_200%]" />
          
          {/* Radial gradient overlays for depth - layered parallax */}
          <motion.div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(26,163,163,0.15)_0%,transparent_50%)]" style={{ y: meshY }} />
          <motion.div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(136,212,235,0.2)_0%,transparent_50%)]" style={{ y: meshY }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_60%)]" />
          
          {/* Vertical vignettes */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#edf5f7]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-navy/8" />
          
          {/* Animated light rays */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-white/40 via-white/10 to-transparent transform -skew-x-12 animate-[shimmer_8s_ease-in-out_infinite]" />
            <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-white/30 via-white/10 to-transparent transform -skew-x-12 animate-[shimmer_10s_ease-in-out_infinite] [animation-delay:2s]" />
          </div>
        </motion.div>
        
        {/* Particles removed for better text contrast and focus */}

        {/* Decorative elements removed for cleaner, more professional appearance */}
        
        {/* Parallax wave layers */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 -z-10"
          style={{ y: waveY }}
        >
          <svg
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
            className="w-full h-32 md:h-40 lg:h-48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,120 C240,80 480,80 600,120 C720,160 960,160 1200,120 L1200,200 L0,200 Z"
              fill="#edf5f7"
              opacity="0.3"
            />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-0 left-0 right-0 -z-10"
          style={{ y: waveY }}
        >
          <svg
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
            className="w-full h-32 md:h-40 lg:h-48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,140 C320,100 480,100 600,140 C720,180 880,180 1200,140 L1200,200 L0,200 Z"
              fill="#edf5f7"
              opacity="0.5"
            />
            <path
              d="M0,160 C240,130 480,130 600,160 C720,190 960,190 1200,160 L1200,200 L0,200 Z"
              fill="#edf5f7"
              opacity="0.8"
            />
          </svg>
        </motion.div>

        {/* Content with fade and scale animation */}
        <motion.div 
          className="section-container text-center z-10 px-4"
          style={{ 
            y: contentY,
            opacity: contentOpacity,
            scale: contentScale,
          }}
        >
          <div className="max-w-5xl mx-auto">
            {/* Badge removed for cleaner lead generation focus */}

            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-navy mb-5 leading-[0.95] tracking-tighter"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ 
                textShadow: '0 4px 20px rgba(255, 255, 255, 1), 0 8px 40px rgba(255, 255, 255, 0.8), 0 2px 8px rgba(255, 255, 255, 0.9)',
                filter: 'drop-shadow(0 3px 6px rgba(255, 255, 255, 0.7)) drop-shadow(0 1px 3px rgba(255, 255, 255, 0.9))'
              }}
            >
              {t('title')}
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-800 mb-10 leading-[1.35] max-w-4xl mx-auto font-bold px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ 
                textShadow: '0 2px 12px rgba(255, 255, 255, 1), 0 4px 24px rgba(255, 255, 255, 0.8), 0 1px 2px rgba(11, 27, 43, 0.1)',
                filter: 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.6))'
              }}
            >
              {t('subtitle')}
            </motion.p>
            
            {/* Dual CTAs with stagger animation */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <a 
                href="#contact" 
                className="btn-primary text-lg sm:text-xl px-10 py-4 sm:px-12 sm:py-5 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(26,163,163,0.5)] w-full sm:w-auto group relative overflow-hidden transform hover:scale-[1.02] transition-all duration-300 ring-2 ring-teal/20 hover:ring-teal/40"
              >
                <span className="relative z-10 font-bold flex items-center gap-2.5">
                  {t('cta_primary')}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#168a8a] to-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a 
                href="#opening" 
                className="glass border-2 border-navy/40 text-navy hover:bg-navy/10 hover:border-navy/70 font-bold text-lg sm:text-xl px-10 py-4 sm:px-12 sm:py-5 rounded-2xl transition-all duration-300 w-full sm:w-auto focus:ring-2 focus:ring-navy focus:ring-offset-2 group backdrop-blur-md shadow-lg hover:shadow-xl"
              >
                <span className="group-hover:tracking-wide transition-all duration-300">{t('cta_secondary')}</span>
              </a>
            </motion.div>

            {/* Key Stats - Trust Indicators */}
            <motion.div 
              className="grid grid-cols-[0.9fr_1.8fr_0.9fr] gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto px-2 sm:px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {(t.raw('stats') as Array<{value: string, label: string}>).map((stat, idx) => (
                <motion.div 
                  key={idx} 
                  className="text-center p-4 sm:p-6 md:p-7 lg:p-8 rounded-2xl sm:rounded-3xl glass backdrop-blur-xl border-3 border-white/70 hover:border-teal/70 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group min-w-0 bg-gradient-to-br from-white/90 to-white/75 shadow-xl"
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  style={{ 
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.8) inset'
                  }}
                >
                  {/* Icon based on index */}
                  <div className="mb-2 sm:mb-3 flex justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                    {idx === 0 && (
                      <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-teal" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                      </svg>
                    )}
                    {idx === 1 && (
                      <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-teal" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                    )}
                    {idx === 2 && (
                      <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-teal" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  
                  <div className="mb-2 sm:mb-3">
                    <div 
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black bg-gradient-to-br from-teal via-navy to-teal bg-clip-text text-transparent leading-none px-2 group-hover:scale-110 transition-transform duration-300"
                      style={{ textShadow: '0 2px 8px rgba(255, 255, 255, 0.5)', wordBreak: 'keep-all', whiteSpace: 'nowrap' }}
                    >
                      {stat.value}
                    </div>
                  </div>
                  <div 
                    className="text-xs sm:text-sm md:text-base lg:text-lg text-navy font-extrabold uppercase tracking-wide leading-snug break-words hyphens-auto px-2"
                    style={{ textShadow: '0 1px 4px rgba(255, 255, 255, 0.8)' }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
