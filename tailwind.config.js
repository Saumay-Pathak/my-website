/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        foreground: '#ffffff',
        primary: {
          DEFAULT: '#00d4ff',
          foreground: '#000000',
        },
        secondary: {
          DEFAULT: '#7c3aed',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#1a1a1a',
          foreground: '#a1a1aa',
        },
        card: {
          DEFAULT: '#0a0a0a',
          foreground: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
