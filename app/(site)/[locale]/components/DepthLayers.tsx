'use client';

import { useEffect, useRef } from 'react';

interface DepthLayersProps {
  layers?: number;
  color?: string;
}

export default function DepthLayers({ 
  layers = 5,
  color = 'rgba(26, 163, 163, 0.06)' // Teal for depth
}: DepthLayersProps) {
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

    interface Layer {
      y: number;
      speed: number;
      amplitude: number;
      frequency: number;
      opacity: number;
    }

    const depthLayers: Layer[] = [];
    
    // Create depth layers (like looking down into ocean)
    for (let i = 0; i < layers; i++) {
      depthLayers.push({
        y: (canvas.height / (layers + 1)) * (i + 1),
        speed: 0.001 + i * 0.0003, // Deeper layers move slower
        amplitude: 15 + i * 5, // Deeper layers have more wave
        frequency: 0.003 - i * 0.0002,
        opacity: 0.8 - (i * 0.12) // Deeper layers are more faded
      });
    }

    let time = 0;
    let animationFrame: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      depthLayers.forEach((layer, index) => {
        ctx.beginPath();
        
        // Draw wavy horizontal line representing depth layer
        for (let x = 0; x <= canvas.width; x += 2) {
          const y = layer.y + 
                    Math.sin(x * layer.frequency + time * layer.speed) * layer.amplitude +
                    Math.sin(x * layer.frequency * 2 + time * layer.speed * 1.5) * (layer.amplitude / 2);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Create gradient fill below the line
        const gradient = ctx.createLinearGradient(0, layer.y - 20, 0, layer.y + 40);
        gradient.addColorStop(0, color.replace(/[\d.]+\)$/, '0)'));
        gradient.addColorStop(0.5, color.replace(/[\d.]+\)$/, `${layer.opacity * 0.15})`));
        gradient.addColorStop(1, color.replace(/[\d.]+\)$/, '0)'));
        
        ctx.strokeStyle = color.replace(/[\d.]+\)$/, `${layer.opacity * 0.3})`);
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Add subtle shimmer particles on each layer
        for (let i = 0; i < 3; i++) {
          const particleX = (time * (0.5 + index * 0.1) + i * (canvas.width / 3)) % canvas.width;
          const particleY = layer.y + Math.sin(particleX * 0.01 + time * 0.02) * layer.amplitude;
          
          ctx.beginPath();
          ctx.arc(particleX, particleY, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = color.replace(/[\d.]+\)$/, `${layer.opacity * 0.6})`);
          ctx.fill();
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [layers, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
