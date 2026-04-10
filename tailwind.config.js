/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        bg: '#050508',
        surface: '#0d0d14',
        accent: '#6366f1',
        'accent-2': '#8b5cf6',
        muted: '#3f3f5a',
        text: '#e2e2f0',
        'text-muted': '#8888aa',
      },
      animation: {
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
