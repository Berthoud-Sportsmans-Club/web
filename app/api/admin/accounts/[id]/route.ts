import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { admins } from '@/db/schema'
import { eq, sql as drizzleSql } from 'drizzle-orm'
import { requireAdmin, getAuthenticatedAdmin } from '@/lib/admin-auth'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

function isUniqueViolation(err: unknown): boolean {
  return typeof err === 'object' && err !== null && (err as { code?: string }).code === '23505'
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

  const normalizedEmail = email.trim().toLowerCase()
  const updates: { email: string; passwordHash?: string } = { email: normalizedEmail }
  if (password) {
    updates.passwordHash = await bcrypt.hash(password, 12)
  }

  let row: { id: number; email: string; createdAt: Date | null }
  try {
    ;[row] = await db
      .update(admins)
      .set(updates)
      .where(eq(admins.id, Number(id)))
      .returning({ id: admins.id, email: admins.email, createdAt: admins.createdAt })
  } catch (err) {
    if (isUniqueViolation(err)) {
      return NextResponse.json({ error: 'An account with that email already exists' }, { status: 409 })
    }
    throw err
  }

  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(row)
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const currentAdmin = await getAuthenticatedAdmin()
  if (!currentAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params

  // Prevent deleting your own account
  if (currentAdmin.id === Number(id)) {
    return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 })
  }

  // Prevent deleting the last admin account
  const [{ count }] = await db
    .select({ count: drizzleSql<number>`count(*)::int` })
    .from(admins)
  if (count <= 1) {
    return NextResponse.json({ error: 'Cannot delete the last admin account' }, { status: 400 })
  }

  const rows = await db.select().from(admins).where(eq(admins.id, Number(id))).limit(1)
  if (!rows[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await db.delete(admins).where(eq(admins.id, Number(id)))
  return NextResponse.json({ ok: true })
}
