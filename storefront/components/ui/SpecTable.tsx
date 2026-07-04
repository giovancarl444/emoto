import type { Locale } from '@/lib/brand'
import type { SpecGroup, SpecItem } from '@/lib/types'
import { L } from '@/lib/i18n'

/** Condensed horizontal spec strip (cards, hero). Mono values = technical feel. */
export function SpecStrip({ items, locale }: { items: SpecItem[]; locale: Locale }) {
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 xs:grid-cols-4">
      {items.map((s) => (
        <div key={s.key} className="flex flex-col gap-0.5">
          <dt className="eyebrow">{L(s.label, locale)}</dt>
          <dd className="font-mono text-sm text-text-strong">{L(s.value, locale)}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Full grouped spec table for the PDP. */
export function SpecTable({ groups, locale }: { groups: SpecGroup[]; locale: Locale }) {
  return (
    <div className="flex flex-col gap-8">
      {groups.map((g) => (
        <section key={g.id}>
          <h3 className="eyebrow eyebrow--signal mb-3">{L(g.title, locale)}</h3>
          <dl className="divide-y divide-border border-y border-border">
            {g.items.map((s) => (
              <div
                key={s.key}
                className="grid grid-cols-[1fr_1.2fr] items-baseline gap-4 py-2.5 sm:grid-cols-[1fr_2fr]"
              >
                <dt className="text-sm text-text-muted">{L(s.label, locale)}</dt>
                <dd
                  className={[
                    'font-mono text-sm',
                    s.highlight ? 'text-signal-ink' : 'text-text-strong',
                  ].join(' ')}
                >
                  {L(s.value, locale)}
                  {s.note && (
                    <span className="mt-0.5 block font-sans text-2xs text-text-faint">
                      {L(s.note, locale)}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  )
}
