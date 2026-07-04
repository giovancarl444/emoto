import type { ReactNode } from 'react'
import type { Locale } from '@/lib/brand'
import type { Availability, RoadClass } from '@/lib/types'
import { t } from '@/lib/i18n'

type Tone = 'neutral' | 'signal' | 'success' | 'warning' | 'danger' | 'info'

const tones: Record<Tone, string> = {
  neutral: 'border-border text-text-muted bg-surface',
  signal: 'border-signal/40 text-signal bg-signal-tint',
  success: 'border-success/40 text-success bg-success/10',
  warning: 'border-warning/40 text-warning bg-warning/10',
  danger: 'border-danger/40 text-danger bg-danger/10',
  info: 'border-ion-400/40 text-ion-300 bg-ion-400/10',
}

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5',
        'font-mono text-2xs uppercase tracking-caps',
        tones[tone],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}

const STOCK_TONE: Record<Availability['state'], Tone> = {
  in_stock: 'success',
  build_to_order: 'warning',
  preorder: 'info',
  sold_out: 'danger',
}

export function StockBadge({
  availability,
  locale,
  withDot = true,
}: {
  availability: Availability
  locale: Locale
  withDot?: boolean
}) {
  const tone = STOCK_TONE[availability.state]
  const label = t(`stock.${availability.state}`, locale)
  const lead =
    availability.state !== 'in_stock' && availability.leadTimeDays
      ? ` · ${availability.leadTimeDays[0]}–${availability.leadTimeDays[1]} ${t('stock.days', locale)}`
      : ''
  return (
    <Badge tone={tone}>
      {withDot && (
        <span
          className="h-1.5 w-1.5 rounded-full bg-current"
          style={availability.state === 'in_stock' ? { boxShadow: '0 0 6px currentColor' } : undefined}
          aria-hidden
        />
      )}
      {label}
      {lead}
    </Badge>
  )
}

const ROAD_LABEL: Record<RoadClass, { sv: string; en: string; tone: Tone }> = {
  offroad: { sv: 'Off-road', en: 'Off-road', tone: 'neutral' },
  'L1e-B': { sv: 'L1e-B · EU-moped', en: 'L1e-B · moped', tone: 'info' },
  L3e: { sv: 'L3e · MC', en: 'L3e · motorcycle', tone: 'signal' },
}

export function RoadClassBadge({ roadClass, locale }: { roadClass: RoadClass; locale: Locale }) {
  const cfg = ROAD_LABEL[roadClass]
  return <Badge tone={cfg.tone}>{locale === 'sv' ? cfg.sv : cfg.en}</Badge>
}
