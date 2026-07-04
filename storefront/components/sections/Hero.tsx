import { Media } from '@/components/ui/Media'
import type { Locale } from '@/lib/brand'
import { BRAND } from '@/lib/brand'
import { L, t } from '@/lib/i18n'
import { Button } from '@/components/ui/Button'

const COPY = {
  eyebrow: { sv: 'Elektrisk terräng · Sur-Ron i Sverige', en: 'Electric terrain · Sur-Ron in Sweden' },
  headline1: { sv: 'Kraften', en: 'The power' },
  headline2: { sv: 'i terrängen.', en: 'of the terrain.' },
  sub: {
    sv: 'Högpresterande elektriska off-road- och gaturegistrerade motorcyklar. Levererade, registrerade och garanterade i Sverige — utan krångel.',
    en: 'High-performance electric off-road and street-legal motorcycles. Delivered, registered and warrantied in Sweden — without the hassle.',
  },
}

const STATS = [
  { value: '22,5 kW', label: { sv: 'toppeffekt', en: 'peak power' } },
  { value: '140 km', label: { sv: 'räckvidd', en: 'range' } },
  { value: '15 år', label: { sv: 'från, moped', en: 'from, moped' } },
  { value: 'DDP', label: { sv: 'leverans inom EU', en: 'delivery within EU' } },
]

export function Hero({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-etch" aria-hidden />
      <div className="absolute inset-0 -z-10">
        <Media
          src="/editorial/hero-terrain.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/30" />
      </div>

      <div className="container-eldr flex min-h-[88vh] flex-col justify-end gap-8 pb-14 pt-28 sm:min-h-[92vh] lg:pb-20">
        <div className="max-w-3xl">
          <span className="eyebrow eyebrow--signal reveal">{L(COPY.eyebrow, locale)}</span>
          <h1 className="reveal mt-4 font-display text-4xl font-black uppercase leading-[0.92] tracking-tight text-text-strong sm:text-display">
            {L(COPY.headline1, locale)}
            <br />
            <span className="text-signal">{L(COPY.headline2, locale)}</span>
          </h1>
          <p className="reveal mt-6 max-w-xl text-md text-text-muted">{L(COPY.sub, locale)}</p>

          <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={`/${locale}/motorcyklar`} variant="signal" size="lg" iconRight="arrow-right">
              {t('cta.shop', locale)}
            </Button>
            <Button href={`/${locale}/tjanster/registrering`} variant="outline" size="lg">
              {t('nav.registration', locale)}
            </Button>
          </div>
        </div>

        <dl className="grid max-w-2xl grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.value} className="flex flex-col gap-0.5">
              <dt className="font-display text-xl font-bold tracking-tight text-text-strong">{s.value}</dt>
              <dd className="eyebrow">{L(s.label, locale)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
