'use client';

import { useEffect, useRef } from 'react';

interface SwirlEffectProps {
  intensity?: 'low' | 'medium' | 'high';
  color?: string;
}

export default function SwirlEffect({ 
  intensity = 'medium',
  color = 'rgba(255, 127, 102, 0.08)' // Coral color for crisis
}: SwirlEffectProps) {
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

    // Particle count based on intensity
    const particleCount = intensity === 'low' ? 30 : intensity === 'medium' ? 50 : 80;
    
    interface Particle {
      x: number;
      y: number;
      angle: number;
      radius: number;
      speed: number;
      size: number;
      opacity: number;
    }

    const particles: Particle[] = [];
    
    // Initialize swirling particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 100 + 50,
        speed: Math.random() * 0.01 + 0.005,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        // Update angle for swirling motion
        particle.angle += particle.speed;
        
        // Calculate swirl position (spiral outward slowly)
        particle.radius += 0.02;
        if (particle.radius > 150) {
          particle.radius = 50;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
        }
        
        const x = particle.x + Math.cos(particle.angle) * particle.radius;
        const y = particle.y + Math.sin(particle.angle) * particle.radius;

        // Draw particle
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(/[\d.]+\)$/, `${particle.opacity})`);
        ctx.fill();

        // Draw connection lines to nearby particles (create swirl effect)
        particles.forEach((other, j) => {
          if (i === j) return;
          const otherX = other.x + Math.cos(other.angle) * other.radius;
          const otherY = other.y + Math.sin(other.angle) * other.radius;
          const distance = Math.hypot(x - otherX, y - otherY);
          
          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(otherX, otherY);
            ctx.strokeStyle = color.replace(/[\d.]+\)$/, `${(1 - distance / 80) * 0.1})`);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [intensity, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
