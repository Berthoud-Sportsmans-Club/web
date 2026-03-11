import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { volunteerContacts } from '@/db/schema'
import { eq } from 'drizzle-orm'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

async function requireAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('bsc_admin')?.value === '1'
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const body = await request.json()
  const { program, director, phone, email } = body

  const [row] = await db
    .update(volunteerContacts)
    .set({ program, director, phone: phone || null, email: email || null })
    .where(eq(volunteerContacts.id, Number(id)))
    .returning()

  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(row)
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  await db.delete(volunteerContacts).where(eq(volunteerContacts.id, Number(id)))
  return NextResponse.json({ ok: true })
}
