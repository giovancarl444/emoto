import Link from 'next/link'
import type { Locale } from '@/lib/brand'
import { BRAND } from '@/lib/brand'
import { L, t } from '@/lib/i18n'
import { Logo } from '@/components/ui/Logo'
import { NewsletterForm } from './NewsletterForm'

export function Footer({ locale }: { locale: Locale }) {
  const cols: { title: { sv: string; en: string }; links: { href: string; label: { sv: string; en: string } }[] }[] = [
    {
      title: { sv: 'Handla', en: 'Shop' },
      links: [
        { href: `/${locale}/motorcyklar`, label: { sv: 'Motorcyklar', en: 'Motorcycles' } },
        { href: `/${locale}/delar`, label: { sv: 'Delar & tillbehör', en: 'Parts & accessories' } },
        { href: `/${locale}/jamfor`, label: { sv: 'Jämför modeller', en: 'Compare models' } },
      ],
    },
    {
      title: { sv: 'Tjänster', en: 'Services' },
      links: [
        { href: `/${locale}/tjanster/registrering`, label: { sv: 'Registreringshjälp', en: 'Registration help' } },
        { href: `/${locale}/leverans-returer`, label: { sv: 'Leverans & returer', en: 'Delivery & returns' } },
        { href: `/${locale}/support`, label: { sv: 'Garanti & support', en: 'Warranty & support' } },
      ],
    },
    {
      title: { sv: 'Företag', en: 'Company' },
      links: [
        { href: `/${locale}/om`, label: { sv: 'Om EMOTO', en: 'About EMOTO' } },
        { href: `/${locale}/aterforsaljare`, label: { sv: 'Återförsäljare', en: 'Resellers' } },
        { href: `/${locale}/spar-order`, label: { sv: 'Spåra order', en: 'Track order' } },
        { href: `/${locale}/kontakt`, label: { sv: 'Kontakt', en: 'Contact' } },
      ],
    },
    {
      title: { sv: 'Juridik', en: 'Legal' },
      links: [
        { href: `/${locale}/villkor`, label: { sv: 'Köpvillkor', en: 'Terms of sale' } },
        { href: `/${locale}/angerratt`, label: { sv: 'Ångerrätt', en: 'Right of withdrawal' } },
        { href: `/${locale}/integritet`, label: { sv: 'Integritetspolicy', en: 'Privacy policy' } },
      ],
    },
  ]

  return (
    <footer className="mt-auto border-t border-border bg-bg-sunken">
      <div className="container-emoto grid gap-10 py-14 md:grid-cols-[1.4fr_2fr]">
        <div className="flex max-w-sm flex-col gap-4">
          <Logo />
          <p className="text-sm text-text-muted">{L(BRAND.proposition, locale)}</p>
          <NewsletterForm locale={locale} />
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {cols.map((c) => (
            <nav key={c.title.en} aria-label={L(c.title, locale)}>
              <h3 className="eyebrow mb-3">{L(c.title, locale)}</h3>
              <ul className="flex flex-col gap-2">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-text-muted transition-colors hover:text-text-strong"
                    >
                      {L(l.label, locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-emoto flex flex-col gap-3 py-6 text-2xs text-text-faint sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl">{t('footer.independent', locale)}</p>
          <div className="flex items-center gap-3 font-mono uppercase tracking-caps">
            <span>Klarna</span>
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
          </div>
        </div>
        <div className="container-emoto pb-8 text-2xs text-text-faint">
          © {new Date().getFullYear()} {BRAND.legalName}. {t('footer.rights', locale)} · {BRAND.domain}
        </div>
      </div>
    </footer>
  )
}
