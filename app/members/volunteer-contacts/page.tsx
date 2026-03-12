import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/db/client'
import { volunteerContacts } from '@/db/schema'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Volunteer Contacts – BSC Members' }

export default async function VolunteerContactsPage() {
  const contacts = await db.select().from(volunteerContacts)

  return (
    <div className="bg-cream dark:bg-forest-950 min-h-[calc(100vh-4rem)] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <Link href="/members/dashboard" className="text-sm text-forest-600 dark:text-forest-400 hover:text-gold-600 dark:hover:text-gold-400">
            &larr; Dashboard
          </Link>
          <h1 className="section-heading mt-2">Volunteer Contacts</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Program directors and volunteer coordinators</p>
        </div>

        <div className="max-w-3xl">
          {contacts.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {contacts.map((c) => (
                <ContactCard key={c.id} program={c.program} director={c.director} phone={c.phone} email={c.email} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm">Volunteer contact information is being updated.</p>
          )}

          <div className="text-sm text-gray-500 dark:text-gray-400 border-t border-parchment dark:border-forest-700 pt-4 mt-8">
            Berthoud Sportsman&apos;s Club, Inc. &middot; P.O. Box 1707 &middot; Berthoud, CO 80513
          </div>
        </div>

      </div>
    </div>
  )
}

function ContactCard({ program, director, phone, email }: { program: string; director: string; phone: string | null; email: string | null }) {
  return (
    <div className="card p-4">
      <p className="text-xs font-semibold text-gold-600 uppercase tracking-wide mb-1">{program}</p>
      <p className="font-serif font-bold text-forest-900 dark:text-forest-100">{director}</p>
      {phone && (
        <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-sm text-gray-500 dark:text-gray-400 hover:text-forest-700 dark:hover:text-forest-300 mt-0.5 block">
          {phone}
        </a>
      )}
      {email && (
        <a href={`mailto:${email}`} className="text-sm text-gray-500 dark:text-gray-400 hover:text-forest-700 dark:hover:text-forest-300 mt-0.5 block">
          {email}
        </a>
      )}
    </div>
  )
}
