'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/lib/brand'
import { formatSEK } from '@/lib/format'
import { t } from '@/lib/i18n'
import { useCart } from './CartProvider'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

export function CartDrawer({ locale }: { locale: Locale }) {
  const { items, isOpen, close, setQty, remove, subtotalSek, totalQuantity } = useCart()
  const [checkingOut, setCheckingOut] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    if (isOpen) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, close])

  async function checkout() {
    setCheckingOut(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale,
          items: items.map((i) => ({ shopifyVariantId: i.shopifyVariantId, quantity: i.quantity })),
        }),
      })
      const data = await res.json()
      if (data.checkoutUrl) window.location.href = data.checkoutUrl
    } finally {
      setCheckingOut(false)
    }
  }

  return (
    <div
      className={`fixed inset-0 z-drawer ${isOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        onClick={close}
        className={`absolute inset-0 bg-overlay backdrop-blur-sm transition-opacity duration-2 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t('cart.title', locale)}
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-bg shadow-lg transition-transform duration-3 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-lg font-bold uppercase tracking-tight text-text-strong">
            {t('cart.title', locale)}{' '}
            <span className="font-mono text-sm text-text-faint">({totalQuantity})</span>
          </h2>
          <button
            onClick={close}
            aria-label="Close"
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-text-muted hover:bg-surface hover:text-text-strong"
          >
            <Icon name="close" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <Icon name="cart" size={40} className="text-text-faint" />
            <p className="text-text-muted">{t('cart.empty', locale)}</p>
            <Button href={`/${locale}/motorcyklar`} variant="outline">
              {t('cta.shop', locale)}
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {items.map((i) => (
                <li key={i.variantId} className="flex gap-4 py-4">
                  <Link
                    href={i.href}
                    onClick={close}
                    className="relative h-20 w-24 shrink-0 overflow-hidden rounded-sm border border-border bg-surface"
                  >
                    {i.image && (
                      <Image src={i.image} alt={i.title} fill sizes="96px" className="object-cover" />
                    )}
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <Link href={i.href} onClick={close} className="text-sm font-semibold text-text-strong hover:text-signal">
                      {i.title}
                    </Link>
                    {i.subtitle && <span className="text-xs text-text-faint">{i.subtitle}</span>}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="inline-flex items-center rounded-sm border border-border">
                        <button
                          onClick={() => setQty(i.variantId, i.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-text-muted hover:text-text-strong"
                          aria-label="Decrease quantity"
                        >
                          <Icon name="minus" size={16} />
                        </button>
                        <span className="w-8 text-center font-mono text-sm">{i.quantity}</span>
                        <button
                          onClick={() => setQty(i.variantId, i.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-text-muted hover:text-text-strong"
                          aria-label="Increase quantity"
                        >
                          <Icon name="plus" size={16} />
                        </button>
                      </div>
                      <span className="font-mono text-sm text-text-strong">
                        {formatSEK(i.unitPriceSek * i.quantity, locale)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => remove(i.variantId)}
                    aria-label={t('cart.remove', locale)}
                    className="self-start text-text-faint hover:text-danger"
                  >
                    <Icon name="close" size={16} />
                  </button>
                </li>
              ))}
            </ul>

            <footer className="border-t border-border px-5 py-4">
              <div className="mb-1 flex items-baseline justify-between">
                <span className="text-sm text-text-muted">{t('cart.subtotal', locale)}</span>
                <span className="font-display text-xl font-bold text-text-strong">
                  {formatSEK(subtotalSek, locale)}
                </span>
              </div>
              <p className="mb-4 text-2xs text-text-faint">{t('cart.shippingNote', locale)}</p>
              <Button variant="signal" size="lg" fullWidth loading={checkingOut} onClick={checkout} iconRight="arrow-right">
                {t('cta.checkout', locale)}
              </Button>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
