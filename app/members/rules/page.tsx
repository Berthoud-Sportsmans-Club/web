import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Fishing Rules & Regulations – BSC Members' }

const rules = [
  'Allowed fishermen include the holder of the card and immediate family plus two (2) guests. That cardholder must be with guests. Probationary members may only bring immediate family members.',
  'Two poles allowed by the cardholder only.',
  'Fishing will be done with hook and line only. Fishing poles must be attended to. Bow and arrow or pitchfork are allowed for carp.',
  'The limit of fish caught by cardholder and guest shall not exceed a combined daily bag limit of 15 fish in aggregate. White Bass, Wiper, Carp, and Catfish over 5 lbs do not count in the aggregate total.',
  'All largemouth bass between 14″ and 16″ in length must be returned to the lake.',
  'All White Bass, Wiper & Carp, regardless of size, and Channel Catfish over 5 lbs must be removed from the lake.',
  'All members must produce a card in good standing upon request of any other member.',
  'It is the responsibility of all members to keep the lake premises clean. No glass containers allowed on lake property.',
  'No member shall remove riprap from the dike, damage property, tamper with headgates, or trespass on adjoining properties.',
  'All gates must be closed and locked upon entry and exit.',
  'All members and guests shall conduct themselves in an orderly manner.',
  'Boating shall be only at speeds causing no white water wake except during adverse conditions.',
  'All members and guests must abide by all safety regulations set by the state — life jackets, etc.',
  'No permanent structures may be placed on lake property.',
  'Camping trailers shall not be left on premises for more than five (5) days, and no two (2) of those five (5) days shall the trailer be left unattended.',
  'No cleaning of fish is allowed on lake property.',
  'Please fill out the fishing ledger located near the main gate when you leave.',
  'Fish regulations will be posted on the lake sign.',
  'Any member violating these regulations shall be subject to a monetary fine or loss of membership.',
]

export default function RulesPage() {
  return (
    <div className="bg-cream dark:bg-forest-950 min-h-[calc(100vh-4rem)] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <Link href="/members/dashboard" className="text-sm text-forest-600 dark:text-forest-400 hover:text-gold-600 dark:hover:text-gold-400">
            ← Dashboard
          </Link>
          <h1 className="section-heading mt-2">Fishing Rules &amp; Regulations</h1>
        </div>

        <div className="max-w-3xl">
          <div className="card p-6 md:p-8">
            <ol className="space-y-4">
              {rules.map((rule, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-forest-900 text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">{rule}</p>
                </li>
              ))}
            </ol>
          </div>

          <p className="mt-4 text-xs text-gray-400 dark:text-gray-500 text-center">
            Specific fish size and bag limits are posted on the lake sign and may change each season.
          </p>
        </div>

      </div>
    </div>
  )
}
