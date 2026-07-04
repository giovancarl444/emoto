import { NextRequest, NextResponse } from 'next/server'

/**
 * Support/returns request intake. In production this creates a helpdesk ticket
 * (e.g. Gorgias/Zendesk/Front) and/or emails support@eldr.se. Here it validates
 * and acknowledges so the flow is demonstrable offline.
 */
const TOPICS = ['order', 'registration', 'warranty', 'returns', 'general']

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as {
    topic?: string
    name?: string
    email?: string
    orderId?: string
    message?: string
  } | null

  const errors: string[] = []
  if (!body?.name?.trim()) errors.push('name')
  if (!body?.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email)) errors.push('email')
  if (!body?.message?.trim() || body.message.trim().length < 10) errors.push('message')
  if (!body?.topic || !TOPICS.includes(body.topic)) errors.push('topic')

  if (errors.length) {
    return NextResponse.json({ ok: false, errors }, { status: 400 })
  }

  // TODO: create ticket / send email. Ticket ref is illustrative.
  const ref = `SUP-${body!.topic!.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`
  return NextResponse.json({ ok: true, ref })
}
