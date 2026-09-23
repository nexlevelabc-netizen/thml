import { Link } from 'react-router-dom'
import { VACANCIES } from '../data/content'
import { CtaBlock, ImgReveal, PageHero, Reveal, Tag, TLink } from '../components/ui'
import { trpc } from '@/providers/trpc'

export default function Careers() {
  const jobsQ = trpc.content.jobsPublic.useQuery()
  const vacancies =
    jobsQ.data && jobsQ.data.length > 0
      ? jobsQ.data.map((j) => ({
          slug: j.slug,
          title: j.title,
          location: j.location,
          type: j.type,
          closing: j.closingDate,
        }))
      : VACANCIES
  return (
    <main>
      <PageHero tag="Careers" title="Work with purpose" copy="We are a growing property team based in Woolwich. We manage, maintain and let homes across London, and our profits support the charity Twenty-Fifth Avenue Ltd. If you want your skills to make a difference, we would like to hear from you." image="/images/team-office.jpg" />

      {/* Why work with THML */}
      <section className="py-24 md:py-32">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Tag label="Why work with us" />
            </Reveal>
          </div>
          <div className="lg:col-span-8 max-w-[760px]">
            <Reveal delay={80}>
              <p className="font-display font-medium text-[22px] md:text-[30px] leading-[1.4] tracking-[-0.01em]">
                Why work with us
              </p>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-8 space-y-4">
                <p className="text-[16px] leading-[1.85] text-[#4a4f4b]">Meaningful work – the homes you look after house people who need a stable start.</p>
                <p className="text-[16px] leading-[1.85] text-[#4a4f4b]">Variety – repairs, compliance, refurbishment and lettings across a growing portfolio.</p>
                <p className="text-[16px] leading-[1.85] text-[#4a4f4b]">Training and development – we invest in qualifications and support progression.</p>
                <p className="text-[16px] leading-[1.85] text-[#4a4f4b]">A supportive team – part of the wider Twenty-Fifth Avenue group.</p>
              </div>
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
            {vacancies.map((v, i) => (
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
              <Tag label="No vacancies?" />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display font-extrabold uppercase leading-[1.05] tracking-[-0.02em] mt-8 text-[28px] md:text-[38px]">
                No vacancies right now
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 text-[15px] leading-[1.8] text-[#4a4f4b] max-w-[440px]">
                We do not have any vacancies at the moment, but we are always interested in hearing from experienced
                tradespeople and property professionals. Send your CV to hr@25thavenue.org and we will keep it on file.
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

      <CtaBlock
        title="How to apply"
        copy="Click Apply Now on the vacancy you are interested in and send us your CV and a short covering email. Applications go to hr@25thavenue.org. We will acknowledge every application and let you know the outcome. We are an equal opportunities employer. Roles that involve working in residents' homes are subject to a DBS check."
      />
    </main>
  )
}
