import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { Locale } from '@/lib/brand'
import { BRAND } from '@/lib/brand'
import { DEFAULT_LOCALE, LOCALES, isLocale, L, t, alternates } from '@/lib/i18n'
import { getAllModels, getModel, getCompatibleParts, getWarranty } from '@/lib/content'
import { registrationService } from '@/content/services'
import { MediaGallery } from '@/components/commerce/MediaGallery'
import { ProductConfigurator } from '@/components/commerce/ProductConfigurator'
import { SpecTable } from '@/components/ui/SpecTable'
import { PartCard } from '@/components/commerce/PartCard'
import { Faq } from '@/components/ui/Faq'
import { Reviews } from '@/components/commerce/Reviews'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Icon } from '@/components/ui/Icon'
import { ProductJsonLd, BreadcrumbJsonLd, FaqJsonLd } from '@/components/seo/JsonLd'

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => getAllModels().map((m) => ({ locale, handle: m.handle })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; handle: string }>
}): Promise<Metadata> {
  const { locale, handle } = await params
  const l: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE
  const model = getModel(handle)
  if (!model) return {}
  const title = `${model.marque} ${model.name}`
  return {
    title,
    description: L(model.summary, l),
    alternates: {
      canonical: `/${l}/motorcyklar/${handle}`,
      languages: alternates(`motorcyklar/${handle}`, BRAND.siteUrl),
    },
    openGraph: {
      title: `${title} · ${BRAND.name}`,
      description: L(model.summary, l),
      images: [{ url: model.hero.src }],
      type: 'website',
    },
  }
}

export default async function PDP({
  params,
}: {
  params: Promise<{ locale: string; handle: string }>
}) {
  const { locale: raw, handle } = await params
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE
  const model = getModel(handle)
  if (!model) notFound()

  const compatible = getCompatibleParts(model)
  const warranty = getWarranty(model.warrantyId)

  return (
    <div className="container-eldr pb-24 pt-6 lg:pb-16">
      <Breadcrumbs
        items={[
          { name: 'ELDR', href: `/${locale}` },
          { name: locale === 'sv' ? 'Motorcyklar' : 'Motorcycles', href: `/${locale}/motorcyklar` },
          { name: model.name },
        ]}
      />

      {/* Gallery + configurator */}
      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <MediaGallery media={model.gallery} locale={locale} />
        <ProductConfigurator
          model={model}
          locale={locale}
          regService={{
            id: registrationService.id,
            name: L(registrationService.name, locale),
            priceSek: registrationService.price.sek,
            shopifyVariantId: registrationService.shopifyVariantId,
          }}
        />
      </div>

      {/* Story */}
      <section className="section-tight mt-8 max-w-3xl border-t border-border">
        <span className="eyebrow eyebrow--signal">{t('label.overview', locale)}</span>
        <div className="mt-4 flex flex-col gap-4">
          {model.story.map((p, i) => (
            <p key={i} className="text-md leading-relaxed text-text-muted">
              {L(p, locale)}
            </p>
          ))}
        </div>
      </section>

      {/* Specs */}
      <section id="specs" className="section-tight border-t border-border">
        <SectionHeading eyebrow={t('label.specs', locale)} title={locale === 'sv' ? 'Tekniska data' : 'Technical data'} />
        <div className="max-w-3xl">
          <SpecTable groups={model.specGroups} locale={locale} />
          <p className="mt-4 text-2xs text-text-faint">
            {locale === 'sv'
              ? '[VERIFY] Effekt-, räckvidds- och viktvärden är tillverkardata och bekräftas mot fordonets CoC före leverans.'
              : '[VERIFY] Power, range and weight figures are manufacturer data and confirmed against the vehicle CoC before delivery.'}
          </p>
        </div>
      </section>

      {/* Warranty + delivery */}
      {warranty && (
        <section className="section-tight grid gap-8 border-t border-border md:grid-cols-2">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Icon name="shield" size={18} className="text-signal" />
              <span className="eyebrow eyebrow--signal">{t('label.warranty', locale)}</span>
            </div>
            <ul className="flex flex-col gap-2">
              {warranty.terms.map((term, i) => (
                <li key={i} className="flex gap-2 text-sm text-text-muted">
                  <Icon name="check" size={16} className="mt-0.5 shrink-0 text-success" />
                  {L(term, locale)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Icon name="truck" size={18} className="text-signal" />
              <span className="eyebrow eyebrow--signal">{t('label.delivery', locale)}</span>
            </div>
            <ul className="flex flex-col gap-2 text-sm text-text-muted">
              <li className="flex gap-2">
                <Icon name="check" size={16} className="mt-0.5 shrink-0 text-success" />
                {locale === 'sv' ? 'DDP inom EU — moms och tull betalda, inga överraskningar.' : 'DDP within the EU — VAT and duty paid, no surprises.'}
              </li>
              <li className="flex gap-2">
                <Icon name="check" size={16} className="mt-0.5 shrink-0 text-success" />
                {locale === 'sv' ? 'Levererad monterad och körklar.' : 'Delivered assembled and ride-ready.'}
              </li>
              <li className="flex gap-2">
                <Icon name="check" size={16} className="mt-0.5 shrink-0 text-success" />
                {locale === 'sv' ? '14 dagars ångerrätt enligt distansavtalslagen.' : '14-day right of withdrawal under Swedish distance-selling law.'}
              </li>
            </ul>
          </div>
        </section>
      )}

      {/* Compatible parts cross-sell */}
      {compatible.length > 0 && (
        <section className="section-tight border-t border-border">
          <SectionHeading
            eyebrow={t('label.compatibleParts', locale)}
            title={locale === 'sv' ? 'Uppgraderingar som passar' : 'Compatible upgrades'}
            link={{ href: `/${locale}/delar`, label: t('cta.viewAll', locale) }}
          />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {compatible.slice(0, 4).map((p) => (
              <PartCard key={p.id} part={p} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {model.faq.length > 0 && (
        <section className="section-tight max-w-3xl border-t border-border">
          <SectionHeading eyebrow={t('label.faq', locale)} title={locale === 'sv' ? 'Vanliga frågor' : 'FAQ'} />
          <Faq items={model.faq} locale={locale} />
        </section>
      )}

      {/* Reviews */}
      <section className="section-tight border-t border-border">
        <SectionHeading eyebrow={t('label.reviews', locale)} title={locale === 'sv' ? 'Vad kunder säger' : 'What customers say'} />
        <Reviews locale={locale} />
      </section>

      {/* Structured data */}
      <ProductJsonLd model={model} locale={locale} />
      <BreadcrumbJsonLd
        items={[
          { name: 'ELDR', url: `${BRAND.siteUrl}/${locale}` },
          { name: 'Motorcyklar', url: `${BRAND.siteUrl}/${locale}/motorcyklar` },
          { name: model.name, url: `${BRAND.siteUrl}/${locale}/motorcyklar/${model.handle}` },
        ]}
      />
      <FaqJsonLd items={model.faq.map((f) => ({ q: L(f.q, locale), a: L(f.a, locale) }))} />
    </div>
  )
}
