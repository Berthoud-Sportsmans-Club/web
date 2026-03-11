import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Members Portal',
  description: 'Member login for Berthoud Sportsman\'s Club.',
}

export default function MembersPage() {
  return (
    <section className="bg-cream min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-forest-900 flex items-center justify-center shadow-lg">
            <svg className="h-8 w-8 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>

        <div className="card p-8 text-center">
          <h1 className="font-serif text-2xl font-bold text-forest-900 mb-2">
            Members Portal
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Sign in to access club documents, the annual calendar, volunteer
            information, and the latest news from BSC.
          </p>

          {/* Placeholder login form */}
          <form className="space-y-4 text-left">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username or Email
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled
              className="w-full px-6 py-3 rounded-md bg-forest-900 text-white text-sm font-semibold
                         opacity-60 cursor-not-allowed"
            >
              Sign In (Coming Soon)
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-parchment">
            <p className="text-xs text-gray-400 leading-relaxed">
              Member authentication is currently being set up. If you need access to
              club materials, please{' '}
              <Link href="/contact" className="text-forest-600 hover:text-gold-600 underline underline-offset-2">
                contact us
              </Link>
              .
            </p>
          </div>
        </div>

        {/* What members get */}
        <div className="mt-6 bg-forest-900 rounded-xl p-6 text-white">
          <h2 className="font-serif text-base font-bold mb-3 text-gold-300">
            Member Resources Include:
          </h2>
          <ul className="space-y-2">
            {[
              'Member forms & documents',
              'Annual club calendar',
              'Volunteer opportunities',
              'Club news & announcements',
              'Fishing & hunting updates',
              'Rules & regulations',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-forest-200">
                <svg className="h-4 w-4 text-gold-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
