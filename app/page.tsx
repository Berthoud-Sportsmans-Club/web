import Link from 'next/link'

const quickCards = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'About the Club',
    desc: 'Learn about our history, mission, and what makes Berthoud Sportsman\'s Club a special community.',
    href: '/about',
    cta: 'Learn More',
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Identify Your Fish',
    desc: 'Not sure what you caught? Browse our guide to fish species found in and around Loveland Reservoir.',
    href: '/fish',
    cta: 'View Fish Guide',
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Contact Us',
    desc: 'Have questions about membership or upcoming events? Reach out and we\'ll get back to you.',
    href: '/contact',
    cta: 'Get in Touch',
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Members Portal',
    desc: 'Access club forms, the annual calendar, volunteer info, and the latest news from the club.',
    href: '/members',
    cta: 'Member Login',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-forest-900 overflow-hidden">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://sgegjuowuy0xqopl.public.blob.vercel-storage.com/media/loveland-reservoir-drone.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-forest-900/65" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24 md:py-36 text-center">
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Berthoud, Colorado
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Berthoud<br />
            <span className="text-gold-400">Sportsman&apos;s Club</span>
          </h1>
          <p className="text-forest-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            A private sportsman&apos;s club devoted to fishing, hunting, and the safe
            enjoyment of outdoor recreation on Loveland Reservoir and the surrounding
            Colorado Front Range.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/members" className="btn-primary">
              Member Portal
            </Link>
            <Link href="/about" className="btn-outline">
              About the Club
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome split section */}
      <section className="py-16 bg-white dark:bg-forest-900 border-b border-parchment dark:border-forest-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Visitors */}
            <div>
              <div className="inline-flex items-center gap-2 text-gold-600 text-xs font-semibold uppercase tracking-widest mb-3">
                <span className="h-px w-8 bg-gold-400 inline-block" />
                Welcome
              </div>
              <h2 className="section-heading mb-4">Welcome to BSC</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                The Berthoud Sportsman&apos;s Club is an organization devoted to offering
                and supporting recreational opportunities for its members, and to promoting
                the safe enjoyment of outdoor recreation within the community.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Membership is limited to <strong className="text-forest-800 dark:text-forest-200">135 persons</strong>,
                ensuring our lake and facilities remain an intimate, well-maintained
                experience for all members.
              </p>
            </div>

            {/* Members */}
            <div className="bg-forest-50 dark:bg-forest-800 rounded-2xl p-8 border border-forest-100 dark:border-forest-700">
              <div className="inline-flex items-center gap-2 text-forest-600 dark:text-forest-400 text-xs font-semibold uppercase tracking-widest mb-3">
                <span className="h-px w-8 bg-forest-400 inline-block" />
                Current Members
              </div>
              <h2 className="font-serif text-2xl font-bold text-forest-900 dark:text-forest-100 mb-4">
                Member Resources
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                The members portal contains important information about club events,
                activities, rules and regulations, and fishing and hunting updates
                for Loveland Reservoir.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  'Member forms & documents',
                  'Annual club calendar',
                  'Volunteer opportunities',
                  'Club news & announcements',
                  'Rules & regulations',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                    <svg className="h-4 w-4 text-forest-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/members" className="btn-primary w-full justify-center">
                Access Member Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick cards */}
      <section className="py-16 bg-cream dark:bg-forest-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">Explore the Club</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Everything you need to know about Berthoud Sportsman&apos;s Club.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickCards.map(({ icon, title, desc, href, cta }) => (
              <Link key={href} href={href} className="card p-6 flex flex-col group">
                <div className="text-forest-600 dark:text-forest-400 group-hover:text-gold-500 transition-colors mb-4">
                  {icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-forest-900 dark:text-forest-100 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">{desc}</p>
                <span className="mt-4 text-sm font-semibold text-gold-600 group-hover:text-gold-700 transition-colors">
                  {cta} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* External resources banner */}
      <section className="py-12 bg-forest-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl font-bold text-white mb-2">
              Helpful Resources
            </h2>
            <p className="text-forest-300 text-sm">
              Links to Colorado outdoor recreation resources.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {[
              { label: 'Colorado Parks & Wildlife', href: 'https://cpw.state.co.us' },
              { label: 'Colorado Fishing Forum', href: 'https://www.coloradofishingforum.com' },
              { label: 'Berthoud Area Chamber of Commerce', href: 'https://berthoudcolorado.gov' },
              { label: 'BSC on Facebook', href: 'https://www.facebook.com/groups/720890593654375' },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-md border border-forest-600 text-forest-200 text-sm font-medium
                           hover:border-gold-400 hover:text-gold-300 transition-colors text-center"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
