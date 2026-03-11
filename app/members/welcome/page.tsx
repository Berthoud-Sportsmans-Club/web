import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Welcome – BSC Members' }

export default function WelcomePage() {
  return (
    <div className="bg-cream min-h-[calc(100vh-4rem)] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <Link href="/members/dashboard" className="text-sm text-forest-600 hover:text-gold-600">
            ← Dashboard
          </Link>
          <h1 className="section-heading mt-2">Welcome, Members</h1>
        </div>

        <div className="prose prose-gray max-w-3xl space-y-6">

          <div className="card p-6">
            <h2 className="font-serif text-xl font-bold text-forest-900 mb-3">Membership Card</h2>
            <p className="text-gray-700">
              Each member shall have a new card by the end of May.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="font-serif text-xl font-bold text-forest-900 mb-3">Annual Dues</h2>
            <p className="text-gray-700">
              Your yearly dues are due no later than <strong>May 10th</strong>. Dues received after
              that time will be rejected. Those whose dues are not paid shall be automatically
              dropped from membership in the Club.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="font-serif text-xl font-bold text-forest-900 mb-3">Participation Requirement</h2>
            <p className="text-gray-700">
              All club members are required to participate in at least one of the Club&apos;s
              spring or fall clean-up dates, serve on or participate in other Club committees or
              activities, or arrange to provide another service to the Club during each fiscal year
              (April 1 to March 31).
            </p>
            <p className="text-gray-700 mt-3">
              A charge of <strong>$30</strong> will be assessed to all members who fail to comply
              with this participation policy. This charge must be paid prior to being eligible to
              renew a club membership for the following year. Exceptions will be granted to Club
              members with health or age problems or other reasonable circumstances as determined
              by the Executive Board.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="font-serif text-xl font-bold text-forest-900 mb-3">Boat Registration</h2>
            <p className="text-gray-700">
              You must have a boat registration sticker on all watercraft left on lake premises.
            </p>
            <p className="text-gray-700 mt-3">
              As approved at the March 8, 2016 Club meeting: any identifiable boat stored at the
              lake without a current Club ID sticker after <strong>June 31st</strong> of each year,
              the member owning that boat will be assessed a <strong>$50 noncompliance fee</strong>,
              which must be paid prior to renewing Club membership. Any such boat remaining without
              current identification for an additional 30 days will be treated as an unidentifiable
              boat and removed from the lake. In such case the owning member forfeits his right to
              Club membership.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="font-serif text-xl font-bold text-forest-900 mb-3">General Reminders</h2>
            <ul className="space-y-2 text-gray-700">
              <li>All functions (Club Picnic, etc.) are for members and immediate family only — no guests.</li>
              <li>Please refrain from putting up &quot;For Sale&quot; signs on parked watercraft at the lake.</li>
              <li>Please review the{' '}
                <Link href="/members/violations" className="text-forest-600 hover:text-gold-600 underline">
                  Rule Violation Policy
                </Link>{' '}(updated August 11, 2017).
              </li>
              <li>
                To receive club news by email, use our{' '}
                <Link href="/contact" className="text-forest-600 hover:text-gold-600 underline">
                  Contact page
                </Link>{' '}
                and request to be placed on the notification list.
              </li>
            </ul>
          </div>

          <div className="card p-6">
            <h2 className="font-serif text-xl font-bold text-forest-900 mb-3">Member Handbook</h2>
            <p className="text-gray-700">
              Please read your membership handbook. There is good information covering membership
              responsibilities, officer duties, and club bylaws. Familiarize yourself with the
              rules of conduct — you may need to read it more than once.
            </p>
            <p className="text-gray-700 mt-3">
              The handbook is available as a PDF in the{' '}
              <Link href="/members/documents" className="text-forest-600 hover:text-gold-600 underline">
                Documents section
              </Link>.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
