import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { del } from '@vercel/blob'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { documents } from '@/db/schema'
import { eq } from 'drizzle-orm'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

async function requireAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('bsc_admin')?.value === '1'
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const rows = await db.select().from(documents).where(eq(documents.id, Number(id))).limit(1)
  if (!rows[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await del(rows[0].blobUrl)
  await db.delete(documents).where(eq(documents.id, Number(id)))

  return NextResponse.json({ ok: true })
}
