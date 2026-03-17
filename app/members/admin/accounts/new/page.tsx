'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function NewAdminPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const form = e.currentTarget
    const password = (form.elements.namedItem('password') as HTMLInputElement).value
    const confirm = (form.elements.namedItem('confirm') as HTMLInputElement).value

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/admin/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
          password,
        }),
      })
      if (res.ok) {
        router.push('/members/admin/accounts')
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to create account.')
      }
    } catch {
      setError('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-cream dark:bg-forest-950 min-h-[calc(100vh-4rem)] py-12">
      <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 space-y-6">

        <div className="flex items-center justify-between">
          <h1 className="section-heading">Add Admin Account</h1>
          <Link href="/members/admin/accounts" className="text-sm text-forest-700 dark:text-forest-300 hover:underline">
            ← Back
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <Field name="email" label="Email" type="email" required />
          <Field name="password" label="Temporary Password" type="password" required />
          <Field name="confirm" label="Confirm Password" type="password" required />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            An invite email will be sent with login instructions. They will be required to set a new password on first login.
          </p>

          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
              {loading ? 'Creating…' : 'Create & Send Invite'}
            </button>
            <Link href="/members/admin/accounts" className="btn-outline">Cancel</Link>
          </div>
        </form>

      </div>
    </div>
  )
}

function Field({ name, label, required, type = 'text' }: {
  name: string; label: string; required?: boolean; type?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete="off"
        className="w-full rounded-md border border-gray-200 dark:border-forest-600 px-3 py-2 text-sm
                   bg-white dark:bg-forest-700 text-gray-900 dark:text-gray-100
                   focus:outline-none focus:ring-2 focus:ring-forest-400"
      />
    </div>
  )
}
