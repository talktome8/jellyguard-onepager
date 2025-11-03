'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface JellyfishProps {
  index: number;
  total: number;
}

const Jellyfish = ({ index, total }: JellyfishProps) => {
  // Deterministic pseudo-random values based on index
  const startX = (index * 17 + 23) % 100;
  const startY = (index * 31 + 41) % 100;
  const size = 80 + (index * 13) % 60;
  const duration = 25 + (index * 7) % 20;
  const delay = (index * 3) % 10;
  const opacity = 0.03 + (index % 3) * 0.02;
  
  // Gentle drift path
  const driftPath = {
    x: [0, 30 - (index % 40), -20 + (index % 30), 0],
    y: [0, -40 + (index % 50), 30 - (index % 40), 0],
    rotate: [0, 5 - (index % 10), -5 + (index % 8), 0],
  };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        width: `${size}px`,
        height: `${size * 1.4}px`,
      }}
      initial={{ opacity: 0 }}
      animate={{
        ...driftPath,
        opacity: [0, opacity, opacity, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg viewBox="0 0 100 140" className="w-full h-full filter blur-sm">
        <defs>
          <radialGradient id={`jellyGlow${index}`} cx="50%" cy="35%">
            <stop offset="0%" stopColor="#1aa3a3" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#1aa3a3" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1aa3a3" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Bell */}
        <ellipse cx="50" cy="35" rx="40" ry="30" fill={`url(#jellyGlow${index})`} />
        <ellipse cx="50" cy="35" rx="30" ry="22" fill="#1aa3a3" opacity="0.4" />
        {/* Tentacles */}
        <path d="M25 55 Q 20 90, 23 110" stroke="#1aa3a3" strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M40 60 Q 37 95, 39 120" stroke="#1aa3a3" strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M50 62 Q 50 100, 50 125" stroke="#1aa3a3" strokeWidth="2.5" fill="none" opacity="0.5" />
        <path d="M60 60 Q 63 95, 61 120" stroke="#1aa3a3" strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M75 55 Q 80 90, 77 110" stroke="#1aa3a3" strokeWidth="2" fill="none" opacity="0.5" />
      </svg>
    </motion.div>
  );
};

export default function FloatingJellyfish() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: 8 }, (_, i) => (
        <Jellyfish key={i} index={i} total={8} />
      ))}
    </div>
  );
}
