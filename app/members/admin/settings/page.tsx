'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const SETTING_LABELS: Record<string, { label: string; description: string }> = {
  member_code:              { label: 'Member Login Code',           description: 'Passcode members use to access the member portal. Changing this will immediately invalidate all active member sessions.' },
  gate_code_bike_park:      { label: 'Bike Park Electronic Gate',   description: 'Keypad code for the Bike Park electronic gate (after hours & off season).' },
  gate_code_green_emergency:{ label: 'Green Emergency Services Gate', description: 'Lock combination for the green emergency services gate.' },
  gate_code_east:           { label: 'East / Swing Gate Code',      description: 'Combination for the east gates and the green double swing gate.' },
  contact_email:            { label: 'Contact Form Recipient',      description: 'Email address that receives contact form submissions from the website.' },
}

type Setting = { key: string; value: string }

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch('/api/admin/settings')
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
        const rows = (await res.json()) as Setting[]
        if (!cancelled) setSettings(Object.fromEntries(rows.map((r) => [r.key, r.value])))
      } catch {
        if (!cancelled) setError('Failed to load settings. Please refresh the page.')
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  async function handleSave(key: string) {
    setSaving(key)
    setSaved(null)
    setError(null)
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value: settings[key] ?? '' }),
    })
    setSaving(null)
    if (res.ok) {
      setSaved(key)
      setTimeout(() => setSaved(null), 2000)
    } else {
      setError('Failed to save. Please try again.')
    }
  }

  return (
    <div className="bg-cream dark:bg-forest-950 min-h-[calc(100vh-4rem)] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <Link href="/members/admin/dashboard" className="text-sm text-forest-600 dark:text-forest-400 hover:text-gold-600 dark:hover:text-gold-400">
            ← Admin Dashboard
          </Link>
          <h1 className="section-heading mt-2">Site Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage member access codes, gate combinations, and site configuration.</p>
        </div>

        {error && (
          <p className="mb-4 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        <div className="max-w-2xl space-y-4">
          {Object.entries(SETTING_LABELS).map(([key, { label, description }]) => (
            <div key={key} className="card p-6">
              <label className="block text-xs font-semibold text-gold-600 uppercase tracking-wide mb-1">
                {label}
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{description}</p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={settings[key] ?? ''}
                  onChange={(e) => setSettings((prev) => ({ ...prev, [key]: e.target.value }))}
                  className="flex-1 rounded-md border border-parchment dark:border-forest-700 bg-white dark:bg-forest-900 px-3 py-2 text-sm font-mono text-forest-900 dark:text-forest-100 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <button
                  onClick={() => handleSave(key)}
                  disabled={saving === key}
                  className="btn-primary text-sm px-4 py-2 disabled:opacity-60"
                >
                  {saving === key ? 'Saving…' : saved === key ? 'Saved ✓' : 'Save'}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
