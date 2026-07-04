'use client'

import { useState } from 'react'
import { Media } from '@/components/ui/Media'
import type { Locale } from '@/lib/brand'
import type { MediaAsset } from '@/lib/types'
import { L } from '@/lib/i18n'

export function MediaGallery({ media, locale }: { media: MediaAsset[]; locale: Locale }) {
  const [active, setActive] = useState(0)
  const current = media[active] ?? media[0]
  if (!current) return null

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border bg-bg-sunken">
        <Media
          src={current.src}
          alt={L(current.alt, locale)}
          fill
          priority={active === 0}
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 grid-etch opacity-30" aria-hidden />
      </div>

      {media.length > 1 && (
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Product images"
        >
          {media.map((m, i) => (
            <button
              key={m.src + i}
              role="tab"
              aria-selected={i === active}
              aria-label={`${L(m.alt, locale)} (${i + 1}/${media.length})`}
              onClick={() => setActive(i)}
              className={`relative aspect-square h-16 w-20 shrink-0 overflow-hidden rounded-sm border transition-colors ${
                i === active ? 'border-signal' : 'border-border hover:border-border-strong'
              }`}
            >
              <Media src={m.src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
