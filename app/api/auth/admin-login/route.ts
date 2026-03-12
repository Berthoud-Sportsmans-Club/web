import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/db/client'
import { admins, settings } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { hashMemberCode } from '@/lib/member-auth'

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 30,
  path: '/',
}

export async function POST(request: Request) {
  const { username, password } = await request.json()

  if (!username || !password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const rows = await db
    .select()
    .from(admins)
    .where(eq(admins.username, username))
    .limit(1)

  const admin = rows[0]
  const valid = admin ? await bcrypt.compare(password, admin.passwordHash) : false

  if (!valid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const memberRow = await db
    .select({ value: settings.value })
    .from(settings)
    .where(eq(settings.key, 'member_code'))
    .limit(1)
  const memberCode = memberRow[0]?.value

  const cookieStore = await cookies()
  if (memberCode) {
    const memberHash = await hashMemberCode(memberCode)
    cookieStore.set('bsc_member', memberHash, COOKIE_OPTS)
  }
  cookieStore.set('bsc_admin', '1', COOKIE_OPTS)
  cookieStore.set('bsc_admin_user', admin.username, COOKIE_OPTS)

  if (admin.mustChangePassword) {
    cookieStore.set('bsc_admin_pwchange', '1', COOKIE_OPTS)
    return NextResponse.json({ ok: true, mustChangePassword: true })
  }

  return NextResponse.json({ ok: true })
}
