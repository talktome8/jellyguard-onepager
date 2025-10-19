'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Jellyfish {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
  opacity: number;
  rotation: number;
  variant: number;
  skimProgress: number;
  blur: number;
  baseScale: number;
  baseOpacity: number;
}

const SPRITE_COUNT = 32;
const SKIM_BAND_HEIGHT = 24;
const BASE_DRIFT_SPEED = 0.025;
const SKIM_ACCELERATION = 2.5;
const RECYCLE_Y_MIN = 120;
const RECYCLE_Y_MAX = 200;

export default function JellyScroll() {
  const portalRef = useRef<HTMLDivElement | null>(null);
  const mounted = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const jellyfishesRef = useRef<Jellyfish[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || mounted.current) return;
    mounted.current = true;
    
    const el = document.createElement('div');
    el.id = 'jg-overlay';
    Object.assign(el.style, { 
      position: 'fixed', 
      inset: '0', 
      zIndex: '0', 
      pointerEvents: 'none' 
    });
    document.body.appendChild(el);
    portalRef.current = el;
    setPortalReady(true);
    
    return () => {
      if (portalRef.current && portalRef.current.parentNode === document.body) {
        document.body.removeChild(portalRef.current);
      }
      portalRef.current = null;
      setPortalReady(false);
    };
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isClient]);

  useEffect(() => {
    if (!isClient || prefersReducedMotion) return;

    jellyfishesRef.current = Array.from({ length: SPRITE_COUNT }, (_, i) => {
      const baseScale = 0.85 + Math.random() * 0.3;
      const baseOpacity = 0.35 + Math.random() * 0.35;
      const blur = baseOpacity < 0.5 ? (0.5 - baseOpacity) * 4 : 0;
      
      return {
        id: i,
        x: Math.random() * 100,
        y: 30 + Math.random() * 150,
        vx: (Math.random() - 0.5) * 0.05,
        vy: BASE_DRIFT_SPEED + Math.random() * 0.1,
        scale: baseScale,
        opacity: baseOpacity,
        rotation: Math.random() * 360,
        variant: Math.floor(Math.random() * 4),
        skimProgress: 0,
        blur,
        baseScale,
        baseOpacity,
      };
    });
  }, [isClient, prefersReducedMotion]);

  useEffect(() => {
    if (!isClient || prefersReducedMotion) return;

    const animate = (currentTime: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = currentTime;
      const delta = Math.min((currentTime - lastTimeRef.current) / 16.67, 2);
      lastTimeRef.current = currentTime;

      jellyfishesRef.current = jellyfishesRef.current.map((jelly) => {
        let { x, y, vx, vy, skimProgress } = jelly;

        x += vx * delta;
        y -= vy * delta;

        if (x < -5) x = 105;
        if (x > 105) x = -5;

        if (y < -10) {
          y = RECYCLE_Y_MIN + Math.random() * (RECYCLE_Y_MAX - RECYCLE_Y_MIN);
          x = Math.random() * 100;
          vx = (Math.random() - 0.5) * 0.05;
          vy = BASE_DRIFT_SPEED * (0.8 + Math.random() * 0.4);
          skimProgress = 0;
          
          const newBaseScale = 0.85 + Math.random() * 0.3;
          const newBaseOpacity = 0.35 + Math.random() * 0.35;
          const newBlur = newBaseOpacity < 0.5 ? (0.5 - newBaseOpacity) * 4 : 0;
          
          return {
            ...jelly,
            x,
            y,
            vx,
            vy,
            skimProgress,
            scale: newBaseScale,
            opacity: newBaseOpacity,
            blur: newBlur,
            baseScale: newBaseScale,
            baseOpacity: newBaseOpacity,
          };
        }

        const viewportHeight = window.innerHeight;
        const jellyPixelY = (y / 100) * viewportHeight;

        if (jellyPixelY < SKIM_BAND_HEIGHT && skimProgress < 1) {
          skimProgress += 0.04 * delta;
          vy = BASE_DRIFT_SPEED + SKIM_ACCELERATION * skimProgress;
          
          if (skimProgress >= 1) {
            y = RECYCLE_Y_MIN + Math.random() * (RECYCLE_Y_MAX - RECYCLE_Y_MIN);
            x = Math.random() * 100;
            vx = (Math.random() - 0.5) * 0.05;
            vy = BASE_DRIFT_SPEED * (0.8 + Math.random() * 0.4);
            skimProgress = 0;
            
            const newBaseScale = 0.85 + Math.random() * 0.3;
            const newBaseOpacity = 0.35 + Math.random() * 0.35;
            const newBlur = newBaseOpacity < 0.5 ? (0.5 - newBaseOpacity) * 4 : 0;
            
            return {
              ...jelly,
              x,
              y,
              vx,
              vy,
              skimProgress,
              scale: newBaseScale,
              opacity: newBaseOpacity,
              blur: newBlur,
              baseScale: newBaseScale,
              baseOpacity: newBaseOpacity,
            };
          }
        }

        return { ...jelly, x, y, vx, vy, skimProgress };
      });

      if (containerRef.current) {
        containerRef.current.dataset.tick = String(currentTime);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isClient, prefersReducedMotion]);

  if (!isClient) {
    return null;
  }

  const renderSprites = () => {
    return jellyfishesRef.current.map((jelly) => {
      const skimFactor = Math.pow(jelly.skimProgress, 2);
      const finalX = jelly.x + (50 - jelly.x) * skimFactor * 0.3;
      const finalY = jelly.y * (1 - skimFactor * 0.5);
      const finalScale = jelly.scale * (1 - skimFactor * 0.4);
      const finalOpacity = jelly.opacity * (1 - skimFactor * 0.6);
      const finalBlur = jelly.blur * (1 - skimFactor);

      const filterStyle = finalBlur > 0.1 ? `blur(${finalBlur}px)` : 'none';

      return (
        <g
          key={jelly.id}
          className="jelly-sprite"
          transform={`translate(${finalX}, ${finalY})`}
          style={{ filter: filterStyle }}
        >
          <use
            href={`#jellyfish-variant-${jelly.variant}`}
            transform={`scale(${finalScale}) rotate(${jelly.rotation})`}
            opacity={finalOpacity}
          />
        </g>
      );
    });
  };

  if (prefersReducedMotion) {
    const staticContent = (
      <div className="jellyfish-container" aria-hidden="true">
        <svg className="jelly-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <g id="static-jelly">
              <ellipse cx="0" cy="0" rx="1.5" ry="2" fill="#1aa3a3" />
              <path d="M-0.8,1.5 Q-0.8,3 -1,4 M0,1.5 Q0,3.5 0,4.5 M0.8,1.5 Q0.8,3 1,4" stroke="#1aa3a3" strokeWidth="0.15" fill="none" opacity="0.6" />
            </g>
          </defs>
          <g opacity="0.15">
            <use href="#static-jelly" transform="translate(20, 15) scale(0.8)" />
            <use href="#static-jelly" transform="translate(50, 10) scale(0.6)" />
            <use href="#static-jelly" transform="translate(80, 12) scale(0.7)" />
            <use href="#static-jelly" transform="translate(35, 18) scale(0.5)" />
            <use href="#static-jelly" transform="translate(65, 14) scale(0.9)" />
          </g>
        </svg>
      </div>
    );
    
    return portalReady && portalRef.current ? createPortal(staticContent, portalRef.current) : null;
  }

  const jellyContent = (
    <div ref={containerRef} className="jellyfish-container" aria-hidden="true">
      <svg className="jelly-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <g id="jellyfish-variant-0">
            <ellipse cx="0" cy="0" rx="1.5" ry="2" fill="#1aa3a3" />
            <path d="M-0.8,1.5 Q-0.8,3 -1,4 M0,1.5 Q0,3.5 0,4.5 M0.8,1.5 Q0.8,3 1,4" stroke="#1aa3a3" strokeWidth="0.15" fill="none" opacity="0.7" />
          </g>
          <g id="jellyfish-variant-1">
            <ellipse cx="0" cy="0" rx="2" ry="1.8" fill="#168c8c" />
            <path d="M-1,1.5 Q-0.9,3 -1.2,4 M-0.3,1.5 Q-0.3,3.5 -0.2,4.5 M0.3,1.5 Q0.4,3.5 0.2,4.5 M1,1.5 Q0.9,3 1.2,4" stroke="#168c8c" strokeWidth="0.12" fill="none" opacity="0.7" />
          </g>
          <g id="jellyfish-variant-2">
            <ellipse cx="0" cy="0" rx="1.2" ry="2.2" fill="#1dbaba" />
            <path d="M-0.6,1.8 Q-0.7,3.5 -0.8,4.5 M0,1.8 Q0,4 0,5 M0.6,1.8 Q0.7,3.5 0.8,4.5" stroke="#1dbaba" strokeWidth="0.1" fill="none" opacity="0.7" />
          </g>
          <g id="jellyfish-variant-3">
            <ellipse cx="0" cy="0" rx="1.3" ry="1.6" fill="#128f8f" />
            <path d="M-0.7,1.3 Q-0.6,2.5 -0.7,3.5 M0,1.3 Q0,2.8 0,3.8 M0.7,1.3 Q0.6,2.5 0.7,3.5" stroke="#128f8f" strokeWidth="0.13" fill="none" opacity="0.7" />
          </g>
        </defs>
        <ellipse cx="50" cy="2" rx="48" ry="2.5" fill="none" stroke="#1aa3a3" strokeWidth="0.08" opacity="0.15" />
        {renderSprites()}
      </svg>
    </div>
  );

  return portalReady && portalRef.current ? createPortal(jellyContent, portalRef.current) : null;
}
