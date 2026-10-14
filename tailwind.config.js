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
          // #5B6678 on white is 5.9:1. The old #667085 was 4.8:1 on white but only
          // 4.3:1 on the page canvas, which is below AA for small text.
          faint: '#5b6678',
        },
        // v2 tokens (src/styles/tokens.css is the source of truth)
        canvas: 'var(--canvas)',
        panel: 'var(--panel)',
        sunken: 'var(--sunken)',
        accent: { DEFAULT: 'var(--accent)', wash: 'var(--wash)', signal: 'var(--signal)' },
        control: 'var(--control)',
        ok: { ink: 'var(--ok-ink)', bg: 'var(--ok-bg)' },
        wait: { ink: 'var(--wait-ink)', bg: 'var(--wait-bg)' },
        no: { ink: 'var(--no-ink)', bg: 'var(--no-bg)' },
        rev: { ink: 'var(--rev-ink)', bg: 'var(--rev-bg)' },
      },
      fontFamily: {
        sans: ['var(--f-ui)'],
        // Instrument Serif has one weight (400). Use `font-display` for it and never
        // combine it with font-bold / font-semibold.
        display: ['var(--f-display)'],
        serif: ['var(--f-display)'],
        mono: ['var(--f-code)'],
      },
      transitionDuration: {
        instant: 'var(--d-instant)',
        quick: 'var(--d-quick)',
        base: 'var(--d-base)',
      },
      transitionTimingFunction: {
        standard: 'var(--e-standard)',
        emph: 'var(--e-emph)',
        exit: 'var(--e-exit)',
      },
      borderRadius: {
        chip: 'var(--r-chip)',
        ctl: 'var(--r-ctl)',
        sheet: 'var(--r-sheet)',
      },
      minHeight: { target: 'var(--target)', 'target-sm': 'var(--target-sm)' },
      minWidth: { target: 'var(--target)', 'target-sm': 'var(--target-sm)' },
      boxShadow: {
        // v2: flat at rest. `card` is kept as a name so existing classes keep working,
        // but it no longer casts a shadow. The only elevation is `overlay`.
        card: 'none',
        raised: 'none',
        overlay: 'var(--overlay-shadow)',
      },
      maxWidth: {
        '8xl': '90rem',
      },
    },
  },
  plugins: [],
};
