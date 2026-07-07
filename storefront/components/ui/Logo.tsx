import { BRAND } from '@/lib/brand'

/**
 * The EMOTO winged-E — a stylized bee whose body is a bold "E", set inside a
 * honeycomb hexagon: antennae + arced wings + stinger read as a bee, the E
 * reads as the brand. Token-driven (fill-signal = bee yellow, fill-text-strong
 * = ink) so the same mark inverts for black-hex placements.
 */
export function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 160 165"
      className={className}
      fill="none"
      role="img"
      aria-label={title ?? `${BRAND.name} bee mark`}
    >
      <polygon
        points="80,16 140.6,51 140.6,121 80,156 19.4,121 19.4,51"
        className="fill-signal stroke-text-strong"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {/* wings */}
      <path d="M74,62 C46,32 28,42 40,70 C50,84 68,78 74,70" className="stroke-text-strong" strokeWidth="4.5" strokeLinejoin="round" />
      <path d="M86,62 C114,32 132,42 120,70 C110,84 92,78 86,70" className="stroke-text-strong" strokeWidth="4.5" strokeLinejoin="round" />
      {/* antennae */}
      <path d="M72,44 C62,28 56,22 50,18" className="stroke-text-strong" strokeWidth="5" strokeLinecap="round" />
      <path d="M88,44 C98,28 104,22 110,18" className="stroke-text-strong" strokeWidth="5" strokeLinecap="round" />
      <circle cx="49" cy="17" r="4.5" className="fill-text-strong" />
      <circle cx="111" cy="17" r="4.5" className="fill-text-strong" />
      {/* body = bold E */}
      <rect x="60" y="52" width="15" height="80" rx="4" className="fill-text-strong" />
      <rect x="60" y="52" width="46" height="15" rx="4" className="fill-text-strong" />
      <rect x="60" y="84" width="36" height="15" rx="4" className="fill-text-strong" />
      <rect x="60" y="117" width="46" height="15" rx="4" className="fill-text-strong" />
      {/* stinger */}
      <polygon points="61,131 74,131 67.5,148" className="fill-text-strong" />
    </svg>
  )
}

interface LogoProps {
  variant?: 'full' | 'mark' | 'wordmark'
  className?: string
  wordmarkClassName?: string
  /** 'onDark' renders the wordmark near-white for dark/overlay placements. */
  tone?: 'default' | 'onDark'
}

/** EMOTO wordmark with a yellow sting-dot, paired with the winged-E bee. */
export function Logo({ variant = 'full', className, wordmarkClassName, tone = 'default' }: LogoProps) {
  return (
    <span className={['inline-flex items-center gap-2', className].filter(Boolean).join(' ')}>
      {variant !== 'wordmark' && <Mark className="h-8 w-8 shrink-0" />}
      {variant !== 'mark' && (
        <span
          className={[
            'font-display font-black uppercase leading-none tracking-tight',
            tone === 'onDark' ? 'text-paper' : 'text-text-strong',
            'text-[1.4rem]',
            wordmarkClassName,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {BRAND.name}
          <span className="text-signal">.</span>
        </span>
      )}
    </span>
  )
}
