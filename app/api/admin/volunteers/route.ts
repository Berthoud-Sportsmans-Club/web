import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { volunteerContacts } from '@/db/schema'
import { requireAdmin } from '@/lib/admin-auth'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const rows = await db.select().from(volunteerContacts)
  return NextResponse.json(rows)
}

export async function POST(request: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()
  const { program, director, phone, email } = body

  if (!program || !director) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const [row] = await db.insert(volunteerContacts).values({ program, director, phone: phone || null, email: email || null }).returning()
  return NextResponse.json(row, { status: 201 })
}
