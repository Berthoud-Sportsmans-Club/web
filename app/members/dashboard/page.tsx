import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import LogoutButton from '@/components/LogoutButton'

export const metadata: Metadata = {
  title: 'Member Dashboard – BSC',
}

const sections = [
  {
    href: '/members/welcome',
    label: 'Welcome & Info',
    desc: 'Dues deadline, participation requirements, boat registration',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: '/members/board',
    label: 'Board Members',
    desc: 'Officers and directors with phone contacts',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: '/members/rules',
    label: 'Fishing Rules',
    desc: 'Lake regulations, bag limits, boating rules',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    href: '/members/violations',
    label: 'Violation Policy',
    desc: 'Fines and membership penalties (Aug 2017)',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    href: '/members/volunteers',
    label: 'Volunteers',
    desc: 'Program directors for lake, fish, and hunting',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    href: '/members/minutes',
    label: 'Meeting Minutes',
    desc: 'Full archive 2012–2025, grouped by year',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: '/members/documents',
    label: 'Documents',
    desc: 'Handbook, catch report, sponsorship form, waiver',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
]

export default async function DashboardPage() {
  const isAdmin = (await cookies()).get('bsc_admin')?.value === '1'

  return (
    <div className="bg-cream dark:bg-forest-950 min-h-[calc(100vh-4rem)] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="mb-10">
          <h1 className="section-heading mb-2">Member Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Welcome back. Select a section below to get started.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link key={s.href} href={s.href} className="card p-6 flex gap-4 items-start group">
              <div className="shrink-0 h-12 w-12 rounded-lg bg-forest-900 text-gold-400
                              flex items-center justify-center
                              group-hover:bg-forest-800 transition-colors">
                {s.icon}
              </div>
              <div>
                <h2 className="font-serif font-bold text-forest-900 dark:text-forest-100 text-lg leading-tight mb-1">
                  {s.label}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-snug">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {isAdmin && (
          <div className="mt-8">
            <Link
              href="/members/admin/dashboard"
              className="flex items-center gap-4 rounded-xl border-2 border-gold-400 bg-gold-50 dark:bg-gold-900/20 p-6 hover:bg-gold-100 dark:hover:bg-gold-900/30 transition-colors group"
            >
              <div className="shrink-0 h-12 w-12 rounded-lg bg-gold-500 text-white flex items-center justify-center group-hover:bg-gold-600 transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h2 className="font-serif font-bold text-gold-700 dark:text-gold-400 text-lg leading-tight mb-1">
                  Admin Panel
                </h2>
                <p className="text-sm text-gold-600 dark:text-gold-500 leading-snug">
                  Manage minutes, documents, board members, and volunteers
                </p>
              </div>
            </Link>
          </div>
        )}

        <div className="mt-10 flex justify-end">
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}
