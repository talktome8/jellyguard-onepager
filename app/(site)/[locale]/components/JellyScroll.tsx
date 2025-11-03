'use client';

import { useEffect, useRef, useState } from 'react';

// Deterministic pseudo-random values to avoid hydration mismatch
const JELLY_CONFIGS = [
  { size: 80, left: 15, bottom: 20, delay: 8, xshift: -5, opacity: 0.08, scale: 1.1 },
  { size: 120, left: 65, bottom: 35, delay: 18, xshift: 10, opacity: 0.10, scale: 1.15 },
  { size: 95, left: 40, bottom: 12, delay: 14, xshift: -8, opacity: 0.07, scale: 1.05 },
  { size: 70, left: 88, bottom: 25, delay: 22, xshift: 5, opacity: 0.09, scale: 1.08 },
  { size: 110, left: 25, bottom: 42, delay: 16, xshift: -12, opacity: 0.11, scale: 1.12 },
  { size: 85, left: 75, bottom: 15, delay: 10, xshift: 8, opacity: 0.08, scale: 1.06 },
  { size: 65, left: 50, bottom: 38, delay: 20, xshift: -6, opacity: 0.07, scale: 1.04 },
  { size: 100, left: 10, bottom: 28, delay: 12, xshift: 12, opacity: 0.10, scale: 1.10 },
];

export default function JellyScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Optional gentle parallax on hero background
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const y = Math.min(1, window.scrollY / 600);
      el.style.transform = `translate3d(0, ${y * 20}px, 0)`;
      el.style.opacity = String(1 - y * 0.15);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!mounted) return null; // Avoid hydration issues

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0">
      {JELLY_CONFIGS.map((config, i) => (
        <svg
          key={i}
          className="jelly"
          width={config.size}
          height={config.size}
          viewBox="0 0 64 64"
          style={
            {
              left: `${config.left}%`,
              bottom: `${config.bottom}vh`,
              '--jd': `${config.delay}s`,
              '--jx': `${config.xshift}px`,
              '--jo': config.opacity,
              '--js': String(config.scale),
            } as React.CSSProperties
          }
        >
          <g fill="currentColor" className="text-white/30">
            <ellipse cx="32" cy="20" rx="16" ry="12" />
            <path d="M20 28c3 8 4 12 12 12s9-4 12-12" fill="none" stroke="currentColor" strokeWidth="2" />
          </g>
        </svg>
      ))}
    </div>
  );
}
