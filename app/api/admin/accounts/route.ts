import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { admins } from '@/db/schema'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

async function requireAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('bsc_admin')?.value === '1'
}

export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const rows = await db
    .select({ id: admins.id, username: admins.username, createdAt: admins.createdAt })
    .from(admins)
  return NextResponse.json(rows)
}

export async function POST(request: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { username, password } = await request.json()

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
  }

  const passwordHash = await bcrypt.hash(password, 12)

  try {
    const [row] = await db
      .insert(admins)
      .values({ username: username.trim(), passwordHash })
      .returning({ id: admins.id, username: admins.username, createdAt: admins.createdAt })
    return NextResponse.json(row, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Username already exists' }, { status: 409 })
  }
}
