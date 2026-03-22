import type { Metadata } from 'next'
import Link from 'next/link'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { admins } from '@/db/schema'
import DeleteButton from '@/components/DeleteButton'
import { getAuthenticatedAdmin } from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Admin: Accounts – BSC' }

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

export default async function AdminAccountsPage() {
  const currentAdmin = await getAuthenticatedAdmin()
  const me = currentAdmin?.email

  const rows = await db
    .select({ id: admins.id, email: admins.email, createdAt: admins.createdAt })
    .from(admins)

  return (
    <div className="bg-cream dark:bg-forest-950 min-h-[calc(100vh-4rem)] py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">

        <div className="flex items-center justify-between">
          <h1 className="section-heading">Admin Accounts</h1>
          <div className="flex gap-3 items-center">
            <Link href="/members/admin/accounts/new" className="btn-primary text-sm">
              + Add Admin
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
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">Created</th>
                <th className="px-4 py-3 text-left font-medium w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-parchment dark:divide-forest-700">
              {rows.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50 dark:hover:bg-forest-800/50">
                  <td className="px-4 py-3 font-medium text-forest-900 dark:text-forest-100">
                    {a.email}
                    {a.email === me && (
                      <span className="ml-2 text-xs text-gold-600 dark:text-gold-400">(you)</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                    {a.createdAt ? new Date(a.createdAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <Link href={`/members/admin/accounts/${a.id}/edit`}
                          className="text-xs px-2 py-1 rounded border border-forest-300 text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-forest-800/50 transition-colors">
                      Edit
                    </Link>
                    {a.email !== me && (
                      <DeleteButton url={`/api/admin/accounts/${a.id}`} />
                    )}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-gray-400">No admin accounts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
