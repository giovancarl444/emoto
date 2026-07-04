import Link from 'next/link'
import type { Locale } from '@/lib/brand'
import { L } from '@/lib/i18n'
import { Media } from '@/components/ui/Media'
import { Icon } from '@/components/ui/Icon'

/**
 * Dark feature spotlight for the flagship Ultra Bee — sits directly under the
 * showcase hero to extend the cinematic run before the page hands off to the
 * light content system. Spec highlights + a second look at the bike.
 */

const COPY = {
  eyebrow: { sv: 'Flaggskeppet', en: 'The flagship' },
  title: { sv: 'Byggd för både asfalt och lera.', en: 'Built for asphalt and dirt alike.' },
  body: {
    sv: 'Ultra Bee kombinerar riktig enduro-geometri med ett 74-volts batteri för längre pass. Den gaturegistrerade L3e-versionen tar dig lagligt till jobbet på vardagen — och rakt ut i skogen på helgen.',
    en: 'The Ultra Bee pairs real enduro geometry with a 74-volt pack for longer sessions. The road-legal L3e version takes you to work legally on weekdays — and straight into the forest on the weekend.',
  },
  cta: { sv: 'Utforska Ultra Bee', en: 'Explore the Ultra Bee' },
}

const SPECS = [
  { v: '≈21 kW', l: { sv: 'Toppeffekt', en: 'Peak power' } },
  { v: '140 km', l: { sv: 'Räckvidd', en: 'Range' } },
  { v: '74V · 55Ah', l: { sv: 'Batteri', en: 'Battery' } },
  { v: '≈90 km/h', l: { sv: 'Toppfart', en: 'Top speed' } },
]

export function UltraBeeFeature({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-paper">
      <div className="showcase-comb pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden />
      <div
        className="pointer-events-none absolute right-0 top-1/2 h-[42vh] w-[52vw] max-w-3xl -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(245,197,24,0.13),transparent)] blur-2xl"
        aria-hidden
      />
      <div className="container-emoto relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        {/* text + specs */}
        <div>
          <span className="eyebrow text-signal/90">{L(COPY.eyebrow, locale)}</span>
          <h2 className="mt-3 max-w-md font-display text-3xl font-black uppercase leading-[0.98] tracking-tight text-paper sm:text-4xl">
            {L(COPY.title, locale)}
          </h2>
          <p className="mt-5 max-w-md text-md text-paper/65">{L(COPY.body, locale)}</p>
          <dl className="mt-8 grid max-w-md grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-6">
            {SPECS.map((s) => (
              <div key={s.v}>
                <dt className="font-display text-2xl font-bold tracking-tight text-paper">{s.v}</dt>
                <dd className="mt-0.5 font-mono text-2xs uppercase tracking-caps text-paper/50">{L(s.l, locale)}</dd>
              </div>
            ))}
          </dl>
          <Link
            href={`/${locale}/motorcyklar/ultra-bee`}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 font-display text-sm font-bold uppercase tracking-tight text-ink-950 transition-transform hover:-translate-y-0.5"
          >
            {L(COPY.cta, locale)}
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
        {/* bike */}
        <div className="relative order-first lg:order-last">
          <div className="relative aspect-[803/429] w-full">
            <Media
              src="/models/ultra-bee-master.png"
              alt="Sur-Ron Ultra Bee"
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
