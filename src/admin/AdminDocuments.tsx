import { useState } from 'react'
import AdminLayout from './AdminLayout'
import { AButton, ACell, AField, ARow, ASelect, ATable, EditorShell, FilePicker, areaCls, inputCls, trpc } from './controls'
import type { Document as DocRow } from '@db/schema'

const CATS = ['Certificates', 'Policies', 'Compliance', 'Forms', 'Reports', 'Other']

const EMPTY = {
  title: '',
  category: 'Certificates',
  description: '',
  fileUrl: '',
  fileName: '',
  fileSize: '',
}

function fmtSize(bytes?: number) {
  if (!bytes) return ''
  if (bytes > 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + ' MB'
  return Math.max(1, Math.round(bytes / 1024)) + ' KB'
}

export default function AdminDocuments() {
  const utils = trpc.useUtils()
  const list = trpc.content.documentsAll.useQuery()
  const create = trpc.content.createDocument.useMutation({ onSuccess: () => utils.content.documentsAll.invalidate() })
  const update = trpc.content.updateDocument.useMutation({ onSuccess: () => utils.content.documentsAll.invalidate() })
  const del = trpc.content.deleteDocument.useMutation({ onSuccess: () => utils.content.documentsAll.invalidate() })

  const [editing, setEditing] = useState<number | 'new' | null>(null)
  const [form, setForm] = useState(EMPTY)

  function openNew() {
    setForm(EMPTY)
    setEditing('new')
  }
  function openEdit(d: DocRow) {
    setForm({
      title: d.title,
      category: d.category,
      description: d.description ?? '',
      fileUrl: d.fileUrl,
      fileName: d.fileName,
      fileSize: d.fileSize ?? '',
    })
    setEditing(d.id)
  }
  function submit() {
    if (!form.fileUrl) return
    if (editing === 'new') create.mutate(form, { onSuccess: () => setEditing(null) })
    else if (typeof editing === 'number') update.mutate({ id: editing, ...form }, { onSuccess: () => setEditing(null) })
  }

  return (
    <AdminLayout title="Documents" action={<AButton label="New document" onClick={openNew} />}>
      {editing !== null && (
        <div className="mb-14">
          <EditorShell
            title={editing === 'new' ? 'New document' : 'Edit document'}
            submitLabel={editing === 'new' ? 'Add document' : 'Save changes'}
            busy={create.isPending || update.isPending}
            onCancel={() => setEditing(null)}
            onSubmit={submit}
          >
            <AField label="Document title">
              <input className={inputCls} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </AField>
            <AField label="Category">
              <ASelect value={form.category} onChange={(v) => setForm({ ...form, category: v })} options={CATS.map((c) => ({ value: c, label: c }))} />
            </AField>
            <div className="md:col-span-2">
              <AField label="Description">
                <textarea className={areaCls} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </AField>
            </div>
            <div className="md:col-span-2">
              <AField label="File (PDF, image, or video)">
                <FilePicker
                  accept=".pdf,image/*,video/*"
                  label={form.fileUrl ? 'Replace file' : 'Upload file'}
                  current={form.fileName ? `${form.fileName}${form.fileSize ? ' · ' + form.fileSize : ''}` : ''}
                  onUploaded={(f) => setForm({ ...form, fileUrl: f.url, fileName: f.fileName, fileSize: fmtSize(f.size) })}
                />
              </AField>
            </div>
          </EditorShell>
        </div>
      )}

      <ATable head={['Title', 'Category', 'File', 'Size', '']}>
        {(list.data ?? []).map((d) => (
          <ARow key={d.id} onClick={() => openEdit(d)}>
            <ACell className="font-display font-bold text-[16px] max-w-[340px]">{d.title}</ACell>
            <ACell>{d.category}</ACell>
            <ACell>
              <a href={d.fileUrl} target="_blank" rel="noreferrer" className="tlink !text-[13px]" onClick={(e) => e.stopPropagation()}>
                {d.fileName}
              </a>
            </ACell>
            <ACell>{d.fileSize}</ACell>
            <ACell className="text-right whitespace-nowrap">
              <button className="tlink !text-[12px] mr-6" onClick={(e) => { e.stopPropagation(); openEdit(d) }}>Edit</button>
              <button
                className="tlink !text-[12px] !text-[#8c3b2e]"
                onClick={(e) => {
                  e.stopPropagation()
                  if (confirm(`Delete "${d.title}"?`)) del.mutate({ id: d.id })
                }}
              >
                Delete
              </button>
            </ACell>
          </ARow>
        ))}
      </ATable>
      {list.data && list.data.length === 0 && <p className="text-[14px] text-[#6e746f] py-10">No documents yet. Upload the first one.</p>}
    </AdminLayout>
  )
}
