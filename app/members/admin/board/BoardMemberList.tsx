'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Member {
  id: number
  name: string
  role: string
  department: string | null
  phone: string | null
  sortOrder: number
}

export default function BoardMemberList({ initialRows }: { initialRows: Member[] }) {
  const [rows, setRows] = useState(initialRows)
  const [moving, setMoving] = useState<number | null>(null)
  const [confirming, setConfirming] = useState<number | null>(null)
  const [deleting, setDeleting] = useState<number | null>(null)

  async function handleDelete(id: number) {
    setDeleting(id)
    try {
      const res = await fetch(`/api/admin/board-members/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setRows((prev) => prev.filter((r) => r.id !== id))
      }
    } finally {
      setDeleting(null)
      setConfirming(null)
    }
  }

  async function move(id: number, direction: 'up' | 'down') {
    setMoving(id)
    try {
      const res = await fetch(`/api/admin/board-members/${id}/move`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction }),
      })
      if (res.ok) {
        setRows((prev) => {
          const next = [...prev]
          const idx = next.findIndex((r) => r.id === id)
          const swapIdx = direction === 'up' ? idx - 1 : idx + 1
          if (swapIdx < 0 || swapIdx >= next.length) return prev
          const tmp = next[idx].sortOrder
          next[idx] = { ...next[idx], sortOrder: next[swapIdx].sortOrder }
          next[swapIdx] = { ...next[swapIdx], sortOrder: tmp }
          return [...next].sort((a, b) => a.sortOrder - b.sortOrder)
        })
      }
    } finally {
      setMoving(null)
    }
  }

  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-forest-900 text-white">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Name</th>
            <th className="px-4 py-3 text-left font-medium">Role</th>
            <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">Type</th>
            <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Phone</th>
            <th className="px-4 py-3 text-left font-medium w-40">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-parchment dark:divide-forest-700">
          {rows.map((m, i) => (
            <tr key={m.id} className="hover:bg-gray-50 dark:hover:bg-forest-800/50">
              <td className="px-4 py-3 font-medium text-forest-900 dark:text-forest-100">{m.name}</td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{m.role}</td>
              <td className="px-4 py-3 text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                {m.department != null ? 'Director' : 'Officer'}
              </td>
              <td className="px-4 py-3 text-gray-500 dark:text-gray-400 hidden md:table-cell">{m.phone ?? '—'}</td>
              <td className="px-4 py-3">
                <div className="flex gap-1 items-center">
                  <button
                    onClick={() => move(m.id, 'up')}
                    disabled={i === 0 || moving === m.id}
                    className="p-1 rounded text-gray-400 hover:text-forest-700 dark:hover:text-forest-300 disabled:opacity-20 disabled:cursor-default transition-colors"
                    title="Move up"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => move(m.id, 'down')}
                    disabled={i === rows.length - 1 || moving === m.id}
                    className="p-1 rounded text-gray-400 hover:text-forest-700 dark:hover:text-forest-300 disabled:opacity-20 disabled:cursor-default transition-colors"
                    title="Move down"
                  >
                    ▼
                  </button>
                  <Link
                    href={`/members/admin/board/${m.id}/edit`}
                    className="text-xs px-2 py-1 rounded border border-forest-300 text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-forest-800/50 transition-colors"
                  >
                    Edit
                  </Link>
                  {confirming === m.id ? (
                    <>
                      <button
                        onClick={() => handleDelete(m.id)}
                        disabled={deleting === m.id}
                        className="text-xs px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-60"
                      >
                        {deleting === m.id ? '…' : 'Yes'}
                      </button>
                      <button
                        onClick={() => setConfirming(null)}
                        className="text-xs px-2 py-1 rounded border border-gray-300 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-forest-800/50 transition-colors"
                      >
                        No
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setConfirming(m.id)}
                      className="text-xs px-2 py-1 rounded border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-gray-400">No board members yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
