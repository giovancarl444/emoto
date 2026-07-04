import Link from 'next/link'
import { Media } from '@/components/ui/Media'
import type { Locale } from '@/lib/brand'
import { DEFAULT_LOCALE, isLocale, t } from '@/lib/i18n'
import { getAllModels, getAllParts } from '@/lib/content'
import { ShowcaseHero } from '@/components/sections/ShowcaseHero'
import { TrustStrip } from '@/components/sections/TrustStrip'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProductCard } from '@/components/commerce/ProductCard'
import { PartCard } from '@/components/commerce/PartCard'
import { Reviews } from '@/components/commerce/Reviews'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE
  const models = getAllModels()
  const parts = getAllParts().slice(0, 4)

  const regSteps = [
    { sv: 'Vi bekräftar CoC & homologering', en: 'We confirm CoC & homologation' },
    { sv: 'Vi hanterar ursprungskontroll', en: 'We handle the origin check' },
    { sv: 'Vi bokar registreringsbesiktning', en: 'We book the registration inspection' },
    { sv: 'Du får registreringsskylt & bevis', en: 'You get plates & registration' },
  ]

  return (
    <>
      <ShowcaseHero locale={locale} />
      <TrustStrip locale={locale} />

      {/* Model lineup */}
      <section className="section container-emoto">
        <SectionHeading
          eyebrow={locale === 'sv' ? 'Modellserien' : 'The lineup'}
          title={locale === 'sv' ? 'Tre plattformar. Off-road eller vägregistrerat.' : 'Three platforms. Off-road or road-legal.'}
          link={{ href: `/${locale}/motorcyklar`, label: t('cta.viewAll', locale) }}
        >
          {locale === 'sv'
            ? 'Varje modell finns för terräng och, där det går, som EU-registrerad L1e-moped eller L3e-motorcykel.'
            : 'Each model comes for terrain and, where possible, as an EU-registered L1e moped or L3e motorcycle.'}
        </SectionHeading>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {models.map((m, i) => (
            <ProductCard key={m.id} model={m} locale={locale} priority={i === 0} />
          ))}
        </div>
      </section>

      {/* Registration concierge — the wedge */}
      <section className="border-y border-border bg-bg-sunken">
        <div className="container-emoto grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="eyebrow eyebrow--signal">{locale === 'sv' ? 'Registreringshjälp' : 'Registration concierge'}</span>
            <h2 className="mt-2 font-display text-2xl font-black uppercase leading-none tracking-tight text-text-strong sm:text-3xl">
              {locale === 'sv' ? 'Vi gör den vägregistrerad. På riktigt.' : 'We make it road-legal. Properly.'}
            </h2>
            <p className="mt-4 max-w-lg text-md text-text-muted">
              {locale === 'sv'
                ? 'Den största blockeringen vid ett elcross-köp är registreringen. Vi tar hela processen — CoC, ursprungskontroll, besiktning och skyltar — så att du kan köra lagligt.'
                : 'The biggest blocker in an electric off-road purchase is registration. We take the whole process — CoC, origin check, inspection and plates — so you can ride legally.'}
            </p>
            <ol className="mt-6 flex flex-col gap-3">
              {regSteps.map((s, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border border-signal/40 bg-signal-tint font-mono text-2xs text-signal-ink">
                    {i + 1}
                  </span>
                  <span className="text-sm text-text">{s[locale]}</span>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <Button href={`/${locale}/tjanster/registrering`} variant="signal" iconRight="file-check">
                {t('cta.book', locale)}
              </Button>
            </div>
          </div>
          <div className="relative order-first aspect-[4/3] overflow-hidden rounded-md border border-border lg:order-last">
            <Media src="/editorial/registration.svg" alt="" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Parts / attach */}
      <section className="section container-emoto">
        <SectionHeading
          eyebrow={locale === 'sv' ? 'Uppgraderingar' : 'Upgrades'}
          title={locale === 'sv' ? 'Delar som fixar de kända svagheterna.' : 'Parts that fix the known weak points.'}
          link={{ href: `/${locale}/delar`, label: t('cta.viewAll', locale) }}
        >
          {locale === 'sv'
            ? 'Bromsar, gafflar, controllers och kontakter — kurerat efter vad ägare faktiskt byter ut först.'
            : 'Brakes, forks, controllers and connectors — curated around what owners actually replace first.'}
        </SectionHeading>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {parts.map((p) => (
            <PartCard key={p.id} part={p} locale={locale} />
          ))}
        </div>
      </section>

      {/* Proof */}
      <section className="section container-emoto">
        <SectionHeading
          eyebrow={locale === 'sv' ? 'Omdömen' : 'Reviews'}
          title={locale === 'sv' ? 'Byggt på förtroende, inte rabattteater.' : 'Built on trust, not discount theatre.'}
        />
        <Reviews locale={locale} />
      </section>

      {/* CTA band */}
      <section className="border-t border-border">
        <div className="container-emoto flex flex-col items-start gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Icon name="bolt" size={28} className="text-signal-ink" />
            <h2 className="font-display text-xl font-black uppercase tracking-tight text-text-strong sm:text-2xl">
              {locale === 'sv' ? 'Redo att köra?' : 'Ready to ride?'}
            </h2>
          </div>
          <div className="flex gap-3">
            <Button href={`/${locale}/motorcyklar`} variant="signal" iconRight="arrow-right">
              {t('cta.shop', locale)}
            </Button>
            <Button href={`/${locale}/jamfor`} variant="outline">
              {t('nav.compare', locale)}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
