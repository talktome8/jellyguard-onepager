'use client';

import { motion } from 'framer-motion';

export default function HeroWavesMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large 3D mesh gradient background */}
      <svg
        className="absolute w-full h-full opacity-30"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient definitions */}
          <linearGradient id="heroMeshGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1aa3a3" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#0b1b2b" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1aa3a3" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="heroMeshGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#138888" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0b1b2b" stopOpacity="0.1" />
          </linearGradient>
          <filter id="heroGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="20" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softBlur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Layered 3D wave forms */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Back layer - large soft wave */}
          <motion.path
            d="M-100,600 Q200,400 400,500 T800,450 T1200,550 T1400,500 L1400,900 L-100,900 Z"
            fill="url(#heroMeshGrad1)"
            filter="url(#softBlur)"
            initial={{ y: 50 }}
            animate={{ y: [50, 30, 50] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Middle layer - infrastructure-like geometric forms */}
          <motion.path
            d="M0,650 L150,600 L300,650 L450,580 L600,640 L750,560 L900,620 L1050,550 L1200,600 L1200,900 L0,900 Z"
            fill="url(#heroMeshGrad2)"
            opacity="0.6"
            initial={{ y: 20 }}
            animate={{ y: [20, 0, 20] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          
          {/* Front layer - flowing lines suggesting water interaction */}
          <motion.path
            d="M-50,700 Q150,650 350,700 T750,680 T1150,720 T1350,690 L1300,900 L-50,900 Z"
            fill="url(#heroMeshGrad1)"
            opacity="0.4"
            initial={{ y: 0 }}
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </motion.g>

        {/* Floating 3D orbs suggesting depth */}
        <motion.circle
          cx="200"
          cy="300"
          r="80"
          fill="url(#heroMeshGrad2)"
          filter="url(#heroGlow)"
          opacity="0.15"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1], y: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="1000"
          cy="200"
          r="120"
          fill="url(#heroMeshGrad1)"
          filter="url(#heroGlow)"
          opacity="0.1"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1], y: [0, 15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.ellipse
          cx="600"
          cy="150"
          rx="200"
          ry="60"
          fill="url(#heroMeshGrad2)"
          filter="url(#heroGlow)"
          opacity="0.08"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </svg>

      {/* CSS-based 3D depth layers */}
      <div className="absolute inset-0">
        {/* Radial gradient orbs for depth */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(26,163,163,0.15) 0%, transparent 70%)',
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(19,136,136,0.12) 0%, transparent 60%)',
          }}
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
    </div>
  );
}
