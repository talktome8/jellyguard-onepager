'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Generate deterministic bubble positions (not random on every render)
const BUBBLES = Array.from({ length: 25 }, (_, i) => ({
  left: ((i * 17.3 + 23) % 100),
  size: 4 + ((i * 3.7) % 12),
  delay: (i * 0.6) % 15,
  duration: 10 + (i % 10),
  opacity: 0.15 + ((i * 0.01) % 0.25),
}));

// Generate deterministic star positions
const STARS = Array.from({ length: 40 }, (_, i) => ({
  left: ((i * 9.7 + 11) % 100),
  top: ((i * 13.3 + 7) % 100),
  delay: (i * 0.125) % 5,
  duration: 2 + (i % 4),
}));

export default function BubbleField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Only mount on client side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Smooth scroll tracking for parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const bubblesY = useTransform(smoothProgress, [0, 1], ['20%', '-20%']);

  return (
    <motion.div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ y: bubblesY }}
    >
      {/* Only render bubbles and stars on client to avoid hydration mismatch */}
      {mounted && (
        <>
          {BUBBLES.map((bubble, i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 rounded-full bg-white/30 backdrop-blur-sm"
              style={{
                left: `${bubble.left}%`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                opacity: bubble.opacity,
              }}
              animate={{
                y: [-20, -300],
              }}
              transition={{
                duration: bubble.duration,
                repeat: Infinity,
                ease: "linear",
                delay: bubble.delay,
              }}
            />
          ))}
          
          {/* Subtle star/light particles */}
          {STARS.map((star, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute w-0.5 h-0.5 bg-white/40 rounded-full"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: star.delay,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}
