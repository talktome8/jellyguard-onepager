import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0b1b2b',
        teal: '#1aa3a3',
        sand: '#edf5f7',
        ink: '#0f172a',
        coral: '#ff7f66',
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        heebo: ['var(--font-heebo)', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'drift-slow': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(10px, -10px)' },
          '66%': { transform: 'translate(-10px, 10px)' },
        },
        'drift-fast': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(20px, -20px) scale(1.1)' },
        },
        'sparkle': {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
        'float-up': {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-20px)' },
        },
        'gradient': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'shimmer': {
          '0%, 100%': { opacity: '0.3', transform: 'translateX(-20px) skewX(-12deg)' },
          '50%': { opacity: '0.6', transform: 'translateX(20px) skewX(-12deg)' },
        },
        'float-particle': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.4' },
          '50%': { transform: 'translate(20px, -30px) scale(1.2)', opacity: '0.8' },
        },
        'glow-pulse': {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(26,163,163,0.4))' },
          '50%': { filter: 'drop-shadow(0 0 20px rgba(26,163,163,0.8))' },
        },
        'wave-flow': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'bubble-rise': {
          '0%': { transform: 'translateY(0) scale(0.8)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.3' },
          '100%': { transform: 'translateY(-100vh) scale(1.2)', opacity: '0' },
        },
        'twinkle': {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.5)' },
        },
        'wave-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
      },
      animation: {
        'drift-slow': 'drift-slow 20s ease-in-out infinite',
        'drift-fast': 'drift-fast 8s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out',
        'float-up': 'float-up 3s ease-in-out infinite',
        'gradient': 'gradient 15s ease infinite',
        'shimmer': 'shimmer 8s ease-in-out infinite',
        'float-particle': 'float-particle 10s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'wave-flow': 'wave-flow 20s linear infinite',
        'bubble-rise': 'bubble-rise 15s ease-in infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
