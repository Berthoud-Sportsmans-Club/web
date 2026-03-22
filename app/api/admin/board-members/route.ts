import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { boardMembers } from '@/db/schema'
import { sql as drizzleSql } from 'drizzle-orm'
import { requireAdmin } from '@/lib/admin-auth'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const rows = await db.select().from(boardMembers).orderBy(boardMembers.sortOrder)
  return NextResponse.json(rows)
}

export async function POST(request: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()
  const { name, role, department, phone } = body

  if (!name || !role) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const [{ max }] = await db
    .select({ max: drizzleSql<number>`coalesce(max(${boardMembers.sortOrder}), 0)` })
    .from(boardMembers)

  const [row] = await db
    .insert(boardMembers)
    .values({ name, role, department: department || null, phone: phone || null, sortOrder: max + 1 })
    .returning()
  return NextResponse.json(row, { status: 201 })
}
