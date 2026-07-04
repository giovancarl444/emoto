import Link from 'next/link'
import './globals.css'
import { fontVariables } from './fonts'

/**
 * Global 404 for routes outside the [locale] segment. Because the app has no
 * root app/layout.tsx (the [locale] layout is the root), this file must render
 * its own <html>/<body> — the documented Next.js i18n pattern.
 */
export default function NotFound() {
  return (
    <html lang="sv" className={fontVariables}>
      <body className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-bg text-center antialiased">
        <p className="font-mono text-2xs uppercase tracking-caps text-signal">404</p>
        <h1 className="font-display text-3xl font-black uppercase tracking-tight text-text-strong">
          Sidan finns inte
        </h1>
        <Link
          href="/sv"
          className="inline-flex h-11 items-center rounded-sm bg-signal px-5 text-sm font-medium text-on-signal"
        >
          Till startsidan
        </Link>
      </body>
    </html>
  )
}
