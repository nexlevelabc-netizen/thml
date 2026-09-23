import { useState } from 'react'
import { COMPANY } from '../data/content'
import { Btn, PageHero, Reveal, Tag } from '../components/ui'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', type: 'Landlord or organisation', subject: '', message: '', privacy: false })

  return (
    <main>
      <PageHero tag="Contact" title="Contact Us" copy="We would be pleased to hear from you. Call us, email us or use the form below and we will get back to you within one working day." />

      <section className="py-24 md:py-32">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left — details */}
          <div className="lg:col-span-5">
            <Reveal>
              <Tag label="Contact details" />
            </Reveal>
            <div className="mt-12 space-y-0">
              {[
                ['Address', COMPANY.office],
                ['Phone', COMPANY.phone],
                ['Email', COMPANY.email],
                ['Opening hours', 'Monday to Friday, 10am to 5pm'],
              ].map(([k, v], i) => (
                <Reveal key={k} delay={i * 50}>
                  <div className="py-6 border-b border-[#dcd8cd] first:border-t">
                    <p className="label text-[#6e746f]">{k}</p>
                    <p className="mt-3 text-[17px] font-medium">{v}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={200}>
              <p className="mt-10 text-[13px] leading-[1.8] text-[#6e746f] max-w-[400px]">
                {COMPANY.name} is the wholly owned trading subsidiary of Twenty-Fifth Avenue Ltd.
                For enquiries about the charity's supported housing services, please visit www.25thavenue.org.
              </p>
            </Reveal>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <Reveal>
              <Tag label="Send an enquiry" />
            </Reveal>
            {sent ? (
              <Reveal>
                <div className="mt-12 border-t-2 border-[#1d6151] pt-10">
                  <p className="font-display font-extrabold uppercase text-[26px]">Message sent</p>
                  <p className="mt-5 text-[16px] leading-[1.8] text-[#4a4f4b] max-w-[480px]">
                    Thank you. We have received your message and will reply within one working day.
                  </p>
                </div>
              </Reveal>
            ) : (
              <form
                className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-9"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
              >
                <div className="field">
                  <label>Name</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="field">
                  <label>Phone (optional)</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="field">
                  <label>I am a</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    {['Landlord or organisation', 'Tenant or resident', 'Job applicant', 'Other'].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="field md:col-span-2">
                  <label>Subject</label>
                  <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                </div>
                <div className="field md:col-span-2">
                  <label>Message</label>
                  <textarea rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                <label className="md:col-span-2 flex items-start gap-4 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={form.privacy}
                    onChange={(e) => setForm({ ...form, privacy: e.target.checked })}
                    className="mt-1 w-4 h-4 accent-[#1d6151]"
                  />
                  <span className="text-[13px] leading-[1.7] text-[#6e746f]">
                    I agree to Thames Housing Management Ltd using my details to respond to my enquiry. See our Privacy Policy.
                  </span>
                </label>
                <div className="md:col-span-2">
                  <Btn label="Send message" />
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="pb-24 md:pb-32">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <Reveal>
            <div className="bg-[#1a1a19] text-[#f7f5f0] aspect-[16/7] flex flex-col justify-between p-8 md:p-14">
              <p className="label text-[#a3a099]">Find us</p>
              <div>
                <p className="font-display font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-[28px] md:text-[44px]">
                  Thames House, 3 Wellington Street
                </p>
                <p className="font-display font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-[28px] md:text-[44px] text-[#2b7a66]">
                  Woolwich, London SE18 6NY
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=3+Wellington+Street,+Woolwich,+London+SE18+6NY"
                target="_blank"
                rel="noreferrer"
                className="tlink text-[#f7f5f0] w-fit"
              >
                Open in maps
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
