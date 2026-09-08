import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ACCREDITATIONS, COMPANY, NEWS, PROPERTIES, SERVICES } from '../data/content'
import { Btn, CtaBlock, ImgReveal, Reveal, Tag, TLink } from '../components/ui'
import { trpc } from '@/providers/trpc'

export default function Home() {
  const [activeService, setActiveService] = useState(0)
  const newsQ = trpc.content.newsPublic.useQuery()
  const newsItems =
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

  return (
    <main>
      {/* ============ 1. HERO ============ */}
      <section className="pt-[140px] md:pt-[180px] pb-10 md:pb-16">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          <div className="lg:col-span-7 pb-2">
            <Reveal>
              <Tag label="Thames Housing Management Ltd" />
            </Reveal>
            <Reveal delay={100}>
              <h1 className="font-display font-extrabold uppercase leading-[0.95] tracking-[-0.025em] mt-10 text-[48px] md:text-[76px] lg:text-[92px]">
                Property
                <br />
                Management<span className="text-[#1d6151]">.</span>
                <br />
                Compliance<span className="text-[#1d6151]">.</span>
                <br />
                Delivery<span className="text-[#1d6151]">.</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-10 text-[17px] md:text-[19px] leading-[1.7] text-[#4a4f4b] max-w-[560px]">
                Thames Housing Management Ltd provides professional property management, maintenance, compliance, refurbishment and
                letting services.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-12 flex flex-wrap gap-4">
                <Btn to="/services" label="Explore our services" />
                <Btn to="/request-a-quote" label="Request a Quote" variant="outline" />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <ImgReveal src="/images/ext-brick-court.jpg" alt="Managed residential property" className="aspect-[4/5] md:aspect-[4/4] lg:aspect-[4/5]" imgClassName="page-hero-img" />
          </div>
        </div>
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto mt-14 md:mt-20">
          <Reveal>
            <p className="hairline-t pt-6 text-[13px] tracking-[0.04em] text-[#6e746f]">{COMPANY.relationship}</p>
          </Reveal>
        </div>
      </section>

      {/* ============ 2. INTRO STATEMENT ============ */}
      <section className="py-24 md:py-40">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <Reveal>
            <Tag label="Thames Housing Management" />
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display font-bold leading-[1.12] tracking-[-0.02em] mt-12 text-[30px] md:text-[46px] lg:text-[56px] max-w-[1150px]">
              Professional property services built around safety, accountability and long term asset care.
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <Reveal delay={120} className="lg:col-span-6 lg:col-start-1">
              <p className="text-[16px] md:text-[18px] leading-[1.8] text-[#4a4f4b] max-w-[620px]">
                THML operates as the trading subsidiary of 25th Avenue Housing Ltd, delivering management, maintenance and
                compliance services to residential buildings and portfolios across London. Our work is structured, documented and
                accountable — every repair tracked, every certificate filed, every building inspected.
              </p>
            </Reveal>
            <Reveal delay={200} className="lg:col-span-4 lg:col-start-9 flex lg:justify-end items-start">
              <TLink to="/about" label="About THML" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 3. THREE CORE AREAS ============ */}
      <section className="py-24 md:py-36 bg-[#ece9e1]">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <Reveal>
            <Tag label="What we do" />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
            {[
              {
                no: '01',
                title: 'Property Management',
                items: ['Repairs', 'Maintenance', 'Compliance', 'Asset management'],
                img: '/images/ext-fluted-brick.jpg',
                to: '/services/property-management',
              },
              {
                no: '02',
                title: 'Property Ownership and Lettings',
                items: ['Owned properties', 'Availability', 'Lettings', 'Portfolio management'],
                img: '/images/int-living-london.jpg',
                to: '/services/property-lettings',
              },
              {
                no: '03',
                title: 'Contractor Services',
                items: ['Fire safety', 'Electrical', 'Refurbishment', 'Property works'],
                img: '/images/int-refurb-split.jpg',
                to: '/services/fire-safety',
              },
            ].map((p, i) => (
              <Reveal key={p.no} delay={i * 100}>
                <Link to={p.to} className="group block">
                  <div className="overflow-hidden aspect-[4/3] img-zoom">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <p className="label text-[#1d6151] mt-8">{p.no}</p>
                  <h3 className="font-display font-extrabold uppercase leading-[1.05] tracking-[-0.015em] mt-3 text-[26px] md:text-[30px] group-hover:text-[#1d6151] transition-colors duration-500">
                    {p.title}
                  </h3>
                  <ul className="mt-6">
                    {p.items.map((it) => (
                      <li key={it} className="py-3 border-t border-[#dcd8cd] text-[14px] text-[#4a4f4b]">
                        {it}
                      </li>
                    ))}
                  </ul>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. FEATURED SERVICES — hover swaps image ============ */}
      <section className="py-24 md:py-40">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <Reveal>
            <Tag label="Built around the property lifecycle" />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              {SERVICES.map((s, i) => (
                <Reveal key={s.slug} delay={i * 60}>
                  <Link
                    to={`/services/${s.slug}`}
                    onMouseEnter={() => setActiveService(i)}
                    className="service-row group flex items-baseline gap-6 md:gap-10 py-6 md:py-8 border-b border-[#dcd8cd] first:border-t"
                  >
                    <span className={`label transition-colors ${activeService === i ? 'text-[#1d6151]' : 'text-[#6e746f]'}`}>{s.no}</span>
                    <span
                      className={`font-display font-extrabold uppercase tracking-[-0.02em] leading-none text-[26px] md:text-[44px] transition-colors duration-400 ${
                        activeService === i ? 'text-[#1c1f1d]' : 'text-[#a9ada6]'
                      }`}
                    >
                      {s.title}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-[130px] overflow-hidden aspect-[4/5]">
                {SERVICES.map((s, i) => (
                  <img
                    key={s.slug}
                    src={s.image}
                    alt={s.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      activeService === i ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. GROUP RELATIONSHIP ============ */}
      <section className="py-24 md:py-36 bg-[#1a1a19] text-[#f7f5f0]">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <Reveal>
            <Tag label="Our group" dark />
          </Reveal>
          <div className="mt-16 space-y-14 md:space-y-16">
            <Reveal>
              <div>
                <h3 className="font-display font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-[30px] md:text-[48px]">
                  25th Avenue Housing Ltd
                </h3>
                <p className="mt-4 text-[14px] text-[#a3a099]">{COMPANY.parentCharity}</p>
                <p className="text-[14px] text-[#a3a099]">{COMPANY.parentProvider}</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="pl-6 md:pl-14 border-l border-[#2b7a66]">
                <h3 className="font-display font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-[26px] md:text-[40px] text-[#2b7a66]">
                  Thames Housing Management Ltd
                </h3>
                <p className="mt-4 text-[14px] text-[#a3a099]">Wholly owned trading subsidiary</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="pl-6 md:pl-28 flex flex-col md:flex-row md:gap-16 gap-3 text-[15px] md:text-[17px] text-[#c9cdc7]">
                <span>Property Management</span>
                <span>Property Ownership and Lettings</span>
                <span>Contractor Services</span>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <p className="mt-16 max-w-[640px] text-[15px] leading-[1.8] text-[#a3a099]">
              THML’s activities support the wider objectives of the group while operating as a separate trading company.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10">
              <Btn label="Visit 25th Avenue" variant="outline-paper" to={COMPANY.parentUrl} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 6. FEATURED PROPERTIES ============ */}
      <section className="py-24 md:py-40">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <Reveal>
                <Tag label="THML Properties" />
              </Reveal>
              <Reveal delay={80}>
                <h2 className="font-display font-extrabold uppercase leading-[1.0] tracking-[-0.02em] mt-8 text-[34px] md:text-[52px]">
                  A selection of owned
                  <br />
                  and available properties
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <TLink to="/properties" label="View all properties" />
            </Reveal>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
            {PROPERTIES.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <Link to={`/properties/${p.slug}`} className="prop-card group block">
                  <div className="prop-img aspect-[4/3]">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display font-bold text-[21px] tracking-[-0.01em]">{p.title}</h3>
                      <p className="mt-2 text-[13px] text-[#6e746f]">{p.location}</p>
                    </div>
                    <span className={`label shrink-0 mt-1 ${p.availability === 'Available' ? 'text-[#1d6151]' : 'text-[#6e746f]'}`}>
                      {p.availability}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] text-[#6e746f]">{p.type}</p>
                  <p className="tlink mt-5 prop-arrow inline-block">View property</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 7. COMPLIANCE ============ */}
      <section className="py-24 md:py-36 bg-[#ece9e1]">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <Tag label="Compliance and accreditations" />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display font-extrabold uppercase leading-[1.02] tracking-[-0.02em] mt-8 text-[32px] md:text-[44px]">
                Professional standards, presented clearly
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-7 text-[16px] leading-[1.8] text-[#4a4f4b] max-w-[460px]">
                THML maintains current accreditation across the trades we deliver. Supporting documentation is available for every
                entry in the register.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-10">
                <Btn to="/compliance" label="View compliance register" variant="outline" />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            {ACCREDITATIONS.map((a, i) => (
              <Reveal key={a.name} delay={i * 50}>
                <div className="grid grid-cols-12 gap-4 items-baseline py-5 border-b border-[#dcd8cd] first:border-t">
                  <p className="col-span-12 md:col-span-5 font-display font-bold text-[17px]">{a.name}</p>
                  <p className="col-span-6 md:col-span-3 text-[13px] text-[#6e746f]">{a.ref}</p>
                  <p className="col-span-6 md:col-span-2 text-[13px] text-[#1d6151]">{a.status}</p>
                  <p className="col-span-12 md:col-span-2 md:text-right">
                    <TLink to="/compliance" label="Certificate" className="!text-[11px]" />
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 8. LATEST NEWS ============ */}
      <section className="py-24 md:py-40">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <Reveal>
              <Tag label="Latest news" />
            </Reveal>
            <Reveal delay={100}>
              <TLink to="/news" label="All news" />
            </Reveal>
          </div>
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-7">
              <Link to={`/news/${newsItems[0].slug}`} className="group block">
                <div className="overflow-hidden aspect-[16/9] img-zoom">
                  <img src={newsItems[0].image} alt="" className="w-full h-full object-cover" />
                </div>
                <p className="label text-[#6e746f] mt-8">
                  {newsItems[0].date} — {newsItems[0].category}
                </p>
                <h3 className="font-display font-bold leading-[1.15] tracking-[-0.015em] mt-4 text-[24px] md:text-[34px] max-w-[640px] group-hover:text-[#1d6151] transition-colors duration-500">
                  {newsItems[0].title}
                </h3>
                <p className="mt-5 text-[15px] leading-[1.75] text-[#4a4f4b] max-w-[580px]">{newsItems[0].intro}</p>
                <p className="tlink mt-6 inline-block">Read article</p>
              </Link>
            </Reveal>
            <div className="lg:col-span-5 flex flex-col justify-center gap-12">
              {newsItems.slice(1, 3).map((n, i) => (
                <Reveal key={n.slug} delay={i * 100}>
                  <Link to={`/news/${n.slug}`} className="group block border-t border-[#dcd8cd] pt-8">
                    <p className="label text-[#6e746f]">
                      {n.date} — {n.category}
                    </p>
                    <h3 className="font-display font-bold leading-[1.2] tracking-[-0.01em] mt-4 text-[20px] md:text-[24px] group-hover:text-[#1d6151] transition-colors duration-500">
                      {n.title}
                    </h3>
                    <p className="mt-4 text-[14px] leading-[1.7] text-[#6e746f]">{n.intro}</p>
                    <p className="tlink mt-5 inline-block">Read article</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 9. CAREERS PREVIEW ============ */}
      <section className="pb-24 md:pb-40">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <Reveal>
              <Tag label="Careers at THML" />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display font-extrabold uppercase leading-[1.02] tracking-[-0.02em] mt-8 text-[32px] md:text-[48px]">
                Join the team behind well managed homes
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-7 text-[16px] leading-[1.8] text-[#4a4f4b] max-w-[480px]">
                Join a team supporting safe, well managed homes and professional property services.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-10">
                <Btn to="/careers" label="View current vacancies" />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <ImgReveal src="/images/team-office.jpg" alt="THML team at work" className="aspect-[16/10]" />
          </div>
        </div>
      </section>

      {/* ============ 10. FINAL CTA ============ */}
      <CtaBlock />
    </main>
  )
}
