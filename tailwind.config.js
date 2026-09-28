/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f2f5fa',
          100: '#e3e9f4',
          200: '#c6d3e8',
          300: '#9db2d5',
          400: '#6d8bbd',
          500: '#4a6ba4',
          600: '#385389',
          700: '#2e426f',
          800: '#26355a',
          900: '#152344',
          950: '#0d162c',
        },
        ink: {
          DEFAULT: '#101828',
          muted: '#475467',
          faint: '#667085',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.06)',
        raised: '0 4px 10px -2px rgba(16,24,40,0.08), 0 2px 4px -2px rgba(16,24,40,0.04)',
      },
      maxWidth: {
        '8xl': '90rem',
      },
    },
  },
  plugins: [],
};
