'use client';

import { useEffect, useRef } from 'react';

interface GridFlowProps {
  color?: string;
  speed?: number;
}

export default function GridFlow({ 
  color = 'rgba(26, 163, 163, 0.08)',
  speed = 0.5
}: GridFlowProps) {
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

    const gridSize = 40;
    let offset = 0;

    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      offset += speed * 0.3;
      if (offset >= gridSize) offset = 0;

      // Draw flowing grid lines (vertical)
      for (let x = -gridSize + offset; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        
        // Create wavy vertical lines
        for (let y = 0; y <= canvas.height; y += 5) {
          const waveX = x + Math.sin((y + offset * 2) * 0.01) * 8;
          
          if (y === 0) {
            ctx.moveTo(waveX, y);
          } else {
            ctx.lineTo(waveX, y);
          }
        }
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw flowing grid lines (horizontal)
      for (let y = -gridSize + offset; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        
        // Create wavy horizontal lines
        for (let x = 0; x <= canvas.width; x += 5) {
          const waveY = y + Math.sin((x + offset * 2) * 0.01) * 8;
          
          if (x === 0) {
            ctx.moveTo(x, waveY);
          } else {
            ctx.lineTo(x, waveY);
          }
        }
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Add flowing dots at grid intersections
      for (let x = -gridSize + offset; x < canvas.width + gridSize; x += gridSize) {
        for (let y = -gridSize + offset; y < canvas.height + gridSize; y += gridSize) {
          const waveX = x + Math.sin((y + offset * 2) * 0.01) * 8;
          const waveY = y + Math.sin((x + offset * 2) * 0.01) * 8;
          
          // Pulsing dots
          const pulse = Math.sin((x + y + offset * 3) * 0.05) * 0.5 + 0.5;
          
          ctx.beginPath();
          ctx.arc(waveX, waveY, 2 * pulse + 0.5, 0, Math.PI * 2);
          ctx.fillStyle = color.replace(/[\d.]+\)$/, `${0.4 * pulse})`);
          ctx.fill();
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [color, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
