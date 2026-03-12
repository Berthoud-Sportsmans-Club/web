import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/db/client'
import { documents } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Meeting Minutes – BSC Members' }

export default async function MinutesPage() {
  const minutes = await db
    .select()
    .from(documents)
    .where(eq(documents.category, 'meeting_minutes'))
    .orderBy(desc(documents.date))

  // Group by year
  const byYear = minutes.reduce<Record<string, typeof minutes>>((acc, doc) => {
    const year = doc.date.substring(0, 4)
    if (!acc[year]) acc[year] = []
    acc[year].push(doc)
    return acc
  }, {})

  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="bg-cream dark:bg-forest-950 min-h-[calc(100vh-4rem)] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <Link href="/members/dashboard" className="text-sm text-forest-600 dark:text-forest-400 hover:text-gold-600 dark:hover:text-gold-400">
            ← Dashboard
          </Link>
          <h1 className="section-heading mt-2">Meeting Minutes</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {minutes.length > 0 ? `${minutes.length} documents, ${years[years.length - 1]}–${years[0]}` : 'Archive loading…'}
          </p>
        </div>

        {minutes.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">No minutes have been uploaded yet.</p>
        ) : (
          <div className="space-y-8">
            {years.map((year) => (
              <div key={year}>
                <h2 className="font-serif text-2xl font-bold text-forest-900 dark:text-forest-100 mb-3">{year}</h2>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {byYear[year].map((doc) => (
                    <a
                      key={doc.id}
                      href={doc.blobUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card px-4 py-3 flex items-center gap-3 group"
                    >
                      <svg className="h-5 w-5 text-gold-500 shrink-0 group-hover:text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-forest-900 dark:text-forest-100 group-hover:text-forest-700 dark:group-hover:text-forest-300 leading-snug">
                        {doc.title}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
