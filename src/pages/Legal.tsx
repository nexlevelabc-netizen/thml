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
        { title: 'Who we are', body: [`This privacy policy explains how ${COMPANY.name} ("we", "us", "our") collects and uses personal data when you use this website, contact us, apply for a property or job, or use our services.`, `${COMPANY.name} is a company registered in England and Wales (company no. 14314177). Our registered office is ${COMPANY.office}. We are a wholly owned trading subsidiary of Twenty-Fifth Avenue Ltd, a registered charity (no. 1123817) and Registered Provider of Social Housing (no. 4652).`, 'We are the data controller for the personal data described in this policy. Where we manage properties on behalf of Twenty-Fifth Avenue Ltd, the charity is the data controller for its residents data and we act as its data processor.', `If you have any questions about this policy, contact us at ${COMPANY.email} or write to us at the address above.`] },
        { title: 'What data we collect', body: ['Depending on how you deal with us, we may collect: contact details (name, address, email address and phone number); enquiry and correspondence details; tenancy and lettings information; repairs and property information; job application details; and website usage data (IP address, browser type, pages visited and cookie data).'] },
        { title: 'Why we use your data', body: ['We use your data to respond to enquiries and provide quotes; to set up and manage tenancies and lettings; to carry out repairs, maintenance and safety checks; to process job applications; to deal with complaints and legal claims; to run and improve our website; and to send you information about properties you have registered interest in.'] },
        { title: 'Who we share your data with', body: ['We may share your data with Twenty-Fifth Avenue Ltd (our parent charity) where necessary to manage properties and services within the group; contractors and suppliers who carry out work on our behalf; professional advisers; and regulators, the police and other authorities where the law requires. We do not sell your data.'] },
        { title: 'How long we keep your data', body: ['Enquiries and quotes: 12 months after our last contact. Tenancy records: 6 years after the tenancy ends. Repairs and safety records: for as long as we manage the property, and as required by law. Unsuccessful job applications: 6 months after the decision.'] },
        { title: 'Your rights', body: ['Under UK data protection law you have the right to ask us for a copy of your data, to have it corrected or deleted, to restrict or object to how we use it, to move it to another provider, and to withdraw consent where we rely on it. To exercise any of these rights, contact us at ' + COMPANY.email + '. We will respond within one month.', 'If you are unhappy with how we handle your data, you can complain to the Information Commissioner\'s Office at ico.org.uk or on 0303 123 1113.'] },
        { title: 'Security', body: ['We keep your data on secure systems with access limited to staff who need it. Paper records are kept in locked storage. We review our security arrangements regularly.'] },
        { title: 'Changes to this policy', body: ['We may update this policy from time to time. The date at the top shows when it was last changed.'] },
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
      intro="How to make a complaint to Thames Housing Management Ltd and what happens next."
      sections={[
        { title: 'Our commitment', body: ['We aim to provide a good service, but sometimes things go wrong. If they do, we want to know so we can put them right and learn from them. This page explains how to complain and what you can expect from us.', 'Complaints are free to make. Making a complaint will not affect the service you receive from us.'] },
        { title: 'How to complain', body: [`You can complain in whichever way suits you: Phone: ${COMPANY.phone} · Email: ${COMPANY.email} with "Complaint" in the subject line · Post: Complaints, ${COMPANY.name}, ${COMPANY.office} · In person at our office during opening hours · Using the contact form on this website.`, 'Please tell us what has gone wrong, when it happened and what you would like us to do about it. If you need help making a complaint, or would like someone to complain on your behalf, let us know.'] },
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

export function ModernSlavery() {
  return (
    <LegalLayout
      tag="Legal"
      title="Modern Slavery"
      intro="Our statement on preventing modern slavery and human trafficking in our business and supply chain."
      sections={[
        { title: 'Introduction', body: [COMPANY.name + ' is committed to preventing modern slavery and human trafficking in our business and our supply chain. Although we are not currently required by law to publish a statement under the Modern Slavery Act 2015, we do so voluntarily because we believe it is the right thing to do and because our parent charity, Twenty-Fifth Avenue Ltd, works with people who can be vulnerable to exploitation.'] },
        { title: 'Our business', body: ['We are a property management, lettings and maintenance company based in Woolwich, London, and a wholly owned subsidiary of Twenty-Fifth Avenue Ltd. We employ staff and use a range of contractors and suppliers, mainly in the construction, maintenance and property sectors in the UK.'] },
        { title: 'Our policies', body: ['We pay all staff at least the National Living Wage / London Living Wage. We check that everyone who works for us has the right to work in the UK. Our recruitment is carried out directly or through reputable agencies. Our whistleblowing policy allows staff to raise concerns confidentially.'] },
        { title: 'Our supply chain', body: ['The main risk in our supply chain is in construction and cleaning labour. We address this by using approved contractors, checking their accreditations and employment practices before they join our list, requiring them to confirm they comply with the Modern Slavery Act, and reserving the right to end a contract if we find evidence of exploitation.'] },
        { title: 'Training and awareness', body: ['Our staff receive guidance on the signs of modern slavery and how to report concerns, including in the homes we visit. Concerns are reported to a director and, where appropriate, to the Modern Slavery Helpline (08000 121 700) or the police.'] },
        { title: 'Approval', body: ['This statement was approved by the board of ' + COMPANY.name + '.'] },
      ]}
    />
  )
}
