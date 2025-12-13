"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

// Reduced jellyfish swarm for better performance - only 4 items
const JELLIES = [
  { id: 1, img: 'bloom1.png', size: 150, top: 10, duration: 28 },
  { id: 2, img: 'bloom3.png', size: 180, top: 35, duration: 24 },
  { id: 3, img: 'bloom5.png', size: 140, top: 60, duration: 30 },
  { id: 4, img: 'bloom7.png', size: 120, top: 85, duration: 26 },
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

      {/* Swarm container - hidden on mobile/tablet for performance */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none select-none hidden lg:block"
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
