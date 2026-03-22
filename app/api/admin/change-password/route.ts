import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { admins } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { getAuthenticatedAdmin } from '@/lib/admin-auth'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

export async function POST(request: Request) {
  const currentAdmin = await getAuthenticatedAdmin()
  if (!currentAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { currentPassword, newPassword } = await request.json()

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  if (newPassword.length < 8) {
    return NextResponse.json({ error: 'New password must be at least 8 characters' }, { status: 400 })
  }

  const rows = await db
    .select()
    .from(admins)
    .where(eq(admins.id, currentAdmin.id))
    .limit(1)

  const admin = rows[0]
  const valid = admin ? await bcrypt.compare(currentPassword, admin.passwordHash) : false

  if (!valid) {
    return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 })
  }

  const passwordHash = await bcrypt.hash(newPassword, 12)
  await db
    .update(admins)
    .set({ passwordHash, mustChangePassword: false })
    .where(eq(admins.id, admin.id))

  const cookieStore = await cookies()
  cookieStore.delete('bsc_admin_pwchange')

  return NextResponse.json({ ok: true })
}
