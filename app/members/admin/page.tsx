'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const form = e.currentTarget
    const username = (form.elements.namedItem('username') as HTMLInputElement).value.trim()
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    try {
      const res = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (res.ok) {
        const data = await res.json()
        router.push(data.mustChangePassword ? '/members/admin/change-password' : '/members/admin/dashboard')
      } else {
        setError('Invalid credentials. Please try again.')
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>

        <div className="card p-8 text-center">
          <h1 className="font-serif text-2xl font-bold text-forest-900 dark:text-forest-100 mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
            Sign in with your admin credentials to manage club content.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                autoComplete="username"
                className="w-full rounded-md border border-gray-200 dark:border-forest-600 px-3 py-2 text-sm
                           bg-white dark:bg-forest-700 text-gray-900 dark:text-gray-100
                           focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                autoComplete="current-password"
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
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}
