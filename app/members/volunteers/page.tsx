import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Gate Access – BSC Members' }

export default function GateAccessPage() {
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
              After hours, use the keypad code:
            </p>
            <p className="mt-3 font-mono text-2xl font-bold text-forest-900 dark:text-forest-100 tracking-widest">2023#</p>
          </div>

          <div className="card p-6">
            <p className="text-xs font-semibold text-gold-600 uppercase tracking-wide mb-2">Step 3 — Green Emergency Services Gate</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Stay to the right and go through the green gate (emergency services gate). Lock combination:
            </p>
            <p className="mt-3 font-mono text-2xl font-bold text-forest-900 dark:text-forest-100 tracking-widest">0513</p>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              Follow the road north to the outhouse and picnic table.
            </p>
          </div>

          <div className="card p-6">
            <p className="text-xs font-semibold text-gold-600 uppercase tracking-wide mb-2">Step 4 — Green Double Swing Gate</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              There is a green double swing gate on the right. The combination is the same as the east gates:
            </p>
            <p className="mt-3 font-mono text-2xl font-bold text-forest-900 dark:text-forest-100 tracking-widest">1955</p>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              Park all vehicles inside of that gate.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
