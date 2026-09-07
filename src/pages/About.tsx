import { BOARD, COMPANY } from '../data/content'
import { Btn, CtaBlock, PageHero, Reveal, Tag } from '../components/ui'

export default function About() {
  return (
    <main>
      <PageHero
        tag="About THML"
        title="A professional property company with a charitable purpose behind it"
        copy="Thames Housing Management Ltd delivers property management, maintenance, compliance, refurbishment and lettings — operating commercially, with every surplus supporting the work of 25th Avenue Housing Ltd."
        image="/images/ext-courtyard.jpg"
      />

      {/* Who we are */}
      <section className="py-24 md:py-36">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Tag label="Who we are" />
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={80}>
              <p className="font-display font-medium text-[24px] md:text-[32px] leading-[1.4] tracking-[-0.01em] max-w-[820px]">
                THML is a property services company formed to bring commercial discipline to housing management. We manage
                buildings, deliver compliance programmes, carry out refurbishment works and let our own portfolio of homes.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-10 text-[16px] md:text-[17px] leading-[1.85] text-[#4a4f4b] max-w-[720px]">
                We exist for a simple reason: well managed buildings protect people and protect value. Our teams coordinate
                repairs, keep statutory compliance in date, plan maintenance around the lifecycle of each asset, and present every
                property to a documented standard. As a trading subsidiary, our surpluses are directed to our parent charity,
                25th Avenue Housing Ltd, supporting its wider housing objectives.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-24 md:py-32 bg-[#ece9e1]">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <Reveal>
            <Tag label="What we do" />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {[
              { t: 'Property Management', d: 'Repairs coordination, planned maintenance, compliance support, asset management, contractor coordination and operational reporting.' },
              { t: 'Property Ownership and Lettings', d: 'A growing portfolio of THML owned properties, let and managed in house with clear availability and a transparent process.' },
              { t: 'Contractor Services', d: 'Fire safety, electrical compliance and refurbishment works delivered through accredited contractors and managed standards.' },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 90}>
                <div className="border-t border-[#1c1f1d] pt-8">
                  <h3 className="font-display font-extrabold uppercase tracking-[-0.01em] text-[22px] md:text-[24px]">{x.t}</h3>
                  <p className="mt-5 text-[15px] leading-[1.8] text-[#4a4f4b]">{x.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Relationship */}
      <section className="py-24 md:py-36">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Tag label="Our relationship with 25th Avenue" />
            </Reveal>
          </div>
          <div className="lg:col-span-8 max-w-[760px]">
            <Reveal delay={80}>
              <p className="text-[16px] md:text-[17px] leading-[1.85] text-[#4a4f4b]">
                {COMPANY.name} is a wholly owned trading subsidiary of {COMPANY.parent}, a registered charity and Registered
                Provider of Social Housing. THML trades commercially and is managed by its own board, while its activities support
                the charitable objectives of the group.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-12 border border-[#dcd8cd] p-8 md:p-12">
                <p className="font-display font-extrabold uppercase text-[22px] md:text-[28px] tracking-[-0.01em]">{COMPANY.parent}</p>
                <p className="mt-3 text-[13px] text-[#6e746f]">{COMPANY.parentCharity}</p>
                <p className="text-[13px] text-[#6e746f]">{COMPANY.parentProvider}</p>
                <div className="my-8 h-px bg-[#dcd8cd] w-24" />
                <p className="font-display font-extrabold uppercase text-[18px] md:text-[22px] tracking-[-0.01em] text-[#1d6151]">
                  {COMPANY.name}
                </p>
                <p className="mt-3 text-[13px] text-[#6e746f]">Wholly owned trading subsidiary</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-10 text-[15px] leading-[1.8] text-[#6e746f]">
                THML’s activities support the wider objectives of the group while operating as a separate trading company.
              </p>
              <div className="mt-8">
                <Btn to={COMPANY.parentUrl} label="Visit 25th Avenue" variant="outline" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Board */}
      <section className="py-24 md:py-36 bg-[#ece9e1]">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <Reveal>
            <Tag label="Board and leadership" />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {BOARD.map((b, i) => (
              <Reveal key={b.name} delay={i * 80}>
                <div>
                  <div className="aspect-[3/4] bg-[#141716] flex items-center justify-center">
                    <span className="font-display font-extrabold text-[64px] text-[#2b7a66] tracking-[-0.02em]">
                      {b.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-[19px] mt-6">{b.name}</h3>
                  <p className="label text-[#1d6151] mt-2">{b.role}</p>
                  <p className="mt-4 text-[14px] leading-[1.75] text-[#4a4f4b]">{b.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Company information */}
      <section className="py-24 md:py-36">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Tag label="Company information" />
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            {[
              ['Company name', COMPANY.name],
              ['Company number', '14823067'],
              ['Registered office', COMPANY.office],
              ['Parent company', `${COMPANY.parent} — ${COMPANY.parentCharity.toLowerCase()}, ${COMPANY.parentProvider.toLowerCase()}`],
              ['Relationship', 'Wholly owned trading subsidiary'],
            ].map(([k, v], i) => (
              <Reveal key={k} delay={i * 50}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2 py-6 border-b border-[#dcd8cd] first:border-t">
                  <p className="md:col-span-4 label text-[#6e746f]">{k}</p>
                  <p className="md:col-span-8 text-[15px] text-[#1c1f1d]">{v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock />
    </main>
  )
}
