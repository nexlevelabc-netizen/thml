import { ACCREDITATIONS } from '../data/content'
import { CtaBlock, PageHero, Reveal, Tag, TLink } from '../components/ui'

export default function Compliance() {
  return (
    <main>
      <PageHero
        tag="Compliance"
        title="Compliance and accreditations"
        copy="Professional standards and supporting documentation presented clearly. Every accreditation is current, referenced and retrievable."
      />

      <section className="py-24 md:py-32">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <Reveal>
            <Tag label="Accreditation register" />
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

      <section className="py-24 md:py-32 bg-[#ece9e1]">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Tag label="Certificate downloads" />
            </Reveal>
          </div>
          <div className="lg:col-span-8 max-w-[720px]">
            <Reveal delay={80}>
              <p className="text-[16px] md:text-[17px] leading-[1.85] text-[#4a4f4b]">
                Certificates and policy documents are maintained centrally and issued on request. For copies of any accreditation
                certificate, insurance document or policy, contact the THML office and the relevant file will be provided.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-10">
                <TLink to="/contact" label="Request documentation" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBlock title="For further compliance information, contact THML" copy="Our compliance team can provide registers, certificates and inspection records for any building under THML management." />
    </main>
  )
}
