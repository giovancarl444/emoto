import type { Metadata } from 'next'
import type { Locale } from '@/lib/brand'
import type { Localized } from '@/lib/types'
import Link from 'next/link'
import { DEFAULT_LOCALE, isLocale, L } from '@/lib/i18n'
import { PageShell, Prose } from '@/components/ui/Prose'
import { Icon } from '@/components/ui/Icon'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const l: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE
  return { title: l === 'sv' ? 'Ångerrätt' : 'Right of withdrawal' }
}

const SECTIONS: { h: Localized; body: Localized[] }[] = [
  {
    h: { sv: '14 dagars ångerrätt', en: '14-day right of withdrawal' },
    body: [
      {
        sv: 'När du köper på distans (via webbplatsen, telefon eller e-post) har du enligt distansavtalslagen (2005:59) rätt att ångra köpet inom 14 dagar utan att ange skäl. Fristen räknas från den dag du (eller ditt ombud) tar emot fordonet.',
        en: 'When you buy at a distance (via the website, phone or email) you have, under the Swedish Distance Contracts Act (2005:59), the right to withdraw within 14 days without giving a reason. The period runs from the day you (or your agent) take possession of the vehicle.',
      },
    ],
  },
  {
    h: { sv: 'Undantag: köp på plats', en: 'Exception: in-person purchase' },
    body: [
      {
        sv: 'Om du besöker vårt showroom och inspekterar eller provkör fordonet innan köpet är det inte ett distansavtal — då gäller ingen lagstadgad ångerrätt.',
        en: 'If you visit our showroom and inspect or test-ride the vehicle before purchase, it is not a distance contract — then no statutory right of withdrawal applies.',
      },
    ],
  },
  {
    h: { sv: 'Så ångrar du', en: 'How to withdraw' },
    body: [
      {
        sv: 'Meddela oss tydligt att du vill ångra köpet, till hej@eldr.se. Du kan använda Konsumentverkets standardformulär för ångerrätt. Från 19 juni 2026 finns även en ångerknapp direkt i det gränssnitt där köpet gjordes. [VERIFY ikraftträdande.]',
        en: 'Notify us clearly that you wish to withdraw, at hej@eldr.se. You may use Konsumentverket’s standard withdrawal form. From 19 June 2026 a withdrawal button is also available directly in the interface where the purchase was made. [VERIFY effective date.]',
      },
    ],
  },
  {
    h: { sv: 'Retur, kostnad och återbetalning', en: 'Return, cost and refund' },
    body: [
      {
        sv: 'Du står för returtransporten (vi informerar om detta i förväg). Vi återbetalar köpesumman plus den ordinarie fraktkostnad du betalade, senast 14 dagar efter att du meddelat att du ångrar dig. Vi får hålla inne återbetalningen tills fordonet kommit tillbaka eller du visat att det skickats.',
        en: 'You bear the cost of return transport (we inform you in advance). We refund the price plus the standard outbound delivery cost you paid, within 14 days of your withdrawal notice. We may withhold the refund until the vehicle is returned or you show it has been sent.',
      },
    ],
  },
  {
    h: { sv: 'Värdeminskning och registrerade fordon', en: 'Diminished value and registered vehicles' },
    body: [
      {
        sv: 'Att registrera och köra fordonet tar inte bort ångerrätten. Däremot får vi göra avdrag för värdeminskning om du hanterat fordonet i större omfattning än vad som behövs för att pröva dess egenskaper och funktion. Ett fordon med tillval från tillverkarens standardsortiment räknas inte som specialtillverkat och behåller full ångerrätt.',
        en: 'Registering and riding the vehicle does not remove the right of withdrawal. However, we may deduct for diminished value if you handled the vehicle more than necessary to establish its characteristics and function. A vehicle with options from the manufacturer’s standard range is not “made to order” and keeps full withdrawal rights.',
      },
    ],
  },
  {
    h: { sv: 'Reklamationsrätt (3 år)', en: 'Complaint right (3 years)' },
    body: [
      {
        sv: 'Utöver ångerrätten har du enligt konsumentköplagen (2022:260) rätt att reklamera fel i upp till 3 år. Fel som visar sig inom 2 år antas ha funnits vid leveransen om vi inte visar annat. En reklamation inom 2 månader från att du upptäckt felet är alltid i tid.',
        en: 'On top of the right of withdrawal, under the Swedish Consumer Purchase Act (2022:260) you may complain about defects for up to 3 years. Defects appearing within 2 years are presumed to have existed at delivery unless we prove otherwise. A complaint within 2 months of discovery is always timely.',
      },
    ],
  },
  {
    h: { sv: 'Tvist', en: 'Disputes' },
    body: [
      {
        sv: 'Om vi inte kommer överens kan du vända dig till Allmänna reklamationsnämnden (ARN) eller få vägledning via Hallå Konsument (Konsumentverket). Vi följer ARN:s rekommendationer.',
        en: 'If we cannot agree, you can turn to the National Board for Consumer Disputes (ARN) or get guidance via Hallå Konsument (Konsumentverket). We follow ARN’s recommendations.',
      },
    ],
  },
]

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const l: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE
  return (
    <PageShell
      title={l === 'sv' ? 'Ångerrätt' : 'Right of withdrawal'}
      lead={l === 'sv' ? 'Dina rättigheter vid distansköp — klart och utan finstilt.' : 'Your rights when buying at a distance — clear, no fine print.'}
      breadcrumbs={[{ name: 'ELDR', href: `/${l}` }, { name: l === 'sv' ? 'Ångerrätt' : 'Right of withdrawal' }]}
    >
      <Prose>
        {SECTIONS.map((s, i) => (
          <section key={i}>
            <h2>{L(s.h, l)}</h2>
            {s.body.map((p, j) => (
              <p key={j}>{L(p, l)}</p>
            ))}
          </section>
        ))}
        <Link
          href={`/${l}/support?topic=returns`}
          className="inline-flex h-11 w-fit items-center gap-2 rounded-sm bg-signal px-5 text-sm font-medium text-on-signal no-underline transition-colors hover:bg-signal-hover"
        >
          {l === 'sv' ? 'Starta en ångeranmälan' : 'Start a withdrawal request'}
          <Icon name="arrow-right" size={18} />
        </Link>
        <p className="text-2xs text-text-faint">
          {l === 'sv'
            ? '[VERIFY] Denna sammanfattning bygger på distansavtalslagen (2005:59) och konsumentköplagen (2022:260). Vid avvikelse gäller lagtexten. Bekräfta paragrafer och belopp mot primärkällor före publicering.'
            : '[VERIFY] This summary is based on the Distance Contracts Act (2005:59) and Consumer Purchase Act (2022:260). Where they differ, the statute governs. Confirm sections and figures against primary sources before publishing.'}
        </p>
      </Prose>
    </PageShell>
  )
}
