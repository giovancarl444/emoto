import { BRAND } from '@/lib/brand'

/** The ELDR emblem — three ascending blades, tallest tipped in ember. */
export function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      role="img"
      aria-label={title ?? `${BRAND.name} mark`}
    >
      <path d="M6 40 L12 40 L20 18 L14 18 Z" className="fill-bone-100" />
      <path d="M17 40 L23 40 L31 12 L25 12 Z" className="fill-bone-100" />
      <path d="M28 40 L34 40 L42 6 L36 6 Z" className="fill-signal" />
    </svg>
  )
}

interface LogoProps {
  variant?: 'full' | 'mark' | 'wordmark'
  className?: string
  wordmarkClassName?: string
}

/**
 * The rendered wordmark uses the display face (Archivo) for crispness at every
 * size and a trailing ember tick — the brand signature. Never a raster.
 */
export function Logo({ variant = 'full', className, wordmarkClassName }: LogoProps) {
  return (
    <span className={['inline-flex items-center gap-2.5', className].filter(Boolean).join(' ')}>
      {variant !== 'wordmark' && <Mark className="h-6 w-6 shrink-0" />}
      {variant !== 'mark' && (
        <span
          className={[
            'font-display font-black uppercase leading-none tracking-tight text-text-strong',
            'text-[1.35rem]',
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
