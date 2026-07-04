import type { Locale } from '@/lib/brand'
import type { Money } from '@/lib/types'
import { formatPrice, vatBreakdown, formatSEK, monthlyFinancing, FINANCE_MONTHS } from '@/lib/format'
import { t } from '@/lib/i18n'

export function Price({
  money,
  locale,
  size = 'md',
  showFrom = false,
  showVat = false,
  showEur = true,
  showFinancing = false,
}: {
  money: Money
  locale: Locale
  size?: 'sm' | 'md' | 'lg'
  showFrom?: boolean
  showVat?: boolean
  showEur?: boolean
  showFinancing?: boolean
}) {
  const p = formatPrice(money, locale)
  const vat = vatBreakdown(money.sek)
  const monthly = monthlyFinancing(money.sek)
  const primarySize =
    size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-base' : 'text-lg'

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-baseline gap-2">
        {showFrom && <span className="eyebrow">{t('label.from', locale)}</span>}
        <span className={`font-display font-bold tracking-tight text-text-strong ${primarySize}`}>
          {p.primary}
        </span>
        {p.compareAt && (
          <span className="text-sm text-text-faint line-through">{p.compareAt}</span>
        )}
        <span className="text-2xs text-text-faint">{t('label.inclVat', locale)}</span>
      </div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 font-mono text-2xs text-text-faint">
        {showEur && <span>≈ {p.secondary}</span>}
        {showVat && (
          <span>
            {t('label.vatOf', locale)} {formatSEK(vat.vat, locale)}
          </span>
        )}
      </div>
      {showFinancing && (
        <p className="mt-1 text-xs text-text-muted">
          {t('finance.from', locale)}{' '}
          <span className="font-mono text-text-strong">
            {formatSEK(monthly, locale)}/{locale === 'sv' ? 'mån' : 'mo'}
          </span>{' '}
          <span className="text-text-faint">
            · {FINANCE_MONTHS} {locale === 'sv' ? 'mån' : 'mo'} {t('finance.with', locale)}
          </span>
        </p>
      )}
    </div>
  )
}
