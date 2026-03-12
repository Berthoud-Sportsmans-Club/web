import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/db/client'
import { settings } from '@/db/schema'
import { inArray } from 'drizzle-orm'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Gate Access – BSC Members' }

const GATE_KEYS = ['gate_code_bike_park', 'gate_code_green_emergency', 'gate_code_east'] as const

export default async function GateAccessPage() {
  const rows = await db
    .select({ key: settings.key, value: settings.value })
    .from(settings)
    .where(inArray(settings.key, [...GATE_KEYS]))

  const codes = Object.fromEntries(rows.map((r) => [r.key, r.value]))

  return (
    <div className="bg-cream dark:bg-forest-950 min-h-[calc(100vh-4rem)] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <Link href="/members/dashboard" className="text-sm text-forest-600 dark:text-forest-400 hover:text-gold-600 dark:hover:text-gold-400">
            ← Dashboard
          </Link>
          <h1 className="section-heading mt-2">West Side Entrance</h1>
        </div>

        <div className="max-w-2xl space-y-4">

          <div className="card p-6">
            <p className="text-xs font-semibold text-gold-600 uppercase tracking-wide mb-2">Step 1 — Directions</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Head north on Meadowlark (across from Kwik Korner) to the end of the road.
            </p>
          </div>

          <div className="card p-6">
            <p className="text-xs font-semibold text-gold-600 uppercase tracking-wide mb-2">Step 2 — Bike Park Electronic Gate</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The electronic gate for the Bike Park is open sunup to sundown in spring, summer, and fall.
              After hours and during the off season, use the keypad code:
            </p>
            {codes.gate_code_bike_park && (
              <p className="mt-3 font-mono text-2xl font-bold text-forest-900 dark:text-forest-100 tracking-widest">
                {codes.gate_code_bike_park}
              </p>
            )}
          </div>

          <div className="card p-6">
            <p className="text-xs font-semibold text-gold-600 uppercase tracking-wide mb-2">Step 3 — Green Emergency Services Gate</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Stay to the right and go through the green gate (emergency services gate). Lock combination:
            </p>
            {codes.gate_code_green_emergency && (
              <p className="mt-3 font-mono text-2xl font-bold text-forest-900 dark:text-forest-100 tracking-widest">
                {codes.gate_code_green_emergency}
              </p>
            )}
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              Follow the road north to the outhouse and picnic table. Be mindful of Town of Berthoud (TOB) vehicles, staff, and bike park patrons.
            </p>
          </div>

          <div className="card p-6">
            <p className="text-xs font-semibold text-gold-600 uppercase tracking-wide mb-2">Step 4 — Green Double Swing Gate</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              There is a green double swing gate on the right. The combination is the same as the east gates:
            </p>
            {codes.gate_code_east && (
              <p className="mt-3 font-mono text-2xl font-bold text-forest-900 dark:text-forest-100 tracking-widest">
                {codes.gate_code_east}
              </p>
            )}
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              Park all vehicles inside of that gate and lock the gate while on site.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
