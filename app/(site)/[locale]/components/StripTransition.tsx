'use client';

import { useEffect, useRef } from 'react';

interface Props {
  fromColor?: string;
  toColor?: string;
  variant?: 'wave' | 'current' | 'foam';
}

export default function StripTransition({ 
  fromColor = '#0B1B2B', 
  toColor = '#EDF5F7',
  variant = 'wave'
}: Props) {
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

    let animationId: number;
    let time = 0;

    const drawWaveTransition = () => {
      const amplitude = 20;
      const frequency = 0.02;
      const speed = 0.02;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fill top half with from color
      ctx.fillStyle = fromColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height / 2);

      // Fill bottom half with to color
      ctx.fillStyle = toColor;
      ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

      // Draw animated wave
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      for (let x = 0; x <= canvas.width; x += 5) {
        const y = canvas.height / 2 + Math.sin(x * frequency + time * speed) * amplitude;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      ctx.fillStyle = toColor;
      ctx.fill();

      // Add foam effect
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += 5) {
        const y = canvas.height / 2 + Math.sin(x * frequency + time * speed) * amplitude;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    const drawCurrentTransition = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, fromColor);
      gradient.addColorStop(0.4, fromColor);
      gradient.addColorStop(0.6, toColor);
      gradient.addColorStop(1, toColor);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add flowing particles
      const numParticles = 20;
      for (let i = 0; i < numParticles; i++) {
        const x = (time * 50 + i * 100) % canvas.width;
        const y = canvas.height / 2 + Math.sin(time + i) * 20;
        const opacity = Math.sin(time * 2 + i) * 0.3 + 0.3;

        ctx.fillStyle = `rgba(26, 163, 163, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawFoamTransition = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fill background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, fromColor);
      gradient.addColorStop(1, toColor);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add bubbles
      const numBubbles = 30;
      for (let i = 0; i < numBubbles; i++) {
        const x = Math.sin(time + i * 0.5) * 50 + (i / numBubbles) * canvas.width;
        const baseY = canvas.height / 2;
        const y = baseY + Math.sin(time * 2 + i) * 30;
        const size = 2 + Math.sin(time + i) * 2;
        const opacity = Math.abs(Math.sin(time + i * 0.3)) * 0.4;

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      time += 0.05;

      if (variant === 'wave') {
        drawWaveTransition();
      } else if (variant === 'current') {
        drawCurrentTransition();
      } else {
        drawFoamTransition();
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [fromColor, toColor, variant]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
