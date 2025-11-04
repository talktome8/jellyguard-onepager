'use client';

import { useEffect, useRef } from 'react';

interface Kelp {
  x: number;
  segments: number;
  segmentLength: number;
  width: number;
  color: string;
  swaySpeed: number;
  swayAmount: number;
}

export default function KelpForest() {
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

    const kelps: Kelp[] = [];
    const numKelp = 15;
    let animationId: number;
    let time = 0;

    for (let i = 0; i < numKelp; i++) {
      kelps.push({
        x: (canvas.width / numKelp) * i + Math.random() * 30,
        segments: 8 + Math.floor(Math.random() * 6),
        segmentLength: 12 + Math.random() * 8,
        width: 3 + Math.random() * 4,
        color: `rgba(26, 163, 163, ${0.15 + Math.random() * 0.15})`,
        swaySpeed: 0.5 + Math.random() * 0.5,
        swayAmount: 15 + Math.random() * 20
      });
    }

    const drawKelp = (kelp: Kelp, currentTime: number) => {
      const { x, segments, segmentLength, width, color, swaySpeed, swayAmount } = kelp;
      
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(x, canvas.height);

      let currentX = x;
      let currentY = canvas.height;

      for (let i = 0; i < segments; i++) {
        const sway = Math.sin(currentTime * swaySpeed + i * 0.5) * swayAmount * (i / segments);
        currentX = x + sway;
        currentY -= segmentLength;
        
        ctx.lineTo(currentX, currentY);
      }

      ctx.stroke();

      // Draw leaf-like structures
      for (let i = 2; i < segments; i += 2) {
        const leafY = canvas.height - (segmentLength * i);
        const leafX = x + Math.sin(currentTime * swaySpeed + i * 0.5) * swayAmount * (i / segments);
        
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.ellipse(leafX, leafY, width * 2, segmentLength / 2, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.03;

      kelps.forEach(kelp => drawKelp(kelp, time));

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
      className="absolute bottom-0 left-0 right-0 w-full pointer-events-none opacity-40"
    />
  );
}
