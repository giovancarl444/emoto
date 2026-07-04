import type { Metadata } from 'next'
import type { Locale } from '@/lib/brand'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'
import { PageShell, Prose } from '@/components/ui/Prose'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const l: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE
  return { title: l === 'sv' ? 'Leverans & returer' : 'Delivery & returns' }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const l: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE
  const sv = l === 'sv'
  return (
    <PageShell
      title={sv ? 'Leverans & returer' : 'Delivery & returns'}
      lead={sv ? 'Tydliga leveransvillkor och en ärlig returprocess för högvärdiga fordon.' : 'Clear delivery terms and an honest returns process for high-value vehicles.'}
      breadcrumbs={[{ name: 'ELDR', href: `/${l}` }, { name: sv ? 'Leverans' : 'Delivery' }]}
    >
      <Prose>
        <h2>{sv ? 'Lager vs beställning' : 'In-stock vs build-to-order'}</h2>
        <p>{sv ? 'Lagervaror skickas från vårt svenska lager, normalt inom 2–5 arbetsdagar. Beställningsvaror byggs i fabrik och fraktas — leveranstiden anges per variant på produktsidan (typiskt 45–120 dagar).' : 'In-stock items ship from our Swedish warehouse, normally within 2–5 business days. Build-to-order items are factory-built and shipped — the lead time is shown per variant on the product page (typically 45–120 days).'}</p>
        <h2>{sv ? 'DDP inom EU' : 'DDP within the EU'}</h2>
        <p>{sv ? 'Fordon levereras DDP inom EU — moms och eventuell tull ingår i priset. Utanför EU tillämpas DAP och köparen står för importmoms och tull. Alla fordon levereras monterade och körklara.' : 'Vehicles are delivered DDP within the EU — VAT and any duty are included in the price. Outside the EU, DAP applies and the buyer covers import VAT and duty. All vehicles are delivered assembled and ride-ready.'}</p>
        <h2>{sv ? 'Returer' : 'Returns'}</h2>
        <p>{sv ? 'Vid distansköp har du 14 dagars ångerrätt. Du står för returtransporten (som kan vara betydande för tunga fordon) och vi återbetalar köpesumman plus ordinarie utleveranskostnad inom 14 dagar. Vi får göra avdrag för värdeminskning vid användning utöver att prova fordonet.' : 'For distance purchases you have a 14-day right of withdrawal. You bear the return transport (which can be significant for heavy vehicles) and we refund the price plus the standard outbound delivery cost within 14 days. We may deduct for diminished value from use beyond testing the vehicle.'}</p>
        <h2>{sv ? 'Skador vid leverans' : 'Damage on delivery'}</h2>
        <p>{sv ? 'Kontrollera fordonet vid mottagandet. Anmäl transportskador till oss inom 7 dagar så löser vi det.' : 'Inspect the vehicle on receipt. Report transport damage to us within 7 days and we will resolve it.'}</p>
      </Prose>
    </PageShell>
  )
}
