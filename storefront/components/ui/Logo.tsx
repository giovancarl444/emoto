import { BRAND } from '@/lib/brand'

/**
 * The ELDR hex-hornet — an aggressive stinging-hornet face inside a honeycomb
 * hexagon. The hexagon = honeycomb; the angular face = the sting. Yellow + black.
 * Token-driven (fill-signal = bee yellow, fill-text-strong = ink) so it adapts.
 */
export function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 160 165"
      className={className}
      fill="none"
      role="img"
      aria-label={title ?? `${BRAND.name} hornet mark`}
    >
      <polygon
        points="80,16 140.6,51 140.6,121 80,156 19.4,121 19.4,51"
        className="fill-signal stroke-text-strong"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {/* antennae */}
      <path d="M64 46 C52 32 46 24 38 20" className="stroke-text-strong" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M96 46 C108 32 114 24 122 20" className="stroke-text-strong" strokeWidth="5.5" strokeLinecap="round" />
      <circle cx="36" cy="19" r="4.5" className="fill-text-strong" />
      <circle cx="124" cy="19" r="4.5" className="fill-text-strong" />
      {/* brow */}
      <polygon points="40,52 120,52 114,62 46,62" className="fill-text-strong" />
      {/* angry eyes */}
      <polygon points="42,66 70,74 66,90 42,84" className="fill-text-strong" />
      <polygon points="118,66 90,74 94,90 118,84" className="fill-text-strong" />
      <polygon points="48,72 60,75 58,80 48,78" className="fill-signal" opacity="0.85" />
      <polygon points="112,72 100,75 102,80 112,78" className="fill-signal" opacity="0.85" />
      {/* chin mask + bee-stripe chevron */}
      <polygon points="56,92 104,92 96,116 80,126 64,116" className="fill-text-strong" />
      <polygon points="68,98 92,98 80,108" className="fill-signal" />
      {/* mandible fangs */}
      <polygon points="70,120 64,136 76,124" className="fill-text-strong" />
      <polygon points="90,120 96,136 84,124" className="fill-text-strong" />
    </svg>
  )
}

interface LogoProps {
  variant?: 'full' | 'mark' | 'wordmark'
  className?: string
  wordmarkClassName?: string
}

/** Black ELDR wordmark with a yellow sting-dot, paired with the hex-hornet. */
export function Logo({ variant = 'full', className, wordmarkClassName }: LogoProps) {
  return (
    <span className={['inline-flex items-center gap-2', className].filter(Boolean).join(' ')}>
      {variant !== 'wordmark' && <Mark className="h-8 w-8 shrink-0" />}
      {variant !== 'mark' && (
        <span
          className={[
            'font-display font-black uppercase leading-none tracking-tight text-text-strong',
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
