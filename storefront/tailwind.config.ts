import type { Config } from 'tailwindcss'

/**
 * Tailwind theme maps 1:1 onto the CSS custom properties in styles/tokens.css.
 * Never hardcode a hex here — always reference a token so a re-skin stays a
 * single-file change. Utilities like `bg-surface`, `text-signal`, `rounded-md`
 * resolve to var(--…).
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'var(--white)',
      black: 'var(--black)',

      // Semantic surface + text
      bg: 'var(--bg)',
      'bg-sunken': 'var(--bg-sunken)',
      surface: 'var(--surface)',
      'surface-raised': 'var(--surface-raised)',
      'surface-hover': 'var(--surface-hover)',

      border: 'var(--border)',
      'border-strong': 'var(--border-strong)',
      'border-signal': 'var(--border-signal)',

      text: 'var(--text)',
      'text-strong': 'var(--text-strong)',
      'text-muted': 'var(--text-muted)',
      'text-faint': 'var(--text-faint)',
      'text-on-signal': 'var(--text-on-signal)',

      signal: {
        DEFAULT: 'var(--signal)',
        hover: 'var(--signal-hover)',
        press: 'var(--signal-press)',
        tint: 'var(--signal-tint)',
      },
      accent: 'var(--accent)',
      link: 'var(--link)',
      success: 'var(--success)',
      warning: 'var(--warning)',
      danger: 'var(--danger)',

      // Raw ramps (rarely used directly; available for fine control)
      ink: {
        950: 'var(--ink-950)',
        900: 'var(--ink-900)',
        850: 'var(--ink-850)',
        800: 'var(--ink-800)',
        750: 'var(--ink-750)',
        700: 'var(--ink-700)',
        600: 'var(--ink-600)',
        500: 'var(--ink-500)',
        400: 'var(--ink-400)',
        300: 'var(--ink-300)',
        200: 'var(--ink-200)',
        100: 'var(--ink-100)',
      },
      bone: {
        100: 'var(--bone-100)',
        50: 'var(--bone-050)',
      },
      ember: {
        700: 'var(--ember-700)',
        600: 'var(--ember-600)',
        500: 'var(--ember-500)',
        400: 'var(--ember-400)',
        300: 'var(--ember-300)',
        100: 'var(--ember-100)',
      },
      ion: {
        500: 'var(--ion-500)',
        400: 'var(--ion-400)',
        300: 'var(--ion-300)',
      },
    },
    fontFamily: {
      display: 'var(--font-display)',
      sans: 'var(--font-ui)',
      mono: 'var(--font-mono)',
    },
    fontSize: {
      '2xs': 'var(--text-2xs)',
      xs: 'var(--text-xs)',
      sm: 'var(--text-sm)',
      base: 'var(--text-base)',
      md: 'var(--text-md)',
      lg: 'var(--text-lg)',
      xl: 'var(--text-xl)',
      '2xl': 'var(--text-2xl)',
      '3xl': 'var(--text-3xl)',
      '4xl': 'var(--text-4xl)',
      display: 'var(--text-display)',
    },
    fontWeight: {
      regular: 'var(--weight-regular)',
      medium: 'var(--weight-medium)',
      semibold: 'var(--weight-semibold)',
      bold: 'var(--weight-bold)',
      black: 'var(--weight-black)',
    },
    letterSpacing: {
      tight: 'var(--tracking-tight)',
      normal: 'var(--tracking-normal)',
      wide: 'var(--tracking-wide)',
      caps: 'var(--tracking-caps)',
    },
    lineHeight: {
      tight: 'var(--leading-tight)',
      snug: 'var(--leading-snug)',
      normal: 'var(--leading-normal)',
      relaxed: 'var(--leading-relaxed)',
    },
    borderRadius: {
      none: 'var(--radius-none)',
      xs: 'var(--radius-xs)',
      sm: 'var(--radius-sm)',
      md: 'var(--radius-md)',
      lg: 'var(--radius-lg)',
      xl: 'var(--radius-xl)',
      pill: 'var(--radius-pill)',
      full: '9999px',
    },
    boxShadow: {
      sm: 'var(--shadow-sm)',
      md: 'var(--shadow-md)',
      lg: 'var(--shadow-lg)',
      signal: 'var(--shadow-signal)',
      none: 'none',
    },
    extend: {
      spacing: {
        gutter: 'var(--gutter)',
        'tap-min': 'var(--tap-min)',
      },
      maxWidth: {
        container: 'var(--container-max)',
      },
      transitionTimingFunction: {
        standard: 'var(--ease-standard)',
        'ease-out': 'var(--ease-out)',
        'ease-in': 'var(--ease-in)',
      },
      transitionDuration: {
        1: 'var(--dur-1)',
        2: 'var(--dur-2)',
        3: 'var(--dur-3)',
        4: 'var(--dur-4)',
      },
      zIndex: {
        sticky: '20',
        header: '40',
        drawer: '60',
        modal: '80',
        toast: '100',
      },
    },
  },
  plugins: [],
}

export default config
