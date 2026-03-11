import type { Metadata } from 'next'
import Link from 'next/link'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { documents } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import UploadForm from '@/components/UploadForm'
import DeleteButton from '@/components/DeleteButton'

export const metadata: Metadata = { title: 'Admin: Meeting Minutes – BSC' }

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

export default async function AdminMinutesPage() {
  const rows = await db
    .select()
    .from(documents)
    .where(eq(documents.category, 'meeting_minutes'))
    .orderBy(desc(documents.date))

  return (
    <div className="bg-cream dark:bg-forest-950 min-h-[calc(100vh-4rem)] py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">

        <div className="flex items-center justify-between">
          <h1 className="section-heading">Meeting Minutes</h1>
          <Link href="/members/admin/dashboard" className="text-sm text-forest-700 dark:text-forest-300 hover:underline">
            ← Dashboard
          </Link>
        </div>

        <UploadForm category="meeting_minutes" label="Meeting Minutes" />

        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-forest-900 text-white">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Title</th>
                <th className="px-4 py-3 text-left font-medium w-32">Date</th>
                <th className="px-4 py-3 text-left font-medium w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-parchment dark:divide-forest-700">
              {rows.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-forest-800/50">
                  <td className="px-4 py-3">
                    <a href={doc.blobUrl} target="_blank" rel="noopener noreferrer"
                       className="text-forest-700 dark:text-forest-300 hover:underline">
                      {doc.title}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{doc.date}</td>
                  <td className="px-4 py-3">
                    <DeleteButton url={`/api/admin/documents/${doc.id}`} />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-gray-400">No minutes yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
