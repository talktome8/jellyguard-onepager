'use client';

interface WaveDividerProps {
  flip?: boolean;
  color?: 'sand' | 'white' | 'teal';
}

export default function WaveDivider({ flip = false, color = 'white' }: WaveDividerProps) {
  const colorMap = {
    sand: '#edf5f7',
    white: '#ffffff',
    teal: '#1aa3a3',
  };

  const fillColor = colorMap[color];

  return (
    <div className={`w-full overflow-hidden relative ${flip ? 'rotate-180' : ''}`}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-12 md:h-16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`waveGradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fillColor} stopOpacity="0.2" />
            <stop offset="100%" stopColor={fillColor} stopOpacity="1" />
          </linearGradient>
        </defs>
        
        {/* Animated wave layer 1 */}
        <path
          d="M0,64 C240,20 480,20 600,64 C720,108 960,108 1200,64 L1200,120 L0,120 Z"
          fill={fillColor}
          opacity="0.3"
          className="animate-[wave-subtle_12s_ease-in-out_infinite]"
        />
        
        {/* Animated wave layer 2 */}
        <path
          d="M0,80 C320,40 480,40 600,80 C720,120 880,120 1200,80 L1200,120 L0,120 Z"
          fill="url(#waveGradient-${color})"
          opacity="0.5"
          className="animate-[wave-subtle_15s_ease-in-out_infinite]"
          style={{ animationDelay: '1s' }}
        />
        
        {/* Static front wave with gradient */}
        <path
          d="M0,96 C240,64 480,64 600,96 C720,128 960,128 1200,96 L1200,120 L0,120 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
