'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { Locale } from '@/lib/brand'

type Option = { value: string; label: { sv: string; en: string } }

const ROAD: Option[] = [
  { value: 'all', label: { sv: 'Alla', en: 'All' } },
  { value: 'offroad', label: { sv: 'Off-road', en: 'Off-road' } },
  { value: 'L1e-B', label: { sv: 'EU-moped (L1e)', en: 'Moped (L1e)' } },
  { value: 'L3e', label: { sv: 'MC (L3e)', en: 'Motorcycle (L3e)' } },
]

const USE: Option[] = [
  { value: 'all', label: { sv: 'Alla', en: 'All' } },
  { value: 'trail', label: { sv: 'Terräng', en: 'Trail' } },
  { value: 'commute', label: { sv: 'Pendling', en: 'Commute' } },
  { value: 'youth', label: { sv: 'Ungdom', en: 'Youth' } },
]

function ChipRow({
  label,
  param,
  options,
  locale,
}: {
  label: string
  param: string
  options: Option[]
  locale: Locale
}) {
  const router = useRouter()
  const pathname = usePathname()
  const search = useSearchParams()
  const active = search.get(param) ?? 'all'

  function set(value: string) {
    const params = new URLSearchParams(search.toString())
    if (value === 'all') params.delete(param)
    else params.set(param, value)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="eyebrow">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const selected = active === o.value
          return (
            <button
              key={o.value}
              onClick={() => set(o.value)}
              aria-pressed={selected}
              className={`inline-flex min-h-9 items-center rounded-pill border px-3.5 text-sm transition-colors ${
                selected
                  ? 'border-signal bg-signal-tint text-signal-ink'
                  : 'border-border bg-surface text-text-muted hover:border-border-strong hover:text-text-strong'
              }`}
            >
              {o.label[locale]}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function FilterControls({ locale }: { locale: Locale }) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
      <ChipRow
        label={locale === 'sv' ? 'Vägklass' : 'Road class'}
        param="road"
        options={ROAD}
        locale={locale}
      />
      <ChipRow
        label={locale === 'sv' ? 'Användning' : 'Use case'}
        param="use"
        options={USE}
        locale={locale}
      />
    </div>
  )
}
