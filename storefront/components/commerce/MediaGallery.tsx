'use client'

import { useState } from 'react'
import { Media } from '@/components/ui/Media'
import type { Locale } from '@/lib/brand'
import type { MediaAsset, ModelVideo } from '@/lib/types'
import { L } from '@/lib/i18n'
import { Icon } from '@/components/ui/Icon'

type Slide =
  | { kind: 'video'; video: ModelVideo }
  | { kind: 'image'; asset: MediaAsset }

export function MediaGallery({
  media,
  locale,
  video,
}: {
  media: MediaAsset[]
  locale: Locale
  video?: ModelVideo
}) {
  const slides: Slide[] = [
    ...(video ? [{ kind: 'video', video } as Slide] : []),
    ...media.map((asset) => ({ kind: 'image', asset }) as Slide),
  ]
  const [active, setActive] = useState(0)
  const current = slides[active] ?? slides[0]
  if (!current) return null

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border bg-bg-sunken">
        {current.kind === 'video' ? (
          <video
            key={current.video.src}
            className="h-full w-full object-cover"
            src={current.video.src}
            poster={current.video.poster}
            controls
            playsInline
            muted
            loop
            preload="metadata"
          />
        ) : (
          <Media
            src={current.asset.src}
            alt={L(current.asset.alt, locale)}
            fill
            priority={active === 0}
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
        )}
        <div className="pointer-events-none absolute inset-0 grid-etch opacity-30" aria-hidden />
      </div>

      {slides.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Product media">
          {slides.map((s, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={
                s.kind === 'video' ? 'Video' : `${L(s.asset.alt, locale)} (${i + 1}/${slides.length})`
              }
              onClick={() => setActive(i)}
              className={`relative aspect-square h-16 w-20 shrink-0 overflow-hidden rounded-sm border transition-colors ${
                i === active ? 'border-signal' : 'border-border hover:border-border-strong'
              }`}
            >
              <Media
                src={s.kind === 'video' ? s.video.poster : s.asset.src}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
              {s.kind === 'video' && (
                <span className="absolute inset-0 flex items-center justify-center bg-ink-950/40">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-signal">
                    <Icon name="arrow-right" size={14} className="text-on-signal" />
                  </span>
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
