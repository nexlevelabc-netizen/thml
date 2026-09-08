import { Link, useParams } from 'react-router-dom'
import { VACANCIES } from '../data/content'
import { Btn, CtaBlock, PageHero, Reveal, Tag } from '../components/ui'
import { trpc } from '@/providers/trpc'

const lines = (s?: string | null) => (s ?? '').split('\n').map((x) => x.trim()).filter(Boolean)

export default function Vacancy() {
  const { slug } = useParams()
  const jobsQ = trpc.content.jobsPublic.useQuery()
  const dbJob = jobsQ.data?.find((x) => x.slug === slug)

  const v = dbJob
    ? {
        title: dbJob.title,
        location: dbJob.location,
        type: dbJob.type,
        salary: 'Competitive',
        closing: dbJob.closingDate,
        overview: dbJob.overview || dbJob.summary,
        responsibilities: lines(dbJob.responsibilities),
        requirements: lines(dbJob.requirements),
      }
    : VACANCIES.find((x) => x.slug === slug) || VACANCIES[0]

  return (
    <main>
      <PageHero tag="Careers" title={v.title} copy={v.overview} />

      {/* Summary block */}
      <section className="pt-20 md:pt-24">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-8 border-t border-b border-[#dcd8cd] py-8">
              {[
                ['Location', v.location],
                ['Employment type', v.type],
                ['Salary', v.salary],
                ['Closing date', v.closing],
              ].map(([k, val]) => (
                <div key={k}>
                  <p className="label text-[#6e746f]">{k}</p>
                  <p className="mt-3 text-[15px] font-medium">{val}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <Tag label="Role overview" />
            </Reveal>
            <Reveal delay={60}>
              <p className="mt-8 text-[16px] md:text-[17px] leading-[1.85] text-[#3b403c] max-w-[640px]">{v.overview}</p>
            </Reveal>
            {v.responsibilities.length > 0 && (
              <>
                <Reveal delay={100}>
                  <h2 className="font-display font-extrabold uppercase tracking-[-0.01em] text-[24px] mt-16">Responsibilities</h2>
                </Reveal>
                <ul className="mt-8">
                  {v.responsibilities.map((r, i) => (
                    <Reveal key={r} delay={i * 40}>
                      <li className="flex gap-5 py-5 border-b border-[#dcd8cd] first:border-t text-[15px] text-[#3b403c]">
                        <span className="label text-[#1d6151] shrink-0 pt-[3px]">{String(i + 1).padStart(2, '0')}</span>
                        {r}
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="lg:col-span-5">
            <Reveal>
              <div className="bg-[#ece9e1] p-8 md:p-10">
                {v.requirements.length > 0 && (
                  <>
                    <h2 className="font-display font-extrabold uppercase tracking-[-0.01em] text-[20px]">Requirements</h2>
                    <ul className="mt-6 space-y-4">
                      {v.requirements.map((r) => (
                        <li key={r} className="text-[14px] leading-[1.7] text-[#3b403c] border-b border-[#dcd8cd] pb-4 last:border-b-0">
                          {r}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <h2 className="font-display font-extrabold uppercase tracking-[-0.01em] text-[20px] mt-12">How to apply</h2>
                <p className="mt-5 text-[14px] leading-[1.75] text-[#4a4f4b]">
                  Send your CV and a short covering note to careers@thml.org.uk quoting the role title. Applications close{' '}
                  {v.closing}.
                </p>
                <div className="mt-8">
                  <Btn to="/contact" label="Apply now" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <Link to="/careers" className="tlink">
            Back to careers
          </Link>
        </div>
      </section>

      <CtaBlock />
    </main>
  )
}
