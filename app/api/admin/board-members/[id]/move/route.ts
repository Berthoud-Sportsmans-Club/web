import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { boardMembers } from '@/db/schema'
import { eq } from 'drizzle-orm'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

async function requireAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('bsc_admin')?.value === '1'
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const { direction } = await request.json()

  if (direction !== 'up' && direction !== 'down') {
    return NextResponse.json({ error: 'Invalid direction' }, { status: 400 })
  }

  const all = await db.select().from(boardMembers).orderBy(boardMembers.sortOrder)
  const idx = all.findIndex((m) => m.id === Number(id))

  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const swapIdx = direction === 'up' ? idx - 1 : idx + 1
  if (swapIdx < 0 || swapIdx >= all.length) return NextResponse.json({ ok: true }) // already at edge

  const a = all[idx]
  const b = all[swapIdx]

  await db.update(boardMembers).set({ sortOrder: b.sortOrder }).where(eq(boardMembers.id, a.id))
  await db.update(boardMembers).set({ sortOrder: a.sortOrder }).where(eq(boardMembers.id, b.id))

  return NextResponse.json({ ok: true })
}
