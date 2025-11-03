'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ParticleWaves() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate deterministic particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: (i * 5.7 + 10) % 100,
    y: (i * 7.3 + 20) % 100,
    size: 1 + (i % 3) * 0.5,
    duration: 4 + (i % 4) * 2,
    delay: (i * 0.3) % 3,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-teal"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
