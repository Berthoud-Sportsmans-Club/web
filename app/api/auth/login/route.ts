import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { db } from '@/db/client'
import { settings } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { hashMemberCode } from '@/lib/member-auth'

export async function POST(request: Request) {
  const { code } = await request.json()

  const row = await db
    .select({ value: settings.value })
    .from(settings)
    .where(eq(settings.key, 'member_code'))
    .limit(1)

  const memberCode = row[0]?.value
  if (!memberCode || code !== memberCode) {
    return NextResponse.json({ error: 'Invalid member code' }, { status: 401 })
  }

  const hash = await hashMemberCode(memberCode)
  const cookieStore = await cookies()
  cookieStore.set('bsc_member', hash, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })

  return NextResponse.json({ ok: true })
}
