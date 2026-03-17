'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

interface Admin {
  id: number
  email: string
}

export default function EditAdminForm({ admin }: { admin: Admin }) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const form = e.currentTarget
    const password = (form.elements.namedItem('password') as HTMLInputElement).value
    const confirm = (form.elements.namedItem('confirm') as HTMLInputElement).value

    if (password && password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      const body: { email: string; password?: string } = {
        email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
      }
      if (password) body.password = password

      const res = await fetch(`/api/admin/accounts/${admin.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        router.push('/members/admin/accounts')
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to save.')
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
          <h1 className="section-heading">Edit Admin Account</h1>
          <Link href="/members/admin/accounts" className="text-sm text-forest-700 dark:text-forest-300 hover:underline">
            ← Back
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <Field name="email" label="Email" type="email" required defaultValue={admin.email} />

          <div className="border-t border-parchment dark:border-forest-700 pt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Leave password fields blank to keep the current password.
            </p>
            <div className="space-y-4">
              <Field name="password" label="New Password" type="password" />
              <Field name="confirm" label="Confirm New Password" type="password" />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
              {loading ? 'Saving…' : 'Save Changes'}
            </button>
            <Link href="/members/admin/accounts" className="btn-outline">Cancel</Link>
          </div>
        </form>

      </div>
    </div>
  )
}

function Field({ name, label, required, type = 'text', defaultValue }: {
  name: string; label: string; required?: boolean; type?: string; defaultValue?: string
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
        defaultValue={defaultValue}
        autoComplete="off"
        className="w-full rounded-md border border-gray-200 dark:border-forest-600 px-3 py-2 text-sm
                   bg-white dark:bg-forest-700 text-gray-900 dark:text-gray-100
                   focus:outline-none focus:ring-2 focus:ring-forest-400"
      />
    </div>
  )
}
