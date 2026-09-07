import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ACCREDITATIONS, NEWS, PROPERTIES, SERVICES, VACANCIES } from '../data/content'

const SUGGESTED = ['Fire Safety', 'Electrical Compliance', 'Available Properties', 'Current Vacancies', 'Refurbishment', 'Certificates']

interface ResultItem {
  group: string
  label: string
  to: string
}

const INDEX: ResultItem[] = [
  ...SERVICES.map((s) => ({ group: 'Services', label: s.title, to: `/services/${s.slug}` })),
  ...PROPERTIES.map((p) => ({ group: 'Properties', label: `${p.title} — ${p.location}`, to: `/properties/${p.slug}` })),
  ...NEWS.map((n) => ({ group: 'News', label: n.title, to: `/news/${n.slug}` })),
  ...VACANCIES.map((v) => ({ group: 'Careers', label: v.title, to: `/careers/${v.slug}` })),
  { group: 'Documents', label: 'Complaints policy', to: '/complaints' },
  { group: 'Documents', label: 'Privacy notice', to: '/privacy' },
  { group: 'Documents', label: 'Certificate downloads', to: '/compliance' },
  ...ACCREDITATIONS.map((a) => ({ group: 'Compliance', label: a.name, to: '/compliance' })),
]

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      setQ('')
      setTimeout(() => inputRef.current?.focus(), 350)
    } else {
      document.body.style.overflow = ''
    }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  const results = useMemo(() => {
    if (!q.trim()) return null
    const needle = q.toLowerCase()
    const hits = INDEX.filter((i) => i.label.toLowerCase().includes(needle) || i.group.toLowerCase().includes(needle))
    const groups: Record<string, ResultItem[]> = {}
    hits.forEach((h) => {
      groups[h.group] = groups[h.group] || []
      groups[h.group].push(h)
    })
    return groups
  }, [q])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] bg-[#f7f5f0] overlay-enter overflow-y-auto">
      <div className="min-h-full flex flex-col px-6 md:px-8">
        <div className="flex items-center justify-between h-[92px] shrink-0">
          <img src="/images/logo-horizontal.png" alt="THML" className="h-10 w-auto" />
          <button onClick={onClose} className="navlink">
            Close
          </button>
        </div>

        <div className="max-w-[1100px] w-full mx-auto flex-1 pt-8 md:pt-16 pb-20">
          <p className="label text-[#6e746f]">Search THML</p>
          <div className="mt-8 border-b-2 border-[#1c1f1d]">
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search properties, services, news, careers or documents"
              className="w-full bg-transparent outline-none font-display font-bold text-[26px] md:text-[44px] tracking-[-0.01em] py-4 placeholder:text-[#b9bdb6]"
            />
          </div>

          {!results && (
            <div className="mt-14">
              <p className="label text-[#6e746f]">Suggested searches</p>
              <div className="mt-7 flex flex-wrap gap-x-10 gap-y-4">
                {SUGGESTED.map((s) => (
                  <button key={s} onClick={() => setQ(s)} className="tlink !text-[14px] text-[#1c1f1d]">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results && (
            <div className="mt-14">
              {Object.keys(results).length === 0 && <p className="text-[#6e746f] text-[16px]">No results for “{q}”. Try one of the suggested searches.</p>}
              {Object.entries(results).map(([group, items]) => (
                <div key={group} className="mb-12">
                  <p className="label text-[#1d6151]">{group}</p>
                  <div className="mt-4">
                    {items.map((i) => (
                      <Link
                        key={i.to + i.label}
                        to={i.to}
                        onClick={onClose}
                        className="group block py-4 border-b border-[#dcd8cd] font-display text-[18px] md:text-[22px] font-semibold hover:pl-4 transition-all duration-400"
                      >
                        {i.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
