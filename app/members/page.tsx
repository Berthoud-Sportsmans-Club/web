'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MembersPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const code = (e.currentTarget.elements.namedItem('code') as HTMLInputElement).value.trim()

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      if (res.ok) {
        router.push('/members/dashboard')
      } else {
        setError('Incorrect member code. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-cream dark:bg-forest-950 min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">

        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-forest-900 flex items-center justify-center shadow-lg">
            <svg className="h-8 w-8 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>

        <div className="card p-8 text-center">
          <h1 className="font-serif text-2xl font-bold text-forest-900 dark:text-forest-100 mb-2">
            Members Portal
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
            Enter your member code to access club documents, meeting minutes,
            board contacts, and more.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Member Code
              </label>
              <input
                type="password"
                id="code"
                name="code"
                required
                autoComplete="current-password"
                className="w-full rounded-md border border-gray-200 dark:border-forest-600 px-3 py-2 text-sm
                           bg-white dark:bg-forest-700 text-gray-900 dark:text-gray-100
                           focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-md bg-forest-900 text-white text-sm font-semibold
                         hover:bg-forest-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <div className="mt-6 bg-forest-900 rounded-xl p-6 text-white">
          <h2 className="font-serif text-base font-bold mb-3 text-gold-300">
            Member Resources Include:
          </h2>
          <ul className="space-y-2">
            {[
              'Meeting minutes archive (2012–2025)',
              'Member forms & documents',
              'Board member contacts',
              'Volunteer program directors',
              'Fishing rules & regulations',
              'Rule violation policy',
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
