import { useState } from 'react'
import { COMPANY } from '../data/content'
import { Btn, PageHero, Reveal, Tag } from '../components/ui'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', type: 'Property management', message: '', privacy: false })

  return (
    <main>
      <PageHero tag="Contact" title="Contact THML" copy="Speak to the team about property management, compliance, maintenance, refurbishment or lettings." />

      <section className="py-24 md:py-32">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left — details */}
          <div className="lg:col-span-5">
            <Reveal>
              <Tag label="Company details" />
            </Reveal>
            <div className="mt-12 space-y-0">
              {[
                ['Address', COMPANY.office],
                ['Phone', COMPANY.phone],
                ['Email', COMPANY.email],
                ['Company number', '14823067'],
                ['Registered office', COMPANY.office],
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
              <p className="mt-10 text-[13px] leading-[1.8] text-[#6e746f] max-w-[400px]">{COMPANY.relationship}</p>
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
                  <p className="font-display font-extrabold uppercase text-[26px]">Enquiry sent</p>
                  <p className="mt-5 text-[16px] leading-[1.8] text-[#4a4f4b] max-w-[480px]">
                    Thank you for contacting THML. A member of the team will respond within one working day.
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
                  <label>Company</label>
                  <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="field">
                  <label>Phone</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="field md:col-span-2">
                  <label>Enquiry type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    {['Property management', 'Repairs and maintenance', 'Fire safety', 'Electrical compliance', 'Refurbishment', 'Property lettings', 'Careers', 'Other'].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
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
                    I confirm I have read the privacy notice and agree to THML processing my details to respond to this enquiry.
                  </span>
                </label>
                <div className="md:col-span-2">
                  <Btn label="Send enquiry" />
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map placeholder — typographic treatment */}
      <section className="pb-24 md:pb-32">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <Reveal>
            <div className="bg-[#141716] text-[#f7f5f0] aspect-[16/7] flex flex-col justify-between p-8 md:p-14">
              <p className="label text-[#9aa19b]">Find us</p>
              <div>
                <p className="font-display font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-[28px] md:text-[44px]">
                  Wellington Street
                </p>
                <p className="font-display font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-[28px] md:text-[44px] text-[#2b7a66]">
                  London SE18 6QF
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=Wellington+Street,+London+SE18"
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
