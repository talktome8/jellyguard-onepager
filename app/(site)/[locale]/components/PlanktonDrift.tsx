'use client';

import { useEffect, useRef } from 'react';

interface Plankton {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  pulsePhase: number;
}

export default function PlanktonDrift() {
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
    window.addEventListener('resize', resize);

    const planktons: Plankton[] = [];
    const maxPlankton = 60;
    let animationId: number;
    let time = 0;

    const createPlankton = (): Plankton => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: 1 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.4,
      pulsePhase: Math.random() * Math.PI * 2
    });

    for (let i = 0; i < maxPlankton; i++) {
      planktons.push(createPlankton());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.02;

      planktons.forEach(p => {
        // Gentle drift with sine wave motion
        p.x += p.vx + Math.sin(time + p.pulsePhase) * 0.1;
        p.y += p.vy + Math.cos(time + p.pulsePhase * 0.7) * 0.1;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Pulsing glow effect (bioluminescence)
        const pulse = Math.sin(time * 2 + p.pulsePhase) * 0.3 + 0.7;
        const alpha = p.opacity * pulse;

        // Draw glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, `rgba(26, 163, 163, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(26, 163, 163, ${alpha * 0.3})`);
        gradient.addColorStop(1, 'rgba(26, 163, 163, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
