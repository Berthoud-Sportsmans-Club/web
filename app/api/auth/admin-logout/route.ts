import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getAuthenticatedAdmin } from '@/lib/admin-auth'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { admins } from '@/db/schema'
import { eq } from 'drizzle-orm'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

export async function POST() {
  // Clear the session token from DB if currently authenticated
  const admin = await getAuthenticatedAdmin()
  if (admin) {
    await db
      .update(admins)
      .set({ sessionToken: null })
      .where(eq(admins.id, admin.id))
  }

  const cookieStore = await cookies()
  cookieStore.delete('bsc_admin')
  cookieStore.delete('bsc_admin_pwchange')
  return NextResponse.json({ ok: true })
}
