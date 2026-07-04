'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

/**
 * GA4 with Google Consent Mode v2. Analytics storage defaults to DENIED; the
 * cookie banner flips it to granted. We only inject the GA script once consent
 * is granted AND an id is configured — GDPR-compliant by construction.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA4_ID

export function Analytics() {
  const [granted, setGranted] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem('eldr_consent_v1') === 'granted') setGranted(true)
    } catch {
      /* ignore */
    }
    const onConsent = (e: Event) => {
      const detail = (e as CustomEvent).detail
      if (detail === 'granted') setGranted(true)
    }
    window.addEventListener('eldr-consent', onConsent)
    return () => window.removeEventListener('eldr-consent', onConsent)
  }, [])

  if (!GA_ID || !granted) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied' });
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
