import { useState } from 'react'
import { Btn, PageHero, Reveal } from '../components/ui'
import { trpc } from '@/providers/trpc'

const STEPS = ['Your details', 'Service required', 'Property details', 'Project information', 'Review and submit']

export default function Quote() {
  const [step, setStep] = useState(0)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    service: 'Property Management',
    address: '',
    description: '', timeframe: 'Within 1 month', additional: '', privacy: false,
  })
  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }))

  const submitQuote = trpc.content.submitQuote.useMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 4) {
      setStep(step + 1)
      return
    }
    setSending(true)
    setError('')
    try {
      await submitQuote.mutateAsync({
        name: form.name,
        company: form.company || undefined,
        email: form.email,
        phone: form.phone || undefined,
        service: form.service,
        address: form.address || undefined,
        description: form.description,
        timeframe: form.timeframe || undefined,
      })
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again or call us directly.')
    } finally {
      setSending(false)
    }
  }

  const canNext =
    step === 0 ? form.name && form.email :
    step === 2 ? !!form.address :
    step === 3 ? !!form.description : true

  return (
    <main>
      <PageHero tag="Request a quote" title="Request a quote" copy="Tell us about your property and the service you need. We will review your request and contact you within two working days to arrange a visit or provide a quote." />

      <section className="py-24 md:py-32">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Step rail */}
          <div className="lg:col-span-4">
            <ol>
              {STEPS.map((s, i) => (
                <li key={s} className={`flex items-baseline gap-5 py-5 border-b border-[#dcd8cd] first:border-t transition-opacity ${i <= step ? 'opacity-100' : 'opacity-40'}`}>
                  <span className={`label ${i === step ? 'text-[#1d6151]' : 'text-[#6e746f]'}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={`font-display font-bold text-[17px] ${i === step ? '' : 'text-[#6e746f]'}`}>{s}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            {sent ? (
              <Reveal>
                <div className="border-t-2 border-[#1d6151] pt-10">
                  <p className="font-display font-extrabold uppercase text-[26px] md:text-[34px]">Quote request received</p>
                  <p className="mt-6 text-[16px] leading-[1.8] text-[#4a4f4b] max-w-[520px]">
                    Thank you. We will review your request and contact you within two working days to arrange a visit or
                    provide a quote.
                  </p>
                </div>
              </Reveal>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && <p className="mb-6 text-[14px] text-[#a33] border border-[#a33] px-4 py-3">{error}</p>}
                <Reveal key={step}>
                  {step === 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-9">
                      <div className="field"><label>Name</label><input required value={form.name} onChange={(e) => set('name', e.target.value)} /></div>
                      <div className="field"><label>Company</label><input value={form.company} onChange={(e) => set('company', e.target.value)} /></div>
                      <div className="field"><label>Email</label><input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} /></div>
                      <div className="field"><label>Phone</label><input value={form.phone} onChange={(e) => set('phone', e.target.value)} /></div>
                    </div>
                  )}
                  {step === 1 && (
                    <div>
                      <p className="label text-[#6e746f] mb-8">Select the service required</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#dcd8cd] border border-[#dcd8cd]">
                        {['Property Management', 'Repairs and Maintenance', 'Fire Safety', 'Electrical Compliance', 'Refurbishment', 'Property Lettings'].map((s) => (
                          <button
                            type="button"
                            key={s}
                            onClick={() => set('service', s)}
                            className={`text-left p-7 font-display font-bold text-[17px] transition-colors duration-300 ${
                              form.service === s ? 'bg-[#1c1f1d] text-[#f7f5f0]' : 'bg-[#f7f5f0] hover:bg-[#ece9e1]'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="grid grid-cols-1 gap-y-9">
                      <div className="field"><label>Property address</label><input required value={form.address} onChange={(e) => set('address', e.target.value)} placeholder="Street, area, postcode" /></div>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="grid grid-cols-1 gap-y-9">
                      <div className="field"><label>Brief description</label><textarea required rows={5} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Outline the work or service you need" /></div>
                      <div className="field">
                        <label>Timeframe</label>
                        <select value={form.timeframe} onChange={(e) => set('timeframe', e.target.value)}>
                          {['Urgent', 'Within 1 month', '1 to 3 months', '3 to 6 months', 'Planning ahead'].map((t) => (
                            <option key={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div className="field"><label>Additional information</label><textarea rows={3} value={form.additional} onChange={(e) => set('additional', e.target.value)} /></div>
                    </div>
                  )}
                  {step === 4 && (
                    <div>
                      {[
                        ['Name', form.name], ['Company', form.company || 'Not provided'], ['Email', form.email], ['Phone', form.phone || 'Not provided'],
                        ['Service required', form.service], ['Property address', form.address], ['Description', form.description],
                        ['Timeframe', form.timeframe], ['Additional information', form.additional || 'None'],
                      ].map(([k, v]) => (
                        <div key={k} className="grid grid-cols-12 gap-4 py-5 border-b border-[#dcd8cd] first:border-t">
                          <p className="col-span-5 md:col-span-4 label text-[#6e746f]">{k}</p>
                          <p className="col-span-7 md:col-span-8 text-[15px]">{v}</p>
                        </div>
                      ))}
                      <label className="mt-10 flex items-start gap-4 cursor-pointer">
                        <input type="checkbox" required checked={form.privacy} onChange={(e) => set('privacy', e.target.checked)} className="mt-1 w-4 h-4 accent-[#1d6151]" />
                        <span className="text-[13px] leading-[1.7] text-[#6e746f]">
                          I confirm I have read the privacy notice and agree to THML processing my details to prepare a quotation.
                        </span>
                      </label>
                    </div>
                  )}
                </Reveal>

                <div className="mt-12 flex items-center gap-6">
                  {step > 0 && (
                    <button type="button" onClick={() => setStep(step - 1)} className="tlink">
                      Back
                    </button>
                  )}
                  <Btn label={step === 4 ? (sending ? 'Sending…' : 'Submit quote request') : 'Continue'} className={!canNext ? 'opacity-40 pointer-events-none' : ''} />
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
