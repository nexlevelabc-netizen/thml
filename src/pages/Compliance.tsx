import { ACCREDITATIONS } from '../data/content'
import { CtaBlock, PageHero, Reveal, Tag, TLink } from '../components/ui'
import { trpc } from '@/providers/trpc'

export default function Compliance() {
  const docsQ = trpc.content.documentsPublic.useQuery()
  const docs = docsQ.data || []
  return (
    <main>
      <PageHero
        tag="Compliance & Accreditations"
        title="Compliance & Accreditations"
        copy="We work in people's homes, so getting safety and compliance right is not optional. This page sets out the standards we work to, the accreditations we hold and how we manage health and safety."
      />

      <section className="py-24 md:py-32">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <Reveal>
            <Tag label="Our accreditations and memberships" />
          </Reveal>
          <div className="mt-12">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-5 label text-[#6e746f] border-b border-[#1c1f1d]">
              <p className="col-span-5">Accreditation</p>
              <p className="col-span-3">Reference</p>
              <p className="col-span-2">Status</p>
              <p className="col-span-2 text-right">Document</p>
            </div>
            {ACCREDITATIONS.map((a, i) => (
              <Reveal key={a.name} delay={i * 50}>
                <div className="grid grid-cols-12 gap-4 items-baseline py-7 border-b border-[#dcd8cd]">
                  <p className="col-span-12 md:col-span-5 font-display font-bold text-[19px] md:text-[21px]">{a.name}</p>
                  <p className="col-span-6 md:col-span-3 text-[14px] text-[#6e746f]">{a.ref}</p>
                  <p className="col-span-6 md:col-span-2 text-[14px] text-[#1d6151]">{a.status}</p>
                  <p className="col-span-12 md:col-span-2 md:text-right">
                    <TLink to="/contact" label="Download" className="!text-[11px]" />
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {docs.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
            <Reveal>
              <Tag label="Documents" />
            </Reveal>
            <div className="mt-12">
              <div className="hidden md:grid grid-cols-12 gap-4 pb-5 label text-[#6e746f] border-b border-[#1c1f1d]">
                <p className="col-span-5">Document</p>
                <p className="col-span-3">Category</p>
                <p className="col-span-2">File</p>
                <p className="col-span-2 text-right">Download</p>
              </div>
              {docs.map((d, i) => (
                <Reveal key={d.id} delay={i * 50}>
                  <div className="grid grid-cols-12 gap-4 items-baseline py-7 border-b border-[#dcd8cd]">
                    <p className="col-span-12 md:col-span-5 font-display font-bold text-[19px] md:text-[21px]">{d.title}</p>
                    <p className="col-span-6 md:col-span-3 text-[14px] text-[#6e746f]">{d.category}</p>
                    <p className="col-span-6 md:col-span-2 text-[14px] text-[#6e746f]">
                      {d.fileName}
                      {d.fileSize ? ` · ${d.fileSize}` : ''}
                    </p>
                    <p className="col-span-12 md:col-span-2 md:text-right">
                      <a href={d.fileUrl} target="_blank" rel="noreferrer" download={d.fileName} className="tlink !text-[11px]">
                        Download
                      </a>
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 md:py-32 bg-[#ece9e1]">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Tag label="Our approach to health and safety" />
            </Reveal>
          </div>
          <div className="lg:col-span-8 max-w-[720px]">
            <Reveal delay={80}>
              <p className="text-[16px] md:text-[17px] leading-[1.85] text-[#4a4f4b]">
                Our directors are responsible for health and safety across the company. We have a written health and safety
                policy which is reviewed every year, and every member of staff and every contractor we use is expected to follow it.
              </p>
              <div className="mt-8 space-y-3">
                <p className="text-[14px] leading-[1.8] text-[#4a4f4b]">Risk assessments and method statements for every job</p>
                <p className="text-[14px] leading-[1.8] text-[#4a4f4b]">Qualified, competent staff working in residents' homes</p>
                <p className="text-[14px] leading-[1.8] text-[#4a4f4b]">Only accredited contractors on our approved list, with insurance and qualifications checked</p>
                <p className="text-[14px] leading-[1.8] text-[#4a4f4b]">Regular training, including asbestos awareness, working at height and fire safety</p>
                <p className="text-[14px] leading-[1.8] text-[#4a4f4b]">Proper personal protective equipment and safe systems of work</p>
                <p className="text-[14px] leading-[1.8] text-[#4a4f4b]">Accidents and near misses recorded, investigated and learned from</p>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-10">
                <TLink to="/contact" label="Request documentation" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBlock
        title="Landlord compliance we deliver"
        copy="Annual gas safety checks, electrical installation condition reports, fire risk assessments, fire alarm and emergency lighting checks, Legionella risk assessments, asbestos surveys, lift servicing and LOLER inspections, smoke and carbon monoxide alarms, and energy performance certificates — all in date, all recorded."
      />
    </main>
  )
}
