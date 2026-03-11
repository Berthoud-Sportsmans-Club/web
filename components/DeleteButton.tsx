'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  url: string
  label?: string
}

export default function DeleteButton({ url, label = 'Delete' }: Props) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    try {
      const res = await fetch(url, { method: 'DELETE' })
      if (res.ok) {
        router.refresh()
      } else {
        alert('Delete failed. Please try again.')
      }
    } catch {
      alert('Delete failed. Please try again.')
    } finally {
      setLoading(false)
      setConfirming(false)
    }
  }

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-xs px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-60"
        >
          {loading ? '…' : 'Yes'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={loading}
          className="text-xs px-2 py-1 rounded border border-gray-300 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-forest-800/50 transition-colors"
        >
          No
        </button>
      </span>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-xs px-2 py-1 rounded border border-red-300 text-red-600
                 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
    >
      {label}
    </button>
  )
}
