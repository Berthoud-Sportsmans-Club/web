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
  const username = process.env.ADMIN_USERNAME
  const password = process.env.ADMIN_PASSWORD

  if (!username || !password) {
    console.error('ADMIN_USERNAME and ADMIN_PASSWORD env vars are required')
    process.exit(1)
  }

  const existing = await db
    .select({ id: admins.id })
    .from(admins)
    .where(eq(admins.username, username))
    .limit(1)

  if (existing.length > 0) {
    console.log(`Admin "${username}" already exists — skipping.`)
    return
  }

  const passwordHash = await bcrypt.hash(password, 12)
  await db.insert(admins).values({ username, passwordHash, mustChangePassword: true })
  console.log(`Admin "${username}" created.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
