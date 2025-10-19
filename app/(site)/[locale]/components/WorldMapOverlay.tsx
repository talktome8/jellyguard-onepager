'use client';

import { useEffect, useState, useMemo } from 'react';

interface Dot {
  x: number;
  y: number;
  delay: number;
  scale: number;
  opacity: number;
  baseSpeed: number;
}

export default function WorldMapOverlay() {
  const [isClient, setIsClient] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion]);

  const dots = useMemo(() => {
    if (!isClient) return [];
    
    const dotsList: Dot[] = [];
    const rows = 12;
    const cols = 24;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Create a rough map shape (skip certain regions for ocean)
        const isLand = 
          (row >= 2 && row <= 8 && col >= 2 && col <= 20) || // Main continents
          (row >= 1 && row <= 4 && col >= 12 && col <= 15) || // North regions
          (row >= 6 && row <= 10 && col >= 8 && col <= 14); // Southern regions
        
        if (isLand && Math.random() > 0.3) {
          dotsList.push({
            x: (col / cols) * 100,
            y: (row / rows) * 100,
            delay: Math.random() * 2,
            scale: 0.85 + Math.random() * 0.3, // 0.85-1.15
            opacity: 0.3 + Math.random() * 0.4, // 0.3-0.7
            baseSpeed: 0.5 + Math.random() * 0.5,
          });
        }
      }
    }
    return dotsList;
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <svg 
        className="w-full h-full" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Ellipse clipping mask for skim band */}
          <clipPath id="skimEllipse">
            <ellipse cx="50" cy="12" rx="50" ry="12" />
          </clipPath>
          
          {/* Enhanced radial gradient for depth effect */}
          <radialGradient id="depthGradient" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#66d9d9" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#1aa3a3" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0b7a7a" stopOpacity="0.1" />
          </radialGradient>
          
          {/* Ocean current flow gradient */}
          <linearGradient id="currentFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1aa3a3" stopOpacity="0" />
            <stop offset="50%" stopColor="#66d9d9" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1aa3a3" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Flowing current lines */}
        <g opacity="0.3">
          <path
            d="M -20,30 Q 25,28 50,30 T 120,30"
            stroke="url(#currentFlow)"
            strokeWidth="0.3"
            fill="none"
            className="animate-[wave-flow_25s_linear_infinite]"
          />
          <path
            d="M -20,50 Q 25,48 50,50 T 120,50"
            stroke="url(#currentFlow)"
            strokeWidth="0.3"
            fill="none"
            className="animate-[wave-flow_30s_linear_infinite]"
            style={{ animationDelay: '3s' }}
          />
          <path
            d="M -20,70 Q 25,68 50,70 T 120,70"
            stroke="url(#currentFlow)"
            strokeWidth="0.3"
            fill="none"
            className="animate-[wave-flow_28s_linear_infinite]"
            style={{ animationDelay: '6s' }}
          />
        </g>
        
        {dots.map((dot, i) => {
          const yPos = dot.y;
          const isInSkimBand = yPos <= 12; // Top 24px ~ 12% of viewport
          
          if (reducedMotion) {
            // Static dots for reduced motion
            return (
              <circle
                key={i}
                cx={dot.x}
                cy={yPos}
                r={0.4 * dot.scale}
                fill="url(#depthGradient)"
                opacity={dot.opacity}
              />
            );
          }
          
          // Slow baseline drift for all dots
          const time = Date.now() * 0.0001;
          const driftX = Math.sin(time * dot.baseSpeed + dot.delay) * 0.5;
          const driftY = Math.cos(time * dot.baseSpeed * 0.7 + dot.delay) * 0.3;
          
          // Accelerated motion in skim band
          let transformX = driftX;
          let transformY = driftY;
          
          if (isInSkimBand && scrollY > 50) {
            const skimFactor = Math.min(scrollY / 300, 1);
            transformX += Math.sin(time * 2 + i) * 2 * skimFactor;
            transformY += Math.cos(time * 2 + i) * 1.5 * skimFactor;
          }
          
          const finalX = dot.x + transformX;
          const finalY = yPos + transformY;
          
          // Apply ellipse clipping and fade for skim band
          const element = (
            <circle
              cx={finalX}
              cy={finalY}
              r={0.4 * dot.scale}
              fill="url(#depthGradient)"
              opacity={isInSkimBand ? dot.opacity * 0.7 : dot.opacity}
              style={{
                transition: reducedMotion ? 'none' : 'transform 0.3s ease-out',
                transformOrigin: `${finalX}% ${finalY}%`,
              }}
            />
          );
          
          return isInSkimBand ? (
            <g key={i} clipPath="url(#skimEllipse)">
              {element}
            </g>
          ) : (
            <g key={i}>{element}</g>
          );
        })}
      </svg>
    </div>
  );
}
