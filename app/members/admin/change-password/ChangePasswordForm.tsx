'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ChangePasswordForm({ required, username }: { required: boolean; username: string }) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const form = e.currentTarget
    const currentPassword = (form.elements.namedItem('currentPassword') as HTMLInputElement).value
    const newPassword = (form.elements.namedItem('newPassword') as HTMLInputElement).value
    const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      if (res.ok) {
        router.push('/members/admin/dashboard')
      } else {
        const data = await res.json()
        setError(data.error ?? 'Something went wrong. Please try again.')
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
          <div className="h-16 w-16 rounded-full bg-gold-500 flex items-center justify-center shadow-lg">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
        </div>

        <div className="card p-8">
          <h1 className="font-serif text-2xl font-bold text-forest-900 dark:text-forest-100 mb-2 text-center">
            Change Password
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 text-center">
            {required
              ? 'You must set a new password before continuing.'
              : 'Update your admin account password.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                readOnly
                defaultValue={username}
                autoComplete="email"
                className="w-full rounded-md border border-gray-200 dark:border-forest-600 px-3 py-2 text-sm
                           bg-gray-50 dark:bg-forest-800 text-gray-500 dark:text-gray-400 cursor-default
                           focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                required
                autoComplete="current-password"
                className="w-full rounded-md border border-gray-200 dark:border-forest-600 px-3 py-2 text-sm
                           bg-white dark:bg-forest-700 text-gray-900 dark:text-gray-100
                           focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full rounded-md border border-gray-200 dark:border-forest-600 px-3 py-2 text-sm
                           bg-white dark:bg-forest-700 text-gray-900 dark:text-gray-100
                           focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full rounded-md border border-gray-200 dark:border-forest-600 px-3 py-2 text-sm
                           bg-white dark:bg-forest-700 text-gray-900 dark:text-gray-100
                           focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-md bg-gold-500 text-white text-sm font-semibold
                         hover:bg-gold-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving…' : 'Set New Password'}
            </button>
          </form>

          {!required && (
            <div className="mt-4 text-center">
              <Link
                href="/members/admin/dashboard"
                className="text-sm text-forest-700 dark:text-forest-300 hover:underline"
              >
                ← Back to dashboard
              </Link>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
