'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/brand'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'

type Topic = 'order' | 'registration' | 'warranty' | 'returns' | 'general'

const TOPICS: { value: Topic; label: { sv: string; en: string } }[] = [
  { value: 'order', label: { sv: 'Order & leverans', en: 'Order & delivery' } },
  { value: 'registration', label: { sv: 'Registrering', en: 'Registration' } },
  { value: 'warranty', label: { sv: 'Garanti & reklamation', en: 'Warranty & claims' } },
  { value: 'returns', label: { sv: 'Ångerrätt & retur', en: 'Withdrawal & returns' } },
  { value: 'general', label: { sv: 'Övrigt', en: 'General' } },
]

const C = {
  name: { sv: 'Namn', en: 'Name' },
  email: { sv: 'E-post', en: 'Email' },
  order: { sv: 'Ordernummer (valfritt)', en: 'Order number (optional)' },
  topic: { sv: 'Ämne', en: 'Topic' },
  message: { sv: 'Meddelande', en: 'Message' },
  send: { sv: 'Skicka', en: 'Send' },
  ok: { sv: 'Tack! Vi hör av oss, oftast inom en timme på vardagar. Referens:', en: 'Thanks! We’ll reply, usually within an hour on weekdays. Reference:' },
  err: { sv: 'Kontrollera fälten och försök igen.', en: 'Please check the fields and try again.' },
}

export function SupportForm({ locale, initialTopic = 'general' }: { locale: Locale; initialTopic?: Topic }) {
  const [topic, setTopic] = useState<Topic>(initialTopic)
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [ref, setRef] = useState('')

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setState('sending')
    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          name: fd.get('name'),
          email: fd.get('email'),
          orderId: fd.get('orderId'),
          message: fd.get('message'),
        }),
      })
      const data = await res.json()
      if (data.ok) {
        setRef(data.ref)
        setState('done')
      } else setState('error')
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div className="flex items-start gap-3 rounded-md border border-success/40 bg-success/10 p-5 text-sm text-success">
        <Icon name="check" size={20} className="mt-0.5 shrink-0" />
        <p>
          {C.ok[locale]} <span className="font-mono text-text-strong">{ref}</span>
        </p>
      </div>
    )
  }

  const field = 'h-11 rounded-sm border border-border bg-bg px-3 text-sm text-text-strong placeholder:text-text-faint focus-visible:border-signal'

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 rounded-md border border-border bg-surface p-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="s-topic" className="eyebrow">{C.topic[locale]}</label>
        <select
          id="s-topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value as Topic)}
          className={field}
        >
          {TOPICS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label[locale]}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="s-name" className="eyebrow">{C.name[locale]}</label>
          <input id="s-name" name="name" required className={field} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="s-email" className="eyebrow">{C.email[locale]}</label>
          <input id="s-email" name="email" type="email" required className={field} />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="s-order" className="eyebrow">{C.order[locale]}</label>
        <input id="s-order" name="orderId" placeholder="EMOTO-2026-…" className={field} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="s-msg" className="eyebrow">{C.message[locale]}</label>
        <textarea id="s-msg" name="message" required rows={4} className="rounded-sm border border-border bg-bg px-3 py-2 text-sm text-text-strong placeholder:text-text-faint focus-visible:border-signal" />
      </div>
      {state === 'error' && <p className="text-sm text-danger">{C.err[locale]}</p>}
      <div>
        <Button type="submit" variant="signal" loading={state === 'sending'} iconRight="arrow-right">
          {C.send[locale]}
        </Button>
      </div>
    </form>
  )
}
