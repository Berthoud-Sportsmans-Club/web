import { config } from 'dotenv'
config({ path: '.env.local' })

import bcrypt from 'bcryptjs'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { admins } from './schema'
import { eq } from 'drizzle-orm'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    console.error('ADMIN_EMAIL and ADMIN_PASSWORD env vars are required')
    process.exit(1)
  }

  const normalizedEmail = email.trim().toLowerCase()

  const existing = await db
    .select({ id: admins.id })
    .from(admins)
    .where(eq(admins.email, normalizedEmail))
    .limit(1)

  if (existing.length > 0) {
    console.log(`Admin "${normalizedEmail}" already exists — skipping.`)
    return
  }

  const passwordHash = await bcrypt.hash(password, 12)
  await db.insert(admins).values({ email: normalizedEmail, passwordHash, mustChangePassword: true })
  console.log(`Admin "${normalizedEmail}" created.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
