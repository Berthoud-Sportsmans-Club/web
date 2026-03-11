import type { Metadata } from 'next'
import ReservoirPhoto from '@/components/ReservoirPhoto'

export const metadata: Metadata = {
  title: 'About the Club',
  description: 'Learn about Berthoud Sportsman\'s Club — our mission, membership, and history.',
}

const stats = [
  { label: 'Member Limit', value: '135' },
  { label: 'Location', value: 'Berthoud, CO' },
  { label: 'Focus', value: 'Loveland Lake' },
  { label: 'Activity', value: 'Year-Round' },
]

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-forest-900 py-16 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            Who We Are
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            About the Club
          </h1>
          <p className="text-forest-300 text-lg leading-relaxed">
            A private sportsman&apos;s club serving the Berthoud community since its founding.
          </p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-gold-500 py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(({ label, value }) => (
              <div key={label}>
                <div className="font-serif text-3xl font-bold text-white">{value}</div>
                <div className="text-gold-100 text-xs uppercase tracking-widest mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-white dark:bg-forest-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Mission */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-forest-900 dark:text-forest-100 mb-4">Our Mission</h2>
                <div className="prose prose-gray max-w-none text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
                  <p>
                    The Berthoud Sportsman&apos;s Club is an organization devoted to offering and
                    supporting recreational opportunities for its members, and to promoting the
                    safe enjoyment of outdoor recreation within the community.
                  </p>
                  <p>
                    Our club focuses on providing access to Loveland Lake for fishing, along with
                    supporting hunting and other outdoor activities in the Berthoud, Colorado area.
                    We are committed to responsible stewardship of our natural resources and
                    fostering a welcoming community for outdoor enthusiasts.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-forest-900 dark:text-forest-100 mb-4">Membership</h2>
                <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
                  <p>
                    Membership in Berthoud Sportsman&apos;s Club is limited to <strong>135 persons</strong>.
                    This cap ensures that our facilities remain well-maintained and that every member
                    has a quality experience on the water and in the field.
                  </p>
                  <p>
                    Interested in joining? Contact us to learn about current availability and
                    the membership application process.
                  </p>
                </div>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-gold-600 hover:text-gold-700 transition-colors"
                >
                  Inquire About Membership &rarr;
                </a>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-forest-900 dark:text-forest-100 mb-4">Activities</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: '🎣', title: 'Fishing', desc: 'Access to Loveland Lake with multiple species including trout, bass, and catfish.' },
                    { icon: '🦆', title: 'Hunting', desc: 'Hunting opportunities coordinated through the club for members in good standing.' },
                    { icon: '📅', title: 'Club Events', desc: 'Annual calendar of events, meetings, and volunteer activities throughout the year.' },
                    { icon: '🤝', title: 'Community', desc: 'A close-knit group of outdoor enthusiasts supporting each other and the Berthoud area.' },
                  ].map(({ icon, title, desc }) => (
                    <div key={title} className="bg-cream dark:bg-forest-800 rounded-xl p-5 border border-parchment dark:border-forest-700">
                      <div className="text-2xl mb-2">{icon}</div>
                      <h3 className="font-semibold text-forest-900 dark:text-forest-100 mb-1">{title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Location card */}
              <div className="card p-6">
                <h3 className="font-serif text-lg font-bold text-forest-900 dark:text-forest-100 mb-4">Location</h3>
                <ReservoirPhoto />
                <address className="not-italic text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <p className="font-medium text-forest-900 dark:text-forest-100">Berthoud Sportsman&apos;s Club, Inc.</p>
                  <p>P.O. Box 1707</p>
                  <p>Berthoud, Colorado 80513</p>
                </address>
              </div>

              {/* Member portal CTA */}
              <div className="bg-forest-900 rounded-xl p-6 text-white">
                <h3 className="font-serif text-lg font-bold mb-2">Current Members</h3>
                <p className="text-forest-300 text-sm leading-relaxed mb-4">
                  Access club documents, the annual calendar, and the latest news in the
                  members portal.
                </p>
                <a
                  href="/members"
                  className="block w-full text-center px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white text-sm font-semibold rounded-md transition-colors"
                >
                  Go to Member Portal
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
