'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/',        label: 'Home' },
  { href: '/about',   label: 'About the Club' },
  { href: '/fish',    label: 'Identify Your Fish' },
  { href: '/contact', label: 'Contact Us' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-forest-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo / Club name */}
          <Link href="/" className="flex flex-col leading-tight group">
            <span className="font-serif text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
              Berthoud Sportsman&apos;s Club
            </span>
            <span className="text-xs text-forest-300 tracking-widest uppercase">
              Est. Berthoud, Colorado
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'bg-forest-700 text-gold-300'
                    : 'text-forest-100 hover:bg-forest-800 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/members"
              className="ml-3 px-4 py-2 rounded-md text-sm font-semibold bg-gold-500 text-white hover:bg-gold-600 transition-colors"
            >
              Members Login
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-forest-200 hover:text-white hover:bg-forest-700 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t border-forest-700 bg-forest-900 px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'bg-forest-700 text-gold-300'
                    : 'text-forest-100 hover:bg-forest-800 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/members"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-2 rounded-md text-sm font-semibold bg-gold-500 text-white hover:bg-gold-600 transition-colors text-center"
            >
              Members Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
