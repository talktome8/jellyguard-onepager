'use client';

import { useEffect, useRef } from 'react';

interface Coral {
  x: number;
  y: number;
  height: number;
  growthRate: number;
  maxHeight: number;
  branches: number;
  color: string;
}

export default function CoralGrowth() {
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

    const corals: Coral[] = [];
    const numCorals = 12;
    let animationId: number;

    // Initialize corals
    for (let i = 0; i < numCorals; i++) {
      corals.push({
        x: (i / numCorals) * canvas.width + Math.random() * 40,
        y: canvas.height,
        height: 0,
        growthRate: 0.1 + Math.random() * 0.2,
        maxHeight: 40 + Math.random() * 60,
        branches: 3 + Math.floor(Math.random() * 4),
        color: `rgba(26, 163, 163, ${0.3 + Math.random() * 0.3})`
      });
    }

    const drawCoral = (coral: Coral) => {
      const { x, y, height, branches, color } = coral;
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';

      // Draw main stem
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y - height);
      ctx.stroke();

      // Draw branches
      for (let i = 0; i < branches; i++) {
        const branchY = y - (height / branches) * (i + 1);
        const branchLength = height / 3;
        const angle = Math.PI / 4;

        // Left branch
        ctx.beginPath();
        ctx.moveTo(x, branchY);
        ctx.quadraticCurveTo(
          x - branchLength / 2,
          branchY - branchLength / 3,
          x - branchLength,
          branchY - branchLength / 2
        );
        ctx.stroke();

        // Right branch
        ctx.beginPath();
        ctx.moveTo(x, branchY);
        ctx.quadraticCurveTo(
          x + branchLength / 2,
          branchY - branchLength / 3,
          x + branchLength,
          branchY - branchLength / 2
        );
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      corals.forEach(coral => {
        if (coral.height < coral.maxHeight) {
          coral.height += coral.growthRate;
        }
        drawCoral(coral);
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
      className="absolute bottom-0 left-0 right-0 w-full pointer-events-none h-32"
    />
  );
}
