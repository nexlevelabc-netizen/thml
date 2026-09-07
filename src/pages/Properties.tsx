import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PROPERTIES } from '../data/content'
import { CtaBlock, PageHero, Reveal, Tag } from '../components/ui'

export default function Properties() {
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('All locations')
  const [type, setType] = useState('All types')
  const [availability, setAvailability] = useState('Any availability')
  const [applied, setApplied] = useState({ keyword: '', location: 'All locations', type: 'All types', availability: 'Any availability' })

  const locations = useMemo(() => ['All locations', ...Array.from(new Set(PROPERTIES.map((p) => p.location)))], [])
  const types = useMemo(() => ['All types', ...Array.from(new Set(PROPERTIES.map((p) => p.type)))], [])

  const results = PROPERTIES.filter((p) => {
    const k = applied.keyword.toLowerCase()
    if (k && !`${p.title} ${p.location} ${p.type}`.toLowerCase().includes(k)) return false
    if (applied.location !== 'All locations' && p.location !== applied.location) return false
    if (applied.type !== 'All types' && p.type !== applied.type) return false
    if (applied.availability !== 'Any availability' && p.availability !== applied.availability) return false
    return true
  })

  return (
    <main>
      <PageHero tag="Properties" title="Owned and available properties" copy="A portfolio of THML owned homes, presented with clear details, documentation and availability." />

      {/* Search and filters */}
      <section className="pt-24 md:pt-32">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <Reveal>
            <Tag label="Property search" />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-10 gap-y-8 items-end border-t border-[#dcd8cd] pt-10">
              <div className="field">
                <label>Keyword</label>
                <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Search by name or area" />
              </div>
              <div className="field">
                <label>Location</label>
                <select value={location} onChange={(e) => setLocation(e.target.value)}>
                  {locations.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Property type</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  {types.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Availability</label>
                <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
                  {['Any availability', 'Available', 'Coming Soon', 'Let'].map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setApplied({ keyword, location, type, availability })}
                className="btn btn-solid w-full"
              >
                <span className="swap">
                  <span>Show results</span>
                  <span aria-hidden>Show results</span>
                </span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Listing */}
      <section className="py-20 md:py-28">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <p className="label text-[#6e746f]">{results.length} {results.length === 1 ? 'property' : 'properties'}</p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
            {results.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 80}>
                <Link to={`/properties/${p.slug}`} className="prop-card group block">
                  <div className="prop-img aspect-[4/3]">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-4">
                    <h3 className="font-display font-bold text-[21px] tracking-[-0.01em]">{p.title}</h3>
                    <span className={`label shrink-0 mt-1 ${p.availability === 'Available' ? 'text-[#1d6151]' : 'text-[#6e746f]'}`}>
                      {p.availability}
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] text-[#6e746f]">
                    {p.location} — {p.type}
                  </p>
                  <p className="tlink mt-5 prop-arrow inline-block">View property</p>
                </Link>
              </Reveal>
            ))}
          </div>
          {results.length === 0 && (
            <p className="mt-10 text-[16px] text-[#6e746f]">No properties match your search. Adjust the filters and show results again.</p>
          )}
        </div>
      </section>

      <CtaBlock title="Need help finding the right property" copy="Tell us what you are looking for and the THML lettings team will contact you when a suitable property becomes available." />
    </main>
  )
}
