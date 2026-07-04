import type { Locale } from '@/lib/brand'
import { L } from '@/lib/i18n'
import { type Order, STAGE_LABEL, stagesFor } from '@/lib/fulfillment'
import { Icon } from '@/components/ui/Icon'
import { Badge } from '@/components/ui/Badge'

const KIND_LABEL = {
  vehicle: { sv: 'Fordon', en: 'Vehicle' },
  part: { sv: 'Del', en: 'Part' },
  service: { sv: 'Tjänst', en: 'Service' },
} as const

export function OrderTracker({ order, locale }: { order: Order; locale: Locale }) {
  const stages = stagesFor(order)
  const currentIdx = stages.indexOf(order.currentStage)
  const eventByStage = new Map(order.events.map((e) => [e.stage, e]))

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2 border-b border-border pb-5">
        <span className="eyebrow eyebrow--signal">{locale === 'sv' ? 'Orderstatus' : 'Order status'}</span>
        <h1 className="font-display text-2xl font-black uppercase tracking-tight text-text-strong sm:text-3xl">
          {order.id}
        </h1>
        <p className="text-sm text-text-muted">
          {locale === 'sv' ? 'Beräknad leverans' : 'Estimated delivery'}:{' '}
          <span className="text-text-strong">{L(order.eta, locale)}</span>
        </p>
      </header>

      {/* Stage tracker */}
      <ol className="flex flex-col">
        {stages.map((s, i) => {
          const done = i < currentIdx
          const active = i === currentIdx
          const ev = eventByStage.get(s)
          return (
            <li key={s} className="flex gap-4">
              {/* rail */}
              <div className="flex flex-col items-center">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                    done
                      ? 'border-success bg-success/15 text-success'
                      : active
                        ? 'border-signal bg-signal-tint text-signal'
                        : 'border-border bg-surface text-text-faint'
                  }`}
                >
                  {done ? <Icon name="check" size={16} /> : <span className="h-2 w-2 rounded-full bg-current" />}
                </span>
                {i < stages.length - 1 && (
                  <span className={`w-px flex-1 ${i < currentIdx ? 'bg-success/50' : 'bg-border'}`} />
                )}
              </div>
              {/* content */}
              <div className={`flex flex-col gap-0.5 ${i < stages.length - 1 ? 'pb-6' : ''}`}>
                <span className={`text-sm font-semibold ${active ? 'text-signal' : done ? 'text-text-strong' : 'text-text-faint'}`}>
                  {L(STAGE_LABEL[s], locale)}
                </span>
                {ev?.date && <span className="font-mono text-2xs text-text-faint">{ev.date}</span>}
                {ev?.note && <span className="text-xs text-text-muted">{L(ev.note, locale)}</span>}
              </div>
            </li>
          )
        })}
      </ol>

      {/* Order lines */}
      <div className="rounded-md border border-border bg-surface p-5">
        <span className="eyebrow mb-3 block">{locale === 'sv' ? 'Innehåll' : 'Items'}</span>
        <ul className="flex flex-col gap-2">
          {order.lines.map((l, i) => (
            <li key={i} className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2">
                <Badge tone="neutral">{L(KIND_LABEL[l.kind], locale)}</Badge>
                <span className="text-text">{l.title}</span>
              </span>
              <span className="font-mono text-text-faint">× {l.qty}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
