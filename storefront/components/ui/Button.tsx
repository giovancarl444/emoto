import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon, type IconName } from './Icon'

type Variant = 'signal' | 'solid' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 font-medium tracking-normal rounded-sm ' +
  'transition-[background-color,border-color,color,transform,box-shadow] duration-1 ease-standard ' +
  'select-none whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'active:translate-y-px disabled:pointer-events-none disabled:opacity-45'

const variants: Record<Variant, string> = {
  // Primary CTA — black workhorse button, white text
  signal:
    'bg-action text-action-text hover:bg-action-hover active:bg-action-press border border-transparent',
  // Accent CTA — the bee sting (yellow), black text
  solid:
    'bg-signal text-on-signal hover:bg-signal-hover hover:shadow-signal border border-transparent',
  // Outline — black hairline on light
  outline:
    'bg-transparent text-text-strong border border-ink-950 hover:bg-grey-50',
  // Quiet
  ghost:
    'bg-transparent text-text border border-transparent hover:bg-grey-50 hover:text-text-strong',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm min-w-[2.25rem]',
  md: 'h-11 px-5 text-sm min-h-tap-min',
  lg: 'h-[3.25rem] px-7 text-base min-h-tap-min',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  iconRight?: IconName
  iconLeft?: IconName
  loading?: boolean
  fullWidth?: boolean
  children: ReactNode
  className?: string
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined }
type ButtonAsLink = CommonProps & { href: string; prefetch?: boolean }

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = 'signal',
    size = 'md',
    iconRight,
    iconLeft,
    loading,
    fullWidth,
    className,
    children,
  } = props
  const cls = [base, variants[variant], sizes[size], fullWidth && 'w-full', className]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden
        />
      )}
      {!loading && iconLeft && <Icon name={iconLeft} size={size === 'lg' ? 20 : 18} />}
      <span>{children}</span>
      {!loading && iconRight && <Icon name={iconRight} size={size === 'lg' ? 20 : 18} />}
    </>
  )

  if ('href' in props && props.href) {
    return (
      <Link href={props.href} prefetch={props.prefetch} className={cls}>
        {inner}
      </Link>
    )
  }
  const { variant: _v, size: _s, iconRight: _r, iconLeft: _l, loading: _lo, fullWidth: _f, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton
  return (
    <button className={cls} disabled={loading || rest.disabled} aria-busy={loading} {...rest}>
      {inner}
    </button>
  )
}
