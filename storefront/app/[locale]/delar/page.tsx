import type { Metadata } from 'next'
import Link from 'next/link'
import type { Locale } from '@/lib/brand'
import { BRAND } from '@/lib/brand'
import { DEFAULT_LOCALE, isLocale, alternates } from '@/lib/i18n'
import { getAllParts, getAllModels } from '@/lib/content'
import { PartCard } from '@/components/commerce/PartCard'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const l: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE
  return {
    title: l === 'sv' ? 'Delar & tillbehör till Sur-Ron' : 'Sur-Ron parts & accessories',
    description:
      l === 'sv'
        ? 'Uppgraderingar till Light Bee, Ultra Bee och Storm Bee: bromsar, gafflar, controllers, fälgar och mer — med passform per modell.'
        : 'Upgrades for Light Bee, Ultra Bee and Storm Bee: brakes, forks, controllers, rims and more — with per-model fitment.',
    alternates: { canonical: `/${l}/delar`, languages: alternates('delar', BRAND.siteUrl) },
  }
}

export default async function PartsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ fits?: string }>
}) {
  const { locale: raw } = await params
  const { fits } = await searchParams
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE

  const models = getAllModels()
  const all = getAllParts()
  const parts = fits ? all.filter((p) => p.fitment.includes(fits)) : all

  const chip = (href: string, label: string, active: boolean) => (
    <Link
      href={href}
      className={`inline-flex min-h-9 items-center rounded-pill border px-3.5 text-sm transition-colors ${
        active ? 'border-signal bg-signal-tint text-signal-ink' : 'border-border bg-surface text-text-muted hover:text-text-strong'
      }`}
    >
      {label}
    </Link>
  )

  return (
    <div className="container-eldr section">
      <Breadcrumbs items={[{ name: 'ELDR', href: `/${locale}` }, { name: locale === 'sv' ? 'Delar' : 'Parts' }]} />
      <header className="mb-8 max-w-2xl">
        <h1 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-text-strong sm:text-4xl">
          {locale === 'sv' ? 'Delar & tillbehör' : 'Parts & accessories'}
        </h1>
        <p className="mt-3 text-md text-text-muted">
          {locale === 'sv'
            ? 'Kurerat efter vad ägare faktiskt byter ut. Filtrera på din modell.'
            : 'Curated around what owners actually replace. Filter by your model.'}
        </p>
      </header>

      <div className="mb-8 flex flex-col gap-2">
        <span className="eyebrow">{locale === 'sv' ? 'Passar modell' : 'Fits model'}</span>
        <div className="flex flex-wrap gap-2">
          {chip(`/${locale}/delar`, locale === 'sv' ? 'Alla' : 'All', !fits)}
          {models.map((m) => chip(`/${locale}/delar?fits=${m.id}`, m.name, fits === m.id))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {parts.map((p) => (
          <PartCard key={p.id} part={p} locale={locale} />
        ))}
      </div>
    </div>
  )
}
