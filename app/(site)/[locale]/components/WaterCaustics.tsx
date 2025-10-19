'use client';

import { useEffect, useState } from 'react';

export default function WaterCaustics() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 0.01);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      <svg className="w-full h-full" preserveAspectRatio="none">
        <defs>
          {/* Turbulence for organic water movement */}
          <filter id="caustics">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02 0.03"
              numOctaves="3"
              seed="1"
            >
              <animate
                attributeName="baseFrequency"
                dur="30s"
                values="0.02 0.03;0.025 0.035;0.02 0.03"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="30">
              <animate
                attributeName="scale"
                dur="10s"
                values="30;40;30"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
            <feGaussianBlur stdDeviation="1" />
          </filter>
          
          {/* Light pattern gradient */}
          <radialGradient id="lightPattern" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#1aa3a3" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#66d9d9" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Animated caustic patterns */}
        <g filter="url(#caustics)">
          <circle 
            cx="30%" 
            cy="40%" 
            r="20%" 
            fill="url(#lightPattern)"
            opacity="0.6"
          >
            <animate
              attributeName="cx"
              dur="25s"
              values="30%;35%;25%;30%"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              dur="20s"
              values="40%;45%;35%;40%"
              repeatCount="indefinite"
            />
          </circle>
          
          <circle 
            cx="70%" 
            cy="60%" 
            r="25%" 
            fill="url(#lightPattern)"
            opacity="0.5"
          >
            <animate
              attributeName="cx"
              dur="30s"
              values="70%;75%;65%;70%"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              dur="22s"
              values="60%;55%;65%;60%"
              repeatCount="indefinite"
            />
          </circle>
          
          <ellipse 
            cx="50%" 
            cy="50%" 
            rx="30%" 
            ry="20%" 
            fill="url(#lightPattern)"
            opacity="0.4"
          >
            <animate
              attributeName="rx"
              dur="18s"
              values="30%;35%;28%;30%"
              repeatCount="indefinite"
            />
          </ellipse>
        </g>
        
        {/* Flowing light streaks */}
        <g opacity="0.3">
          <path
            d="M 0,30 Q 25,35 50,30 T 100,30"
            stroke="url(#lightPattern)"
            strokeWidth="2"
            fill="none"
          >
            <animate
              attributeName="d"
              dur="15s"
              values="M 0,30 Q 25,35 50,30 T 100,30;
                      M 0,32 Q 25,28 50,32 T 100,32;
                      M 0,30 Q 25,35 50,30 T 100,30"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M 0,60 Q 25,55 50,60 T 100,60"
            stroke="url(#lightPattern)"
            strokeWidth="1.5"
            fill="none"
          >
            <animate
              attributeName="d"
              dur="20s"
              values="M 0,60 Q 25,55 50,60 T 100,60;
                      M 0,58 Q 25,63 50,58 T 100,58;
                      M 0,60 Q 25,55 50,60 T 100,60"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </svg>
    </div>
  );
}
