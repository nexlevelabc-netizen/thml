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
      intro="How this website uses cookies and how to manage them."
      sections={[
        { title: 'What cookies are', body: ['Cookies are small text files placed on your device when you visit a website. They help the site work properly and tell us how it is being used.'] },
        { title: 'Cookies we use', body: ['Essential cookies – needed for the site to work, such as remembering your cookie choices and protecting forms from spam. These cannot be switched off.', 'Analytics cookies (Google Analytics) – tell us which pages are visited and how people find the site, so we can improve it. Only set if you accept them.', 'Functional cookies – such as the embedded map on our Contact page, which may set cookies from Google. Only set if you accept them.'] },
        { title: 'Managing cookies', body: ['When you first visit the site you will see a banner asking whether you accept non-essential cookies. You can change your choice at any time using the "Cookie settings" link in the footer. You can also block or delete cookies through your browser settings, although some parts of the site may not work properly if you do.'] },
        { title: 'More information', body: ['For more about how we use personal data, see our Privacy Policy. For general information on cookies visit www.allaboutcookies.org.'] },
      ]}
    />
  )
}

export function Terms() {
  return (
    <LegalLayout
      tag="Legal"
      title="Terms"
      intro="Terms and conditions for using the Thames Housing Management Ltd website."
      sections={[
        { title: 'About these terms', body: ['This website is operated by ' + COMPANY.name + ', a company registered in England and Wales (company no. 14314177) with its registered office at ' + COMPANY.office + '. ' + COMPANY.name + ' is a wholly owned trading subsidiary of Twenty-Fifth Avenue Ltd (registered charity no. 1123817, company no. 6242442).', 'By using this website you agree to these terms. If you do not agree, please do not use the site.'] },
        { title: 'Use of the site', body: ['You may use this site for lawful purposes only. You must not try to gain unauthorised access to it, introduce viruses or other harmful material, or use it in a way that damages or disrupts it.'] },
        { title: 'Information on the site', body: ['We try to keep the information on this site accurate and up to date, but we do not guarantee that it is complete or error-free. Property listings, prices and availability may change without notice. Nothing on this site is an offer to let a property or to carry out work; any agreement is subject to a separate written contract.'] },
        { title: 'Intellectual property', body: ['The content of this site, including text, images and logos, belongs to ' + COMPANY.name + ' or its licensors. You may view and print pages for personal use but must not copy or reuse content for commercial purposes without our written permission.'] },
        { title: 'Links to other sites', body: ['This site contains links to other websites, including www.25thavenue.org. We are not responsible for the content or privacy practices of other sites.'] },
        { title: 'Liability', body: ['We are not liable for any loss or damage arising from your use of this site or reliance on its content, except where the law does not allow us to exclude liability, such as for death or personal injury caused by our negligence.'] },
        { title: 'Governing law', body: ['These terms are governed by the law of England and Wales, and the courts of England and Wales have exclusive jurisdiction.'] },
        { title: 'Contact', body: ['Questions about these terms should be sent to ' + COMPANY.email + '.'] },
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
      intro="Our commitment to making this website accessible to everyone."
      sections={[
        { title: 'Our commitment', body: [COMPANY.name + ' wants as many people as possible to be able to use this website. We have built it to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.', 'This means you should be able to change colours, contrast levels and fonts using your browser; zoom in up to 300% without text going off the screen; navigate most of the site using only a keyboard; use speech recognition software; and listen to most of the site using a screen reader. We also try to make the text as simple as possible to understand.'] },
        { title: 'How accessible this website is', body: ['We believe this website meets WCAG 2.2 AA. Some older downloadable documents may not be fully accessible, and embedded maps may be hard to use with a screen reader.'] },
        { title: 'Alternative formats', body: ['If you need information from this site in a different format, such as large print, easy read or audio, contact us at ' + COMPANY.email + ' or on ' + COMPANY.phone + '. We will consider your request and get back to you within 5 working days.'] },
        { title: 'Reporting problems', body: ['If you find something on this site that is not accessible, or that does not work with your assistive technology, please tell us at ' + COMPANY.email + '. We will look into it and fix it where we can.'] },
        { title: 'Enforcement', body: ['If you are not happy with how we respond, you can contact the Equality Advisory and Support Service (EASS) at www.equalityadvisoryservice.com.'] },
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
