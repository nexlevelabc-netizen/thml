import { useState } from 'react'
import AdminLayout from './AdminLayout'
import { AButton, ACell, AField, ARow, ASelect, ATable, EditorShell, FilePicker, StatusPill, areaCls, inputCls, trpc } from './controls'
import type { Event } from '@db/schema'

const EMPTY = {
  title: '',
  date: '',
  time: '',
  location: '',
  description: '',
  published: 'draft' as 'draft' | 'live',
}

type MediaDraft = { kind: 'image' | 'video'; url: string; title: string; mime?: string; sizeBytes?: string }

export default function AdminEvents() {
  const utils = trpc.useUtils()
  const list = trpc.content.eventsAll.useQuery()
  const mediaAll = trpc.content.mediaAll.useQuery()
  const create = trpc.content.createEvent.useMutation({ onSuccess: () => utils.content.eventsAll.invalidate() })
  const update = trpc.content.updateEvent.useMutation({ onSuccess: () => utils.content.eventsAll.invalidate() })
  const del = trpc.content.deleteEvent.useMutation({ onSuccess: () => utils.content.eventsAll.invalidate() })
  const addMedia = trpc.content.createMedia.useMutation({
    onSuccess: () => {
      utils.content.mediaAll.invalidate()
    },
  })
  const delMedia = trpc.content.deleteMedia.useMutation({ onSuccess: () => utils.content.mediaAll.invalidate() })

  const [editing, setEditing] = useState<number | 'new' | null>(null)
  const [form, setForm] = useState(EMPTY)
  const [pendingMedia, setPendingMedia] = useState<MediaDraft[]>([])

  function openNew() {
    setForm(EMPTY)
    setPendingMedia([])
    setEditing('new')
  }
  function openEdit(ev: Event) {
    setForm({
      title: ev.title,
      date: ev.date,
      time: ev.time ?? '',
      location: ev.location ?? '',
      description: ev.description ?? '',
      published: ev.published,
    })
    setPendingMedia([])
    setEditing(ev.id)
  }

  async function submit() {
    const savedId =
      editing === 'new'
        ? (await create.mutateAsync(form)).id
        : typeof editing === 'number'
          ? (await update.mutateAsync({ id: editing, ...form }), editing)
          : null
    if (savedId != null) {
      for (const m of pendingMedia) {
        await addMedia.mutateAsync({ ...m, eventId: savedId })
      }
    }
    setEditing(null)
    setPendingMedia([])
  }

  const eventMedia = typeof editing === 'number' ? (mediaAll.data ?? []).filter((m) => m.eventId === editing) : []

  function upload(kind: 'image' | 'video') {
    return (f: { url: string; fileName: string; size: number; mime: string }) => {
      const draft: MediaDraft = {
        kind,
        url: f.url,
        title: f.fileName,
        mime: f.mime,
        sizeBytes: String(f.size),
      }
      if (typeof editing === 'number') {
        addMedia.mutate({ ...draft, eventId: editing })
      } else {
        setPendingMedia((p) => [...p, draft])
      }
    }
  }

  return (
    <AdminLayout title="Events" action={<AButton label="New event" onClick={openNew} />}>
      {editing !== null && (
        <div className="mb-14">
          <EditorShell
            title={editing === 'new' ? 'New event' : 'Edit event'}
            submitLabel={editing === 'new' ? 'Create event' : 'Save changes'}
            busy={create.isPending || update.isPending}
            onCancel={() => setEditing(null)}
            onSubmit={submit}
          >
            <AField label="Event title">
              <input className={inputCls} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </AField>
            <AField label="Date">
              <input className={inputCls} placeholder="e.g. 18 October 2026" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </AField>
            <AField label="Time">
              <input className={inputCls} placeholder="e.g. 10:00 to 13:00" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
            </AField>
            <AField label="Location">
              <input className={inputCls} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </AField>
            <div className="md:col-span-2">
              <AField label="Description">
                <textarea className={areaCls} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </AField>
            </div>
            <AField label="Status">
              <ASelect value={form.published} onChange={(v) => setForm({ ...form, published: v as 'draft' | 'live' })} options={[
                { value: 'draft', label: 'Draft' },
                { value: 'live', label: 'Live' },
              ]} />
            </AField>

            {/* images and videos for this event */}
            <div className="md:col-span-2 pt-6 border-t border-[#dcd8cd]">
              <p className="label text-[#6e746f] mb-6">Images and videos</p>
              <div className="flex gap-4 flex-wrap">
                <FilePicker accept="image/*" label="Upload image" onUploaded={upload('image')} />
                <FilePicker accept="video/mp4,video/webm,video/quicktime" label="Upload video" onUploaded={upload('video')} />
              </div>

              {(eventMedia.length > 0 || pendingMedia.length > 0) && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">
                  {eventMedia.map((m) => (
                    <div key={m.id} className="border border-[#dcd8cd]">
                      {m.kind === 'image' ? (
                        <img src={m.url} alt={m.title} className="w-full aspect-[4/3] object-cover" />
                      ) : (
                        <video src={m.url} className="w-full aspect-[4/3] object-cover" muted />
                      )}
                      <div className="flex items-center justify-between px-3 py-2">
                        <span className="label !text-[9px] text-[#6e746f]">{m.kind}</span>
                        <button
                          className="tlink !text-[11px] !text-[#8c3b2e]"
                          onClick={() => confirm('Remove this file?') && delMedia.mutate({ id: m.id })}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  {pendingMedia.map((m, i) => (
                    <div key={i} className="border border-[#dcd8cd] opacity-70">
                      {m.kind === 'image' ? (
                        <img src={m.url} alt={m.title} className="w-full aspect-[4/3] object-cover" />
                      ) : (
                        <video src={m.url} className="w-full aspect-[4/3] object-cover" muted />
                      )}
                      <div className="flex items-center justify-between px-3 py-2">
                        <span className="label !text-[9px] text-[#6e746f]">{m.kind} · saves with event</span>
                        <button className="tlink !text-[11px] !text-[#8c3b2e]" onClick={() => setPendingMedia((p) => p.filter((_, x) => x !== i))}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </EditorShell>
        </div>
      )}

      <ATable head={['Event', 'Date', 'Location', 'Status', '']}>
        {(list.data ?? []).map((ev) => (
          <ARow key={ev.id} onClick={() => openEdit(ev)}>
            <ACell className="font-display font-bold text-[16px] max-w-[340px]">{ev.title}</ACell>
            <ACell>{ev.date}{ev.time ? ` · ${ev.time}` : ''}</ACell>
            <ACell>{ev.location}</ACell>
            <ACell><StatusPill value={ev.published} /></ACell>
            <ACell className="text-right whitespace-nowrap">
              <button className="tlink !text-[12px] mr-6" onClick={(e) => { e.stopPropagation(); openEdit(ev) }}>Edit</button>
              <button
                className="tlink !text-[12px] !text-[#8c3b2e]"
                onClick={(e) => {
                  e.stopPropagation()
                  if (confirm(`Delete "${ev.title}"?`)) del.mutate({ id: ev.id })
                }}
              >
                Delete
              </button>
            </ACell>
          </ARow>
        ))}
      </ATable>
      {list.data && list.data.length === 0 && <p className="text-[14px] text-[#6e746f] py-10">No events yet. Create the first one.</p>}
    </AdminLayout>
  )
}
