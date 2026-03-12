import { config } from 'dotenv'
config({ path: '.env.local' })

import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { settings } from './schema'
import { eq } from 'drizzle-orm'

const sqlClient = neon(process.env.DATABASE_URL!)
const db = drizzle(sqlClient)

const INITIAL_SETTINGS = [
  {
    key: 'member_code',
    value: process.env.MEMBER_CODE ?? '',
    label: 'MEMBER_CODE',
  },
  {
    key: 'gate_code_bike_park',
    value: process.env.GATE_CODE_BIKE_PARK ?? '',
    label: 'GATE_CODE_BIKE_PARK',
  },
  {
    key: 'gate_code_green_emergency',
    value: process.env.GATE_CODE_GREEN_EMERGENCY ?? '',
    label: 'GATE_CODE_GREEN_EMERGENCY',
  },
  {
    key: 'gate_code_east',
    value: process.env.GATE_CODE_EAST ?? '',
    label: 'GATE_CODE_EAST',
  },
]

async function main() {
  let missing = false
  for (const s of INITIAL_SETTINGS) {
    if (!s.value) {
      console.warn(`⚠ ${s.label} env var is not set — skipping "${s.key}"`)
      missing = true
    }
  }
  if (missing) {
    console.log('Set the missing env vars in .env.local and re-run to seed them.')
  }

  for (const s of INITIAL_SETTINGS) {
    if (!s.value) continue

    const existing = await db
      .select({ key: settings.key })
      .from(settings)
      .where(eq(settings.key, s.key))
      .limit(1)

    if (existing.length > 0) {
      console.log(`Setting "${s.key}" already exists — skipping.`)
      continue
    }

    await db.insert(settings).values({ key: s.key, value: s.value })
    console.log(`Setting "${s.key}" seeded.`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
