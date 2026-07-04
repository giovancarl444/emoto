'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Locale } from '@/lib/brand'
import { L } from '@/lib/i18n'
import { Media } from '@/components/ui/Media'
import { Icon } from '@/components/ui/Icon'
import { formatPrice, monthlyFinancing, FINANCE_MONTHS } from '@/lib/format'

/**
 * Showroom hero — a 3-up ring carousel of the lineup. The active bike sits
 * centre-stage with its price + config; the other two flank it, dimmed and
 * clickable. Click a side bike (or a dot/arrow) to promote it to centre.
 * NOTE: side bikes use the Ultra cut-out as a placeholder until the real
 * Light Bee / Storm Bee transparent PNGs are dropped in (swap `img` below).
 */

const MODELS = [
  {
    handle: 'light-bee-x',
    marque: 'Sur-Ron',
    name: 'Light Bee X',
    tagline: { sv: 'Ren elektrisk enduro. Runt 50 kg.', en: 'Pure electric enduro. Around 50 kg.' },
    badge: { sv: 'Lättast', en: 'Lightest' },
    money: { sek: 54900, eur: 4890 },
    img: '/models/ultra-bee-master.png', // TODO: /models/light-bee-master.png
  },
  {
    handle: 'ultra-bee',
    marque: 'Sur-Ron',
    name: 'Ultra Bee',
    tagline: { sv: 'Stadsgodkänd. Terrängfödd.', en: 'Street-legal. Terrain-born.' },
    badge: { sv: 'Mest mångsidig', en: 'Most versatile' },
    money: { sek: 64900, eur: 5790 },
    img: '/models/ultra-bee-master.png',
  },
  {
    handle: 'storm-bee',
    marque: 'Sur-Ron',
    name: 'Storm Bee',
    tagline: { sv: 'Vätskekyld. 0–50 km/h på 1,9 s.', en: 'Liquid-cooled. 0–50 km/h in 1.9s.' },
    badge: { sv: 'Starkast', en: 'Strongest' },
    money: { sek: 99900, eur: 8900 },
    img: '/models/ultra-bee-master.png', // TODO: /models/storm-bee-master.png
  },
] as const

// role transforms: 0 = centre, 1 = right, 2 = left (mod-3 ring)
const LAYOUT = {
  0: { x: '-50%', scale: 1, op: 1, z: 30 },
  1: { x: 'calc(-50% + 46%)', scale: 0.58, op: 0.38, z: 10 },
  2: { x: 'calc(-50% - 46%)', scale: 0.58, op: 0.38, z: 10 },
} as const

export function ShowroomHero({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(1) // Ultra centre by default
  const model = MODELS[active]
  const monthly = monthlyFinancing(model.money.sek)
  const go = (dir: number) => setActive((a) => (a + dir + MODELS.length) % MODELS.length)

  return (
    <section id="lineup" aria-roledescription="carousel" className="relative -mt-16 flex min-h-screen flex-col overflow-hidden bg-ink-950 text-paper">
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(120%_82%_at_50%_42%,#1a1c24_0%,#0b0c0e_60%)]" />
        <div className="showcase-comb absolute inset-0 opacity-[0.08]" aria-hidden />
        <div className="absolute left-1/2 top-[54%] h-[46vh] w-[80vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(245,197,24,0.16),transparent)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/85 to-transparent" />
      </div>

      {/* ghosted wordmark */}
      <span
        aria-hidden
        className="showcase-ghost pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 text-center font-display font-black uppercase leading-none"
      >
        EMOTO
      </span>

      {/* top: active model title */}
      <div className="container-emoto relative z-40 pt-28 text-center sm:pt-32">
        <span className="eyebrow text-signal/90">
          {model.marque} · {L(model.badge, locale)}
        </span>
        <h1 key={model.handle} className="reveal mt-2 font-display text-4xl font-black uppercase leading-[0.9] tracking-tight text-paper sm:text-6xl">
          {model.name}
        </h1>
        <p className="mt-2 text-sm text-paper/60">{L(model.tagline, locale)}</p>
      </div>

      {/* stage: 3 bikes on a ring */}
      <div className="relative z-0 min-h-0 flex-1">
        {MODELS.map((m, i) => {
          const role = ((i - active + MODELS.length) % MODELS.length) as 0 | 1 | 2
          const l = LAYOUT[role]
          const isCenter = role === 0
          return (
            <button
              key={m.handle}
              type="button"
              onClick={() => (isCenter ? null : setActive(i))}
              aria-label={isCenter ? m.name : `${L({ sv: 'Visa', en: 'Show' }, locale)} ${m.name}`}
              tabIndex={isCenter ? -1 : 0}
              className={[
                'absolute left-1/2 top-1/2 w-[62%] max-w-3xl px-2',
                'transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                isCenter ? 'cursor-default' : 'cursor-pointer hover:opacity-60',
              ].join(' ')}
              style={{ transform: `translate(${l.x}, -50%) scale(${l.scale})`, opacity: l.op, zIndex: l.z }}
            >
              <div className="relative aspect-[803/429] w-full">
                <Media
                  src={m.img}
                  alt={m.name}
                  fill
                  unoptimized
                  priority={isCenter}
                  sizes="(max-width: 1024px) 100vw, 720px"
                  className="object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.65)]"
                />
              </div>
            </button>
          )
        })}
      </div>

      {/* bottom: price chip + nav */}
      <div className="container-emoto relative z-40 flex flex-col items-center gap-5 pb-8">
        <div className="flex w-full max-w-lg items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-md">
          <div>
            <div className="text-2xs uppercase tracking-caps text-paper/50">{locale === 'sv' ? 'Från' : 'From'}</div>
            <div className="font-display text-2xl font-black tracking-tight">{formatPrice(model.money, locale).primary}</div>
            <div className="text-2xs text-paper/50">
              {locale === 'sv'
                ? `eller ${monthly.toLocaleString('sv-SE')} kr/mån i ${FINANCE_MONTHS} mån`
                : `or ${monthly.toLocaleString('en-US')} kr/mo for ${FINANCE_MONTHS} mo`}
            </div>
          </div>
          <Link
            href={`/${locale}/motorcyklar/${model.handle}`}
            className="flex items-center gap-2 rounded-md bg-signal px-5 py-3 font-display text-sm font-bold uppercase tracking-tight text-ink-950 transition-transform hover:-translate-y-0.5"
          >
            {locale === 'sv' ? 'Konfigurera' : 'Configure'}
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>

        {/* dots + arrows */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={locale === 'sv' ? 'Föregående' : 'Previous'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-paper/70 transition-colors hover:border-white/40 hover:text-paper"
          >
            <Icon name="chevron-right" className="h-4 w-4 rotate-180" />
          </button>
          <div className="flex items-center gap-2">
            {MODELS.map((m, i) => (
              <button
                key={m.handle}
                type="button"
                onClick={() => setActive(i)}
                aria-label={m.name}
                aria-current={i === active}
                className={[
                  'h-2 rounded-full transition-all duration-300',
                  i === active ? 'w-6 bg-signal' : 'w-2 bg-white/25 hover:bg-white/50',
                ].join(' ')}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={locale === 'sv' ? 'Nästa' : 'Next'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-paper/70 transition-colors hover:border-white/40 hover:text-paper"
          >
            <Icon name="chevron-right" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
