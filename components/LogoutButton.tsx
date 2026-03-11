'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/members')
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-gray-500 hover:text-forest-700 underline underline-offset-2"
    >
      Sign out
    </button>
  )
}
