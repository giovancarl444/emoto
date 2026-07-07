import type { Metadata } from 'next'
import { Media } from '@/components/ui/Media'
import type { Locale } from '@/lib/brand'
import { BRAND } from '@/lib/brand'
import { DEFAULT_LOCALE, isLocale, L, t, alternates } from '@/lib/i18n'
import { registrationService } from '@/content/services'
import { Price } from '@/components/ui/Price'
import { AddToCartButton } from '@/components/commerce/AddToCartButton'
import { Faq } from '@/components/ui/Faq'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Icon } from '@/components/ui/Icon'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const l: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE
  return {
    title: l === 'sv' ? 'Registreringshjälp — vägregistrera din Sur-Ron' : 'Registration help — road-register your Sur-Ron',
    description:
      l === 'sv'
        ? 'Vi hanterar CoC, ursprungskontroll, registreringsbesiktning och skyltar så att din Sur-Ron blir laglig moped (L1e) eller motorcykel (L3e) i Sverige.'
        : 'We handle CoC, origin check, registration inspection and plates so your Sur-Ron becomes a legal moped (L1e) or motorcycle (L3e) in Sweden.',
    alternates: { canonical: `/${l}/tjanster/registrering`, languages: alternates('tjanster/registrering', BRAND.siteUrl) },
  }
}

