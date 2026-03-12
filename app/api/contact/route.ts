import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const subjectLabels: Record<string, string> = {
  membership: 'Membership Inquiry',
  events: 'Events & Calendar',
  general: 'General Question',
  other: 'Other',
}

function getRecipient(subject: string): string {
  const envKey = `CONTACT_EMAIL_${subject.toUpperCase()}`
  return process.env[envKey] || process.env.CONTACT_EMAIL_DEFAULT || ''
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { firstName, lastName, email, subject, message, company } = body as Record<string, string>

  // Honeypot — if filled, silently succeed
  if (company) {
    return NextResponse.json({ success: true })
  }

  // Validation
  const missing: string[] = []
  if (!firstName?.trim()) missing.push('First name')
  if (!lastName?.trim()) missing.push('Last name')
  if (!email?.trim()) missing.push('Email')
  if (!subject?.trim()) missing.push('Subject')
  if (!message?.trim()) missing.push('Message')

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(', ')}` },
      { status: 400 },
    )
  }

  const recipient = getRecipient(subject)
  if (!recipient) {
    console.error('No contact email configured. Set CONTACT_EMAIL_DEFAULT in environment.')
    return NextResponse.json({ error: 'Contact form is not configured.' }, { status: 500 })
  }

  const subjectLine = `[BSC Contact] ${subjectLabels[subject] ?? subject} — ${firstName} ${lastName}`

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@yourdomain.com',
      to: recipient,
      replyTo: email.trim(),
      subject: subjectLine,
      text: [
        `Name: ${firstName.trim()} ${lastName.trim()}`,
        `Email: ${email.trim()}`,
        `Subject: ${subjectLabels[subject] ?? subject}`,
        '',
        message.trim(),
      ].join('\n'),
    })
  } catch (err) {
    console.error('Failed to send contact email:', err)
    return NextResponse.json({ error: 'Failed to send message. Please try again later.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
