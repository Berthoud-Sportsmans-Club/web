'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  /** Fixed category string, OR array of {value, label} options to show a dropdown */
  category: string | { value: string; label: string }[]
  label: string
}

export default function UploadForm({ category, label }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    if (typeof category === 'string') formData.set('category', category)

    try {
      const res = await fetch('/api/admin/documents', { method: 'POST', body: formData })
      if (res.ok) {
        form.reset()
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || 'Upload failed.')
      }
    } catch {
      setError('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      <h2 className="font-serif font-bold text-forest-900 dark:text-forest-100 text-lg">
        Upload {label}
      </h2>

      {Array.isArray(category) && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Type</label>
          <select
            name="category"
            required
            className="w-full rounded-md border border-gray-200 dark:border-forest-600 px-3 py-2 text-sm
                       bg-white dark:bg-forest-700 text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-forest-400"
          >
            <option value="">Select type…</option>
            {category.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Title</label>
        <input
          type="text"
          name="title"
          required
          placeholder={`e.g. ${label} – March 2025`}
          className="w-full rounded-md border border-gray-200 dark:border-forest-600 px-3 py-2 text-sm
                     bg-white dark:bg-forest-700 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-forest-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Date</label>
        <input
          type="date"
          name="date"
          required
          className="w-full rounded-md border border-gray-200 dark:border-forest-600 px-3 py-2 text-sm
                     bg-white dark:bg-forest-700 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-forest-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">PDF File</label>
        <input
          type="file"
          name="file"
          accept="application/pdf"
          required
          className="w-full text-sm text-gray-700 dark:text-gray-200
                     file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0
                     file:text-sm file:font-medium file:bg-forest-900 file:text-white
                     hover:file:bg-forest-800 file:cursor-pointer"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Uploading…' : 'Upload'}
      </button>
    </form>
  )
}
