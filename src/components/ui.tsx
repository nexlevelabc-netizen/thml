import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

/* ---------------- Reveal on scroll ---------------- */
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal ${inView ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export function ImgReveal({ src, alt, className = '', imgClassName = '' }: { src: string; alt: string; className?: string; imgClassName?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (setInView(true), obs.disconnect())),
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={className}>
      <div className={`img-reveal overflow-hidden w-full h-full ${inView ? 'in' : ''}`}>
        <img src={src} alt={alt} className={`w-full h-full object-cover ${imgClassName}`} loading="lazy" />
      </div>
    </div>
  )
}

/* ---------------- Section tag : dot + label + rule ---------------- */
export function Tag({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <div className={`tag ${dark ? 'on-dark' : ''}`}>
      <span className="tag-dot" />
      <span className={`tag-label ${dark ? 'text-[#a3a099]' : 'text-[#6e746f]'}`}>{label}</span>
      <span className="tag-rule" />
    </div>
  )
}

/* ---------------- Buttons with text swap ---------------- */
function SwapText({ text }: { text: string }) {
  return (
    <span className="swap">
      <span>{text}</span>
      <span aria-hidden>{text}</span>
    </span>
  )
}

export function Btn({ to, label, variant = 'solid', className = '', onClick }: { to?: string; label: string; variant?: 'solid' | 'outline' | 'paper' | 'outline-paper'; className?: string; onClick?: () => void }) {
  const cls = `btn btn-${variant} ${className}`
  if (to?.startsWith('http'))
    return (
      <a href={to} target="_blank" rel="noreferrer" className={cls}>
        <SwapText text={label} />
      </a>
    )
  if (to)
    return (
      <Link to={to} className={cls}>
        <SwapText text={label} />
      </Link>
    )
  return (
    <button onClick={onClick} className={cls}>
      <SwapText text={label} />
    </button>
  )
}

export function TLink({ to, label, className = '', href }: { to?: string; label: string; className?: string; href?: string }) {
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

/* ---------------- Page hero for inner pages ---------------- */
export function PageHero({ tag, title, copy, image }: { tag: string; title: ReactNode; copy?: string; image?: string }) {
  return (
    <header className="pt-[150px] md:pt-[190px]">
      <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
        <Reveal>
          <Tag label={tag} />
        </Reveal>
        <Reveal delay={80}>
          <h1 className="font-display font-extrabold uppercase leading-[0.98] tracking-[-0.02em] mt-8 text-[42px] md:text-[64px] lg:text-[84px] max-w-[1100px]">
            {title}
          </h1>
        </Reveal>
        {copy && (
          <Reveal delay={160}>
            <p className="mt-8 text-[17px] md:text-[19px] leading-[1.7] text-[#4a4f4b] max-w-[720px]">{copy}</p>
          </Reveal>
        )}
      </div>
      {image && (
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto mt-14 md:mt-20">
          <ImgReveal src={image} alt="" className="aspect-[16/9] md:aspect-[21/9]" imgClassName="page-hero-img" />
        </div>
      )}
    </header>
  )
}

/* ---------------- Final CTA block ---------------- */
export function CtaBlock({ title = 'Let’s talk about your property requirements', copy = 'Whether you need property management, compliance support, maintenance or contractor services, our team is ready to help.' }: { title?: string; copy?: string }) {
  return (
    <section className="bg-[#1a1a19] text-[#f7f5f0]">
      <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto py-24 md:py-36">
        <Reveal>
          <Tag label="Get in touch" dark />
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display font-extrabold uppercase leading-[1.02] tracking-[-0.02em] mt-10 text-[34px] md:text-[52px] lg:text-[64px] max-w-[1000px]">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-8 text-[16px] md:text-[18px] leading-[1.7] text-[#a3a099] max-w-[640px]">{copy}</p>
        </Reveal>
        <Reveal delay={220}>
          <div className="mt-12 flex flex-wrap gap-4">
            <Btn to="/request-a-quote" label="Request a Quote" variant="paper" />
            <Btn to="/contact" label="Contact THML" variant="outline-paper" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- Image with fixed aspect ---------------- */
export function Img({ src, alt = '', ratio = 'aspect-[4/3]', className = '' }: { src: string; alt?: string; ratio?: string; className?: string }) {
  return (
    <div className={`overflow-hidden ${ratio} ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
    </div>
  )
}
