import { useState } from 'react'
import { trpc } from '@/providers/trpc'

// Shared form primitives, table and upload helpers for the admin area.
// No icons: text labels and hairline rules only, matching the public site.

export function AField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label text-[#6e746f] block mb-2">{label}</span>
      {children}
    </label>
  )
}

export const inputCls =
  'w-full bg-transparent border-b border-[#dcd8cd] focus:border-[#1c1f1d] outline-none py-3 text-[15px] text-[#1c1f1d] placeholder:text-[#a9ada6] transition-colors'

export const areaCls = inputCls + ' min-h-[110px] resize-y'

export function AButton({
  label,
  onClick,
  variant = 'solid',
  disabled,
  type,
}: {
  label: string
  onClick?: () => void
  variant?: 'solid' | 'outline' | 'danger'
  disabled?: boolean
  type?: 'submit' | 'button'
}) {
  const base = 'label !text-[11px] px-7 py-[13px] transition-colors duration-300 disabled:opacity-40 disabled:pointer-events-none'
  const styles = {
    solid: 'bg-[#1c1f1d] text-[#f7f5f0] hover:bg-[#1d6151]',
    outline: 'border border-[#1c1f1d] text-[#1c1f1d] hover:bg-[#1c1f1d] hover:text-[#f7f5f0]',
    danger: 'border border-[#8c3b2e] text-[#8c3b2e] hover:bg-[#8c3b2e] hover:text-[#f7f5f0]',
  }
  return (
    <button type={type ?? 'button'} onClick={onClick} disabled={disabled} className={`${base} ${styles[variant]}`}>
      {label}
    </button>
  )
}

export function StatusPill({ value }: { value: string }) {
  const live = value === 'live'
  return (
    <span className={`label !text-[10px] ${live ? 'text-[#1d6151]' : 'text-[#6e746f]'}`}>
      <span className={`inline-block w-[6px] h-[6px] mr-2 ${live ? 'bg-[#1d6151]' : 'bg-[#a9ada6]'}`} />
      {live ? 'Live' : 'Draft'}
    </span>
  )
}

export function ATable({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#1c1f1d]">
            {head.map((h) => (
              <th key={h} className="label !text-[10px] text-[#6e746f] py-4 pr-6 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export function ARow({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <tr onClick={onClick} className={`border-b border-[#dcd8cd] ${onClick ? 'cursor-pointer hover:bg-[#ece9e1] transition-colors' : ''}`}>
      {children}
    </tr>
  )
}

export function ACell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <td className={`py-5 pr-6 text-[14px] text-[#1c1f1d] align-top ${className}`}>{children}</td>
}

export function ASelect({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className={inputCls + ' cursor-pointer'}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

export type Uploaded = { url: string; fileName: string; size: number; mime: string }

export function FilePicker({
  accept,
  label,
  onUploaded,
  current,
}: {
  accept: string
  label: string
  onUploaded: (f: Uploaded) => void
  current?: string
}) {
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const presign = trpc.content.createUploadUrl.useMutation()

  async function handle(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    setErr('')
    try {
      const plan = await presign.mutateAsync({
        fileName: file.name,
        contentType: file.type || 'application/octet-stream',
      })
      if (plan.mode === 's3') {
        const put = await fetch(plan.uploadUrl, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type || 'application/octet-stream' },
        })
        if (!put.ok) throw new Error(`Upload failed (${put.status})`)
        onUploaded({ url: plan.publicUrl, fileName: plan.fileName, size: file.size, mime: file.type })
      } else {
        const fd = new FormData()
        fd.append('file', file)
        const res = await fetch('/api/upload', { method: 'POST', body: fd })
        if (!res.ok) {
          const j = await res.json().catch(() => ({}))
          throw new Error(j.error || `Upload failed (${res.status})`)
        }
        onUploaded((await res.json()) as Uploaded)
      }
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : 'Upload failed')
    } finally {
      setBusy(false)
      e.target.value = ''
    }
  }

  return (
    <div>
      <div className="flex items-center gap-6 flex-wrap">
        <label className="label !text-[11px] px-7 py-[13px] border border-[#1c1f1d] cursor-pointer hover:bg-[#1c1f1d] hover:text-[#f7f5f0] transition-colors duration-300">
          {busy ? 'Uploading' : label}
          <input type="file" accept={accept} onChange={handle} className="hidden" disabled={busy} />
        </label>
        {current && <span className="text-[12px] text-[#6e746f] break-all">{current}</span>}
      </div>
      {err && <p className="mt-3 text-[12px] text-[#8c3b2e]">{err}</p>}
    </div>
  )
}

export function EditorShell({
  title,
  onCancel,
  onSubmit,
  submitLabel,
  busy,
  children,
}: {
  title: string
  onCancel: () => void
  onSubmit: () => void
  submitLabel: string
  busy: boolean
  children: React.ReactNode
}) {
  return (
    <div className="border border-[#dcd8cd] bg-white/40 p-8 md:p-12">
      <div className="flex items-baseline gap-6 mb-10">
        <span className="w-[6px] h-[6px] bg-[#1d6151] shrink-0" />
        <h2 className="label !text-[11px] text-[#6e746f]">{title}</h2>
        <span className="flex-1 h-px bg-[#dcd8cd]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">{children}</div>
      <div className="flex gap-4 mt-12 pt-8 border-t border-[#dcd8cd]">
        <AButton label={busy ? 'Saving' : submitLabel} onClick={onSubmit} disabled={busy} />
        <AButton label="Cancel" variant="outline" onClick={onCancel} />
      </div>
    </div>
  )
}

export { trpc }
