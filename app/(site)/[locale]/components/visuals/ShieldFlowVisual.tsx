'use client';

import { motion } from 'framer-motion';

interface ShieldFlowVisualProps {
  className?: string;
}

export default function ShieldFlowVisual({ className = '' }: ShieldFlowVisualProps) {
  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <svg
        viewBox="0 0 200 160"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="shieldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1aa3a3" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0b1b2b" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="shieldGrad2" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#138888" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1aa3a3" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="shieldRadial" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#1aa3a3" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0b1b2b" stopOpacity="0.1" />
          </radialGradient>
          <filter id="shieldGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="shieldShadow">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#0b1b2b" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Central shield/protection shape */}
        <motion.g filter="url(#shieldShadow)">
          <motion.path
            d="M100,20 L140,40 L140,90 Q140,120 100,140 Q60,120 60,90 L60,40 Z"
            fill="url(#shieldRadial)"
            stroke="url(#shieldGrad1)"
            strokeWidth="2"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Inner shield layers for 3D depth */}
          <motion.path
            d="M100,35 L125,50 L125,85 Q125,105 100,120 Q75,105 75,85 L75,50 Z"
            fill="url(#shieldGrad2)"
            opacity="0.6"
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          
          <motion.path
            d="M100,50 L112,58 L112,78 Q112,92 100,100 Q88,92 88,78 L88,58 Z"
            fill="url(#shieldGrad1)"
            filter="url(#shieldGlow)"
            opacity="0.5"
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          />
        </motion.g>

        {/* Flowing water lines being diverted around shield */}
        <motion.g opacity="0.6">
          {/* Left side flow */}
          <motion.path
            d="M10,60 Q30,55 45,65 Q55,75 55,90 Q55,110 40,130"
            stroke="url(#shieldGrad1)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.path
            d="M15,75 Q35,70 48,80 Q52,90 48,105 Q42,120 30,135"
            stroke="url(#shieldGrad2)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.7 }}
          />
          
          {/* Right side flow */}
          <motion.path
            d="M190,60 Q170,55 155,65 Q145,75 145,90 Q145,110 160,130"
            stroke="url(#shieldGrad1)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          />
          <motion.path
            d="M185,75 Q165,70 152,80 Q148,90 152,105 Q158,120 170,135"
            stroke="url(#shieldGrad2)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.8 }}
          />
        </motion.g>

        {/* Small particles being diverted */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <circle cx="35" cy="85" r="3" fill="#1aa3a3" opacity="0.4" />
          <circle cx="45" cy="105" r="2.5" fill="#138888" opacity="0.3" />
          <circle cx="165" cy="85" r="3" fill="#1aa3a3" opacity="0.4" />
          <circle cx="155" cy="105" r="2.5" fill="#138888" opacity="0.3" />
        </motion.g>
      </svg>
    </motion.div>
  );
}
