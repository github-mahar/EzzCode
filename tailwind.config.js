/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'base-dark': '#0A0F1C',
        'surface-dark': '#111827',
        'surface-elevated': '#1E293B',
        'accent-green': '#00E676',
        'accent-purple': '#8B5CF6',
        'accent-cyan': '#06B6D4',
        'deepest-dark': '#050A14',
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'counter': 'counter 2s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'text-rotate': 'textRotate 0.5s ease forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,230,118,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(0,230,118,0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        textRotate: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0A0F1C 0%, #1a1a3e 50%, #0A0F1C 100%)',
        'cta-gradient': 'linear-gradient(135deg, #00E676 0%, #3B82F6 100%)',
        'purple-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
        'section-gradient': 'linear-gradient(180deg, #0A0F1C 0%, #111827 100%)',
      },
      boxShadow: {
        'green-glow': '0 0 25px rgba(0,230,118,0.4)',
        'green-glow-sm': '0 0 15px rgba(0,230,118,0.3)',
        'card-glow': '0 8px 40px rgba(0,230,118,0.1)',
      },
    },
  },
  plugins: [],
};
