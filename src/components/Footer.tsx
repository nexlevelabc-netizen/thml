import { Link } from 'react-router-dom'
import { COMPANY, NAV, SERVICES } from '../data/content'
import { Btn } from './ui'
import { resetCookieConsent } from './CookieBanner'

export default function Footer() {
  return (
    <footer className="sheen bg-black text-[#f7f5f0]">
      {/* top row */}
      <div className="px-6 md:px-8 py-12 flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-[#33322e]">
        <div className="max-w-[420px]">
          <div className="flex items-center gap-4">
            <img src="/images/logo-mark.png" alt="THML mark" className="h-11 w-auto" />
            <div className="font-display font-bold uppercase tracking-[0.14em] text-[12px] leading-[1.5]">
              Thames Housing
              <br />
              Management Ltd
            </div>
          </div>
          <p className="mt-6 text-[13px] leading-[1.7] text-[#a3a099]">
            {COMPANY.relationship} {COMPANY.name} is registered in England and Wales, {COMPANY.companyNo}. Registered office: {COMPANY.office}.
          </p>
          <a href={COMPANY.parentUrl} target="_blank" rel="noreferrer" className="tlink text-[13px] text-[#f7f5f0] w-fit mt-4 inline-block">
            Visit our parent charity: www.25thavenue.org
          </a>
        </div>
        <div className="flex flex-col items-start md:items-end gap-5">
          <div className="flex gap-4">
            <Btn to="/request-a-quote" label="Request a Quote" variant="paper" className="!py-[13px] !px-6" />
            <Btn to="/contact" label="Contact THML" variant="outline-paper" className="!py-[13px] !px-6" />
          </div>
          <div className="text-[13px] text-[#a3a099] md:text-right">
            <p>{COMPANY.phone}</p>
            <p className="mt-1">{COMPANY.email}</p>
          </div>
        </div>
      </div>

      {/* giant wordmark */}
      <div className="px-6 md:px-8 py-14 md:py-20 border-b border-[#33322e] overflow-hidden">
        <h2 className="font-display font-extrabold uppercase leading-[0.92] tracking-[-0.03em] text-[11.5vw] md:text-[8.2vw] whitespace-nowrap text-[#f7f5f0]">
          Thames Housing
        </h2>
        <h2 className="font-display font-extrabold uppercase leading-[0.92] tracking-[-0.03em] text-[11.5vw] md:text-[8.2vw] whitespace-nowrap text-transparent" style={{ WebkitTextStroke: '1px #3f3e3a' }}>
          Management
        </h2>
      </div>

      {/* link groups */}
      <div className="px-6 md:px-8 py-14 grid grid-cols-1 sm:grid-cols-3 gap-12 border-b border-[#33322e]">
        <div>
          <p className="label text-[#6e746f]">Explore</p>
          <div className="mt-6 flex flex-col gap-3">
            {NAV.map((n) => (
              <Link key={n.label} to={n.to} className="text-[14px] text-[#c9cdc7] hover:text-[#f7f5f0] transition-colors w-fit">
                {n.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="label text-[#6e746f]">Services</p>
          <div className="mt-6 flex flex-col gap-3">
            {SERVICES.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="text-[14px] text-[#c9cdc7] hover:text-[#f7f5f0] transition-colors w-fit">
                {s.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="label text-[#6e746f]">Contact</p>
          <div className="mt-6 flex flex-col gap-2 text-[13px] text-[#c9cdc7]">
            <a href={`tel:${COMPANY.phone}`} className="hover:text-[#f7f5f0] transition-colors w-fit">{COMPANY.phone}</a>
            <a href={`mailto:${COMPANY.email}`} className="hover:text-[#f7f5f0] transition-colors w-fit">{COMPANY.email}</a>
            <p className="text-[#a3a099] text-[12px] leading-[1.6] mt-1">{COMPANY.office}</p>
          </div>
        </div>
        <div>
          <p className="label text-[#6e746f]">Documents</p>
          <div className="mt-6 flex flex-col gap-3 text-[13px] text-[#c9cdc7]">
            <p>Policies, certificates and reports are available through the documents section.</p>
            <Link to="/compliance" className="tlink text-[#f7f5f0] w-fit mt-1">View documents</Link>
          </div>
        </div>
      </div>

      {/* legal strip */}
      <div className="px-6 md:px-8 py-7 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="text-[11px] tracking-[0.08em] text-[#6e746f] uppercase">
          <span>{COMPANY.companyNo}</span>
          <span className="mx-3 text-[#3f3e3a]">/</span>
          <span>Registered office: {COMPANY.office}</span>
        </div>
        <div className="flex flex-wrap gap-x-7 gap-y-2">
          {[
            ['Privacy Policy', '/privacy'],
            ['Cookie Policy', '/cookies'],
            ['Terms of Use', '/terms'],
            ['Complaints Procedure', '/complaints'],
            ['Modern Slavery Statement', '/modern-slavery'],
            ['Accessibility Statement', '/accessibility'],
          ].map(([label, to]) => (
            <Link key={label} to={to} className="text-[11px] tracking-[0.14em] uppercase text-[#a3a099] hover:text-[#f7f5f0] transition-colors">
              {label}
            </Link>
          ))}
          <button
            type="button"
            onClick={resetCookieConsent}
            className="text-[11px] tracking-[0.14em] uppercase text-[#a3a099] hover:text-[#f7f5f0] transition-colors"
          >
            Cookie settings
          </button>
        </div>
        <p className="text-[11px] tracking-[0.08em] text-[#6e746f] uppercase">© 2022 {COMPANY.name}. All rights reserved.</p>
      </div>
    </footer>
  )
}
