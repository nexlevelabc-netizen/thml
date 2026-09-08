import type { ReactNode } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

const SECTIONS = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/jobs', label: 'Jobs' },
  { to: '/admin/news', label: 'News' },
  { to: '/admin/documents', label: 'Documents' },
  { to: '/admin/events', label: 'Events' },
  { to: '/admin/media', label: 'Media Library' },
]

export default function AdminLayout({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  const { user, isLoading, logout } = useAuth()
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f7f5f0] flex items-center justify-center">
        <p className="label text-[#6e746f]">Loading</p>
      </div>
    )
  }

  if (!user) {
    navigate('/login')
    return null
  }

  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#f7f5f0] flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="label text-[#6e746f]">Restricted</p>
          <h1 className="font-display text-[32px] font-extrabold mt-6 tracking-[-0.01em]">Admin access required</h1>
          <p className="mt-4 text-[15px] leading-[1.7] text-[#4a4f4b]">
            This account does not have permission to manage site content. Contact the site owner to be granted access.
          </p>
          <button onClick={logout} className="tlink mt-8">Sign out</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      {/* top bar */}
      <div className="bg-[#1a1a19] text-[#f7f5f0]">
        <div className="max-w-[1560px] mx-auto px-6 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="label text-[11px]">THML Admin</span>
            <span className="hidden md:inline w-px h-4 bg-[#33322e]" />
            <span className="hidden md:inline text-[12px] text-[#a3a099]">{user.name ?? user.email}</span>
          </div>
          <div className="flex items-center gap-7">
            <Link to="/" className="label text-[10px] text-[#a3a099] hover:text-[#f7f5f0] transition-colors">View site</Link>
            <button onClick={logout} className="label text-[10px] text-[#f7f5f0] hover:text-[#2b7a66] transition-colors">Sign out</button>
          </div>
        </div>
      </div>

      {/* section nav */}
      <div className="border-b border-[#dcd8cd] bg-[#f7f5f0]">
        <div className="max-w-[1560px] mx-auto px-6 md:px-8 flex gap-8 overflow-x-auto">
          {SECTIONS.map((s) => (
            <NavLink
              key={s.to}
              to={s.to}
              end={s.end}
              className={({ isActive }) => `navlink py-4 whitespace-nowrap ${isActive ? 'active' : ''}`}
            >
              {s.label}
            </NavLink>
          ))}
        </div>
      </div>

      <main className="max-w-[1560px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="flex items-end justify-between gap-6 mb-10">
          <h1 className="font-display text-[34px] md:text-[44px] font-extrabold uppercase tracking-[-0.02em] leading-none">{title}</h1>
          {action}
        </div>
        {children}
      </main>
    </div>
  )
}
