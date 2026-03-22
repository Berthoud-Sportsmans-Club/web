import { cookies } from 'next/headers'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { admins } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { randomBytes } from 'crypto'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

/**
 * Validate the admin session token cookie against the database.
 * Returns the admin record if valid, or null if unauthorized.
 */
export async function getAuthenticatedAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get('bsc_admin')?.value
  if (!token) return null

  const rows = await db
    .select({
      id: admins.id,
      email: admins.email,
      mustChangePassword: admins.mustChangePassword,
    })
    .from(admins)
    .where(eq(admins.sessionToken, token))
    .limit(1)

  return rows[0] ?? null
}

/**
 * Returns true if the request has a valid admin session.
 */
export async function requireAdmin(): Promise<boolean> {
  const admin = await getAuthenticatedAdmin()
  return admin !== null
}

/**
 * Generate a cryptographically random session token.
 */
export function generateSessionToken(): string {
  return randomBytes(32).toString('hex')
}
