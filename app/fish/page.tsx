import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Identify Your Fish',
  description: 'A guide to fish species found in Loveland Lake and surrounding Colorado Front Range waters.',
}

const fish = [
  {
    name: 'Rainbow Trout',
    scientific: 'Oncorhynchus mykiss',
    description:
      'The most commonly stocked trout in Colorado. Recognized by its vivid pink-to-red lateral stripe and black spots covering the body and fins.',
    features: ['Pink/red lateral stripe', 'Small black spots on body & fins', 'Silver flanks'],
    season: 'Year-round',
    color: 'bg-blue-50 border-blue-100',
    iconColor: 'text-blue-500',
  },
  {
    name: 'Brown Trout',
    scientific: 'Salmo trutta',
    description:
      'A wary and sought-after sport fish. Brown trout have golden-brown flanks with distinctive red and black spots, often ringed with pale halos.',
    features: ['Golden-brown flanks', 'Red & black spots with halos', 'Lighter belly'],
    season: 'Year-round',
    color: 'bg-amber-50 border-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    name: 'Channel Catfish',
    scientific: 'Ictalurus punctatus',
    description:
      'The most abundant catfish species in Colorado. Identified by its deeply forked tail, slender body, and scattered dark spots on younger fish.',
    features: ['Deeply forked tail', 'Whisker-like barbels', 'Spots on juveniles'],
    season: 'Spring – Fall',
    color: 'bg-gray-50 border-gray-200',
    iconColor: 'text-gray-500',
  },
  {
    name: 'Largemouth Bass',
    scientific: 'Micropterus salmoides',
    description:
      'A popular sport fish recognizable by its large mouth extending past the eye and a dark lateral stripe running the length of the body.',
    features: ['Mouth extends past eye', 'Dark horizontal stripe', 'Deep green coloring'],
    season: 'Spring – Fall',
    color: 'bg-green-50 border-green-100',
    iconColor: 'text-green-600',
  },
  {
    name: 'Smallmouth Bass',
    scientific: 'Micropterus dolomieu',
    description:
      'Similar to largemouth but with vertical bars instead of a lateral stripe, and a mouth that does not extend past the eye. Bronze-green in color.',
    features: ['Mouth stops at eye', 'Vertical bars on sides', 'Bronze-green coloring'],
    season: 'Spring – Fall',
    color: 'bg-lime-50 border-lime-100',
    iconColor: 'text-lime-700',
  },
  {
    name: 'Yellow Perch',
    scientific: 'Perca flavescens',
    description:
      'Easy to identify with vivid yellow-green flanks and six to eight dark vertical bars. A schooling fish popular with ice anglers.',
    features: ['Yellow-green flanks', '6–8 dark vertical bars', 'Orange-tinged pelvic fins'],
    season: 'Year-round (great for ice fishing)',
    color: 'bg-yellow-50 border-yellow-100',
    iconColor: 'text-yellow-600',
  },
  {
    name: 'Walleye',
    scientific: 'Sander vitreus',
    description:
      'Named for their large, glassy eyes adapted to low-light conditions. Olive-gold coloring with a distinctive white-tipped lower tail lobe.',
    features: ['Large, glassy eyes', 'Olive-gold flanks', 'White tip on lower tail lobe'],
    season: 'Year-round',
    color: 'bg-orange-50 border-orange-100',
    iconColor: 'text-orange-500',
  },
  {
    name: 'Wiper (Hybrid Striped Bass)',
    scientific: 'Morone chrysops × M. saxatilis',
    description:
      'A stocked hybrid of white bass and striped bass. Aggressive fighters with broken horizontal stripes across silver flanks.',
    features: ['Broken horizontal stripes', 'Silver flanks', 'Stocky, deep body'],
    season: 'Spring – Fall',
    color: 'bg-slate-50 border-slate-200',
    iconColor: 'text-slate-500',
  },
]

export default function FishPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-forest-900 py-16 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            Fish Identification Guide
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Identify Your Fish
          </h1>
          <p className="text-forest-300 text-lg leading-relaxed">
            Common fish species found in Loveland Lake and surrounding
            Colorado Front Range waters.
          </p>
        </div>
      </section>

      {/* Info bar */}
      <section className="bg-gold-500 py-4">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-white text-sm">
            Always check current{' '}
            <a
              href="https://cpw.state.co.us/thingstodo/Pages/FishingRegulations.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-gold-100 transition-colors"
            >
              Colorado fishing regulations
            </a>{' '}
            before keeping your catch. A valid Colorado fishing license is required.
          </p>
        </div>
      </section>

      {/* Fish grid */}
      <section className="py-16 bg-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {fish.map((f) => (
              <div key={f.name} className={`card p-6 border ${f.color}`}>
                {/* Fish icon placeholder */}
                <div className={`${f.iconColor} mb-4`}>
                  <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9 12a2 2 0 114 0 2 2 0 01-4 0z" />
                  </svg>
                </div>

                <h2 className="font-serif text-lg font-bold text-forest-900 mb-0.5">{f.name}</h2>
                <p className="text-xs italic text-gray-400 mb-3">{f.scientific}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{f.description}</p>

                <div className="border-t border-current border-opacity-10 pt-3 space-y-1.5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Key Features</p>
                  {f.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-xs text-gray-600">
                      <svg className="h-3.5 w-3.5 text-forest-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {feat}
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-current border-opacity-10">
                  <span className="text-xs text-gray-500">
                    <span className="font-semibold">Best Season:</span> {f.season}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CPW callout */}
      <section className="py-12 bg-white border-t border-parchment">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-serif text-2xl font-bold text-forest-900 mb-3">
            Need More Help?
          </h2>
          <p className="text-gray-600 mb-6">
            Colorado Parks &amp; Wildlife maintains a comprehensive online fish identification
            tool covering all species found in Colorado waters.
          </p>
          <a
            href="https://cpw.state.co.us/thingstodo/Pages/FishSpecies.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Colorado Fish Species Guide &rarr;
          </a>
        </div>
      </section>
    </>
  )
}
