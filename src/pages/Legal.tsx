import { COMPANY } from '../data/content'
import { PageHero, Reveal, Tag, TLink } from '../components/ui'

export interface LegalSection {
  title: string
  body: string[]
}

function LegalLayout({ tag, title, intro, sections }: { tag: string; title: string; intro: string; sections: LegalSection[] }) {
  return (
    <main>
      <PageHero tag={tag} title={title} copy={intro} />
      <section className="py-20 md:py-28">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[130px]">
              <Reveal>
                <Tag label="Contents" />
              </Reveal>
              <nav className="mt-8 flex flex-col gap-3">
                {sections.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => document.getElementById(`s-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="text-left text-[13px] text-[#6e746f] hover:text-[#1c1f1d] transition-colors w-fit"
                  >
                    {String(i + 1).padStart(2, '0')} — {s.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          <div className="lg:col-span-8 max-w-[760px]">
            {sections.map((s, i) => (
              <Reveal key={s.title}>
                <div id={`s-${i}`} className="mb-16 scroll-mt-32">
                  <p className="label text-[#1d6151]">{String(i + 1).padStart(2, '0')}</p>
                  <h2 className="font-display font-extrabold uppercase tracking-[-0.01em] text-[24px] md:text-[28px] mt-3">{s.title}</h2>
                  {s.body.map((p, j) => (
                    <p key={j} className="mt-5 text-[15px] md:text-[16px] leading-[1.85] text-[#4a4f4b]">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
            <Reveal>
              <div className="border-t border-[#dcd8cd] pt-8">
                <TLink to="/contact" label="Contact THML" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  )
}

export function Privacy() {
  return (
    <LegalLayout
      tag="Legal"
      title="Privacy"
      intro="How Thames Housing Management Ltd collects, uses and protects personal information."
      sections={[
        { title: 'Who we are', body: [`${COMPANY.name} (${COMPANY.companyNo}) is the data controller for personal information collected through this website. Registered office: ${COMPANY.office}. ${COMPANY.relationship}`] },
        { title: 'Information we collect', body: ['We collect information you provide directly through contact forms, quote requests, property enquiries and careers applications, including your name, contact details, company, property address and the content of your message.', 'We also collect limited technical information about how the website is used, described in our cookies notice.'] },
        { title: 'How information is used', body: ['We use your information to respond to enquiries, prepare quotations, manage property lettings and tenancies, process job applications and meet our legal and regulatory obligations.'] },
        { title: 'Contact and quote forms', body: ['Details submitted through contact and quote forms are used only to respond to your enquiry and, where relevant, to prepare and administer a contract with you.'] },
        { title: 'Careers applications', body: ['Application information is used to assess candidates for current and future vacancies. Unsuccessful application data is retained for no longer than twelve months unless you ask us to keep it on file.'] },
        { title: 'Cookies and analytics', body: ['We use a small number of necessary and analytics cookies. Full details are set out in our cookies notice.'] },
        { title: 'Data retention', body: ['Personal information is retained only for as long as needed for the purpose it was collected, or as required by law, and is then securely deleted.'] },
        { title: 'Your rights', body: ['You have the right to access, correct, restrict or erase your personal information, and to object to certain processing. To exercise any of these rights, contact us using the details below.', `Email: ${COMPANY.email} — Phone: ${COMPANY.phone}`] },
      ]}
    />
  )
}

export function Cookies() {
  return (
    <LegalLayout
      tag="Legal"
      title="Cookies"
      intro="How this website uses cookies and how you can manage your preferences."
      sections={[
        { title: 'What cookies are', body: ['Cookies are small text files placed on your device when you visit a website. They help the site function and can provide information about how the site is used.'] },
        { title: 'Necessary cookies', body: ['These cookies are required for the website to operate, including navigation, forms and security features. They cannot be switched off.'] },
        { title: 'Analytics cookies', body: ['We use privacy conscious analytics to understand aggregate usage of the site, such as pages visited. Analytics data is not used to identify individual visitors.'] },
        { title: 'How to manage preferences', body: ['You can control or delete cookies through your browser settings at any time. Disabling cookies may affect how some parts of the site function.'] },
        { title: 'Cookie settings', body: ['On your first visit you can choose whether to accept analytics cookies. Your preference is stored locally and can be changed by clearing your browser data.'] },
      ]}
    />
  )
}

export function Terms() {
  return (
    <LegalLayout
      tag="Legal"
      title="Terms"
      intro="The terms that govern use of the Thames Housing Management Ltd website."
      sections={[
        { title: 'Website use', body: ['This website is provided by ' + COMPANY.name + ' for information about our services, properties and company. By using the site you accept these terms.'] },
        { title: 'Intellectual property', body: ['All content on this website, including text, imagery and branding, belongs to ' + COMPANY.name + ' or its licensors and may not be reproduced without permission.'] },
        { title: 'Content accuracy', body: ['We take care to keep information accurate and current, including property availability and compliance documentation, but content is provided without warranty and may change at any time.'] },
        { title: 'Links to third party sites', body: ['This site links to external websites, including the website of 25th Avenue Housing Ltd. We are not responsible for the content of third party sites.'] },
        { title: 'Liability', body: ['Nothing in these terms excludes liability that cannot be excluded by law. Otherwise, we are not liable for loss arising from use of this website or reliance on its content.'] },
        { title: 'Applicable law', body: ['These terms are governed by the laws of England and Wales, and the courts of England and Wales have exclusive jurisdiction.'] },
        { title: 'Company details', body: [`${COMPANY.name}, ${COMPANY.companyNo}. Registered office: ${COMPANY.office}. ${COMPANY.relationship}`] },
      ]}
    />
  )
}

export function Complaints() {
  return (
    <LegalLayout
      tag="Legal"
      title="Complaints"
      intro="How to raise a complaint with THML and how we handle it."
      sections={[
        { title: 'How to make a complaint', body: [`If something has gone wrong, tell us. Contact the THML office by phone on ${COMPANY.phone}, by email at ${COMPANY.email}, or in writing to ${COMPANY.office}. Please include your name, address and a description of the issue.`] },
        { title: 'Stage 1', body: ['Your complaint will be acknowledged within three working days and investigated by the relevant service lead. We aim to provide a full response within ten working days.'] },
        { title: 'Stage 2', body: ['If you are not satisfied with the stage 1 response, you can ask for the complaint to be reviewed by a director. The review will be completed within twenty working days of your request.'] },
        { title: 'Escalation', body: ['If your complaint relates to a property owned or managed within the 25th Avenue group and remains unresolved, you may escalate it through the parent organisation’s complaints process, details of which are available at 25thavenue.org.'] },
        { title: 'Contact details', body: [`${COMPANY.name}, ${COMPANY.office}. Phone: ${COMPANY.phone}. Email: ${COMPANY.email}.`] },
        { title: 'Complaints policy download', body: ['A full copy of the THML complaints policy is available on request from the office.'] },
      ]}
    />
  )
}

export function Accessibility() {
  return (
    <LegalLayout
      tag="Legal"
      title="Accessibility"
      intro="Our commitment to making this website usable by everyone."
      sections={[
        { title: 'Accessibility commitment', body: [COMPANY.name + ' is committed to ensuring this website is accessible to the widest possible audience, regardless of technology or ability.'] },
        { title: 'WCAG 2.2 AA target', body: ['We aim to meet the Web Content Accessibility Guidelines version 2.2 at level AA, covering contrast, keyboard navigation, text resizing, focus visibility and clear structure.'] },
        { title: 'Known limitations', body: ['Some older downloadable documents may not yet be fully accessible. We are working to address this and will provide accessible alternatives on request.'] },
        { title: 'Feedback and contact', body: [`If you experience any difficulty using this website, contact us at ${COMPANY.email} or ${COMPANY.phone} and we will work to provide the information in a format that suits you.`] },
        { title: 'Review process', body: ['This statement is reviewed annually, and the website is tested against accessibility standards as part of every major update.'] },
      ]}
    />
  )
}
