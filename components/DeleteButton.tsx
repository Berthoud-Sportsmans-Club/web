'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  url: string
  label?: string
}

export default function DeleteButton({ url, label = 'Delete' }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this item? This cannot be undone.')) return
    setLoading(true)
    const res = await fetch(url, { method: 'DELETE' })
    if (res.ok) {
      router.refresh()
    } else {
      alert('Delete failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-xs px-2 py-1 rounded border border-red-300 text-red-600
                 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-60"
    >
      {loading ? '…' : label}
    </button>
  )
}
