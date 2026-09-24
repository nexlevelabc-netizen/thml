import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PROPERTIES } from '../data/content'
import { Btn, CtaBlock, ImgReveal, Reveal, Tag, TLink } from '../components/ui'
import { trpc } from '@/providers/trpc'

export default function PropertyDetail() {
  const { slug } = useParams()
  const property = PROPERTIES.find((p) => p.slug === slug) || PROPERTIES[0]
  const related = PROPERTIES.filter((p) => p.slug !== property.slug).slice(0, 2)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const submitEnquiry = trpc.content.submitPropertyEnquiry.useMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      await submitEnquiry.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        propertyTitle: property.title,
        message: form.message || undefined,
      })
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again or call us directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <main>
      {/* Hero gallery */}
      <section className="pt-[120px] md:pt-[150px]">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <ImgReveal src={property.gallery[0]} alt={property.title} className="lg:col-span-8 aspect-[16/10]" imgClassName="page-hero-img" />
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
              {property.gallery.slice(1, 3).map((g) => (
                <ImgReveal key={g} src={g} alt="" className="aspect-[16/10] lg:aspect-auto lg:h-full" />
              ))}
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
            <div>
              <Reveal>
                <Tag label="THML Properties" />
              </Reveal>
              <Reveal delay={80}>
                <h1 className="font-display font-extrabold uppercase leading-[1.0] tracking-[-0.02em] mt-6 text-[36px] md:text-[60px]">
                  {property.title}
                </h1>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-4 text-[15px] text-[#6e746f]">
                  {property.location} — {property.type}
                </p>
              </Reveal>
            </div>
            <Reveal delay={180}>
              <span className={`label ${property.availability === 'Available' ? 'text-[#1d6151]' : 'text-[#6e746f]'}`}>
                {property.availability}
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Overview + key details */}
      <section className="py-24 md:py-32">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <Tag label="Overview" />
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-10 text-[17px] leading-[1.85] text-[#3b403c] max-w-[640px]">{property.description}</p>
            </Reveal>
            <Reveal delay={140}>
              <h2 className="font-display font-extrabold uppercase tracking-[-0.01em] text-[24px] mt-16">Features</h2>
            </Reveal>
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10">
              {property.features.map((f, i) => (
                <Reveal key={f} delay={i * 40}>
                  <li className="py-4 border-b border-[#dcd8cd] text-[15px] text-[#4a4f4b]">{f}</li>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <Reveal>
              <div className="bg-[#ece9e1] p-8 md:p-10">
                <p className="label text-[#6e746f]">Key details</p>
                {[
                  ['Property', property.title],
                  ['Location', property.location],
                  ['Type', property.type],
                  ['Availability', property.availability],
                  ['Management', 'Managed in house by THML'],
                  ['Documents', 'EPC and compliance certificates available on request'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 py-4 border-b border-[#dcd8cd] last:border-b-0">
                    <span className="text-[12px] uppercase tracking-[0.14em] text-[#6e746f] pt-[2px]">{k}</span>
                    <span className="text-[14px] text-right">{v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section className="py-24 md:py-32 bg-[#ece9e1]">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Tag label="Property enquiry" />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display font-extrabold uppercase leading-[1.05] tracking-[-0.02em] mt-8 text-[30px] md:text-[40px]">
                Enquire about {property.title}
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 text-[15px] leading-[1.8] text-[#4a4f4b] max-w-[420px]">
                Send an enquiry to the THML lettings team and we will respond with availability, viewing arrangements and
                documentation.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            {sent ? (
              <Reveal>
                <div className="border-t-2 border-[#1d6151] pt-8">
                  <p className="font-display font-bold text-[22px]">Enquiry received</p>
                  <p className="mt-4 text-[15px] text-[#4a4f4b]">Thank you. The THML lettings team will be in touch shortly.</p>
                </div>
              </Reveal>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8"
              >
                {error && <p className="md:col-span-2 text-[14px] text-[#a33] border border-[#a33] px-4 py-3">{error}</p>}
                <div className="field">
                  <label>Name</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
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
                  <label>Message</label>
                  <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <Btn label={sending ? 'Sending…' : 'Send enquiry'} />
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-24 md:py-32">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <div className="flex items-end justify-between gap-8">
            <Reveal>
              <Tag label="Related properties" />
            </Reveal>
            <TLink to="/properties" label="All properties" />
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-8">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link to={`/properties/${p.slug}`} className="prop-card group block">
                  <div className="prop-img aspect-[16/9]">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-4">
                    <h3 className="font-display font-bold text-[21px]">{p.title}</h3>
                    <span className={`label shrink-0 mt-1 ${p.availability === 'Available' ? 'text-[#1d6151]' : 'text-[#6e746f]'}`}>
                      {p.availability}
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] text-[#6e746f]">
                    {p.location} — {p.type}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock />
    </main>
  )
}
