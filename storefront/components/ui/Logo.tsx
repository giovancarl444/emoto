import { BRAND } from '@/lib/brand'

/** The ELDR bee mark — an aggressive little hornet: black body, yellow stripes + stinger. */
export function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      role="img"
      aria-label={title ?? `${BRAND.name} bee mark`}
    >
      <defs>
        <clipPath id="eldr-bee-body">
          <ellipse cx="62" cy="66" rx="30" ry="20" transform="rotate(28 60 60)" />
        </clipPath>
      </defs>
      <g transform="rotate(28 60 60)">
        {/* wings */}
        <ellipse cx="44" cy="30" rx="30" ry="16" className="stroke-text-strong" strokeWidth="4" opacity="0.4" />
        <ellipse cx="52" cy="46" rx="24" ry="12" className="stroke-text-strong" strokeWidth="4" opacity="0.4" />
        {/* body */}
        <ellipse cx="62" cy="66" rx="30" ry="20" className="fill-text-strong" />
        {/* head + antennae */}
        <circle cx="34" cy="60" r="10" className="fill-text-strong" />
        <line x1="30" y1="54" x2="19" y2="43" className="stroke-text-strong" strokeWidth="4" strokeLinecap="round" />
        <line x1="26" y1="61" x2="13" y2="57" className="stroke-text-strong" strokeWidth="4" strokeLinecap="round" />
        {/* stinger */}
        <polygon points="90,74 112,86 88,92" className="fill-signal stroke-text-strong" strokeWidth="2" />
      </g>
      {/* stripes clipped to the body */}
      <g clipPath="url(#eldr-bee-body)">
        <g transform="rotate(28 60 60)">
          <rect x="46" y="46" width="9" height="40" className="fill-signal" />
          <rect x="66" y="46" width="9" height="40" className="fill-signal" />
        </g>
      </g>
    </svg>
  )
}

interface LogoProps {
  variant?: 'full' | 'mark' | 'wordmark'
  className?: string
  wordmarkClassName?: string
}

/** Black ELDR wordmark with a yellow sting-dot — the brand signature. */
export function Logo({ variant = 'full', className, wordmarkClassName }: LogoProps) {
  return (
    <span className={['inline-flex items-center gap-2', className].filter(Boolean).join(' ')}>
      {variant !== 'wordmark' && <Mark className="h-7 w-7 shrink-0" />}
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
          <span className="text-signal-ink">.</span>
        </span>
      )}
    </span>
  )
}
