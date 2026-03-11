import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Rule Violation Policy – BSC Members' }

const violations = [
  'It is a violation to dispose of any fish on the lake shore/bank.',
  'It is a violation to have an unanchored boat stored below the lake high waterline.',
  'It is a violation to have any unstickered watercraft at the lake after June 30th of the year.',
  'It is a violation for any family member to be at the lake unaccompanied by the member.',
]

export default function ViolationsPage() {
  return (
    <div className="bg-cream dark:bg-forest-950 min-h-[calc(100vh-4rem)] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <Link href="/members/dashboard" className="text-sm text-forest-600 dark:text-forest-400 hover:text-gold-600 dark:hover:text-gold-400">
            ← Dashboard
          </Link>
          <h1 className="section-heading mt-2">Rule Violation Policy</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Adopted August 11, 2017</p>
        </div>

        <div className="max-w-3xl space-y-6">

          <div className="card p-6 md:p-8">
            <h2 className="font-serif text-lg font-bold text-forest-900 dark:text-forest-100 mb-4">Violations</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              The following rules were unanimously approved at the August 8, 2017 regular Club
              meeting after lengthy discussion:
            </p>
            <ol className="space-y-3">
              {violations.map((v, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-red-700 text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">{v}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-forest-900 text-white rounded-xl p-6 md:p-8">
            <h2 className="font-serif text-lg font-bold text-gold-300 mb-4">Penalties</h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <span className="shrink-0 px-2 py-0.5 rounded bg-gold-500 text-white text-xs font-bold uppercase tracking-wide">
                  1st offense
                </span>
                <p className="text-forest-100 text-sm">
                  A letter with a <strong className="text-white">$50 fine</strong> levied against
                  the Club member.
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="shrink-0 px-2 py-0.5 rounded bg-red-700 text-white text-xs font-bold uppercase tracking-wide">
                  2nd offense
                </span>
                <p className="text-forest-100 text-sm">
                  <strong className="text-white">Immediate termination</strong> of the member&apos;s
                  Club membership.
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-forest-300">
              These penalties became effective August 19, 2017.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
