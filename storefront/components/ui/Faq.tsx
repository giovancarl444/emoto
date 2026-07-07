import type { Locale } from '@/lib/brand'
import type { FaqItem } from '@/lib/types'
import { L } from '@/lib/i18n'
import { Icon } from './Icon'

/** Native details/summary — keyboard-accessible and JS-free by construction. */
export function Faq({ items, locale }: { items: FaqItem[]; locale: Locale }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((f, i) => (
        <details key={i} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-md font-medium text-text-strong marker:hidden">
            {L(f.q, locale)}
            <Icon
              name="plus"
              size={18}
              className="shrink-0 text-text-faint transition-transform duration-2 group-open:rotate-45"
            />
          </summary>
          <p className="pb-5 pr-8 text-sm leading-relaxed text-text-muted">{L(f.a, locale)}</p>
        </details>
      ))}
    </div>
  )
}
