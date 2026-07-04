import Link from 'next/link'
import { Media } from '@/components/ui/Media'
import type { Locale } from '@/lib/brand'
import type { Model } from '@/lib/types'
import { L, t } from '@/lib/i18n'
import { formatPrice } from '@/lib/format'
import { StockBadge, RoadClassBadge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'

/** Distinct road classes present across a model's variants. */
function roadClasses(model: Model) {
  return [...new Set(model.variants.map((v) => v.roadClass))]
}

/** Best availability across variants (in_stock wins). */
function bestAvailability(model: Model) {
  const order = ['in_stock', 'preorder', 'build_to_order', 'sold_out'] as const
  return [...model.variants]
    .map((v) => v.availability)
    .sort((a, b) => order.indexOf(a.state) - order.indexOf(b.state))[0]
}

export function ProductCard({
  model,
  locale,
  priority = false,
}: {
  model: Model
  locale: Locale
  priority?: boolean
}) {
  const price = formatPrice(model.priceFrom, locale)
  const href = `/${locale}/motorcyklar/${model.handle}`

  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-md border border-border bg-surface transition-colors duration-2 hover:border-border-strong"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-bg-sunken">
        <Media
          src={model.hero.src}
          alt={L(model.hero.alt, locale)}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-4 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {roadClasses(model).map((rc) => (
            <RoadClassBadge key={rc} roadClass={rc} locale={locale} />
          ))}
        </div>
        <div className="absolute right-3 top-3">
          <StockBadge availability={bestAvailability(model)} locale={locale} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-col gap-1">
          <span className="eyebrow">{model.marque}</span>
          <h3 className="font-display text-xl font-black uppercase leading-none tracking-tight text-text-strong transition-colors group-hover:text-signal">
            {model.name}
          </h3>
          <p className="text-sm text-text-muted">{L(model.tagline, locale)}</p>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-border pt-3">
          <div className="flex flex-col">
            <span className="eyebrow">{t('label.from', locale)}</span>
            <span className="font-display text-lg font-bold tracking-tight text-text-strong">
              {price.primary}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-sm text-text-muted transition-transform duration-2 group-hover:translate-x-0.5 group-hover:text-signal">
            {t('cta.configure', locale)}
            <Icon name="arrow-right" size={16} />
          </span>
        </div>
      </div>
    </Link>
  )
}
