'use client';

import { useEffect, useRef } from 'react';

interface Jellyfish {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  pulsePhase: number;
  tentacleCount: number;
}

export default function JellyfishSwarm() {
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

    const jellyfish: Jellyfish[] = [];
    const jellyfishCount = 25;
    let animationId: number;
    let time = 0;

    // Create swarm
    for (let i = 0; i < jellyfishCount; i++) {
      jellyfish.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 15 + Math.random() * 35,
        speed: 0.2 + Math.random() * 0.5,
        opacity: 0.15 + Math.random() * 0.25,
        pulsePhase: Math.random() * Math.PI * 2,
        tentacleCount: 4 + Math.floor(Math.random() * 4)
      });
    }

    const drawJellyfish = (jelly: Jellyfish, currentTime: number) => {
      const { x, y, size, opacity, pulsePhase, tentacleCount } = jelly;
      
      // Pulsing effect
      const pulse = Math.sin(currentTime * 2 + pulsePhase) * 0.2 + 0.8;
      const currentSize = size * pulse;

      ctx.save();
      ctx.translate(x, y);

      // Bell/dome
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, currentSize);
      gradient.addColorStop(0, `rgba(255, 127, 102, ${opacity * pulse})`);
      gradient.addColorStop(0.6, `rgba(255, 127, 102, ${opacity * 0.5 * pulse})`);
      gradient.addColorStop(1, `rgba(255, 127, 102, 0)`);

      ctx.beginPath();
      ctx.ellipse(0, 0, currentSize, currentSize * 0.7, 0, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Glow effect
      ctx.beginPath();
      ctx.arc(0, 0, currentSize * 1.5, 0, Math.PI * 2);
      const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, currentSize * 1.5);
      glowGradient.addColorStop(0, `rgba(255, 127, 102, ${opacity * 0.3 * pulse})`);
      glowGradient.addColorStop(1, 'rgba(255, 127, 102, 0)');
      ctx.fillStyle = glowGradient;
      ctx.fill();

      // Tentacles
      ctx.strokeStyle = `rgba(255, 127, 102, ${opacity * 0.6})`;
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';

      for (let i = 0; i < tentacleCount; i++) {
        const angle = (Math.PI * 2 / tentacleCount) * i;
        const tentacleLength = currentSize * 2;
        
        ctx.beginPath();
        ctx.moveTo(0, currentSize * 0.5);
        
        // Wavy tentacles
        for (let t = 0; t <= 1; t += 0.1) {
          const tx = Math.sin(angle + t * Math.PI) * currentSize * 0.5 + 
                     Math.sin(currentTime * 3 + t * 5 + i) * 10;
          const ty = currentSize * 0.5 + tentacleLength * t;
          ctx.lineTo(tx, ty);
        }
        ctx.stroke();
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.02;

      jellyfish.forEach(jelly => {
        // Drift movement with sine wave
        jelly.y -= jelly.speed;
        jelly.x += Math.sin(time + jelly.pulsePhase) * 0.5;

        // Wrap around
        if (jelly.y + jelly.size < 0) {
          jelly.y = canvas.height + jelly.size;
          jelly.x = Math.random() * canvas.width;
        }
        if (jelly.x < -jelly.size) jelly.x = canvas.width + jelly.size;
        if (jelly.x > canvas.width + jelly.size) jelly.x = -jelly.size;

        drawJellyfish(jelly, time);
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
