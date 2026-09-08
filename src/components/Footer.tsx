import { Link } from 'react-router-dom'
import { COMPANY, NAV, SERVICES } from '../data/content'
import { Btn } from './ui'

export default function Footer() {
  return (
    <footer className="bg-[#1a1a19] text-[#f7f5f0]">
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
          <p className="mt-6 text-[14px] leading-[1.7] text-[#a3a099]">
            Professional property management, maintenance, compliance, refurbishment and lettings across London.
          </p>
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
          <p className="label text-[#6e746f]">Group</p>
          <div className="mt-6 flex flex-col gap-3 text-[14px] text-[#c9cdc7]">
            <p>{COMPANY.name}</p>
            <p className="text-[#a3a099]">Wholly owned trading subsidiary of {COMPANY.parent}</p>
            <a href={COMPANY.parentUrl} target="_blank" rel="noreferrer" className="tlink text-[#f7f5f0] w-fit mt-2">
              Visit 25th Avenue
            </a>
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
            ['Privacy', '/privacy'],
            ['Cookies', '/cookies'],
            ['Terms', '/terms'],
            ['Complaints', '/complaints'],
            ['Accessibility', '/accessibility'],
          ].map(([label, to]) => (
            <Link key={label} to={to} className="text-[11px] tracking-[0.14em] uppercase text-[#a3a099] hover:text-[#f7f5f0] transition-colors">
              {label}
            </Link>
          ))}
        </div>
        <p className="text-[11px] tracking-[0.08em] text-[#6e746f] uppercase">© 2026 {COMPANY.name}</p>
      </div>
    </footer>
  )
}
