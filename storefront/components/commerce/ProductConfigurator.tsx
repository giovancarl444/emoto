'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Locale } from '@/lib/brand'
import type { Model } from '@/lib/types'
import { L, t } from '@/lib/i18n'
import { formatSEK } from '@/lib/format'
import { deliveryEstimate } from '@/lib/fulfillment'
import { useCart } from './CartProvider'
import { Button } from '@/components/ui/Button'
import { Price } from '@/components/ui/Price'
import { StockBadge, RoadClassBadge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'

interface RegService {
  id: string
  name: string
  priceSek: number
  shopifyVariantId?: string
}

export function ProductConfigurator({
  model,
  locale,
  regService,
}: {
  model: Model
  locale: Locale
  regService: RegService
}) {
  const { add } = useCart()
  const defaultId =
    model.variants.find((v) => v.availability.state === 'in_stock')?.id ?? model.variants[0].id
  const [variantId, setVariantId] = useState(defaultId)
  const [addReg, setAddReg] = useState(false)

  const variant = model.variants.find((v) => v.id === variantId)!
  const isStreet = variant.roadClass !== 'offroad'
  const lowStock =
    variant.availability.state === 'in_stock' &&
    typeof variant.availability.stockQty === 'number' &&
    variant.availability.stockQty <= 5

  // Scroll-aware sticky ATC: show once the inline CTA scrolls out of view.
  const ctaRef = useRef<HTMLDivElement>(null)
  const [showSticky, setShowSticky] = useState(false)
  useEffect(() => {
    const el = ctaRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting), {
      rootMargin: '0px 0px -40px 0px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const keySpecs = useMemo(() => {
    const all = model.specGroups.flatMap((g) => g.items)
    return model.keySpecKeys
      .map((k) => all.find((s) => s.key === k))
      .filter((s): s is NonNullable<typeof s> => !!s)
  }, [model])

  function addToCart(buyNow = false) {
    add({
      variantId: variant.id,
      quantity: 1,
      title: `${model.marque} ${model.name}`,
      subtitle: L(variant.name, locale),
      image: model.hero.src,
      unitPriceSek: variant.price.sek,
      href: `/${locale}/motorcyklar/${model.handle}`,
      shopifyVariantId: variant.shopifyVariantId,
    })
    if (addReg && isStreet) {
      add({
        variantId: regService.id,
        quantity: 1,
        title: regService.name,
        unitPriceSek: regService.priceSek,
        href: `/${locale}/tjanster/registrering`,
        shopifyVariantId: regService.shopifyVariantId,
      })
    }
  }

  const p = variant.roadProfile
  const consequences: { icon: Parameters<typeof Icon>[0]['name']; label: string; value: string }[] = [
    { icon: 'gauge', label: t('label.topSpeed', locale), value: L(p.topSpeed, locale) },
    { icon: 'file-check', label: t('label.license', locale), value: L(p.licenseRequired, locale) },
    { icon: 'info', label: t('label.minAge', locale), value: L(p.minAge, locale) },
    {
      icon: 'shield',
      label: t('label.registration', locale),
      value: p.registrationRequired ? (locale === 'sv' ? 'Krävs' : 'Required') : locale === 'sv' ? 'Ej krav' : 'Not required',
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="eyebrow">{model.marque}</span>
        <h1 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-text-strong">
          {model.name}
        </h1>
        <p className="text-md text-text-muted">{L(model.tagline, locale)}</p>
      </div>

      {/* Road-class / variant toggle */}
      <div>
        <span className="eyebrow mb-2 block">{t('label.roadClass', locale)}</span>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={t('label.roadClass', locale)}>
          {model.variants.map((v) => {
            const selected = v.id === variantId
            return (
              <button
                key={v.id}
                role="radio"
                aria-checked={selected}
                onClick={() => setVariantId(v.id)}
                className={`flex min-h-tap-min flex-col items-start gap-1 rounded-sm border px-4 py-2.5 text-left transition-colors ${
                  selected
                    ? 'border-signal bg-signal-tint'
                    : 'border-border bg-surface hover:border-border-strong'
                }`}
              >
                <span className="text-sm font-semibold text-text-strong">{L(v.name, locale)}</span>
                <RoadClassBadge roadClass={v.roadClass} locale={locale} />
              </button>
            )
          })}
        </div>
      </div>

      {/* Price + availability */}
      <div className="flex flex-col gap-3 border-y border-border py-5">
        <Price money={variant.price} locale={locale} size="lg" showVat showEur showFinancing />
        <div className="flex flex-wrap items-center gap-3">
          <StockBadge availability={variant.availability} locale={locale} />
          <span className="text-xs text-text-faint">
            {variant.availability.state === 'in_stock'
              ? t('stock.shipsFrom', locale)
              : t('stock.chinaBuild', locale)}
          </span>
        </div>
        {lowStock && (
          <p className="flex items-center gap-1.5 text-xs font-medium text-warning">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-warning" aria-hidden />
            {locale === 'sv'
              ? `Endast ${variant.availability.stockQty} kvar i lager`
              : `Only ${variant.availability.stockQty} left in stock`}
          </p>
        )}
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Icon name="truck" size={15} className="text-text-faint" />
          <span suppressHydrationWarning>{deliveryEstimate(variant.availability, locale)}</span>
        </div>
      </div>

      {/* Plain-language consequences — the anxiety killer */}
      <div className="rounded-md border border-border bg-surface p-4">
        <div className="mb-3 flex items-center gap-2">
          <Icon name="info" size={16} className="text-signal-ink" />
          <span className="eyebrow eyebrow--signal">
            {isStreet
              ? locale === 'sv'
                ? 'Vad vägklassen betyder'
                : 'What this road class means'
              : locale === 'sv'
                ? 'Off-road — vad det innebär'
                : 'Off-road — what it means'}
          </span>
        </div>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
          {consequences.map((c) => (
            <div key={c.label} className="flex items-start gap-2.5">
              <Icon name={c.icon} size={18} className="mt-0.5 shrink-0 text-text-faint" />
              <div className="flex flex-col">
                <dt className="text-2xs uppercase tracking-caps text-text-faint">{c.label}</dt>
                <dd className="text-sm text-text-strong">{c.value}</dd>
              </div>
            </div>
          ))}
        </dl>
        <p className="mt-3 border-t border-border pt-3 text-xs text-text-muted">{L(p.summary, locale)}</p>
      </div>

      {/* Registration upsell (street-legal only) */}
      {isStreet && (
        <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-surface p-4 transition-colors hover:border-border-strong">
          <input
            type="checkbox"
            checked={addReg}
            onChange={(e) => setAddReg(e.target.checked)}
            className="mt-1 h-4 w-4 accent-[var(--signal)]"
          />
          <span className="flex flex-1 flex-col gap-0.5">
            <span className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-text-strong">{regService.name}</span>
              <span className="font-mono text-sm text-signal-ink">+ {formatSEK(regService.priceSek, locale)}</span>
            </span>
            <span className="text-xs text-text-muted">
              {locale === 'sv'
                ? 'Vi ordnar ursprungskontroll, CoC och besiktning — du får registreringsskylt.'
                : 'We handle origin check, CoC and inspection — you get plates.'}
            </span>
          </span>
        </label>
      )}

      {/* Key specs */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 xs:grid-cols-4">
        {keySpecs.map((s) => (
          <div key={s.key} className="flex flex-col gap-0.5">
            <dt className="eyebrow">{L(s.label, locale)}</dt>
            <dd className="font-mono text-sm text-text-strong">{L(s.value, locale)}</dd>
          </div>
        ))}
      </dl>

      {/* CTAs (desktop / inline) */}
      <div ref={ctaRef} className="flex flex-col gap-2 sm:flex-row">
        <Button variant="signal" size="lg" fullWidth iconRight="cart" onClick={() => addToCart(false)}>
          {t('cta.addToCart', locale)}
        </Button>
        <Button variant="outline" size="lg" href={`/${locale}/jamfor`}>
          {t('nav.compare', locale)}
        </Button>
      </div>

      {/* Trust row — reassurance at the decision point */}
      <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-border pt-4 sm:grid-cols-4">
        {(
          [
            { icon: 'bolt', label: { sv: 'Säker kassa', en: 'Secure checkout' } },
            { icon: 'shield', label: { sv: 'Fordonsgaranti', en: 'Vehicle warranty' } },
            { icon: 'truck', label: { sv: 'DDP inom EU', en: 'DDP within EU' } },
            { icon: 'file-check', label: { sv: '14 dagars ånger', en: '14-day returns' } },
          ] as const
        ).map((it) => (
          <li key={it.label.en} className="flex items-center gap-2 text-2xs text-text-muted">
            <Icon name={it.icon} size={15} className="shrink-0 text-signal-ink" />
            {it.label[locale]}
          </li>
        ))}
      </ul>

      {/* Scroll-aware sticky ATC — appears once the inline CTA leaves view (all breakpoints) */}
      <div
        className={`fixed inset-x-0 bottom-0 z-sticky border-t border-border bg-bg/95 backdrop-blur-md transition-transform duration-3 ease-out ${
          showSticky ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="container-emoto flex items-center gap-4 px-4 py-3">
          <div className="hidden shrink-0 sm:block">
            <span className="eyebrow">{model.marque}</span>
            <p className="font-display text-base font-black uppercase leading-none tracking-tight text-text-strong">
              {model.name}
            </p>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-2xs text-text-faint">{L(variant.name, locale)}</span>
            <span className="font-display text-base font-bold text-text-strong">
              {formatSEK(variant.price.sek, locale)}
            </span>
          </div>
          <Button
            variant="signal"
            size="md"
            iconRight="cart"
            className="ml-auto flex-1 sm:flex-none sm:px-8"
            onClick={() => addToCart(false)}
          >
            {t('cta.addToCart', locale)}
          </Button>
        </div>
      </div>
    </div>
  )
}
