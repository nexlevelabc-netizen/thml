import { Link } from 'react-router-dom'
import { VACANCIES } from '../data/content'
import { CtaBlock, ImgReveal, PageHero, Reveal, Tag, TLink } from '../components/ui'

export default function Careers() {
  return (
    <main>
      <PageHero tag="Careers" title="Careers at THML" copy="Explore current opportunities with THML." image="/images/team-office.jpg" />

      {/* Why work with THML */}
      <section className="py-24 md:py-32">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Tag label="Why work with THML" />
            </Reveal>
          </div>
          <div className="lg:col-span-8 max-w-[760px]">
            <Reveal delay={80}>
              <p className="font-display font-medium text-[22px] md:text-[30px] leading-[1.4] tracking-[-0.01em]">
                Join a team supporting safe, well managed homes and professional property services.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-8 text-[16px] leading-[1.85] text-[#4a4f4b]">
                THML is a growing property services company within the 25th Avenue group. Our people manage buildings, deliver
                works programmes and keep compliance in date — work that directly affects the quality and safety of people’s
                homes. We offer defined responsibility, professional development and the standards of a structured, accountable
                organisation.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vacancies */}
      <section className="py-24 md:py-32 bg-[#ece9e1]">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <Reveal>
            <Tag label="Current vacancies" />
          </Reveal>
          <div className="mt-12">
            {VACANCIES.map((v, i) => (
              <Reveal key={v.slug} delay={i * 60}>
                <Link
                  to={`/careers/${v.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-baseline py-9 border-b border-[#dcd8cd] first:border-t"
                >
                  <h3 className="md:col-span-5 font-display font-extrabold uppercase tracking-[-0.01em] text-[22px] md:text-[26px] group-hover:text-[#1d6151] group-hover:translate-x-2 transition-all duration-500">
                    {v.title}
                  </h3>
                  <p className="md:col-span-2 text-[13px] text-[#6e746f]">{v.location}</p>
                  <p className="md:col-span-2 text-[13px] text-[#6e746f]">{v.type}</p>
                  <p className="md:col-span-2 text-[13px] text-[#6e746f]">Closing {v.closing}</p>
                  <p className="md:col-span-1 md:text-right">
                    <span className="tlink !text-[11px]">View vacancy</span>
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <ImgReveal src="/images/team-meeting.jpg" alt="THML team" className="aspect-[16/10]" />
          </div>
          <div className="lg:col-span-6 lg:pl-8">
            <Reveal>
              <Tag label="Speculative applications" />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display font-extrabold uppercase leading-[1.05] tracking-[-0.02em] mt-8 text-[28px] md:text-[38px]">
                Don’t see the right role
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 text-[15px] leading-[1.8] text-[#4a4f4b] max-w-[440px]">
                We welcome speculative applications from property, compliance and trades professionals. Send your details and we
                will keep them on file for future vacancies.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-8">
                <TLink to="/contact" label="Contact THML" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBlock title="Apply to join THML" copy="Review the current vacancies above, or contact the team about working with THML." />
    </main>
  )
}
