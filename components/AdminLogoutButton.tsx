'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminLogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    await fetch('/api/auth/admin-logout', { method: 'POST' })
    router.push('/members/admin')
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="text-sm px-4 py-2 rounded-md border border-gold-400 text-gold-600 dark:text-gold-400
                 hover:bg-gold-50 dark:hover:bg-gold-900/20 transition-colors disabled:opacity-60"
    >
      {loading ? 'Signing out…' : 'Sign out of admin'}
    </button>
  )
}
