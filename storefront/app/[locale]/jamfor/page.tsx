import type { Metadata } from 'next'
import Link from 'next/link'
import { Media } from '@/components/ui/Media'
import type { Locale } from '@/lib/brand'
import { BRAND } from '@/lib/brand'
import { DEFAULT_LOCALE, isLocale, L, t, alternates } from '@/lib/i18n'
import { getAllModels } from '@/lib/content'
import { formatPrice } from '@/lib/format'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { RoadClassBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const l: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE
  return {
    title: l === 'sv' ? 'Jämför modeller — Light Bee X, Ultra Bee, Storm Bee' : 'Compare models — Light Bee X, Ultra Bee, Storm Bee',
    description: l === 'sv' ? 'Jämför Sur-Ron-modellerna sida vid sida: effekt, batteri, räckvidd, vikt, vägklass och pris.' : 'Compare the Sur-Ron models side by side: power, battery, range, weight, road class and price.',
    alternates: { canonical: `/${l}/jamfor`, languages: alternates('jamfor', BRAND.siteUrl) },
  }
}

const ROWS = ['power', 'battery', 'range', 'weight'] as const

export default async function ComparePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE
  const models = getAllModels()

  const specVal = (modelIdx: number, key: string) => {
    const all = models[modelIdx].specGroups.flatMap((g) => g.items)
    const item = all.find((s) => s.key === key)
    return item ? L(item.value, locale) : '—'
  }
  const rowLabel = (key: string) => {
    for (const m of models) {
      const item = m.specGroups.flatMap((g) => g.items).find((s) => s.key === key)
      if (item) return L(item.label, locale)
    }
    return key
  }

  return (
    <div className="container-eldr section">
      <Breadcrumbs items={[{ name: 'ELDR', href: `/${locale}` }, { name: locale === 'sv' ? 'Jämför' : 'Compare' }]} />
      <header className="mb-8 max-w-2xl">
        <h1 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-text-strong sm:text-4xl">
          {locale === 'sv' ? 'Jämför modeller' : 'Compare models'}
        </h1>
        <p className="mt-3 text-md text-text-muted">
          {locale === 'sv' ? 'Alla priser inkl. moms. Toppeffekt är off-road-topp; vägregistrerade versioner begränsas per klass.' : 'All prices incl. VAT. Peak power is off-road; road-legal versions are restricted per class.'}
        </p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[44rem] border-collapse">
          <thead>
            <tr>
              <th className="w-40 py-4 text-left align-bottom" />
              {models.map((m) => (
                <th key={m.id} className="p-4 text-left align-bottom">
                  <Link href={`/${locale}/motorcyklar/${m.handle}`} className="group flex flex-col gap-2">
                    <span className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-bg-sunken">
                      <Media src={m.hero.src} alt={L(m.hero.alt, locale)} fill sizes="220px" className="object-cover transition-transform duration-3 group-hover:scale-105" />
                    </span>
                    <span className="eyebrow">{m.marque}</span>
                    <span className="font-display text-lg font-black uppercase leading-none tracking-tight text-text-strong group-hover:text-signal">
                      {m.name}
                    </span>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-t border-border">
              <td className="py-3 pr-4 font-mono text-2xs uppercase tracking-caps text-text-faint">{t('label.from', locale)}</td>
              {models.map((m) => (
                <td key={m.id} className="p-3 font-display text-base font-bold text-text-strong">
                  {formatPrice(m.priceFrom, locale).primary}
                </td>
              ))}
            </tr>
            <tr className="border-t border-border">
              <td className="py-3 pr-4 font-mono text-2xs uppercase tracking-caps text-text-faint">{t('label.roadClass', locale)}</td>
              {models.map((m) => (
                <td key={m.id} className="p-3">
                  <div className="flex flex-wrap gap-1.5">
                    {[...new Set(m.variants.map((v) => v.roadClass))].map((rc) => (
                      <RoadClassBadge key={rc} roadClass={rc} locale={locale} />
                    ))}
                  </div>
                </td>
              ))}
            </tr>
            {ROWS.map((key) => (
              <tr key={key} className="border-t border-border">
                <td className="py-3 pr-4 font-mono text-2xs uppercase tracking-caps text-text-faint">{rowLabel(key)}</td>
                {models.map((m, i) => (
                  <td key={m.id} className="p-3 font-mono text-text-strong">
                    {specVal(i, key)}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t border-border">
              <td />
              {models.map((m) => (
                <td key={m.id} className="p-3">
                  <Button href={`/${locale}/motorcyklar/${m.handle}`} size="sm" variant="outline" iconRight="arrow-right">
                    {t('cta.configure', locale)}
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
