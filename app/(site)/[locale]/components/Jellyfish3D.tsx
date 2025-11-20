"use client";

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// 3D Jellyfish Model Component
function JellyfishModel({ scrollProgress, isRising }: { scrollProgress: number; isRising: boolean }) {
  const jellyfishRef = useRef<THREE.Group>(null);
  const tentaclesRef = useRef<THREE.Group[]>([]);
  const [hovered, setHovered] = useState(false);
  
  // Animation state
  const pulsePhase = useRef(0);
  const swimPhase = useRef(0);
  const riseProgress = useRef(0);
  
  useFrame((state, delta) => {
    if (!jellyfishRef.current) return;
    
    // Pulsing bell animation
    pulsePhase.current += delta * 1.5;
    const pulse = Math.sin(pulsePhase.current) * 0.1 + 1;
    
    // Swimming motion
    swimPhase.current += delta * 0.8;
    const swimY = Math.sin(swimPhase.current) * 0.3;
    const swimX = Math.cos(swimPhase.current * 0.5) * 0.2;
    
    if (isRising) {
      // Rising animation with bubbles
      riseProgress.current = Math.min(riseProgress.current + delta * 0.5, 1);
      jellyfishRef.current.position.y = -2 + (8 * riseProgress.current) + swimY;
      jellyfishRef.current.rotation.z = Math.sin(swimPhase.current) * 0.1;
    } else {
      // Reset rise progress when not rising
      riseProgress.current = 0;
      
      // Normal scroll-linked position
      const targetY = -2 + (scrollProgress * 4) + swimY;
      jellyfishRef.current.position.y = targetY;
      jellyfishRef.current.position.x = swimX;
      
      // Rotation based on scroll direction
      jellyfishRef.current.rotation.z = swimX * 0.5;
    }
    
    // Scale pulsing
    jellyfishRef.current.scale.setScalar(pulse * (hovered ? 1.2 : 1));
    
    // Animate tentacles
    tentaclesRef.current.forEach((tentacle, i) => {
      if (tentacle) {
        const tentaclePhase = swimPhase.current + (i * 0.3);
        tentacle.rotation.x = Math.sin(tentaclePhase) * 0.2;
        tentacle.rotation.z = Math.cos(tentaclePhase * 0.8) * 0.15;
      }
    });
  });
  
  return (
    <group 
      ref={jellyfishRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Jellyfish Bell (main body) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshPhongMaterial
          color="#1AA3A3"
          transparent
          opacity={0.7}
          emissive="#0d7a7a"
          emissiveIntensity={hovered ? 0.5 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Inner glow */}
      <mesh position={[0, 0, 0]} scale={0.8}>
        <sphereGeometry args={[1, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshBasicMaterial
          color="#6FEDD6"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Oral arms (4 main tentacles) */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        const x = Math.cos(angle) * 0.3;
        const z = Math.sin(angle) * 0.3;
        
        return (
          <group
            key={`oral-${i}`}
            position={[x, -0.5, z]}
            ref={(el) => {
              if (el) tentaclesRef.current[i] = el;
            }}
          >
            <mesh>
              <cylinderGeometry args={[0.1, 0.05, 2, 8]} />
              <meshPhongMaterial
                color="#1AA3A3"
                transparent
                opacity={0.6}
              />
            </mesh>
          </group>
        );
      })}
      
      {/* Fine tentacles (12 thin strands) */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x = Math.cos(angle) * 0.6;
        const z = Math.sin(angle) * 0.6;
        
        return (
          <group
            key={`tentacle-${i}`}
            position={[x, -0.3, z]}
            ref={(el) => {
              if (el) tentaclesRef.current[i + 4] = el;
            }}
          >
            <mesh>
              <cylinderGeometry args={[0.02, 0.01, 1.5, 6]} />
              <meshPhongMaterial
                color="#1AA3A3"
                transparent
                opacity={0.4}
              />
            </mesh>
          </group>
        );
      })}
      
      {/* Bioluminescent spots */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 0.5;
        const z = Math.sin(angle) * 0.5;
        
        return (
          <mesh key={`spot-${i}`} position={[x, -0.2, z]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#6FEDD6" />
          </mesh>
        );
      })}
    </group>
  );
}

// Bubble particles for rising animation
function Bubbles({ isActive }: { isActive: boolean }) {
  const bubblesRef = useRef<THREE.Group>(null);
  const bubbleData = useRef<{ x: number; z: number; speed: number; phase: number }[]>([]);
  
  // Initialize bubble positions
  useEffect(() => {
    bubbleData.current = Array.from({ length: 30 }, () => ({
      x: (Math.random() - 0.5) * 4,
      z: (Math.random() - 0.5) * 4,
      speed: 0.5 + Math.random() * 1,
      phase: Math.random() * Math.PI * 2
    }));
  }, []);
  
  useFrame((state, delta) => {
    if (!bubblesRef.current || !isActive) return;
    
    bubblesRef.current.children.forEach((bubble, i) => {
      const data = bubbleData.current[i];
      if (!data) return;
      
      // Rise animation
      bubble.position.y += delta * data.speed * 2;
      
      // Wobble
      data.phase += delta * 2;
      bubble.position.x = data.x + Math.sin(data.phase) * 0.2;
      bubble.position.z = data.z + Math.cos(data.phase * 0.7) * 0.2;
      
      // Reset when reaching top
      if (bubble.position.y > 8) {
        bubble.position.y = -3;
      }
      
      // Scale based on height
      const scale = 0.1 + (bubble.position.y / 10) * 0.15;
      bubble.scale.setScalar(scale);
    });
  });
  
  if (!isActive) return null;
  
  return (
    <group ref={bubblesRef}>
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh key={i} position={[0, -3, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial
            color="#6FEDD6"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main component
export default function Jellyfish3D() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isRising, setIsRising] = useState(false);
  const [zIndex, setZIndex] = useState(10);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / scrollHeight, 1);
      setScrollProgress(progress);
      
      // Show scroll-to-top button when near bottom
      setShowScrollTop(progress > 0.8);
      
      // Change z-index based on scroll position to appear in front/behind sections
      // Appears behind at top, in front in middle, behind at bottom
      if (progress < 0.2) {
        setZIndex(1); // Behind hero
      } else if (progress < 0.5) {
        setZIndex(50); // In front of content
      } else if (progress < 0.7) {
        setZIndex(1); // Behind content
      } else {
        setZIndex(50); // In front at bottom
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleScrollToTop = () => {
    setIsRising(true);
    
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Reset rising animation after scroll completes
    setTimeout(() => {
      setIsRising(false);
    }, 2000);
  };
  
  return (
    <>
      {/* 3D Canvas for Jellyfish */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex }}
      >
        <Canvas
          className="pointer-events-auto"
          style={{ background: 'transparent' }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
          <pointLight position={[-5, 3, -5]} intensity={0.5} color="#1AA3A3" />
          <pointLight position={[0, -5, 0]} intensity={0.3} color="#6FEDD6" />
          
          {/* Jellyfish */}
          <JellyfishModel scrollProgress={scrollProgress} isRising={isRising} />
          
          {/* Bubbles */}
          <Bubbles isActive={isRising} />
        </Canvas>
      </div>
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-br from-teal to-teal-light text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group pointer-events-auto"
          aria-label="Scroll to top with jellyfish"
        >
          <svg
            className="w-6 h-6 group-hover:animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
          <div className="absolute -top-12 right-0 bg-navy text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Ride the jellyfish up! 🎐
          </div>
        </button>
      )}
    </>
  );
}
