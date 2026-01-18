'use client';

import { motion } from 'framer-motion';

interface StackedPlanesVisualProps {
  className?: string;
  variant?: 'progress' | 'impact';
}

export default function StackedPlanesVisual({ className = '', variant = 'progress' }: StackedPlanesVisualProps) {
  const isImpact = variant === 'impact';
  
  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <svg
        viewBox="0 0 200 140"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`stackGrad1-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isImpact ? "#059669" : "#1aa3a3"} stopOpacity="0.6" />
            <stop offset="100%" stopColor={isImpact ? "#047857" : "#138888"} stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id={`stackGrad2-${variant}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isImpact ? "#10b981" : "#1aa3a3"} stopOpacity="0.4" />
            <stop offset="100%" stopColor={isImpact ? "#059669" : "#0b1b2b"} stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id={`stackGrad3-${variant}`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={isImpact ? "#34d399" : "#1aa3a3"} stopOpacity="0.5" />
            <stop offset="100%" stopColor={isImpact ? "#10b981" : "#138888"} stopOpacity="0.1" />
          </linearGradient>
          <filter id="stackShadow">
            <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#0b1b2b" floodOpacity="0.15" />
          </filter>
          <filter id="stackGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Stacked 3D planes representing progression/layers */}
        <motion.g filter="url(#stackShadow)">
          {/* Back plane (largest) */}
          <motion.path
            d="M30,100 L50,70 L170,70 L150,100 Z"
            fill={`url(#stackGrad1-${variant})`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
          />
          
          {/* Middle plane */}
          <motion.path
            d="M40,80 L60,50 L160,50 L140,80 Z"
            fill={`url(#stackGrad2-${variant})`}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          />
          
          {/* Front plane (smallest, most prominent) */}
          <motion.path
            d="M50,60 L70,30 L150,30 L130,60 Z"
            fill={`url(#stackGrad3-${variant})`}
            filter="url(#stackGlow)"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />

          {/* Side edges for 3D effect */}
          <motion.path
            d="M30,100 L50,70 L50,60 L30,90 Z"
            fill={isImpact ? "#047857" : "#0b1b2b"}
            opacity="0.2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.2 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          />
          <motion.path
            d="M40,80 L60,50 L60,40 L40,70 Z"
            fill={isImpact ? "#059669" : "#0b1b2b"}
            opacity="0.15"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.15 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
          />
        </motion.g>

        {/* Progress/Impact indicators */}
        {isImpact ? (
          // Translucent ascending shapes for impact
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <ellipse cx="90" cy="45" rx="25" ry="10" fill={`url(#stackGrad3-${variant})`} opacity="0.3" />
            <ellipse cx="110" cy="35" rx="20" ry="8" fill={`url(#stackGrad2-${variant})`} opacity="0.25" />
            <ellipse cx="100" cy="25" rx="15" ry="6" fill={`url(#stackGrad1-${variant})`} opacity="0.2" />
          </motion.g>
        ) : (
          // Progress dots for status
          <motion.g
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <circle cx="80" cy="90" r="4" fill={`url(#stackGrad1-${variant})`} opacity="0.6" />
            <circle cx="100" cy="70" r="4" fill={`url(#stackGrad2-${variant})`} opacity="0.7" />
            <circle cx="120" cy="50" r="4" fill={`url(#stackGrad3-${variant})`} opacity="0.8" />
            {/* Connecting line */}
            <motion.path
              d="M80,90 L100,70 L120,50"
              stroke={`url(#stackGrad3-${variant})`}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="4 2"
              opacity="0.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </motion.g>
        )}
      </svg>
    </motion.div>
  );
}
