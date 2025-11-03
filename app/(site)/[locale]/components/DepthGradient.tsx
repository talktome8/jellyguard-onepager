'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function DepthGradient() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Gradient transitions from light blue (surface) to deep blue (depth)
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.3, 0.6, 0.8]);

  return (
    <>
      <div ref={targetRef} className="absolute inset-0 pointer-events-none h-[400vh]" />
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(200, 233, 245, 0) 0%, rgba(136, 212, 235, 0.1) 20%, rgba(26, 163, 163, 0.15) 50%, rgba(11, 27, 43, 0.25) 80%, rgba(11, 27, 43, 0.4) 100%)',
          opacity: gradientOpacity,
        }}
      />
    </>
  );
}
