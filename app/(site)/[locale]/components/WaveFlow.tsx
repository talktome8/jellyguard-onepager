'use client';

import { useEffect, useRef } from 'react';

interface WaveFlowProps {
  direction?: 'left' | 'right';
  speed?: number;
  amplitude?: number;
  color?: string;
}

export default function WaveFlow({ 
  direction = 'right', 
  speed = 1, 
  amplitude = 20,
  color = 'rgba(136, 212, 235, 0.15)'
}: WaveFlowProps) {
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

    let offset = 0;
    const waveCount = 3;
    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      offset += speed * 0.5 * (direction === 'left' ? -1 : 1);

      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        for (let x = 0; x <= canvas.width; x += 5) {
          const y = 
            canvas.height / 2 +
            Math.sin((x + offset + w * 100) * 0.01) * amplitude +
            Math.sin((x + offset * 0.5 + w * 50) * 0.02) * (amplitude * 0.5);
          
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = 2 + w;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [direction, speed, amplitude, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-40"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
