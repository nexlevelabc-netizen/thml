import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { COMPANY, NAV, SERVICES } from '../data/content'
import { Btn } from './ui'

export default function Header({ onSearch }: { onSearch: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeImg, setActiveImg] = useState(SERVICES[0].image)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    setServicesOpen(false)
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Layer 1 — relationship bar */}
        <div
          className={`bg-[#1a1a19] text-[#f7f5f0] overflow-hidden transition-all duration-500 ${
            scrolled ? 'max-h-0' : 'max-h-10'
          }`}
        >
          <div className="flex items-center justify-between px-6 md:px-8 h-10">
            <span className="label text-[10px] text-[#a3a099] hidden sm:block">Thames Housing Management Ltd</span>
            <span className="label text-[10px] text-[#a3a099] absolute left-1/2 -translate-x-1/2 hidden lg:block">
              A wholly owned trading subsidiary of 25th Avenue Housing Ltd
            </span>
            <a href={COMPANY.parentUrl} target="_blank" rel="noreferrer" className="label text-[10px] text-[#f7f5f0] hover:text-[#2b7a66] transition-colors ml-auto lg:ml-0">
              Visit 25th Avenue
            </a>
          </div>
        </div>

        {/* Layer 2 — main navigation */}
        <div
          className={`transition-all duration-500 ${
            scrolled ? 'bg-[#f7f5f0]/95 backdrop-blur-sm border-b border-[#dcd8cd]' : 'bg-transparent border-b border-transparent'
          } max-xl:bg-[#f7f5f0] max-xl:border-[#dcd8cd]`}
        >
          <div className={`flex items-center justify-between px-6 md:px-8 transition-all duration-500 ${scrolled ? 'h-[68px]' : 'h-[92px]'}`}>
            <Link to="/" className="flex items-center shrink-0" aria-label="THML home">
              <img src="/images/logo-horizontal.png" alt="Thames Housing Management Ltd" className={`w-auto transition-all duration-500 ${scrolled ? 'h-9 md:h-10' : 'h-11 md:h-14'}`} />
            </Link>

            {/* desktop nav */}
            <nav className="hidden xl:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
              {NAV.map((item) =>
                item.label === 'Services' ? (
                  <button
                    key={item.label}
                    className={`navlink ${location.pathname.startsWith('/services') ? 'active' : ''}`}
                    onMouseEnter={() => setServicesOpen(true)}
                    onClick={() => setServicesOpen(true)}
                  >
                    Services
                  </button>
                ) : (
                  <NavLink key={item.label} to={item.to} className={({ isActive }) => `navlink ${isActive ? 'active' : ''}`}>
                    {item.label}
                  </NavLink>
                )
              )}
            </nav>

            <div className="hidden xl:flex items-center gap-8 shrink-0">
              <button onClick={onSearch} className="navlink">
                Search
              </button>
              <Btn to="/request-a-quote" label="Request a Quote" variant="outline" className="!py-[13px] !px-6" />
            </div>

            {/* mobile menu button — no hamburger icon */}
            <button onClick={() => setMenuOpen((v) => !v)} className="xl:hidden navlink !text-[13px]">
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        {/* Services mega panel */}
        <div
          className={`hidden xl:block absolute left-0 right-0 top-full transition-all duration-500 origin-top ${
            servicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'
          }`}
          onMouseLeave={() => setServicesOpen(false)}
        >
          <div className="bg-[#f7f5f0] border-b border-[#dcd8cd]">
            <div className="max-w-[1560px] mx-auto px-8 py-14 grid grid-cols-12 gap-12">
              <div className="col-span-3">
                <p className="label text-[#6e746f]">Services</p>
                <p className="mt-6 text-[15px] leading-[1.7] text-[#4a4f4b]">
                  Professional property services covering management, maintenance, compliance and refurbishment.
                </p>
                <div className="mt-10">
                  <TLink to="/services" label="View all services" />
                </div>
              </div>
              <div className="col-span-5">
                {SERVICES.map((s) => (
                  <button
                    key={s.slug}
                    onMouseEnter={() => setActiveImg(s.image)}
                    onClick={() => navigate(`/services/${s.slug}`)}
                    className="group flex items-baseline gap-6 w-full text-left py-[15px] border-b border-[#dcd8cd] last:border-b-0"
                  >
                    <span className="label text-[#6e746f] group-hover:text-[#1d6151] transition-colors">{s.no}</span>
                    <span className="font-display text-[21px] font-bold tracking-[-0.01em] group-hover:translate-x-2 transition-transform duration-500">
                      {s.title}
                    </span>
                  </button>
                ))}
              </div>
              <div className="col-span-4">
                <div className="overflow-hidden aspect-[4/3]">
                  <img key={activeImg} src={activeImg} alt="" className="w-full h-full object-cover overlay-enter" />
                </div>
                <p className="mt-5 text-[13px] leading-[1.6] text-[#6e746f]">
                  Professional property services built around safety, maintenance and long term value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full screen menu */}
      <div
        className={`xl:hidden fixed inset-0 z-40 bg-[#1a1a19] text-[#f7f5f0] transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="h-full flex flex-col pt-[110px] px-6 pb-8 overflow-y-auto">
          <nav className="flex-1">
            {[...[{ label: 'Home', to: '/' }], ...NAV].map((item, i) => (
              <Link
                key={item.label}
                to={item.to}
                className={`flex items-baseline gap-5 py-4 border-b border-[#33322e] transition-all duration-500 ${
                  menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${80 + i * 45}ms` }}
              >
                <span className="label text-[#2b7a66]">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display font-extrabold uppercase text-[30px] tracking-[-0.01em]">{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-10 flex flex-col gap-6">
            <div className="flex gap-8">
              <button
                onClick={() => {
                  setMenuOpen(false)
                  onSearch()
                }}
                className="tlink text-[#f7f5f0]"
              >
                Search
              </button>
              <TLink to="/request-a-quote" label="Request a Quote" className="text-[#f7f5f0]" />
              <TLink href={COMPANY.parentUrl} label="Visit 25th Avenue" className="text-[#f7f5f0]" />
            </div>
            <div className="pt-6 border-t border-[#33322e]">
              <p className="text-[12px] text-[#a3a099]">{COMPANY.companyNo}</p>
              <p className="text-[12px] text-[#a3a099] mt-1">Registered office: {COMPANY.office}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function TLink({ to, label, className = '', href }: { to?: string; label: string; className?: string; href?: string }) {
  if (href)
    return (
      <a href={href} target="_blank" rel="noreferrer" className={`tlink ${className}`}>
        {label}
      </a>
    )
  return (
    <Link to={to || '#'} className={`tlink ${className}`}>
      {label}
    </Link>
  )
}
