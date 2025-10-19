'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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
  const jellyfish1Y = useTransform(smoothProgress, [0, 1], ['0%', '60%']);
  const jellyfish2Y = useTransform(smoothProgress, [0, 1], ['0%', '80%']);
  const jellyfish3Y = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const particlesY = useTransform(smoothProgress, [0, 1], ['0%', '40%']);
  const waveY = useTransform(smoothProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(smoothProgress, [0, 1], ['0%', '15%']);
  const contentOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const contentScale = useTransform(smoothProgress, [0, 0.5], [1, 0.95]);

  return (
    <div ref={sectionRef} className="relative">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
        
        {/* Floating particles with spring motion - only render on client */}
        {mounted && (
          <motion.div className="absolute inset-0 -z-19 pointer-events-none" style={{ y: particlesY }}>
            {PARTICLE_POSITIONS.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/40 rounded-full"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: particle.delay,
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Jellyfish with sophisticated parallax - each at different depth */}
        {/* Jellyfish 1 - large, left with bioluminescent glow */}
        <motion.div 
          className="absolute w-64 h-80 opacity-25 animate-glow-pulse -z-10 pointer-events-none"
          style={{ 
            top: '25%',
            left: '-3rem',
            y: jellyfish1Y,
          }}
        >
          <svg viewBox="0 0 100 140" className="w-full h-full filter blur-sm">
            <defs>
              <radialGradient id="jellyGlow1" cx="50%" cy="35%">
                <stop offset="0%" stopColor="#1aa3a3" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#1aa3a3" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#1aa3a3" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="50" cy="35" rx="45" ry="35" fill="url(#jellyGlow1)" />
            <ellipse cx="50" cy="35" rx="35" ry="25" fill="#1aa3a3" opacity="0.7" />
            <path d="M20 60 Q 15 100, 20 120" stroke="#1aa3a3" strokeWidth="3" fill="none" opacity="0.6" />
            <path d="M40 65 Q 35 105, 38 130" stroke="#1aa3a3" strokeWidth="2.5" fill="none" opacity="0.6" />
            <path d="M50 68 Q 50 110, 50 135" stroke="#1aa3a3" strokeWidth="3" fill="none" opacity="0.6" />
            <path d="M60 65 Q 65 105, 62 130" stroke="#1aa3a3" strokeWidth="2.5" fill="none" opacity="0.6" />
            <path d="M80 60 Q 85 100, 80 120" stroke="#1aa3a3" strokeWidth="3" fill="none" opacity="0.6" />
          </svg>
        </motion.div>

        {/* Jellyfish 2 - medium, right with pulse */}
        <motion.div 
          className="absolute w-48 h-64 opacity-20 animate-glow-pulse -z-10 pointer-events-none [animation-delay:1.5s]"
          style={{ 
            top: '33%',
            right: '2rem',
            y: jellyfish2Y,
          }}
        >
          <svg viewBox="0 0 100 140" className="w-full h-full filter blur-sm">
            <defs>
              <radialGradient id="jellyGlow2" cx="50%" cy="35%">
                <stop offset="0%" stopColor="#66d9d9" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#1aa3a3" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#1aa3a3" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="50" cy="35" rx="40" ry="30" fill="url(#jellyGlow2)" />
            <ellipse cx="50" cy="35" rx="30" ry="20" fill="#1aa3a3" opacity="0.8" />
            <path d="M25 55 Q 20 90, 23 110" stroke="#1aa3a3" strokeWidth="2" fill="none" opacity="0.7" />
            <path d="M45 60 Q 42 95, 44 120" stroke="#1aa3a3" strokeWidth="2" fill="none" opacity="0.7" />
            <path d="M55 60 Q 58 95, 56 120" stroke="#1aa3a3" strokeWidth="2" fill="none" opacity="0.7" />
            <path d="M75 55 Q 80 90, 77 110" stroke="#1aa3a3" strokeWidth="2" fill="none" opacity="0.7" />
          </svg>
        </motion.div>

        {/* Jellyfish 3 - small, top right with glow */}
        <motion.div 
          className="absolute w-32 h-48 opacity-15 animate-glow-pulse -z-10 pointer-events-none [animation-delay:3s]"
          style={{ 
            top: '3rem',
            right: '25%',
            y: jellyfish3Y,
          }}
        >
          <svg viewBox="0 0 100 140" className="w-full h-full filter blur">
            <defs>
              <radialGradient id="jellyGlow3" cx="50%" cy="30%">
                <stop offset="0%" stopColor="#88d4eb" stopOpacity="1" />
                <stop offset="50%" stopColor="#1aa3a3" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#1aa3a3" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="50" cy="30" rx="35" ry="25" fill="url(#jellyGlow3)" />
            <ellipse cx="50" cy="30" rx="25" ry="15" fill="#1aa3a3" opacity="0.9" />
            <path d="M30 50 Q 28 75, 30 90" stroke="#1aa3a3" strokeWidth="1.5" fill="none" opacity="0.8" />
            <path d="M50 52 Q 50 80, 50 100" stroke="#1aa3a3" strokeWidth="1.5" fill="none" opacity="0.8" />
            <path d="M70 50 Q 72 75, 70 90" stroke="#1aa3a3" strokeWidth="1.5" fill="none" opacity="0.8" />
          </svg>
        </motion.div>
        
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
          <div className="max-w-4xl mx-auto">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-navy mb-6 leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {t('title')}
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {t('tagline')}
            </motion.p>
            
            {/* Dual CTAs with stagger animation */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <a 
                href="#contact" 
                className="btn-primary text-base sm:text-lg px-10 py-4 shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                {t('cta')}
              </a>
              <a 
                href="#opening" 
                className="bg-white/90 backdrop-blur-sm border-2 border-navy/20 text-navy hover:bg-navy hover:text-white hover:border-navy font-semibold text-base sm:text-lg px-10 py-4 rounded-2xl transition-all duration-300 w-full sm:w-auto focus:ring-2 focus:ring-navy focus:ring-offset-2"
              >
                {t('learnMore') || 'Learn more'}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
