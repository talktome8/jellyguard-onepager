'use client';

import { useEffect, useRef } from 'react';

interface RippleEffectProps {
  frequency?: number; // How often ripples spawn (ms)
  color?: string;
}

export default function RippleEffect({ 
  frequency = 2000,
  color = 'rgba(26, 163, 163, 0.15)'
}: RippleEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      speed: number;
    }

    const ripples: Ripple[] = [];

    const createRipple = () => {
      if (canvas.width === 0 || canvas.height === 0) return;
      
      ripples.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 0,
        maxRadius: Math.random() * 150 + 100,
        opacity: 1,
        speed: Math.random() * 1.5 + 1
      });
    };

    // Create initial ripples
    createRipple();
    createRipple();

    const rippleInterval = setInterval(createRipple, frequency);

    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw ripples
      ripples.forEach((ripple, index) => {
        ripple.radius += ripple.speed;
        ripple.opacity = 1 - (ripple.radius / ripple.maxRadius);

        if (ripple.opacity <= 0) {
          ripples.splice(index, 1);
          return;
        }

        // Draw multiple concentric circles for each ripple
        for (let i = 0; i < 3; i++) {
          const offsetRadius = ripple.radius - (i * 15);
          if (offsetRadius > 0) {
            ctx.beginPath();
            ctx.arc(ripple.x, ripple.y, offsetRadius, 0, Math.PI * 2);
            ctx.strokeStyle = color.replace(/[\d.]+\)$/, `${ripple.opacity * (0.8 - i * 0.2)})`);
            ctx.lineWidth = 2 - (i * 0.5);
            ctx.stroke();
          }
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
      clearInterval(rippleInterval);
    };
  }, [frequency, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
