import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { Resend } from 'resend'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { admins } from '@/db/schema'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)
const resend = new Resend(process.env.RESEND_API_KEY)

async function requireAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('bsc_admin')?.value === '1'
}

export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const rows = await db
    .select({ id: admins.id, email: admins.email, createdAt: admins.createdAt })
    .from(admins)
  return NextResponse.json(rows)
}

export async function POST(request: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
  }

  const passwordHash = await bcrypt.hash(password, 12)

  let row: { id: number; email: string; createdAt: Date | null }
  try {
    ;[row] = await db
      .insert(admins)
      .values({ email: email.trim().toLowerCase(), passwordHash, mustChangePassword: true })
      .returning({ id: admins.id, email: admins.email, createdAt: admins.createdAt })
  } catch {
    return NextResponse.json({ error: 'An account with that email already exists' }, { status: 409 })
  }

  // Send invite email (best-effort — don't fail the request if email fails)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://berthoudsc.org'
  if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) {
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: email.trim(),
        subject: 'Your Berthoud Sportsman\'s Club admin account',
        text: [
          'You\'ve been invited to manage the Berthoud Sportsman\'s Club website.',
          '',
          `Sign in at: ${siteUrl}/members/admin`,
          `Email: ${email.trim()}`,
          `Temporary password: ${password}`,
          '',
          'You will be prompted to set a new password on your first login.',
        ].join('\n'),
      })
    } catch (err) {
      console.error('Failed to send invite email:', err)
    }
  }

  return NextResponse.json(row, { status: 201 })
}
