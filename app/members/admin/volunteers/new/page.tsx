'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function NewVolunteerPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const form = e.currentTarget
    const body = {
      program: (form.elements.namedItem('program') as HTMLInputElement).value.trim(),
      director: (form.elements.namedItem('director') as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value.trim() || null,
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim() || null,
    }

    try {
      const res = await fetch('/api/admin/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        router.push('/members/admin/volunteers')
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to create contact.')
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
          <h1 className="section-heading">Add Volunteer Contact</h1>
          <Link href="/members/admin/volunteers" className="text-sm text-forest-700 dark:text-forest-300 hover:underline">
            ← Back
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <Field name="program" label="Program" required placeholder="e.g. Lake Maintenance" />
          <Field name="director" label="Director" required />
          <Field name="phone" label="Phone" type="tel" />
          <Field name="email" label="Email" type="email" />

          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
              {loading ? 'Saving…' : 'Save Contact'}
            </button>
            <Link href="/members/admin/volunteers" className="btn-outline">Cancel</Link>
          </div>
        </form>

      </div>
    </div>
  )
}

function Field({ name, label, required, placeholder, type = 'text' }: {
  name: string; label: string; required?: boolean; placeholder?: string; type?: string
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
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-200 dark:border-forest-600 px-3 py-2 text-sm
                   bg-white dark:bg-forest-700 text-gray-900 dark:text-gray-100
                   focus:outline-none focus:ring-2 focus:ring-forest-400"
      />
    </div>
  )
}
