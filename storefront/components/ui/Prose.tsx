import type { ReactNode } from 'react'
import { Breadcrumbs } from './Breadcrumbs'

/** Shared layout for editorial/legal pages. Tuned line length + rhythm. */
export function PageShell({
  title,
  lead,
  breadcrumbs,
  children,
}: {
  title: string
  lead?: string
  breadcrumbs: { name: string; href?: string }[]
  children: ReactNode
}) {
  return (
    <div className="container-emoto section">
      <Breadcrumbs items={breadcrumbs} />
      <header className="mb-10 max-w-2xl">
        <h1 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-text-strong sm:text-4xl">
          {title}
        </h1>
        {lead && <p className="mt-4 text-md text-text-muted">{lead}</p>}
      </header>
      <div className="prose-emoto max-w-2xl">{children}</div>
    </div>
  )
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="flex max-w-2xl flex-col gap-4 text-md leading-relaxed text-text-muted [&_a]:text-link [&_a]:underline [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:text-text-strong [&_h3]:mt-4 [&_h3]:font-semibold [&_h3]:text-text-strong [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-text-strong">
      {children}
    </div>
  )
}
