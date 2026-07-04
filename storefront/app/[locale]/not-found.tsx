import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="container-eldr flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <p className="font-mono text-2xs uppercase tracking-caps text-signal">404</p>
      <h1 className="font-display text-3xl font-black uppercase tracking-tight text-text-strong">
        Sidan finns inte · Not found
      </h1>
      <p className="max-w-md text-text-muted">
        Länken kan vara bruten eller borttagen. · The link may be broken or removed.
      </p>
      <div className="flex gap-3">
        <Button href="/sv" variant="signal">
          Startsida
        </Button>
        <Button href="/sv/motorcyklar" variant="outline">
          Motorcyklar
        </Button>
      </div>
    </div>
  )
}
