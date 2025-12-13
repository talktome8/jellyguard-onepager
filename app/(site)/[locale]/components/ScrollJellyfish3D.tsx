"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

// Jellyfish swarm - simple CSS animation approach  
const JELLIES = [
  { id: 1, img: 'bloom1.png', size: 180, top: 5, duration: 25 },
  { id: 2, img: 'bloom2.png', size: 140, top: 20, duration: 30 },
  { id: 3, img: 'bloom3.png', size: 200, top: 35, duration: 22 },
  { id: 4, img: 'bloom4.png', size: 120, top: 50, duration: 28 },
  { id: 5, img: 'bloom5.png', size: 160, top: 65, duration: 26 },
  { id: 6, img: 'bloom6.png', size: 100, top: 80, duration: 32 },
  { id: 7, img: 'bloom7.png', size: 150, top: 15, duration: 24 },
  { id: 8, img: 'bloom8.png', size: 130, top: 45, duration: 29 },
];

export default function ScrollJellyfish3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* CSS Keyframes */}
      <style jsx global>{`
        @keyframes jellyDrift {
          0% {
            transform: translateX(0) translateY(0) rotate(0deg);
          }
          25% {
            transform: translateX(-30vw) translateY(-15px) rotate(-5deg);
          }
          50% {
            transform: translateX(-60vw) translateY(10px) rotate(3deg);
          }
          75% {
            transform: translateX(-90vw) translateY(-10px) rotate(-3deg);
          }
          100% {
            transform: translateX(-130vw) translateY(0) rotate(0deg);
          }
        }
        
        @keyframes jellyPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .jelly-swarm-item {
          animation: jellyDrift var(--drift-duration) linear infinite;
          animation-delay: var(--drift-delay);
        }
        
        .jelly-swarm-item img {
          animation: jellyPulse 3s ease-in-out infinite;
        }
      `}</style>

      {/* Swarm container */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none select-none"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        {JELLIES.map((jelly, index) => (
          <div
            key={jelly.id}
            className="jelly-swarm-item absolute"
            style={{
              '--drift-duration': `${jelly.duration}s`,
              '--drift-delay': `${-index * 3}s`,
              top: `${jelly.top}%`,
              right: `-${jelly.size}px`,
              width: jelly.size,
              height: jelly.size,
              opacity: 0.25,
            } as React.CSSProperties}
          >
            <Image
              src={`/images/${jelly.img}`}
              alt=""
              width={jelly.size}
              height={jelly.size}
              className="w-full h-full object-contain"
              loading="lazy"
              quality={75}
            />
          </div>
        ))}
      </div>
    </>
  );
}
