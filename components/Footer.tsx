import Link from 'next/link'

const quickLinks = [
  { href: '/',        label: 'Home' },
  { href: '/about',   label: 'About the Club' },
  { href: '/fish',    label: 'Identify Your Fish' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/members', label: 'Members Login' },
]

const externalLinks = [
  { href: 'https://cpw.state.co.us', label: 'Colorado Parks & Wildlife' },
  { href: 'https://www.coloradofishingforum.com', label: 'Colorado Fishing Forum' },
  { href: 'https://berthoudcolorado.gov', label: 'Berthoud Area Chamber of Commerce' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-forest-950 text-forest-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {/* Club info */}
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-3">
              Berthoud Sportsman&apos;s Club
            </h3>
            <p className="text-sm text-forest-300 leading-relaxed mb-4">
              Devoted to offering recreational opportunities for members and promoting
              the safe enjoyment of outdoor recreation within the community.
            </p>
            <address className="not-italic text-sm text-forest-300 space-y-1">
              <p>Berthoud Sportsman&apos;s Club, Inc.</p>
              <p>P.O. Box 1707</p>
              <p>Berthoud, Colorado 80513</p>
            </address>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-forest-400 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-forest-300 hover:text-gold-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-forest-400 mb-3">
              Resources
            </h3>
            <ul className="space-y-2">
              {externalLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-forest-300 hover:text-gold-400 transition-colors inline-flex items-center gap-1"
                  >
                    {label}
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-forest-800 pt-6 text-center text-xs text-forest-500">
          &copy; {year} Berthoud Sportsman&apos;s Club, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
