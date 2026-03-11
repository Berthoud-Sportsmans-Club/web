import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/db/client'
import { boardMembers } from '@/db/schema'
import { asc } from 'drizzle-orm'

export const metadata: Metadata = { title: 'Board Members – BSC Members' }

export default async function BoardPage() {
  const members = await db.select().from(boardMembers).orderBy(asc(boardMembers.sortOrder))
  const officers = members.filter((m) => !m.department)
  const directors = members.filter((m) => m.department)

  return (
    <div className="bg-cream dark:bg-forest-950 min-h-[calc(100vh-4rem)] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <Link href="/members/dashboard" className="text-sm text-forest-600 dark:text-forest-400 hover:text-gold-600 dark:hover:text-gold-400">
            ← Dashboard
          </Link>
          <h1 className="section-heading mt-2">Board Members</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Your 2025 Berthoud Sportsman&apos;s Club Board</p>
        </div>

        <div className="max-w-3xl space-y-8">

          {officers.length > 0 && (
            <div>
              <h2 className="font-serif text-xl font-bold text-forest-900 dark:text-forest-100 mb-4">Officers</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {officers.map((m) => (
                  <ContactCard key={m.id} name={m.name} role={m.role} phone={m.phone} />
                ))}
              </div>
            </div>
          )}

          {directors.length > 0 && (
            <div>
              <h2 className="font-serif text-xl font-bold text-forest-900 dark:text-forest-100 mb-4">Directors</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {directors.map((m) => (
                  <ContactCard key={m.id} name={m.name} role={m.role} phone={m.phone} />
                ))}
              </div>
            </div>
          )}

          {members.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-sm">Board member information is being updated.</p>
          )}

          <div className="text-sm text-gray-500 dark:text-gray-400 border-t border-parchment dark:border-forest-700 pt-4">
            Berthoud Sportsman&apos;s Club, Inc. · P.O. Box 1707 · Berthoud, CO 80513
          </div>
        </div>

      </div>
    </div>
  )
}

function ContactCard({ name, role, phone }: { name: string; role: string; phone: string | null }) {
  return (
    <div className="card p-4">
      <p className="text-xs font-semibold text-gold-600 uppercase tracking-wide mb-1">{role}</p>
      <p className="font-serif font-bold text-forest-900 dark:text-forest-100">{name}</p>
      {phone && (
        <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-sm text-gray-500 dark:text-gray-400 hover:text-forest-700 dark:hover:text-forest-300 mt-0.5 block">
          {phone}
        </a>
      )}
    </div>
  )
}
