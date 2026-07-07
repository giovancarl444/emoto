'use client'

import { useEffect, useState } from 'react'
import type { Locale } from '@/lib/brand'
import Link from 'next/link'

const COPY = {
  title: { sv: 'Vi respekterar din integritet', en: 'We respect your privacy' },
  body: {
    sv: 'Vi använder nödvändiga cookies för att sidan ska fungera, och analys-cookies om du godkänner. Analys är avstängt tills du väljer.',
    en: 'We use necessary cookies to run the site, and analytics cookies only if you accept. Analytics stays off until you choose.',
  },
  accept: { sv: 'Godkänn alla', en: 'Accept all' },
  necessary: { sv: 'Endast nödvändiga', en: 'Necessary only' },
  policy: { sv: 'Läs mer', en: 'Learn more' },
}

const KEY = 'emoto_consent_v1'

/** Broadcast consent so Analytics (consent-mode) can react without a reload. */
function setConsent(value: 'granted' | 'denied') {
  try {
    localStorage.setItem(KEY, value)
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent('emoto-consent', { detail: value }))
  // Google consent mode v2 update
  ;(window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.('consent', 'update', {
    analytics_storage: value,
    ad_storage: 'denied',
  })
}

export function CookieBanner({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true)
    } catch {
      /* ignore */
    }
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-toast p-3 sm:p-4" role="dialog" aria-label={COPY.title[locale]}>
      <div className="container-emoto flex flex-col gap-3 rounded-md border border-border bg-surface/95 p-4 shadow-lg backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-text-strong">{COPY.title[locale]}</p>
          <p className="mt-0.5 text-xs text-text-muted">
            {COPY.body[locale]}{' '}
            <Link href={`/${locale}/integritet`} className="text-link underline">
              {COPY.policy[locale]}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => {
              setConsent('denied')
              setVisible(false)
            }}
            className="inline-flex h-10 items-center rounded-sm border border-border px-4 text-sm text-text-muted hover:text-text-strong"
          >
            {COPY.necessary[locale]}
          </button>
          <button
            onClick={() => {
              setConsent('granted')
              setVisible(false)
            }}
            className="inline-flex h-10 items-center rounded-sm bg-signal px-4 text-sm font-medium text-on-signal hover:bg-signal-hover"
          >
            {COPY.accept[locale]}
          </button>
        </div>
      </div>
    </div>
  )
}
