import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  '#f0f7f3',
          100: '#d9ede3',
          200: '#afd6c2',
          300: '#7ab89e',
          400: '#4a977a',
          500: '#2d7860',
          600: '#1f5e49',
          700: '#1a4a38',
          800: '#17382c',
          900: '#132d23',
          950: '#0b1e17',
        },
        gold: {
          50:  '#fdf8ee',
          100: '#f9eece',
          200: '#f1d899',
          300: '#e8bc5e',
          400: '#dfa030',
          500: '#c98420',
          600: '#a96618',
          700: '#874d18',
          800: '#6f3d19',
          900: '#5c3317',
          950: '#341908',
        },
        cream: '#f5f0e8',
        parchment: '#ede7d9',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
