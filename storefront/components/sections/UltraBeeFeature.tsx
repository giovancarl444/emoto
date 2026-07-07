import Link from 'next/link'
import type { Locale } from '@/lib/brand'
import { L } from '@/lib/i18n'
import { Media } from '@/components/ui/Media'
import { Icon } from '@/components/ui/Icon'

/**
 * Dark feature spotlight for the flagship Ultra Bee — sits directly under the
 * showcase hero to extend the cinematic run. On desktop the bike goes large and
 * bleeds off the right, its rear wheel tucking *behind* the headline; a scrim
 * keeps the copy legible. On mobile it stacks cleanly.
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
      <div className="showcase-comb pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />

      {/* desktop: big bike bleeding right, rear wheel tucked behind the copy */}
      <div
        className="pointer-events-none absolute right-[-7%] top-1/2 hidden aspect-[803/429] w-[88%] -translate-y-1/2 lg:block"
        aria-hidden
      >
        <div className="absolute left-[52%] top-[48%] h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(245,197,24,0.16),transparent)] blur-2xl" />
        <Media
          src="/models/ultra-bee-master.png"
          alt=""
          fill
          unoptimized
          sizes="90vw"
          className="object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.7)]"
        />
      </div>
      {/* legibility scrim over the rear wheel (desktop only) */}
      <div
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-ink-950 via-ink-950/85 to-transparent lg:block"
        aria-hidden
      />

      <div className="container-emoto relative z-10 py-16 lg:py-28">
        <div className="max-w-md">
          <span className="eyebrow text-signal/90">{L(COPY.eyebrow, locale)}</span>
          <h2 className="mt-3 font-display text-3xl font-black uppercase leading-[0.98] tracking-tight text-paper sm:text-4xl">
            {L(COPY.title, locale)}
          </h2>
          <p className="mt-5 text-md text-paper/70">{L(COPY.body, locale)}</p>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-6">
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

        {/* mobile: bike stacks below */}
        <div className="relative mt-10 aspect-[803/429] w-full lg:hidden">
          <Media
            src="/models/ultra-bee-master.png"
            alt="Sur-Ron Ultra Bee"
            fill
            unoptimized
            sizes="100vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  )
}
