import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/db/client'
import { volunteerContacts } from '@/db/schema'

export const metadata: Metadata = { title: 'Volunteers – BSC Members' }

export default async function VolunteersPage() {
  const contacts = await db.select().from(volunteerContacts)

  return (
    <div className="bg-cream min-h-[calc(100vh-4rem)] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <Link href="/members/dashboard" className="text-sm text-forest-600 hover:text-gold-600">
            ← Dashboard
          </Link>
          <h1 className="section-heading mt-2">Programs &amp; Volunteers</h1>
        </div>

        <div className="max-w-3xl">

          <p className="text-gray-600 mb-6">
            Any member interested in serving and helping on any of the Fish, Lake Maintenance, or
            Hunting Programs please contact the appropriate director below.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contacts.map((c) => (
              <div key={c.id} className="card p-5">
                <p className="text-xs font-semibold text-gold-600 uppercase tracking-wide mb-2">
                  {c.program}
                </p>
                <p className="font-serif font-bold text-forest-900 mb-2">{c.director}</p>
                {c.phone && (
                  <a href={`tel:${c.phone.replace(/\D/g, '')}`}
                     className="block text-sm text-gray-600 hover:text-forest-700">
                    {c.phone}
                  </a>
                )}
                {c.email && (
                  <a href={`mailto:${c.email}`}
                     className="block text-sm text-gray-600 hover:text-forest-700 truncate">
                    {c.email}
                  </a>
                )}
              </div>
            ))}
            {contacts.length === 0 && (
              <p className="text-gray-500 text-sm col-span-3">Volunteer information is being updated.</p>
            )}
          </div>

          <div className="mt-8 bg-forest-900 text-white rounded-xl p-6">
            <p className="text-forest-100 text-sm leading-relaxed">
              While the Program Directors have individual responsibilities, no one person can get
              all the necessary work done by themselves. Your help is needed on all programs.
              We are a club, 135 strong — don&apos;t wait to be asked; step up.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
