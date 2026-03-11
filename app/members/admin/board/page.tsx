import type { Metadata } from 'next'
import Link from 'next/link'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { boardMembers } from '@/db/schema'
import DeleteButton from '@/components/DeleteButton'

export const metadata: Metadata = { title: 'Admin: Board Members – BSC' }

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

export default async function AdminBoardPage() {
  const rows = await db.select().from(boardMembers).orderBy(boardMembers.sortOrder)

  return (
    <div className="bg-cream dark:bg-forest-950 min-h-[calc(100vh-4rem)] py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">

        <div className="flex items-center justify-between">
          <h1 className="section-heading">Board Members</h1>
          <div className="flex gap-3 items-center">
            <Link href="/members/admin/board/new" className="btn-primary text-sm">
              + Add Member
            </Link>
            <Link href="/members/admin/dashboard" className="text-sm text-forest-700 dark:text-forest-300 hover:underline">
              ← Dashboard
            </Link>
          </div>
        </div>

        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-forest-900 text-white">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Role</th>
                <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">Dept</th>
                <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Phone</th>
                <th className="px-4 py-3 text-left font-medium w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-parchment dark:divide-forest-700">
              {rows.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50 dark:hover:bg-forest-800/50">
                  <td className="px-4 py-3 font-medium text-forest-900 dark:text-forest-100">{m.name}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{m.role}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 hidden sm:table-cell">{m.department ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 hidden md:table-cell">{m.phone ?? '—'}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <Link href={`/members/admin/board/${m.id}/edit`}
                          className="text-xs px-2 py-1 rounded border border-forest-300 text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-forest-800/50 transition-colors">
                      Edit
                    </Link>
                    <DeleteButton url={`/api/admin/board-members/${m.id}`} />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-400">No board members yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
