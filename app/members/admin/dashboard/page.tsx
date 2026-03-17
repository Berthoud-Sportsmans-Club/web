import type { Metadata } from 'next'
import Link from 'next/link'
import AdminLogoutButton from '@/components/AdminLogoutButton'

export const metadata: Metadata = {
  title: 'Admin Dashboard – BSC',
}

const sections = [
  {
    href: '/members/admin/minutes',
    label: 'Meeting Minutes',
    desc: 'Upload new minutes PDFs or remove old ones',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: '/members/admin/documents',
    label: 'Documents',
    desc: 'Manage forms, handbooks, and other files',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: '/members/admin/board',
    label: 'Board Members',
    desc: 'Add, edit, or remove officers and directors',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: '/members/admin/volunteers',
    label: 'Volunteers',
    desc: 'Update program director contacts',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    href: '/members/admin/accounts',
    label: 'Admin Accounts',
    desc: 'Invite admins, update emails, and reset passwords',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href: '/members/admin/settings',
    label: 'Settings',
    desc: 'Update member login code and gate combinations',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="bg-cream dark:bg-forest-950 min-h-[calc(100vh-4rem)] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center rounded-full bg-gold-100 dark:bg-gold-900/30 px-3 py-1 text-xs font-semibold text-gold-700 dark:text-gold-400 uppercase tracking-wide">
              Admin
            </span>
          </div>
          <h1 className="section-heading mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage club content below.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {sections.map((s) => (
            <Link key={s.href} href={s.href} className="card p-6 flex gap-4 items-start group">
              <div className="shrink-0 h-12 w-12 rounded-lg bg-gold-500 text-white
                              flex items-center justify-center
                              group-hover:bg-gold-600 transition-colors">
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

        <div className="mt-10 flex items-center justify-between">
          <Link
            href="/members/dashboard"
            className="text-sm text-forest-700 dark:text-forest-300 hover:underline"
          >
            ← Back to member dashboard
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/members/admin/change-password"
              className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
            >
              Change password
            </Link>
            <AdminLogoutButton />
          </div>
        </div>

      </div>
    </div>
  )
}
