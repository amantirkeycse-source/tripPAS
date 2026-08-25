/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFFCFA',
          100: '#C7F0EC',
          200: '#8FE3DC',
          300: '#55D1C8',
          400: '#14B8A6',
          500: '#0F766E',
          600: '#0B5D57',
          700: '#09504B',
          800: '#073F3B',
          900: '#052E2B',
        },
        secondary: '#14B8A6',
        accent: '#F59E0B',
        dark: '#102A43',
        text: '#243B53',
        muted: '#627D98',
        surface: '#F7FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(16, 42, 67, 0.1), 0 2px 4px -2px rgba(16, 42, 67, 0.1)',
        'card-hover': '0 20px 25px -5px rgba(16, 42, 67, 0.1), 0 10px 10px -5px rgba(16, 42, 67, 0.04)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'count-up': 'countUp 1s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}