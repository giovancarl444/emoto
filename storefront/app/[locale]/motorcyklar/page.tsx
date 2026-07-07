import type { Metadata } from 'next'
import type { Locale } from '@/lib/brand'
import { BRAND } from '@/lib/brand'
import { DEFAULT_LOCALE, isLocale, alternates } from '@/lib/i18n'
import { getAllModels, filterModels, type ModelFilter } from '@/lib/content'
import type { RoadClass, UseCase } from '@/lib/types'
import { FilterControls } from '@/components/commerce/FilterControls'
import { ProductCard } from '@/components/commerce/ProductCard'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const l: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE
  const title = l === 'sv' ? 'Elektriska motorcyklar & elcrossmopeder' : 'Electric motorcycles & off-road bikes'
  return {
    title,
    description:
      l === 'sv'
        ? 'Köp Sur-Ron Light Bee X, Ultra Bee och Storm Bee — off-road eller vägregistrerad (L1e-moped / L3e-motorcykel) med registreringshjälp och garanti i Sverige.'
        : 'Buy Sur-Ron Light Bee X, Ultra Bee and Storm Bee — off-road or road-legal (L1e moped / L3e motorcycle) with registration help and warranty in Sweden.',
    alternates: { canonical: `/${l}/motorcyklar`, languages: alternates('motorcyklar', BRAND.siteUrl) },
  }
}

export default async function ModelsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ road?: string; use?: string }>
}) {
  const { locale: raw } = await params
  const sp = await searchParams
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE

  const filter: ModelFilter = {
    roadClass: (sp.road as RoadClass) ?? 'all',
    useCase: (sp.use as UseCase) ?? 'all',
  }
  const models = filterModels(getAllModels(), filter)

  return (
    <div className="container-emoto section">
      <Breadcrumbs
        items={[
          { name: 'EMOTO', href: `/${locale}` },
          { name: locale === 'sv' ? 'Motorcyklar' : 'Motorcycles' },
        ]}
      />
      <header className="mb-8 max-w-2xl">
        <h1 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-text-strong sm:text-4xl">
          {locale === 'sv' ? 'Motorcyklar' : 'Motorcycles'}
        </h1>
        <p className="mt-3 text-md text-text-muted">
          {locale === 'sv'
            ? 'Filtrera på vägklass och användning. Priser inkl. moms.'
            : 'Filter by road class and use case. Prices incl. VAT.'}
        </p>
      </header>

      <div className="mb-8 rounded-md border border-border bg-surface p-5">
        <FilterControls locale={locale} />
      </div>

      {models.length === 0 ? (
        <p className="py-16 text-center text-text-muted">
          {locale === 'sv' ? 'Inga modeller matchar filtret.' : 'No models match the filter.'}
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {models.map((m, i) => (
            <ProductCard key={m.id} model={m} locale={locale} priority={i < 3} />
          ))}
        </div>
      )}

      <BreadcrumbJsonLd
        items={[
          { name: 'EMOTO', url: `${BRAND.siteUrl}/${locale}` },
          { name: 'Motorcyklar', url: `${BRAND.siteUrl}/${locale}/motorcyklar` },
        ]}
      />
    </div>
  )
}
