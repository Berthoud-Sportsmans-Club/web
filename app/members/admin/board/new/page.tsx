'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function NewBoardMemberPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const form = e.currentTarget
    const type = (form.elements.namedItem('type') as HTMLSelectElement).value
    const body = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value.trim(),
      role: (form.elements.namedItem('role') as HTMLInputElement).value.trim(),
      department: type === 'director' ? 'Director' : null,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value.trim() || null,
    }

    try {
      const res = await fetch('/api/admin/board-members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        router.refresh()
        router.push('/members/admin/board')
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to create member.')
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
          <h1 className="section-heading">Add Board Member</h1>
          <Link href="/members/admin/board" className="text-sm text-forest-700 dark:text-forest-300 hover:underline">
            ← Back
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <BoardMemberFields />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
              {loading ? 'Saving…' : 'Save Member'}
            </button>
            <Link href="/members/admin/board" className="btn-outline">Cancel</Link>
          </div>
        </form>

      </div>
    </div>
  )
}

function BoardMemberFields({ defaults }: { defaults?: Record<string, string | number | null> }) {
  const isDirector = defaults?.department != null
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Type<span className="text-red-500 ml-0.5">*</span>
        </label>
        <select
          name="type"
          defaultValue={isDirector ? 'director' : 'officer'}
          className="w-full rounded-md border border-gray-200 dark:border-forest-600 px-3 py-2 text-sm
                     bg-white dark:bg-forest-700 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-forest-400"
        >
          <option value="officer">Officer</option>
          <option value="director">Director</option>
        </select>
      </div>
      <Field name="name" label="Name" required defaultValue={defaults?.name as string} />
      <Field name="role" label="Role" required placeholder="e.g. President, Fishing Director" defaultValue={defaults?.role as string} />
      <Field name="phone" label="Phone" type="tel" defaultValue={defaults?.phone as string} />
    </>
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
        defaultValue={defaultValue ?? ''}
        className="w-full rounded-md border border-gray-200 dark:border-forest-600 px-3 py-2 text-sm
                   bg-white dark:bg-forest-700 text-gray-900 dark:text-gray-100
                   focus:outline-none focus:ring-2 focus:ring-forest-400"
      />
    </div>
  )
}
