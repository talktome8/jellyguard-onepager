'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export default function CurrentFlow() {
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

    const particles: Particle[] = [];
    const maxParticles = 50;
    let animationId: number;

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: 1 + Math.random() * 2,
      vy: (Math.random() - 0.5) * 0.5,
      life: 0,
      maxLife: 100 + Math.random() * 100,
    });

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(237, 245, 247, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Curved flow effect
        p.vy += Math.sin(p.x * 0.01) * 0.05;

        if (p.x > canvas.width || p.y < 0 || p.y > canvas.height || p.life > p.maxLife) {
          particles[i] = createParticle();
          particles[i].x = -10;
        }

        const opacity = Math.min(1, p.life / 30) * (1 - p.life / p.maxLife);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26, 163, 163, ${opacity * 0.6})`;
        ctx.fill();

        // Draw trail
        if (i > 0) {
          const prev = particles[i - 1];
          if (Math.abs(p.x - prev.x) < 50 && Math.abs(p.y - prev.y) < 50) {
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(26, 163, 163, ${opacity * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
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
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
