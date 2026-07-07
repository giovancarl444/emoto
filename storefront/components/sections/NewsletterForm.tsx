'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/brand'
import { Icon } from '@/components/ui/Icon'

const COPY = {
  heading: { sv: 'Först i kön', en: 'First in line' },
  sub: {
    sv: 'Nya modeller, lagerdroppar och registreringsguider. Ingen spam.',
    en: 'New models, stock drops and registration guides. No spam.',
  },
  placeholder: { sv: 'Din e-post', en: 'Your email' },
  cta: { sv: 'Anmäl', en: 'Sign up' },
  done: { sv: 'Tack! Kolla din inkorg.', en: 'Thanks! Check your inbox.' },
  invalid: { sv: 'Ange en giltig e-postadress.', en: 'Enter a valid email.' },
}

export function NewsletterForm({ locale }: { locale: Locale }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'done' | 'error'>('idle')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setState('error')
      return
    }
    // Wire to Klaviyo/Shopify Email in production. Consent-gated marketing.
    setState('done')
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-display text-base font-bold uppercase tracking-tight text-text-strong">
        {COPY.heading[locale]}
      </h3>
      <p className="text-xs text-text-faint">{COPY.sub[locale]}</p>
      {state === 'done' ? (
        <p className="flex items-center gap-2 text-sm text-success">
          <Icon name="check" size={18} /> {COPY.done[locale]}
        </p>
      ) : (
        <form onSubmit={submit} className="flex gap-2" noValidate>
          <label htmlFor="nl-email" className="sr-only">
            {COPY.placeholder[locale]}
          </label>
          <input
            id="nl-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (state === 'error') setState('idle')
            }}
            placeholder={COPY.placeholder[locale]}
            aria-invalid={state === 'error'}
            className="h-11 min-w-0 flex-1 rounded-sm border border-border bg-surface px-3 text-sm text-text-strong placeholder:text-text-faint focus-visible:border-signal"
          />
          <button
            type="submit"
            className="inline-flex h-11 items-center rounded-sm bg-action px-4 text-sm font-medium text-action-text transition-colors hover:bg-action-hover"
          >
            {COPY.cta[locale]}
          </button>
        </form>
      )}
      {state === 'error' && <p className="text-2xs text-danger">{COPY.invalid[locale]}</p>}
    </div>
  )
}
