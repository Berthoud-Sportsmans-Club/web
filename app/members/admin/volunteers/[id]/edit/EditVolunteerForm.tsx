'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

interface Contact {
  id: number
  program: string
  director: string
  phone: string | null
  email: string | null
}

export default function EditVolunteerForm({ contact }: { contact: Contact }) {
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
      const res = await fetch(`/api/admin/volunteers/${contact.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        router.push('/members/admin/volunteers')
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
          <h1 className="section-heading">Edit Volunteer Contact</h1>
          <Link href="/members/admin/volunteers" className="text-sm text-forest-700 dark:text-forest-300 hover:underline">
            ← Back
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <Field name="program" label="Program" required defaultValue={contact.program} />
          <Field name="director" label="Director" required defaultValue={contact.director} />
          <Field name="phone" label="Phone" type="tel" defaultValue={contact.phone ?? ''} />
          <Field name="email" label="Email" type="email" defaultValue={contact.email ?? ''} />

          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
              {loading ? 'Saving…' : 'Save Changes'}
            </button>
            <Link href="/members/admin/volunteers" className="btn-outline">Cancel</Link>
          </div>
        </form>

      </div>
    </div>
  )
}

function Field({ name, label, required, placeholder, type = 'text', defaultValue }: {
  name: string; label: string; required?: boolean; placeholder?: string; type?: string; defaultValue?: string
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
        defaultValue={defaultValue}
        className="w-full rounded-md border border-gray-200 dark:border-forest-600 px-3 py-2 text-sm
                   bg-white dark:bg-forest-700 text-gray-900 dark:text-gray-100
                   focus:outline-none focus:ring-2 focus:ring-forest-400"
      />
    </div>
  )
}
