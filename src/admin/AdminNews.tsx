import { useState } from 'react'
import AdminLayout from './AdminLayout'
import { AButton, ACell, AField, ARow, ASelect, ATable, EditorShell, FilePicker, StatusPill, areaCls, inputCls, trpc } from './controls'
import type { NewsItem } from '@db/schema'

const CATS = ['Company', 'Properties', 'Compliance', 'Projects', 'Careers', 'Events']

const EMPTY = {
  title: '',
  category: 'Company',
  date: '',
  excerpt: '',
  body: '',
  imageUrl: '',
  published: 'draft' as 'draft' | 'live',
}

export default function AdminNews() {
  const utils = trpc.useUtils()
  const list = trpc.content.newsAll.useQuery()
  const create = trpc.content.createNews.useMutation({ onSuccess: () => utils.content.newsAll.invalidate() })
  const update = trpc.content.updateNews.useMutation({ onSuccess: () => utils.content.newsAll.invalidate() })
  const del = trpc.content.deleteNews.useMutation({ onSuccess: () => utils.content.newsAll.invalidate() })

  const [editing, setEditing] = useState<number | 'new' | null>(null)
  const [form, setForm] = useState(EMPTY)

  function openNew() {
    setForm({ ...EMPTY, date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) })
    setEditing('new')
  }
  function openEdit(n: NewsItem) {
    setForm({
      title: n.title,
      category: n.category,
      date: n.date,
      excerpt: n.excerpt,
      body: n.body ?? '',
      imageUrl: n.imageUrl ?? '',
      published: n.published,
    })
    setEditing(n.id)
  }
  function submit() {
    if (editing === 'new') create.mutate(form, { onSuccess: () => setEditing(null) })
    else if (typeof editing === 'number') update.mutate({ id: editing, ...form }, { onSuccess: () => setEditing(null) })
  }

  return (
    <AdminLayout title="News" action={<AButton label="New article" onClick={openNew} />}>
      {editing !== null && (
        <div className="mb-14">
          <EditorShell
            title={editing === 'new' ? 'New article' : 'Edit article'}
            submitLabel={editing === 'new' ? 'Create article' : 'Save changes'}
            busy={create.isPending || update.isPending}
            onCancel={() => setEditing(null)}
            onSubmit={submit}
          >
            <AField label="Headline">
              <input className={inputCls} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </AField>
            <AField label="Category">
              <ASelect value={form.category} onChange={(v) => setForm({ ...form, category: v })} options={CATS.map((c) => ({ value: c, label: c }))} />
            </AField>
            <AField label="Date">
              <input className={inputCls} placeholder="e.g. 12 September 2026" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </AField>
            <AField label="Status">
              <ASelect value={form.published} onChange={(v) => setForm({ ...form, published: v as 'draft' | 'live' })} options={[
                { value: 'draft', label: 'Draft' },
                { value: 'live', label: 'Live' },
              ]} />
            </AField>
            <div className="md:col-span-2">
              <AField label="Excerpt (shown in listings)">
                <textarea className={areaCls} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
              </AField>
            </div>
            <div className="md:col-span-2">
              <AField label="Article body (blank line between paragraphs)">
                <textarea className={areaCls + ' min-h-[220px]'} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
              </AField>
            </div>
            <div className="md:col-span-2">
              <AField label="Featured image">
                <FilePicker
                  accept="image/*"
                  label={form.imageUrl ? 'Replace image' : 'Upload image'}
                  current={form.imageUrl}
                  onUploaded={(f) => setForm({ ...form, imageUrl: f.url })}
                />
                {form.imageUrl && (
                  <div className="mt-5 max-w-[340px] border border-[#dcd8cd]">
                    <img src={form.imageUrl} alt="" className="w-full h-auto" />
                  </div>
                )}
              </AField>
            </div>
          </EditorShell>
        </div>
      )}

      <ATable head={['Headline', 'Category', 'Date', 'Status', '']}>
        {(list.data ?? []).map((n) => (
          <ARow key={n.id} onClick={() => openEdit(n)}>
            <ACell className="font-display font-bold text-[16px] max-w-[380px]">{n.title}</ACell>
            <ACell>{n.category}</ACell>
            <ACell>{n.date}</ACell>
            <ACell><StatusPill value={n.published} /></ACell>
            <ACell className="text-right whitespace-nowrap">
              <button className="tlink !text-[12px] mr-6" onClick={(e) => { e.stopPropagation(); openEdit(n) }}>Edit</button>
              <button
                className="tlink !text-[12px] !text-[#8c3b2e]"
                onClick={(e) => {
                  e.stopPropagation()
                  if (confirm(`Delete "${n.title}"?`)) del.mutate({ id: n.id })
                }}
              >
                Delete
              </button>
            </ACell>
          </ARow>
        ))}
      </ATable>
      {list.data && list.data.length === 0 && <p className="text-[14px] text-[#6e746f] py-10">No articles yet. Create the first one.</p>}
    </AdminLayout>
  )
}
