'use client';

import { motion } from 'framer-motion';

interface FlowDistortionVisualProps {
  className?: string;
  variant?: 'challenge' | 'default';
}

export default function FlowDistortionVisual({ className = '', variant = 'default' }: FlowDistortionVisualProps) {
  const isChallenge = variant === 'challenge';
  
  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <svg
        viewBox="0 0 200 120"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="flowGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isChallenge ? "#d97706" : "#1aa3a3"} stopOpacity="0.6" />
            <stop offset="100%" stopColor={isChallenge ? "#92400e" : "#0b1b2b"} stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="flowGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isChallenge ? "#fbbf24" : "#138888"} stopOpacity="0.4" />
            <stop offset="100%" stopColor={isChallenge ? "#d97706" : "#1aa3a3"} stopOpacity="0.1" />
          </linearGradient>
          <filter id="flowBlur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
          <filter id="flowGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 3D layered flow lines suggesting distortion/obstruction */}
        <motion.g filter="url(#flowGlow)">
          {/* Back flow layer */}
          <motion.path
            d="M10,80 Q50,60 80,75 Q110,90 140,70 Q170,50 190,65"
            stroke="url(#flowGrad1)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          
          {/* Middle flow with distortion */}
          <motion.path
            d={isChallenge 
              ? "M10,60 Q40,50 60,65 Q80,80 100,55 Q120,30 150,50 Q180,70 190,55"
              : "M10,60 Q50,50 90,60 Q130,70 170,55 Q190,48 190,50"
            }
            stroke="url(#flowGrad2)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            filter="url(#flowBlur)"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          />
          
          {/* Front flow layer */}
          <motion.path
            d="M10,40 Q60,30 100,45 Q140,60 180,40 Q195,35 190,38"
            stroke="url(#flowGrad1)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          />
        </motion.g>

        {/* Obstruction points (for challenge variant) */}
        {isChallenge && (
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <circle cx="80" cy="65" r="8" fill="url(#flowGrad1)" opacity="0.5" />
            <circle cx="120" cy="50" r="6" fill="url(#flowGrad2)" opacity="0.4" />
            <circle cx="100" cy="75" r="5" fill="url(#flowGrad1)" opacity="0.3" />
          </motion.g>
        )}
      </svg>
    </motion.div>
  );
}
