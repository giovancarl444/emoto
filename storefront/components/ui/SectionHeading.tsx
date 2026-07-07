import Link from 'next/link'
import type { ReactNode } from 'react'
import { Icon } from './Icon'

export function SectionHeading({
  eyebrow,
  title,
  children,
  link,
}: {
  eyebrow?: string
  title: ReactNode
  children?: ReactNode
  link?: { href: string; label: string }
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <span className="eyebrow eyebrow--signal">{eyebrow}</span>}
        <h2 className="mt-2 font-display text-2xl font-black uppercase leading-none tracking-tight text-text-strong sm:text-3xl">
          {title}
        </h2>
        {children && <p className="mt-3 text-md text-text-muted">{children}</p>}
      </div>
      {link && (
        <Link
          href={link.href}
          className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm text-text-muted transition-colors hover:text-signal-ink"
        >
          {link.label}
          <Icon name="arrow-right" size={16} />
        </Link>
      )}
    </div>
  )
}
