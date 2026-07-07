import Link from 'next/link'
import { Icon } from './Icon'

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-2xs uppercase tracking-caps text-text-faint">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {it.href ? (
              <Link href={it.href} className="transition-colors hover:text-text-strong">
                {it.name}
              </Link>
            ) : (
              <span className="text-text-muted">{it.name}</span>
            )}
            {i < items.length - 1 && <Icon name="chevron-right" size={12} className="text-border-strong" />}
          </li>
        ))}
      </ol>
    </nav>
  )
}
