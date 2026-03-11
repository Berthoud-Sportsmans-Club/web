import type { Metadata } from 'next'
import Link from 'next/link'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { boardMembers } from '@/db/schema'
import BoardMemberList from './BoardMemberList'

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

        <BoardMemberList initialRows={rows} />

      </div>
    </div>
  )
}
