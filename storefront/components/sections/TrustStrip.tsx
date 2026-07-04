import type { Locale } from '@/lib/brand'
import { t } from '@/lib/i18n'
import { Icon, type IconName } from '@/components/ui/Icon'

const ITEMS: { icon: IconName; key: string }[] = [
  { icon: 'truck', key: 'trust.ddp' },
  { icon: 'file-check', key: 'trust.registration' },
  { icon: 'shield', key: 'trust.warranty' },
  { icon: 'bolt', key: 'trust.secure' },
  { icon: 'info', key: 'trust.support' },
]

export function TrustStrip({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  return (
    <div className={compact ? '' : 'border-y border-border bg-bg-sunken'}>
      <div
        className={`container-eldr grid gap-x-6 gap-y-4 ${
          compact ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' : 'py-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
        }`}
      >
        {ITEMS.map((it) => (
          <div key={it.key} className="flex items-center gap-2.5">
            <Icon name={it.icon} size={20} className="shrink-0 text-signal" />
            <span className="text-xs text-text-muted">{t(it.key, locale)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
