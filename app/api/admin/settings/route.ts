import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '@/db/client'
import { settings } from '@/db/schema'
import { sql } from 'drizzle-orm'

async function requireAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('bsc_admin')?.value === '1'
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const rows = await db
    .select({ key: settings.key, value: settings.value })
    .from(settings)
  return NextResponse.json(rows)
}

export async function PUT(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const ALLOWED_KEYS = new Set(['member_code', 'gate_code_bike_park', 'gate_code_green_emergency', 'gate_code_east', 'contact_email'])

  const { key, value } = await request.json()
  if (!key || value === undefined) {
    return NextResponse.json({ error: 'key and value are required' }, { status: 400 })
  }
  if (!ALLOWED_KEYS.has(key)) {
    return NextResponse.json({ error: 'Invalid setting key' }, { status: 400 })
  }

  await db
    .insert(settings)
    .values({ key, value })
    .onConflictDoUpdate({
      target: settings.key,
      set: { value, updatedAt: sql`now()` },
    })

  return NextResponse.json({ ok: true })
}
