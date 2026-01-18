'use client';

import { motion } from 'framer-motion';

interface GlobeFragmentVisualProps {
  className?: string;
}

export default function GlobeFragmentVisual({ className = '' }: GlobeFragmentVisualProps) {
  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, rotateY: -20 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <svg
        viewBox="0 0 200 160"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="globeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1aa3a3" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#138888" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0b1b2b" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="globeGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0b1b2b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1aa3a3" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="globeRadial" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#1aa3a3" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0b1b2b" stopOpacity="0.1" />
          </radialGradient>
          <filter id="globeShadow">
            <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#0b1b2b" floodOpacity="0.2" />
          </filter>
          <filter id="globeGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="globeClip">
            <ellipse cx="100" cy="80" rx="70" ry="60" />
          </clipPath>
        </defs>

        {/* 3D Globe fragment with layered surfaces */}
        <motion.g filter="url(#globeShadow)">
          {/* Main globe shape */}
          <motion.ellipse
            cx="100"
            cy="80"
            rx="70"
            ry="60"
            fill="url(#globeRadial)"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          
          {/* Latitude lines creating 3D depth */}
          <g clipPath="url(#globeClip)" opacity="0.6">
            <motion.ellipse
              cx="100"
              cy="50"
              rx="65"
              ry="15"
              fill="none"
              stroke="url(#globeGrad1)"
              strokeWidth="1.5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            />
            <motion.ellipse
              cx="100"
              cy="80"
              rx="70"
              ry="18"
              fill="none"
              stroke="url(#globeGrad1)"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            />
            <motion.ellipse
              cx="100"
              cy="110"
              rx="60"
              ry="12"
              fill="none"
              stroke="url(#globeGrad1)"
              strokeWidth="1.5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            />
          </g>

          {/* Longitude arc creating volume */}
          <g clipPath="url(#globeClip)">
            <motion.path
              d="M100,20 Q130,80 100,140"
              fill="none"
              stroke="url(#globeGrad2)"
              strokeWidth="1.5"
              opacity="0.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
            />
            <motion.path
              d="M100,20 Q70,80 100,140"
              fill="none"
              stroke="url(#globeGrad2)"
              strokeWidth="1.5"
              opacity="0.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.7 }}
            />
          </g>

          {/* Highlight spots representing coastal regions */}
          <motion.g
            filter="url(#globeGlow)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <circle cx="75" cy="70" r="4" fill="#1aa3a3" opacity="0.6" />
            <circle cx="120" cy="85" r="5" fill="#1aa3a3" opacity="0.7" />
            <circle cx="90" cy="95" r="3" fill="#138888" opacity="0.5" />
            <circle cx="110" cy="65" r="3.5" fill="#1aa3a3" opacity="0.5" />
          </motion.g>
        </motion.g>

        {/* Decorative layered surface fragments */}
        <motion.path
          d="M150,120 Q160,100 175,110 Q190,120 180,135 Q170,145 155,135 Z"
          fill="url(#globeGrad1)"
          opacity="0.4"
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        />
        <motion.path
          d="M20,50 Q30,35 45,42 Q55,50 48,62 Q40,70 28,60 Z"
          fill="url(#globeGrad2)"
          opacity="0.3"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1 }}
        />
      </svg>
    </motion.div>
  );
}
