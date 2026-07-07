'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Locale } from '@/lib/brand'
import { L } from '@/lib/i18n'
import { Media } from '@/components/ui/Media'
import { Icon } from '@/components/ui/Icon'
import { formatPrice, monthlyFinancing, FINANCE_MONTHS } from '@/lib/format'

/**
 * Cinematic dark "showcase" hero for the home page — a full-bleed stage with a
 * ghosted oversized EMOTO wordmark behind the flagship bike, a live price chip
 * with a road-class toggle, and a sticky tab sub-nav. Dark by design; the page
 * transitions to the light content system immediately below.
 */

const COPY = {
  eyebrow: { sv: 'Sur-Ron Ultra Bee · Årsmodell 2025', en: 'Sur-Ron Ultra Bee · 2025' },
  line1: { sv: 'Stadsgodkänd.', en: 'Street-legal.' },
  line2: { sv: 'Terrängfödd.', en: 'Terrain-born.' },
  sub: {
    sv: 'Upp till ~21 kW, 74V-batteri och 140 km räckvidd. Levererad, registrerad och garanterad i Sverige.',
    en: 'Up to ~21 kW, a 74V pack and 140 km of range. Delivered, registered and warrantied in Sweden.',
  },
}

const VARIANTS = [
  {
    id: 'offroad',
    name: { sv: 'Off-road', en: 'Off-road' },
    badge: { sv: 'Terräng', en: 'Trail' },
    money: { sek: 64900, eur: 5790 },
  },
  {
    id: 'l3e',
    name: { sv: 'R · L3e väg', en: 'R · L3e road' },
    badge: { sv: 'Gatuklar', en: 'Street-legal' },
    money: { sek: 79900, eur: 7090 },
  },
] as const

const TABS = [
  { href: '#oversikt', label: { sv: 'Översikt', en: 'Overview' } },
  { href: '#specifikationer', label: { sv: 'Specifikationer', en: 'Specs' } },
  { href: '#media', label: { sv: 'Bilder & film', en: 'Media' } },
  { href: '#pris', label: { sv: 'Pris', en: 'Price' } },
  { href: '#finansiering', label: { sv: 'Finansiering', en: 'Financing' } },
  { href: '#provkorning', label: { sv: 'Provkörning', en: 'Test ride' } },
]

export function ShowcaseHero({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0)
  const variant = VARIANTS[active]
  const monthly = monthlyFinancing(variant.money.sek)

  return (
    <section className="showcase-hero relative -mt-16 flex min-h-screen flex-col overflow-hidden bg-ink-950 text-paper">
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(120%_82%_at_50%_40%,#1a1c24_0%,#0b0c0e_60%)]" />
        <div className="showcase-comb absolute inset-0 opacity-[0.09]" aria-hidden />
        <div className="absolute left-1/2 top-[56%] h-[46vh] w-[82vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(245,197,24,0.17),transparent)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/85 to-transparent" />
      </div>

      {/* ghosted oversized wordmark — the dominant background element */}
      <span
        aria-hidden
        className="showcase-ghost pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 text-center font-display font-black uppercase leading-none"
      >
        EMOTO
      </span>

      {/* the bike — centered hero, layered above the wordmark */}
      <div className="pointer-events-none absolute left-1/2 top-[54%] z-0 w-full max-w-[64rem] -translate-x-1/2 -translate-y-1/2 px-6">
        <div className="showcase-bike relative aspect-[803/429] w-full">
          <Media
            src="/models/ultra-bee-master.png"
            alt={`Sur-Ron Ultra Bee — ${L(variant.name, locale)}`}
            fill
            priority
            unoptimized
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-contain drop-shadow-[0_36px_50px_rgba(0,0,0,0.7)]"
          />
        </div>
      </div>

      {/* content layers */}
      <div className="container-emoto relative z-10 flex flex-1 flex-col pb-6 pt-28 sm:pt-32">
        {/* tagline — refined, over the top of the bike */}
        <div className="reveal text-center">
          <span className="eyebrow text-signal/90">{L(COPY.eyebrow, locale)}</span>
          <h1 className="mt-3 font-display text-3xl font-black uppercase leading-[0.95] tracking-tight text-paper sm:text-5xl">
            <span>{L(COPY.line1, locale)}</span>{' '}
            <span className="text-signal">{L(COPY.line2, locale)}</span>
          </h1>
        </div>

        <div className="flex-1" />

        {/* sub (left) + price chip (right) — bottom row over the bike */}
        <div className="flex flex-col items-stretch gap-5 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-[15rem] text-sm text-paper/65">{L(COPY.sub, locale)}</p>

          <div className="w-full rounded-xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-md sm:w-[19rem]">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-2xs uppercase tracking-caps text-paper/50">
                {locale === 'sv' ? 'Från' : 'From'}
              </span>
              <span className="rounded-full bg-signal/15 px-2 py-0.5 font-mono text-2xs uppercase tracking-caps text-signal">
                {L(variant.badge, locale)}
              </span>
            </div>
            <div className="mt-1 font-display text-3xl font-black tracking-tight">
              {formatPrice(variant.money, locale).primary}
            </div>
            <p className="mt-1 text-2xs text-paper/50">
              {locale === 'sv'
                ? `eller ${monthly.toLocaleString('sv-SE')} kr/mån i ${FINANCE_MONTHS} mån · inkl. moms`
                : `or ${monthly.toLocaleString('en-US')} kr/mo for ${FINANCE_MONTHS} mo · incl. VAT`}
            </p>

            {/* road-class toggle */}
            <div className="mt-3 grid grid-cols-2 gap-1 rounded-md bg-black/40 p-1">
              {VARIANTS.map((v, i) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className={[
                    'rounded-[5px] px-2 py-1.5 text-2xs font-semibold uppercase tracking-caps transition-colors',
                    active === i ? 'bg-signal text-ink-950' : 'text-paper/60 hover:text-paper',
                  ].join(' ')}
                >
                  {L(v.name, locale)}
                </button>
              ))}
            </div>

            <Link
              href={`/${locale}/motorcyklar/ultra-bee`}
              className="mt-3 flex items-center justify-center gap-2 rounded-md bg-signal px-4 py-2.5 font-display text-sm font-bold uppercase tracking-tight text-ink-950 transition-transform hover:-translate-y-0.5"
            >
              {locale === 'sv' ? 'Konfigurera & köp' : 'Configure & buy'}
              <Icon name="arrow-right" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* tab sub-nav */}
      <nav className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="container-emoto no-scrollbar flex gap-6 overflow-x-auto py-4">
          {TABS.map((tab, i) => (
            <a
              key={tab.href}
              href={tab.href}
              className={[
                'whitespace-nowrap font-mono text-2xs uppercase tracking-caps transition-colors',
                i === 0 ? 'text-signal' : 'text-paper/55 hover:text-paper',
              ].join(' ')}
            >
              {L(tab.label, locale)}
            </a>
          ))}
        </div>
      </nav>
    </section>
  )
}
