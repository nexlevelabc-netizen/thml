import { useState } from 'react'
import AdminLayout from './AdminLayout'
import { AButton, ACell, AField, ARow, ASelect, ATable, EditorShell, StatusPill, areaCls, inputCls, trpc } from './controls'
import type { Job } from '@db/schema'

const EMPTY = {
  title: '',
  location: '',
  type: 'Full time',
  closingDate: '',
  summary: '',
  overview: '',
  responsibilities: '',
  requirements: '',
  published: 'draft' as 'draft' | 'live',
}

export default function AdminJobs() {
  const utils = trpc.useUtils()
  const list = trpc.content.jobsAll.useQuery()
  const create = trpc.content.createJob.useMutation({ onSuccess: () => utils.content.jobsAll.invalidate() })
  const update = trpc.content.updateJob.useMutation({ onSuccess: () => utils.content.jobsAll.invalidate() })
  const del = trpc.content.deleteJob.useMutation({ onSuccess: () => utils.content.jobsAll.invalidate() })

  const [editing, setEditing] = useState<number | 'new' | null>(null)
  const [form, setForm] = useState(EMPTY)

  function openNew() {
    setForm(EMPTY)
    setEditing('new')
  }
  function openEdit(j: Job) {
    setForm({
      title: j.title,
      location: j.location,
      type: j.type,
      closingDate: j.closingDate,
      summary: j.summary,
      overview: j.overview ?? '',
      responsibilities: j.responsibilities ?? '',
      requirements: j.requirements ?? '',
      published: j.published,
    })
    setEditing(j.id)
  }
  function submit() {
    if (editing === 'new') create.mutate(form, { onSuccess: () => setEditing(null) })
    else if (typeof editing === 'number') update.mutate({ id: editing, ...form }, { onSuccess: () => setEditing(null) })
  }

  return (
    <AdminLayout title="Jobs" action={<AButton label="New vacancy" onClick={openNew} />}>
      {editing !== null && (
        <div className="mb-14">
          <EditorShell
            title={editing === 'new' ? 'New vacancy' : 'Edit vacancy'}
            submitLabel={editing === 'new' ? 'Create vacancy' : 'Save changes'}
            busy={create.isPending || update.isPending}
            onCancel={() => setEditing(null)}
            onSubmit={submit}
          >
            <AField label="Job title">
              <input className={inputCls} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </AField>
            <AField label="Location">
              <input className={inputCls} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </AField>
            <AField label="Employment type">
              <ASelect value={form.type} onChange={(v) => setForm({ ...form, type: v })} options={[
                { value: 'Full time', label: 'Full time' },
                { value: 'Part time', label: 'Part time' },
                { value: 'Contract', label: 'Contract' },
              ]} />
            </AField>
            <AField label="Closing date">
              <input className={inputCls} placeholder="e.g. 30 September 2026" value={form.closingDate} onChange={(e) => setForm({ ...form, closingDate: e.target.value })} />
            </AField>
            <div className="md:col-span-2">
              <AField label="Summary (shown in listings)">
                <textarea className={areaCls} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
              </AField>
            </div>
            <div className="md:col-span-2">
              <AField label="Role overview">
                <textarea className={areaCls} value={form.overview} onChange={(e) => setForm({ ...form, overview: e.target.value })} />
              </AField>
            </div>
            <div className="md:col-span-2">
              <AField label="Responsibilities (one per line)">
                <textarea className={areaCls} value={form.responsibilities} onChange={(e) => setForm({ ...form, responsibilities: e.target.value })} />
              </AField>
            </div>
            <div className="md:col-span-2">
              <AField label="Requirements (one per line)">
                <textarea className={areaCls} value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} />
              </AField>
            </div>
            <AField label="Status">
              <ASelect value={form.published} onChange={(v) => setForm({ ...form, published: v as 'draft' | 'live' })} options={[
                { value: 'draft', label: 'Draft' },
                { value: 'live', label: 'Live' },
              ]} />
            </AField>
          </EditorShell>
        </div>
      )}

      <ATable head={['Title', 'Location', 'Type', 'Closing', 'Status', '']}>
        {(list.data ?? []).map((j) => (
          <ARow key={j.id} onClick={() => openEdit(j)}>
            <ACell className="font-display font-bold text-[16px]">{j.title}</ACell>
            <ACell>{j.location}</ACell>
            <ACell>{j.type}</ACell>
            <ACell>{j.closingDate}</ACell>
            <ACell><StatusPill value={j.published} /></ACell>
            <ACell className="text-right whitespace-nowrap">
              <button className="tlink !text-[12px] mr-6" onClick={(e) => { e.stopPropagation(); openEdit(j) }}>Edit</button>
              <button
                className="tlink !text-[12px] !text-[#8c3b2e]"
                onClick={(e) => {
                  e.stopPropagation()
                  if (confirm(`Delete "${j.title}"?`)) del.mutate({ id: j.id })
                }}
              >
                Delete
              </button>
            </ACell>
          </ARow>
        ))}
      </ATable>
      {list.data && list.data.length === 0 && <p className="text-[14px] text-[#6e746f] py-10">No vacancies yet. Create the first one.</p>}
    </AdminLayout>
  )
}
