import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Media } from '@/components/ui/Media'
import Link from 'next/link'
import type { Locale } from '@/lib/brand'
import { BRAND } from '@/lib/brand'
import { DEFAULT_LOCALE, LOCALES, isLocale, L, t, alternates } from '@/lib/i18n'
import { getAllParts, getPart, getModelById } from '@/lib/content'
import { Price } from '@/components/ui/Price'
import { StockBadge } from '@/components/ui/Badge'
import { AddToCartButton } from '@/components/commerce/AddToCartButton'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Icon } from '@/components/ui/Icon'

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => getAllParts().map((p) => ({ locale, handle: p.handle })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; handle: string }>
}): Promise<Metadata> {
  const { locale, handle } = await params
  const l: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE
  const part = getPart(handle)
  if (!part) return {}
  return {
    title: L(part.name, l),
    description: L(part.summary, l),
    alternates: { canonical: `/${l}/delar/${handle}`, languages: alternates(`delar/${handle}`, BRAND.siteUrl) },
  }
}

export default async function PartPDP({
  params,
}: {
  params: Promise<{ locale: string; handle: string }>
}) {
  const { locale: raw, handle } = await params
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE
  const part = getPart(handle)
  if (!part) notFound()

  const fitModels = part.fitment.map((id) => getModelById(id)).filter(Boolean)

  return (
    <div className="container-eldr section">
      <Breadcrumbs
        items={[
          { name: 'ELDR', href: `/${locale}` },
          { name: locale === 'sv' ? 'Delar' : 'Parts', href: `/${locale}/delar` },
          { name: L(part.name, locale) },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-md border border-border bg-bg-sunken">
          <Media
            src={part.images[0]?.src ?? '/brand/eldr-mark.svg'}
            alt={part.images[0] ? L(part.images[0].alt, locale) : L(part.name, locale)}
            fill
            priority
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <StockBadge availability={part.availability} locale={locale} />
            <h1 className="mt-3 font-display text-2xl font-black uppercase leading-none tracking-tight text-text-strong sm:text-3xl">
              {L(part.name, locale)}
            </h1>
            {part.brand && <p className="mt-1 font-mono text-2xs uppercase tracking-caps text-text-faint">{part.brand}</p>}
            <p className="mt-3 text-md text-text-muted">{L(part.summary, locale)}</p>
          </div>

          <div className="border-y border-border py-4">
            <Price money={part.price} locale={locale} size="lg" showVat />
          </div>

          <AddToCartButton
            fullWidth
            label={t('cta.addToCart', locale)}
            item={{
              variantId: part.id,
              quantity: 1,
              title: L(part.name, locale),
              image: part.images[0]?.src,
              unitPriceSek: part.price.sek,
              href: `/${locale}/delar/${part.handle}`,
              shopifyVariantId: part.shopifyVariantId,
            }}
          />

          {part.upgradeReason && (
            <div className="flex items-start gap-2.5 rounded-md border border-border bg-surface p-4">
              <Icon name="info" size={18} className="mt-0.5 shrink-0 text-signal" />
              <p className="text-sm text-text-muted">
                <span className="font-semibold text-text-strong">{locale === 'sv' ? 'Varför uppgradera: ' : 'Why upgrade: '}</span>
                {L(part.upgradeReason, locale)}
              </p>
            </div>
          )}

          {fitModels.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="eyebrow">{t('label.fitment', locale)}</span>
              <div className="flex flex-wrap gap-2">
                {fitModels.map(
                  (m) =>
                    m && (
                      <Link
                        key={m.id}
                        href={`/${locale}/motorcyklar/${m.handle}`}
                        className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-surface px-3 py-1.5 text-sm text-text-muted hover:border-border-strong hover:text-text-strong"
                      >
                        {m.marque} {m.name}
                        <Icon name="arrow-up-right" size={14} />
                      </Link>
                    ),
                )}
              </div>
            </div>
          )}

          {part.description.map((d, i) => (
            <p key={i} className="text-sm leading-relaxed text-text-muted">
              {L(d, locale)}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
