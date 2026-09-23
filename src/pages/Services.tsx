import { Link } from 'react-router-dom'
import { SERVICES } from '../data/content'
import { CtaBlock, PageHero, Reveal, TLink } from '../components/ui'

export default function Services() {
  return (
    <main>
      <PageHero
        tag="Our Services"
        title="Our Services"
        copy="We offer a complete property service, from day-to-day management to major refurbishment. Our team works with charities, housing providers, private landlords and public bodies. Whether you need one repair or a full management service, we can help."
      />
      <section className="py-24 md:py-36">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto space-y-24 md:space-y-36">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug}>
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center`}>
                <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Link to={`/services/${s.slug}`} className="block overflow-hidden img-zoom aspect-[16/10]">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
                  </Link>
                </div>
                <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <p className="label text-[#1d6151]">{s.no}</p>
                  <h2 className="font-display font-extrabold uppercase leading-[1.02] tracking-[-0.02em] mt-4 text-[30px] md:text-[42px]">
                    {s.title}
                  </h2>
                  <p className="mt-6 text-[16px] leading-[1.8] text-[#4a4f4b] max-w-[460px]">{s.intro}</p>
                  <div className="mt-8">
                    <TLink to={`/services/${s.slug}`} label="Find out more" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBlock />
    </main>
  )
}
