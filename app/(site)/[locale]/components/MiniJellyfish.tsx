'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface MiniJellyfishProps {
  position?: 'left' | 'right' | 'center';
  size?: 'sm' | 'md';
  opacity?: number;
}

export default function MiniJellyfish({ 
  position = 'right', 
  size = 'sm',
  opacity = 0.15 
}: MiniJellyfishProps) {
  const jellyfishRef = useRef<HTMLDivElement>(null);
  
  // Smooth scroll tracking for parallax
  const { scrollYProgress } = useScroll({
    target: jellyfishRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Different parallax speeds based on position for depth variety
  const parallaxMultiplier = position === 'left' ? 0.3 : position === 'right' ? 0.4 : 0.25;
  const jellyfishY = useTransform(smoothProgress, [0, 1], ['0%', `${parallaxMultiplier * 100}%`]);

  const sizeClasses = {
    sm: 'w-24 h-36',
    md: 'w-32 h-48',
  };
  
  const positionClasses = {
    left: '-left-6 top-1/4',
    right: '-right-6 top-1/3',
    center: 'left-1/2 top-1/4 -translate-x-1/2',
  };

  return (
    <motion.div 
      ref={jellyfishRef}
      className={`absolute ${positionClasses[position]} ${sizeClasses[size]} animate-glow-pulse pointer-events-none z-0`}
      style={{ 
        opacity,
        y: jellyfishY,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: Math.random() * 0.3 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <svg viewBox="0 0 100 140" className="w-full h-full filter blur-sm">
        <defs>
          <radialGradient id={`miniJellyGlow-${position}-${size}`} cx="50%" cy="30%">
            <stop offset="0%" stopColor="#66d9d9" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#1aa3a3" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1aa3a3" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="50" cy="30" rx="35" ry="25" fill={`url(#miniJellyGlow-${position}-${size})`} />
        <ellipse cx="50" cy="30" rx="25" ry="15" fill="#1aa3a3" opacity="0.7" />
        <path d="M30 48 Q 28 70, 30 85" stroke="#1aa3a3" strokeWidth="1.5" fill="none" opacity="0.6" />
        <path d="M50 50 Q 50 75, 50 95" stroke="#1aa3a3" strokeWidth="1.5" fill="none" opacity="0.6" />
        <path d="M70 48 Q 72 70, 70 85" stroke="#1aa3a3" strokeWidth="1.5" fill="none" opacity="0.6" />
      </svg>
    </motion.div>
  );
}
