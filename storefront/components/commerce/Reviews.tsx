import type { Locale } from '@/lib/brand'
import { Icon } from '@/components/ui/Icon'

/**
 * Social proof. Seed reviews are illustrative placeholders — wire to a real
 * source (Judge.me / Trustpilot) before launch. High-ticket trust demands
 * visible, third-party-verifiable reviews (a gap every incumbent leaves open).
 */
export interface Review {
  author: string
  rating: number
  body: { sv: string; en: string }
  model?: string
}

export const SEED_REVIEWS: Review[] = [
  { author: 'Johan L.', rating: 5, model: 'Ultra Bee T', body: { sv: 'Registreringen skötte de helt — jag fick skyltar och försäkring klart på en vecka. Cykeln är galet rolig.', en: 'They handled the whole registration — plates and insurance sorted in a week. The bike is absurdly fun.' } },
  { author: 'Sara M.', rating: 5, model: 'Light Bee X', body: { sv: 'Äntligen en svensk sajt som förklarar L1e vs L3e på riktigt. Kändes tryggt att lägga så mycket pengar.', en: 'Finally a Swedish site that actually explains L1e vs L3e. Felt safe spending this much.' } },
  { author: 'Erik B.', rating: 4, model: 'Storm Bee', body: { sv: 'Leveranstiden var som utlovat och supporten svarade på svenska inom en timme. Bromskitet gör stor skillnad.', en: 'Lead time was as promised and support replied in Swedish within an hour. The brake kit makes a big difference.' } },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex" aria-label={`${rating} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon
          key={i}
          name="star"
          size={15}
          className={i <= rating ? 'fill-review text-review' : 'text-border-strong'}
        />
      ))}
    </div>
  )
}

export function Reviews({
  locale,
  reviews = SEED_REVIEWS,
}: {
  locale: Locale
  reviews?: Review[]
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {reviews.map((r) => (
        <figure key={r.author} className="flex flex-col gap-3 rounded-md border border-border bg-surface p-5">
          <Stars rating={r.rating} />
          <blockquote className="text-sm leading-relaxed text-text">{r.body[locale]}</blockquote>
          <figcaption className="mt-auto flex items-center justify-between pt-2 text-xs text-text-faint">
            <span className="font-medium text-text-muted">{r.author}</span>
            {r.model && <span className="font-mono">{r.model}</span>}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
