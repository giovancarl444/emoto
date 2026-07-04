'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/lib/brand'
import { formatSEK, vatBreakdown } from '@/lib/format'
import { t } from '@/lib/i18n'
import { useCart } from './CartProvider'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

/**
 * Mock checkout summary (shown when Shopify is unconfigured). With Shopify wired
 * up, /api/checkout returns the hosted secure checkout URL and users never land
 * here. This page makes the flow demonstrable offline.
 */
export function CheckoutSummary({ locale }: { locale: Locale }) {
  const { items, subtotalSek, clear } = useCart()
  const [placed, setPlaced] = useState(false)
  const vat = vatBreakdown(subtotalSek)

  if (placed) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-24 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
          <Icon name="check" size={28} />
        </span>
        <h1 className="font-display text-2xl font-black uppercase tracking-tight text-text-strong">
          {locale === 'sv' ? 'Tack för din order' : 'Thank you for your order'}
        </h1>
        <p className="text-sm text-text-muted">
          {locale === 'sv'
            ? 'Detta är en demokassa. I skarp drift slutförs betalningen i Shopifys säkra kassa (Klarna, kort, faktura).'
            : 'This is a demo checkout. In production, payment completes in Shopify’s secure checkout (Klarna, card, invoice).'}
        </p>
        <Button href={`/${locale}`} variant="outline">
          {locale === 'sv' ? 'Till startsidan' : 'Back home'}
        </Button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-text-muted">{t('cart.empty', locale)}</p>
        <Button href={`/${locale}/motorcyklar`} variant="signal">
          {t('cta.shop', locale)}
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <h1 className="mb-6 font-display text-2xl font-black uppercase tracking-tight text-text-strong">
          {t('cta.checkout', locale)}
        </h1>
        <div className="rounded-md border border-warning/40 bg-warning/10 p-4 text-sm text-warning">
          {locale === 'sv'
            ? 'Demokassa: Shopify är inte konfigurerad i denna miljö. Med riktiga nycklar sker betalning i Shopifys säkra kassa.'
            : 'Demo checkout: Shopify is not configured in this environment. With real keys, payment happens in Shopify’s secure checkout.'}
        </div>
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {items.map((i) => (
            <li key={i.variantId} className="flex gap-4 py-4">
              <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-sm border border-border bg-surface">
                {i.image && <Image src={i.image} alt={i.title} fill sizes="80px" className="object-cover" />}
              </span>
              <div className="flex flex-1 flex-col">
                <Link href={i.href} className="text-sm font-semibold text-text-strong">
                  {i.title}
                </Link>
                {i.subtitle && <span className="text-xs text-text-faint">{i.subtitle}</span>}
                <span className="mt-auto font-mono text-xs text-text-muted">× {i.quantity}</span>
              </div>
              <span className="font-mono text-sm text-text-strong">{formatSEK(i.unitPriceSek * i.quantity, locale)}</span>
            </li>
          ))}
        </ul>
      </div>

      <aside className="h-fit rounded-md border border-border bg-surface p-5">
        <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-tight text-text-strong">
          {locale === 'sv' ? 'Sammanfattning' : 'Summary'}
        </h2>
        <dl className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-text-muted">{t('cart.subtotal', locale)}</dt>
            <dd className="font-mono text-text-strong">{formatSEK(subtotalSek, locale)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-faint">{t('label.vatOf', locale)} (25%)</dt>
            <dd className="font-mono text-text-faint">{formatSEK(vat.vat, locale)}</dd>
          </div>
          <div className="flex justify-between text-text-faint">
            <dt>{t('label.delivery', locale)}</dt>
            <dd className="font-mono">{locale === 'sv' ? 'Beräknas' : 'Calculated'}</dd>
          </div>
        </dl>
        <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
          <span className="text-sm text-text-muted">{locale === 'sv' ? 'Att betala' : 'Total'}</span>
          <span className="font-display text-xl font-bold text-text-strong">{formatSEK(subtotalSek, locale)}</span>
        </div>
        <Button
          variant="signal"
          size="lg"
          fullWidth
          className="mt-5"
          iconRight="check"
          onClick={() => {
            setPlaced(true)
            clear()
          }}
        >
          {locale === 'sv' ? 'Slutför (demo)' : 'Complete (demo)'}
        </Button>
        <div className="mt-3 flex items-center justify-center gap-3 font-mono text-2xs uppercase tracking-caps text-text-faint">
          <span>Klarna</span>
          <span>Visa</span>
          <span>Mastercard</span>
          <span>PayPal</span>
        </div>
      </aside>
    </div>
  )
}