export default async function RegistrationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE

  const steps = [
    {
      t: { sv: 'CoC & homologering', en: 'CoC & homologation' },
      d: { sv: 'Vi säkerställer att fordonet har ett giltigt Certificate of Conformity (intyg om överensstämmelse) för rätt klass — L1e eller L3e.', en: 'We ensure the vehicle has a valid Certificate of Conformity for the correct class — L1e or L3e.' },
    },
    {
      t: { sv: 'Ursprungskontroll', en: 'Origin check' },
      d: { sv: 'Vi ansöker om ursprungskontroll hos Transportstyrelsen (avgift ~1 240 kr, giltig i 5 år). Som registrerad importör kan vi i många fall registrera nya fordon direkt på CoC och hoppa över detta steg.', en: 'We apply for the origin check with Transportstyrelsen (fee ~1,240 kr, valid 5 years). As a registered importer we can often register new vehicles directly on the CoC and skip this step.' },
    },
    {
      t: { sv: 'Registreringsbesiktning', en: 'Registration inspection' },
      d: { sv: 'Vi bokar besiktning hos ett ackrediterat företag (Besikta, Carspect m.fl.). För ett nytt EU-typgodkänt fordon är det en identitets- och dokumentkontroll, inte en full teknisk provning.', en: 'We book the inspection at an accredited provider (Besikta, Carspect, etc.). For a new EU type-approved vehicle it is an identity and document check, not a full technical exam.' },
    },
    {
      t: { sv: 'Skyltar & registreringsbevis', en: 'Plates & registration' },
      d: { sv: 'Fordonet förs in i vägtrafikregistret och du får registreringsbevis och bakre skylt. Vi guidar dig till rätt trafikförsäkring innan du kör.', en: 'The vehicle is entered into the road-traffic register and you receive the registration certificate and rear plate. We guide you to the right traffic insurance before you ride.' },
    },
  ]

  const classRows = [
    {
      k: { sv: 'Toppfart', en: 'Top speed' },
      l1e: { sv: '45 km/h', en: '45 km/h' },
      l3e: { sv: '~90 km/h (A1)', en: '~90 km/h (A1)' },
    },
    {
      k: { sv: 'Körkort', en: 'Licence' },
      l1e: { sv: 'AM', en: 'AM' },
      l3e: { sv: 'A1 (eller A2/A)', en: 'A1 (or A2/A)' },
    },
    {
      k: { sv: 'Lägsta ålder', en: 'Minimum age' },
      l1e: { sv: '15 år', en: '15' },
      l3e: { sv: '16 år', en: '16' },
    },
    {
      k: { sv: 'Registrering', en: 'Registration' },
      l1e: { sv: 'Ja + bakre skylt', en: 'Yes + rear plate' },
      l3e: { sv: 'Ja + bakre skylt', en: 'Yes + rear plate' },
    },
    {
      k: { sv: 'Fordonsskatt', en: 'Vehicle tax' },
      l1e: { sv: 'Nej (befriad)', en: 'No (exempt)' },
      l3e: { sv: 'I praktiken 0 kr (el)', en: 'Effectively 0 kr (electric)' },
    },
    {
      k: { sv: 'Besiktning', en: 'Periodic inspection' },
      l1e: { sv: 'Nej', en: 'No' },
      l3e: { sv: 'Ja', en: 'Yes' },
    },
    {
      k: { sv: 'Trafikförsäkring', en: 'Traffic insurance' },
      l1e: { sv: 'Ja', en: 'Yes' },
      l3e: { sv: 'Ja', en: 'Yes' },
    },
  ]

  const faq = [
    {
      q: { sv: 'Vad kostar de officiella avgifterna?', en: 'What do the official fees cost?' },
      a: { sv: 'Utöver vår tjänst tillkommer myndighetsavgifter: ursprungskontroll ~1 240 kr, registreringsbesiktning ~600–800 kr (varierar per station), skylt ~80 kr och en årlig vägtrafikregisteravgift ~74 kr. [VERIFY aktuella belopp hos Transportstyrelsen.]', en: 'On top of our service there are government fees: origin check ~1,240 kr, registration inspection ~600–800 kr (varies by station), plate ~80 kr and an annual register fee ~74 kr. [VERIFY current amounts with Transportstyrelsen.]' },
    },
    {
      q: { sv: 'Kan jag ångra ett registrerat fordon?', en: 'Can I withdraw from a registered vehicle?' },
      a: { sv: 'Vid distansköp har du 14 dagars ångerrätt från det att du tar emot fordonet. Registrering och körning tar inte bort ångerrätten, men vi får dra av för värdeminskning vid användning utöver att prova fordonets egenskaper. Se vår sida om ångerrätt.', en: 'For a distance purchase you have a 14-day right of withdrawal from receiving the vehicle. Registering and riding does not remove it, but we may deduct for diminished value from use beyond testing the vehicle. See our right-of-withdrawal page.' },
    },
    {
      q: { sv: 'Hur lång tid tar det?', en: 'How long does it take?' },
      a: { sv: 'Ursprungskontrollen tar normalt 2–5 arbetsdagar men kan vid hög belastning ta flera veckor. Vi bygger in marginal och håller dig uppdaterad. [VERIFY handläggningstid.]', en: 'The origin check normally takes 2–5 working days but can take several weeks at peak load. We build in buffer and keep you updated. [VERIFY processing time.]' },
    },
  ]

  return (
    <div className="container-emoto section">
      <Breadcrumbs
        items={[
          { name: 'EMOTO', href: `/${locale}` },
          { name: locale === 'sv' ? 'Registreringshjälp' : 'Registration help' },
        ]}
      />

      {/* Hero */}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-5">
          <span className="eyebrow eyebrow--signal">{locale === 'sv' ? 'Productiserad tjänst' : 'Productized service'}</span>
          <h1 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-text-strong sm:text-4xl">
            {locale === 'sv' ? 'Vi gör den vägregistrerad' : 'We make it road-legal'}
          </h1>
          <p className="text-md text-text-muted">{L(registrationService.summary, locale)}</p>
          <div className="border-y border-border py-4">
            <Price money={registrationService.price} locale={locale} size="lg" showVat />
          </div>
          <AddToCartButton
            label={t('cta.book', locale)}
            item={{
              variantId: registrationService.id,
              quantity: 1,
              title: L(registrationService.name, locale),
              unitPriceSek: registrationService.price.sek,
              href: `/${locale}/tjanster/registrering`,
              shopifyVariantId: registrationService.shopifyVariantId,
            }}
          />
          <p className="text-2xs text-text-faint">
            {locale === 'sv'
              ? '[VERIFY] Pris exkl. officiella myndighetsavgifter (se FAQ). Slutligt pris bekräftas per modell och konfiguration.'
              : '[VERIFY] Price excludes official government fees (see FAQ). Final price confirmed per model and configuration.'}
          </p>
        </div>
        <div className="relative order-first aspect-[4/3] overflow-hidden rounded-md border border-border lg:order-last">
          <Media src="/editorial/registration.svg" alt="" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
        </div>
      </div>

      {/* L1e vs L3e */}
      <section className="section-tight border-t border-border">
        <SectionHeading
          eyebrow={locale === 'sv' ? 'Vägklasser' : 'Road classes'}
          title={locale === 'sv' ? 'L1e-moped eller L3e-motorcykel?' : 'L1e moped or L3e motorcycle?'}
        >
          {locale === 'sv'
            ? 'Vilken klass som passar dig avgör körkort, ålder och toppfart. Vi hjälper dig välja rätt.'
            : 'Which class suits you decides licence, age and top speed. We help you choose.'}
        </SectionHeading>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border-strong text-left">
                <th className="py-3 pr-4 font-mono text-2xs uppercase tracking-caps text-text-faint">{locale === 'sv' ? 'Egenskap' : 'Attribute'}</th>
                <th className="py-3 pr-4 font-display text-base uppercase text-text-strong">L1e-B</th>
                <th className="py-3 font-display text-base uppercase text-signal-ink">L3e</th>
              </tr>
            </thead>
            <tbody>
              {classRows.map((r) => (
                <tr key={r.k.en} className="border-b border-border">
                  <td className="py-2.5 pr-4 text-text-muted">{L(r.k, locale)}</td>
                  <td className="py-2.5 pr-4 font-mono text-text-strong">{L(r.l1e, locale)}</td>
                  <td className="py-2.5 font-mono text-text-strong">{L(r.l3e, locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Steps */}
      <section className="section-tight border-t border-border">
        <SectionHeading eyebrow={locale === 'sv' ? 'Så går det till' : 'How it works'} title={locale === 'sv' ? 'Fyra steg till skylt' : 'Four steps to plates'} />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={i} className="flex flex-col gap-3 rounded-md border border-border bg-surface p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-signal/40 bg-signal-tint font-display text-lg font-bold text-signal-ink">
                {i + 1}
              </span>
              <h3 className="text-sm font-semibold text-text-strong">{L(s.t, locale)}</h3>
              <p className="text-xs leading-relaxed text-text-muted">{L(s.d, locale)}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="section-tight max-w-3xl border-t border-border">
        <SectionHeading eyebrow={t('label.faq', locale)} title={locale === 'sv' ? 'Vanliga frågor' : 'FAQ'} />
        <Faq items={faq} locale={locale} />
        <p className="mt-6 flex items-start gap-2 text-2xs text-text-faint">
          <Icon name="info" size={14} className="mt-0.5 shrink-0" />
          {locale === 'sv'
            ? 'Informationen är vägledande och bygger på Transportstyrelsens och Konsumentverkets publicerade regler (2026). Vi bekräftar detaljer för din specifika modell innan köp.'
            : 'This information is guidance based on published Transportstyrelsen and Konsumentverket rules (2026). We confirm details for your specific model before purchase.'}
        </p>
      </section>
    </div>
  )
}
