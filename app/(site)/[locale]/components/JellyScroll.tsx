'use client';

import { useEffect, useRef } from 'react';

export default function JellyScroll() {
  const ref = useRef<HTMLDivElement>(null);

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

  // A few lightweight SVG jellyfish silhouettes
  const jellyfish = Array.from({ length: 8 }).map((_, i) => {
    const size = 60 + Math.random() * 90;
    const left = 5 + Math.random() * 90;
    const delay = 6 + Math.random() * 18;
    const xshift = (-10 + Math.random() * 20).toFixed(1);
    const opacity = (0.06 + Math.random() * 0.06).toFixed(2);
    return (
      <svg
        key={i}
        className="jelly"
        width={size}
        height={size}
        viewBox="0 0 64 64"
        style={
          {
            left: `${left}%`,
            bottom: `${8 + Math.random() * 35}vh`,
            '--jd': `${delay}s`,
            '--jx': `${xshift}px`,
            '--jo': opacity,
            '--js': String(1 + Math.random() * 0.2),
          } as React.CSSProperties
        }
      >
        <g fill="currentColor" className="text-white/30">
          <ellipse cx="32" cy="20" rx="16" ry="12" />
          <path d="M20 28c3 8 4 12 12 12s9-4 12-12" fill="none" stroke="currentColor" strokeWidth="2" />
        </g>
      </svg>
    );
  });

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0">
      {jellyfish}
    </div>
  );
}
