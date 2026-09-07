import { Link, useParams } from 'react-router-dom'
import { SERVICES } from '../data/content'
import { CtaBlock, PageHero, Reveal, Tag } from '../components/ui'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = SERVICES.find((s) => s.slug === slug) || SERVICES[0]
  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3)

  return (
    <main>
      <PageHero tag={`Services — ${service.no}`} title={service.title} copy={service.intro} image={service.image} />

      {/* Overview */}
      <section className="py-24 md:py-32">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Tag label="Overview" />
            </Reveal>
          </div>
          <div className="lg:col-span-8 max-w-[780px]">
            <Reveal delay={80}>
              <p className="text-[17px] md:text-[19px] leading-[1.85] text-[#3b403c]">{service.overview}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What the service includes */}
      <section className="py-24 md:py-32 bg-[#ece9e1]">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <Reveal>
            <Tag label="What the service includes" />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-14">
            {service.includes.map((inc, i) => (
              <Reveal key={inc.title} delay={(i % 2) * 80}>
                <div className="py-9 border-t border-[#1c1f1d]">
                  <h3 className="font-display font-extrabold uppercase tracking-[-0.01em] text-[21px] md:text-[24px]">{inc.title}</h3>
                  <p className="mt-4 text-[15px] leading-[1.8] text-[#4a4f4b] max-w-[520px]">{inc.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery + who it's for */}
      <section className="py-24 md:py-32">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div>
            <Reveal>
              <Tag label="How THML delivers it" />
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-10 text-[16px] md:text-[17px] leading-[1.85] text-[#4a4f4b] max-w-[560px]">{service.delivery}</p>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <Tag label="Who the service is for" />
            </Reveal>
            <ul className="mt-10">
              {service.forWhom.map((w, i) => (
                <Reveal key={w} delay={i * 60}>
                  <li className="py-5 border-b border-[#dcd8cd] first:border-t font-display font-semibold text-[18px] md:text-[20px]">
                    {w}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="py-24 md:py-32 bg-[#ece9e1]">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <Reveal>
            <Tag label="Related services" />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-8">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 80}>
                <Link to={`/services/${r.slug}`} className="group block">
                  <div className="overflow-hidden aspect-[16/10] img-zoom">
                    <img src={r.image} alt={r.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <p className="label text-[#6e746f] mt-6">{r.no}</p>
                  <h3 className="font-display font-bold text-[21px] mt-2 group-hover:text-[#1d6151] transition-colors">{r.title}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock title={`Discuss your ${service.title.toLowerCase()} requirements`} />
    </main>
  )
}
