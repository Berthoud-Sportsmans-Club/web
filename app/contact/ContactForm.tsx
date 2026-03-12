'use client'

import { useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setStatus('submitting')

    const form = e.currentTarget
    const data = {
      firstName: (form.elements.namedItem('firstName') as HTMLInputElement).value.trim(),
      lastName: (form.elements.namedItem('lastName') as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
      subject: (form.elements.namedItem('subject') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim(),
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        const body = await res.json()
        setError(body.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="card p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-forest-100 dark:bg-forest-700 flex items-center justify-center">
            <svg className="h-6 w-6 text-forest-700 dark:text-forest-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 className="font-serif text-2xl font-bold text-forest-900 dark:text-forest-100 mb-2">
          Message Sent
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
          Thank you for reaching out. We&apos;ll get back to you as soon as possible.
        </p>
        <button
          onClick={() => { setStatus('idle'); setError('') }}
          className="btn-primary justify-center"
          style={{ background: 'rgb(201 132 32)' }}
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <div className="card p-8">
      <h2 className="font-serif text-2xl font-bold text-forest-900 dark:text-forest-100 mb-6">
        Send a Message
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Honeypot — hidden from real users */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className="w-full rounded-md border border-gray-200 dark:border-forest-600 px-3 py-2 text-sm
                         bg-white dark:bg-forest-700 text-gray-900 dark:text-gray-100
                         focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className="w-full rounded-md border border-gray-200 dark:border-forest-600 px-3 py-2 text-sm
                         bg-white dark:bg-forest-700 text-gray-900 dark:text-gray-100
                         focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-md border border-gray-200 dark:border-forest-600 px-3 py-2 text-sm
                       bg-white dark:bg-forest-700 text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            required
            className="w-full rounded-md border border-gray-200 dark:border-forest-600 px-3 py-2 text-sm
                       bg-white dark:bg-forest-700 text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent"
          >
            <option value="">Select a topic…</option>
            <option value="membership">Membership Inquiry</option>
            <option value="events">Events & Calendar</option>
            <option value="general">General Question</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full rounded-md border border-gray-200 dark:border-forest-600 px-3 py-2 text-sm
                       bg-white dark:bg-forest-700 text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent resize-none"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: 'rgb(201 132 32)' }}
        >
          {status === 'submitting' ? 'Sending…' : 'Send Message'}
        </button>
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
          We&apos;ll get back to you as soon as possible.
        </p>
      </form>
    </div>
  )
}
