import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/lib/brand'
import type { Part } from '@/lib/types'
import { L, t } from '@/lib/i18n'
import { formatPrice } from '@/lib/format'
import { getModelById } from '@/lib/content'
import { StockBadge } from '@/components/ui/Badge'
import { AddToCartButton } from './AddToCartButton'

const CATEGORY_LABEL: Record<Part['category'], { sv: string; en: string }> = {
  'wheels-tires': { sv: 'Fälg & däck', en: 'Wheels & tires' },
  suspension: { sv: 'Fjädring', en: 'Suspension' },
  brakes: { sv: 'Bromsar', en: 'Brakes' },
  controls: { sv: 'Reglage', en: 'Controls' },
  ergonomics: { sv: 'Ergonomi', en: 'Ergonomics' },
  drivetrain: { sv: 'Drivlina', en: 'Drivetrain' },
  protection: { sv: 'Skydd', en: 'Protection' },
}

export function PartCard({ part, locale }: { part: Part; locale: Locale }) {
  const price = formatPrice(part.price, locale)
  const href = `/${locale}/delar/${part.handle}`
  const fitNames = part.fitment
    .map((id) => getModelById(id)?.name)
    .filter(Boolean)
    .slice(0, 3)

  return (
    <div className="group flex flex-col overflow-hidden rounded-md border border-border bg-surface transition-colors duration-2 hover:border-border-strong">
      <Link href={href} className="relative aspect-square overflow-hidden bg-bg-sunken">
        <Image
          src={part.images[0]?.src ?? '/brand/eldr-mark.svg'}
          alt={part.images[0] ? L(part.images[0].alt, locale) : L(part.name, locale)}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-cover transition-transform duration-4 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute right-2 top-2">
          <StockBadge availability={part.availability} locale={locale} withDot={false} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="eyebrow">{L(CATEGORY_LABEL[part.category], locale)}</span>
        <Link href={href}>
          <h3 className="text-sm font-semibold leading-snug text-text-strong transition-colors group-hover:text-signal">
            {L(part.name, locale)}
          </h3>
        </Link>
        {fitNames.length > 0 && (
          <p className="text-2xs text-text-faint">
            {t('label.fitment', locale)}: {fitNames.join(' · ')}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="font-display text-base font-bold tracking-tight text-text-strong">
            {price.primary}
          </span>
          <AddToCartButton
            size="sm"
            variant="outline"
            label={t('cta.addToCart', locale)}
            item={{
              variantId: part.id,
              quantity: 1,
              title: L(part.name, locale),
              image: part.images[0]?.src,
              unitPriceSek: part.price.sek,
              href,
              shopifyVariantId: part.shopifyVariantId,
            }}
          />
        </div>
      </div>
    </div>
  )
}
