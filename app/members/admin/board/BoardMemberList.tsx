'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import DeleteButton from '@/components/DeleteButton'

interface Member {
  id: number
  name: string
  role: string
  department: string | null
  phone: string | null
  sortOrder: number
}

export default function BoardMemberList({ initialRows }: { initialRows: Member[] }) {
  const router = useRouter()
  const [moving, setMoving] = useState<number | null>(null)

  async function move(id: number, direction: 'up' | 'down') {
    setMoving(id)
    try {
      await fetch(`/api/admin/board-members/${id}/move`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction }),
      })
      router.refresh()
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
            <th className="px-4 py-3 text-left font-medium w-36">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-parchment dark:divide-forest-700">
          {initialRows.map((m, i) => (
            <tr key={m.id} className="hover:bg-gray-50 dark:hover:bg-forest-800/50">
              <td className="px-4 py-3 font-medium text-forest-900 dark:text-forest-100">{m.name}</td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{m.role}</td>
              <td className="px-4 py-3 text-gray-500 dark:text-gray-400 hidden sm:table-cell">{m.department != null ? 'Director' : 'Officer'}</td>
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
                    disabled={i === initialRows.length - 1 || moving === m.id}
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
                  <DeleteButton url={`/api/admin/board-members/${m.id}`} />
                </div>
              </td>
            </tr>
          ))}
          {initialRows.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-gray-400">No board members yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
