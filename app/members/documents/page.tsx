import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/db/client'
import { documents } from '@/db/schema'
import { inArray, asc } from 'drizzle-orm'

export const metadata: Metadata = { title: 'Documents – BSC Members' }

export default async function DocumentsPage() {
  const docs = await db
    .select()
    .from(documents)
    .where(inArray(documents.category, ['form', 'handbook']))
    .orderBy(asc(documents.category), asc(documents.title))

  const handbooks = docs.filter((d) => d.category === 'handbook')
  const forms = docs.filter((d) => d.category === 'form')

  return (
    <div className="bg-cream min-h-[calc(100vh-4rem)] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <Link href="/members/dashboard" className="text-sm text-forest-600 hover:text-gold-600">
            ← Dashboard
          </Link>
          <h1 className="section-heading mt-2">Documents &amp; Forms</h1>
        </div>

        <div className="max-w-3xl space-y-8">

          {handbooks.length > 0 && (
            <div>
              <h2 className="font-serif text-xl font-bold text-forest-900 mb-3">Handbook &amp; Plans</h2>
              <DocList docs={handbooks} />
            </div>
          )}

          {forms.length > 0 && (
            <div>
              <h2 className="font-serif text-xl font-bold text-forest-900 mb-3">Forms</h2>
              <DocList docs={forms} />
            </div>
          )}

          {docs.length === 0 && (
            <p className="text-gray-500 text-sm">Documents are being uploaded.</p>
          )}

        </div>
      </div>
    </div>
  )
}

function DocList({ docs }: { docs: Array<{ id: number; title: string; blobUrl: string }> }) {
  return (
    <div className="grid gap-3">
      {docs.map((doc) => (
        <a
          key={doc.id}
          href={doc.blobUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="card px-5 py-4 flex items-center gap-4 group"
        >
          <div className="shrink-0 h-10 w-10 rounded bg-forest-900 text-gold-400 flex items-center justify-center group-hover:bg-forest-800 transition-colors">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-forest-900 group-hover:text-forest-700 text-sm">
              {doc.title}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">PDF — click to open</p>
          </div>
          <svg className="h-4 w-4 text-gray-400 shrink-0 group-hover:text-forest-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      ))}
    </div>
  )
}
