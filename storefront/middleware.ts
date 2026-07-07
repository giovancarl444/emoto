import { NextRequest, NextResponse } from 'next/server'

/**
 * Locale routing. Every page lives under /sv or /en. Requests without a locale
 * prefix are redirected to the visitor's preferred locale (Accept-Language),
 * defaulting to Swedish (the primary market).
 */
const LOCALES = ['sv', 'en']
const DEFAULT_LOCALE = 'sv'

function preferred(req: NextRequest): string {
  const header = req.headers.get('accept-language') ?? ''
  // English speakers get /en; everyone else gets Swedish.
  if (/\ben\b/i.test(header) && !/\bsv\b/i.test(header)) return 'en'
  return DEFAULT_LOCALE
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const hasLocale = LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (hasLocale) return NextResponse.next()

  const url = req.nextUrl.clone()
  const locale = preferred(req)
  url.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // Skip Next internals, API routes, and files with an extension (assets).
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
