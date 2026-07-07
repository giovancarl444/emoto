'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/lib/brand'
import { t } from '@/lib/i18n'
import { Logo } from '@/components/ui/Logo'
import { Icon } from '@/components/ui/Icon'
import { CartButton } from '@/components/commerce/CartButton'

export interface NavModel {
  handle: string
  name: string
  marque: string
  tagline: string
  priceFrom: string
  hasStreet: boolean
}

export function Header({ locale, models }: { locale: Locale; models: NavModel[] }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [modelsOpen, setModelsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setModelsOpen(false)
  }, [pathname])

  const links = [
    { href: `/${locale}/motorcyklar`, label: t('nav.motorcycles', locale), mega: true },
    { href: `/${locale}/delar`, label: t('nav.parts', locale) },
    { href: `/${locale}/tjanster/registrering`, label: t('nav.registration', locale) },
    { href: `/${locale}/jamfor`, label: t('nav.compare', locale) },
    { href: `/${locale}/om`, label: t('nav.about', locale) },
    { href: `/${locale}/support`, label: t('nav.support', locale) },
  ]

  // Locale switch: swap the leading /sv or /en segment, preserve the rest.
  const otherLocale: Locale = locale === 'sv' ? 'en' : 'sv'
  const switchedPath = pathname.replace(/^\/(sv|en)/, `/${otherLocale}`)

  // Cinematic overlay: transparent header with light text over the dark home hero.
  const isHome = pathname === `/${locale}`
  const overlay = isHome && !scrolled && !menuOpen
  const linkClass = overlay
    ? 'text-paper/70 hover:text-paper'
    : 'text-text-muted hover:text-text-strong'

  return (
    <header
      className={`sticky top-0 z-header border-b transition-colors duration-2 ${
        scrolled || menuOpen
          ? 'border-border bg-bg/92 backdrop-blur-md supports-[backdrop-filter]:bg-bg/80'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="container-emoto flex h-16 items-center justify-between gap-4">
        <Link href={`/${locale}`} aria-label="EMOTO home" className="shrink-0">
          <Logo tone={overlay ? 'onDark' : 'default'} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((l) =>
            l.mega ? (
              <div
                key={l.href}
                className="relative"
                onMouseEnter={() => setModelsOpen(true)}
                onMouseLeave={() => setModelsOpen(false)}
              >
                <Link
                  href={l.href}
                  className={`inline-flex h-11 items-center gap-1 px-3 text-sm transition-colors ${linkClass}`}
                  aria-expanded={modelsOpen}
                >
                  {l.label}
                  <Icon name="chevron-down" size={14} />
                </Link>
                {modelsOpen && (
                  <div className="absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-2">
                    <div className="grid grid-cols-2 gap-1 rounded-md border border-border bg-surface p-2 shadow-lg">
                      {models.map((m) => (
                        <Link
                          key={m.handle}
                          href={`/${locale}/motorcyklar/${m.handle}`}
                          className="group flex flex-col gap-0.5 rounded-sm p-3 transition-colors hover:bg-surface-hover"
                        >
                          <span className="eyebrow">{m.marque}</span>
                          <span className="font-display text-base font-bold uppercase tracking-tight text-text-strong group-hover:text-signal-ink">
                            {m.name}
                          </span>
                          <span className="text-xs text-text-faint">{m.tagline}</span>
                          <span className="mt-1 font-mono text-2xs text-text-muted">{m.priceFrom}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className={`inline-flex h-11 items-center px-3 text-sm transition-colors ${linkClass}`}
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href={switchedPath}
            className={`hidden h-11 items-center gap-1.5 rounded-sm px-3 font-mono text-2xs uppercase tracking-caps sm:inline-flex ${linkClass}`}
            aria-label={`Switch to ${otherLocale.toUpperCase()}`}
          >
            <Icon name="globe" size={15} />
            {locale.toUpperCase()}
          </Link>
          <CartButton label={t('cart.title', locale)} />
          <button
            className={`inline-flex h-11 w-11 items-center justify-center rounded-sm lg:hidden ${
              overlay ? 'text-paper hover:bg-white/10' : 'text-text-strong hover:bg-surface'
            }`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-border bg-bg lg:hidden" aria-label="Mobile">
          <div className="container-emoto flex flex-col py-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex min-h-tap-min items-center justify-between border-b border-border py-3 text-md text-text-strong"
              >
                {l.label}
                <Icon name="chevron-right" size={18} className="text-text-faint" />
              </Link>
            ))}
            <Link
              href={switchedPath}
              className="flex min-h-tap-min items-center gap-2 py-3 font-mono text-2xs uppercase tracking-caps text-text-muted"
            >
              <Icon name="globe" size={16} /> {otherLocale === 'en' ? 'English' : 'Svenska'}
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
