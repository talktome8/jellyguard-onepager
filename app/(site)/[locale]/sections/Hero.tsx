'use client';

import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Smooth scroll tracking with spring physics
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax transforms
  const imageY = useTransform(smoothProgress, [0, 1], ['0%', '30%']);
  const imageScale = useTransform(smoothProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(smoothProgress, [0, 1], ['0%', '20%']);
  const contentOpacity = useTransform(smoothProgress, [0, 0.6, 1], [1, 1, 0.3]);

  return (
    <div ref={sectionRef} className="relative">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        
        {/* Full-bleed jellyfish background image - PROMINENT */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: imageY, scale: imageScale }}
        >
          <Image
            src="/images/bloom4.png"
            alt="Jellyfish swarm in ocean"
            fill
            className="object-cover"
            priority
            quality={95}
            sizes="100vw"
          />
          {/* Dark gradient overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/40" />
        </motion.div>

        {/* Secondary floating jellyfish image on the right - desktop only */}
        <motion.div 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[80%] hidden lg:block z-0 opacity-60"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <Image
            src="/images/bloom8.png"
            alt="Jellyfish bloom"
            fill
            className="object-contain object-right"
            quality={90}
          />
        </motion.div>

        {/* Animated light particles */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-teal/40 rounded-full"
              style={{
                left: `${(i * 5.3 + 10) % 100}%`,
                top: `${(i * 7.1 + 15) % 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Content container */}
        <motion.div 
          className="relative z-10 w-full"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <div className="section-container px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
            <div className="max-w-4xl">
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/20 border border-teal/40 backdrop-blur-sm">
                  <span className="w-2 h-2 bg-teal rounded-full animate-pulse"></span>
                  <span className="text-teal font-semibold text-sm">{t('badge')}</span>
                </span>
              </motion.div>

              {/* Main headline - HIGH CONTRAST WHITE TEXT */}
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                {t('title')}
              </motion.h1>

              {/* Subtitle - CLEAR READABLE TEXT */}
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl font-medium"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t('subtitle')}
              </motion.p>

              {/* Value bullets */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {(t.raw('valueBullets') as Array<{icon: string, text: string}>)?.map((bullet, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal/30 border border-teal/50 flex items-center justify-center">
                      {bullet.icon === 'shield' && (
                        <svg className="w-4 h-4 text-teal" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                      {bullet.icon === 'alert' && (
                        <svg className="w-4 h-4 text-teal" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                      {bullet.icon === 'leaf' && (
                        <svg className="w-4 h-4 text-teal" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-white/90 font-medium text-sm sm:text-base">
                      {bullet.text}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <a 
                  href="#contact" 
                  className="group relative inline-flex items-center justify-center gap-2 bg-teal hover:bg-teal/90 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-teal/30 hover:shadow-xl hover:shadow-teal/40 hover:scale-[1.02]"
                >
                  {t('cta_primary')}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a 
                  href="#problem" 
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:border-white/50 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300"
                >
                  {t('cta_secondary')}
                </a>
              </motion.div>
            </div>

            {/* Stats cards - positioned lower right on desktop */}
            <motion.div 
              className="mt-16 lg:mt-0 lg:absolute lg:bottom-8 lg:right-8 xl:right-16"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md lg:max-w-lg">
                {(t.raw('stats') as Array<{value: string, label: string}>).map((stat, idx) => (
                  <motion.div 
                    key={idx} 
                    className="text-center p-4 sm:p-5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -4 }}
                  >
                    <div className="text-xl sm:text-2xl md:text-3xl font-black text-teal mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-white/80 font-semibold uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom wave transition */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-16 sm:h-20 md:h-24"
            fill="#edf5f7"
          >
            <path d="M0,60 C300,100 600,20 900,60 C1050,80 1150,70 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-white/60 text-sm font-medium">Scroll to explore</span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-3 bg-white/60 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
