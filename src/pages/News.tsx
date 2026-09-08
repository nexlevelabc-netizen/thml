import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NEWS } from '../data/content'
import { CtaBlock, PageHero, Reveal, Tag } from '../components/ui'
import { trpc } from '@/providers/trpc'

const CATS = ['All', 'Company', 'Properties', 'Compliance', 'Projects', 'Careers', 'Events']

export default function News() {
  const [cat, setCat] = useState('All')
  const newsQ = trpc.content.newsPublic.useQuery()
  const eventsQ = trpc.content.eventsPublic.useQuery()
  const mediaQ = trpc.content.eventMediaPublic.useQuery()
  const events = eventsQ.data || []
  const mediaFor = (eventId: number) => (mediaQ.data || []).filter((m) => m.eventId === eventId)
  const items =
    newsQ.data && newsQ.data.length > 0
      ? newsQ.data.map((n) => ({
          slug: n.slug,
          title: n.title,
          category: n.category,
          date: n.date,
          intro: n.excerpt,
          image: n.imageUrl || '/images/ext-townhouses.jpg',
        }))
      : NEWS
  const featured = items[0]
  const list = items.slice(1).filter((n) => cat === 'All' || n.category === cat)

  return (
    <main>
      <PageHero tag="News" title="News and updates" copy="Updates from across THML’s management, compliance, projects and lettings work." />

      {/* Featured */}
      <section className="pt-24 md:pt-32">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <Reveal>
            <Link to={`/news/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-8 overflow-hidden aspect-[16/9] img-zoom">
                <img src={featured.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="lg:col-span-4">
                <p className="label text-[#6e746f]">
                  {featured.date} — {featured.category}
                </p>
                <h2 className="font-display font-bold leading-[1.15] tracking-[-0.015em] mt-5 text-[24px] md:text-[32px] group-hover:text-[#1d6151] transition-colors duration-500">
                  {featured.title}
                </h2>
                <p className="mt-5 text-[15px] leading-[1.75] text-[#4a4f4b]">{featured.intro}</p>
                <p className="tlink mt-6 inline-block">Read article</p>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Archive */}
      <section className="py-24 md:py-32">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <Reveal>
              <Tag label="Archive" />
            </Reveal>
            <Reveal delay={80}>
              <div className="flex flex-wrap gap-x-7 gap-y-2">
                {CATS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`label transition-colors ${cat === c ? 'text-[#1d6151]' : 'text-[#6e746f] hover:text-[#1c1f1d]'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="mt-12">
            {list.map((n, i) => (
              <Reveal key={n.slug} delay={i * 50}>
                <Link
                  to={`/news/${n.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-baseline py-8 border-b border-[#dcd8cd] first:border-t"
                >
                  <p className="md:col-span-2 label text-[#6e746f]">{n.date}</p>
                  <div className="md:col-span-8">
                    <h3 className="font-display font-bold leading-[1.2] tracking-[-0.01em] text-[21px] md:text-[26px] group-hover:text-[#1d6151] group-hover:translate-x-2 transition-all duration-500">
                      {n.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.7] text-[#6e746f] max-w-[620px]">{n.intro}</p>
                  </div>
                  <p className="md:col-span-2 md:text-right">
                    <span className="tlink !text-[11px]">Read article</span>
                  </p>
                </Link>
              </Reveal>
            ))}
            {list.length === 0 && <p className="py-10 text-[15px] text-[#6e746f]">No articles in this category yet.</p>}
          </div>
        </div>
      </section>

      {/* Upcoming events (live from admin) */}
      {events.length > 0 && (
        <section className="py-24 md:py-32 bg-[#1a1a19] text-[#f7f5f0]">
          <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
            <Reveal>
              <Tag label="Upcoming events" dark />
            </Reveal>
            <div className="mt-12">
              {events.map((e, i) => (
                <Reveal key={e.id} delay={i * 60}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 border-b border-[#3f3e3a] first:border-t">
                    <div className="md:col-span-3">
                      <p className="label text-[#a3a099]">{e.date}</p>
                      {e.time && <p className="label text-[#a3a099] mt-2">{e.time}</p>}
                    </div>
                    <div className="md:col-span-9">
                      <h3 className="font-display font-bold leading-[1.2] tracking-[-0.01em] text-[22px] md:text-[28px]">{e.title}</h3>
                      {e.location && <p className="mt-3 label text-[#a3a099]">{e.location}</p>}
                      {e.description && (
                        <p className="mt-4 text-[15px] leading-[1.8] text-[#c9c6bf] max-w-[680px]">{e.description}</p>
                      )}
                      {mediaFor(e.id).length > 0 && (
                        <div className="mt-7 grid grid-cols-2 md:grid-cols-3 gap-4">
                          {mediaFor(e.id).map((m) =>
                            m.kind === 'video' ? (
                              <video key={m.id} src={m.url} controls className="w-full aspect-video object-cover bg-[#0c0c0b]" />
                            ) : (
                              <img key={m.id} src={m.url} alt={m.title} className="w-full aspect-[4/3] object-cover" />
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBlock />
    </main>
  )
}
