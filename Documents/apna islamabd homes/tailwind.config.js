/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B132B',
          light: '#1C2541',
          dark: '#050A18',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F3E5AB',
          dark: '#AA7C11',
        },
        border: 'rgba(0, 0, 0, 0.08)',
        surface: {
          DEFAULT: '#F8F9FA',
          dark: '#E9ECEF',
        },
        muted: {
          DEFAULT: '#6C757D',
          foreground: '#6C757D',
        }
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxe': '0 20px 40px -15px rgba(10, 17, 40, 0.12)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
