import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { admins } from '@/db/schema'
import { eq } from 'drizzle-orm'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

async function requireAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('bsc_admin')?.value === '1'
}

async function currentEmail() {
  const cookieStore = await cookies()
  return cookieStore.get('bsc_admin_user')?.value
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const { email, password } = await request.json()

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }
  if (password && password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
  }

  const updates: { email: string; passwordHash?: string } = { email: email.trim().toLowerCase() }
  if (password) {
    updates.passwordHash = await bcrypt.hash(password, 12)
  }

  try {
    const [row] = await db
      .update(admins)
      .set(updates)
      .where(eq(admins.id, Number(id)))
      .returning({ id: admins.id, email: admins.email, createdAt: admins.createdAt })

    if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(row)
  } catch {
    return NextResponse.json({ error: 'An account with that email already exists' }, { status: 409 })
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params

  const me = await currentEmail()
  const rows = await db.select().from(admins).where(eq(admins.id, Number(id))).limit(1)
  if (!rows[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (rows[0].email === me) {
    return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 })
  }

  await db.delete(admins).where(eq(admins.id, Number(id)))
  return NextResponse.json({ ok: true })
}
