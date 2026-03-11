import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Berthoud Sportsman\'s Club.',
}

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-forest-900 py-16 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            Get in Touch
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-forest-300 text-lg leading-relaxed">
            Questions about membership, events, or the club? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 bg-cream dark:bg-forest-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Contact info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-forest-900 dark:text-forest-100 mb-6">
                  Club Information
                </h2>

                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-forest-100 dark:bg-forest-700 flex items-center justify-center shrink-0">
                      <svg className="h-5 w-5 text-forest-700 dark:text-forest-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-forest-900 dark:text-forest-100 mb-0.5">Mailing Address</p>
                      <address className="not-italic text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        Berthoud Sportsman&apos;s Club, Inc.<br />
                        P.O. Box 1707<br />
                        Berthoud, Colorado 80513
                      </address>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-forest-100 dark:bg-forest-700 flex items-center justify-center shrink-0">
                      <svg className="h-5 w-5 text-forest-700 dark:text-forest-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-forest-900 dark:text-forest-100 mb-0.5">Membership</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Membership is limited to 135 persons. Use the form to inquire
                        about current availability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* External resources */}
              <div className="bg-white dark:bg-forest-800 rounded-xl p-6 border border-parchment dark:border-forest-700">
                <h3 className="font-serif text-lg font-bold text-forest-900 dark:text-forest-100 mb-4">
                  Useful Links
                </h3>
                <ul className="space-y-3">
                  {[
                    { label: 'Colorado Parks & Wildlife', href: 'https://cpw.state.co.us' },
                    { label: 'Colorado Fishing Forum', href: 'https://www.coloradofishingforum.com' },
                    { label: 'Berthoud Area Chamber of Commerce', href: 'https://berthoudcolorado.gov' },
                  ].map(({ label, href }) => (
                    <li key={href}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-forest-700 dark:text-forest-300 hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
                      >
                        <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact form */}
            <div className="card p-8">
              <h2 className="font-serif text-2xl font-bold text-forest-900 dark:text-forest-100 mb-6">
                Send a Message
              </h2>
              <form className="space-y-5">
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

                <button
                  type="submit"
                  className="btn-primary w-full justify-center"
                  style={{ background: 'rgb(201 132 32)' }}
                >
                  Send Message
                </button>
                <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                  We&apos;ll get back to you as soon as possible.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
