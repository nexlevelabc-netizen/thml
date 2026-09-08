import AdminLayout from './AdminLayout'
import { FilePicker, trpc } from './controls'
import { Link } from 'react-router-dom'

export function AdminHome() {
  const jobs = trpc.content.jobsAll.useQuery()
  const news = trpc.content.newsAll.useQuery()
  const docs = trpc.content.documentsAll.useQuery()
  const events = trpc.content.eventsAll.useQuery()

  const cards = [
    { label: 'Jobs', to: '/admin/jobs', total: jobs.data?.length ?? 0, live: jobs.data?.filter((j) => j.published === 'live').length ?? 0 },
    { label: 'News', to: '/admin/news', total: news.data?.length ?? 0, live: news.data?.filter((n) => n.published === 'live').length ?? 0 },
    { label: 'Documents', to: '/admin/documents', total: docs.data?.length ?? 0, live: docs.data?.length ?? 0 },
    { label: 'Events', to: '/admin/events', total: events.data?.length ?? 0, live: events.data?.filter((e) => e.published === 'live').length ?? 0 },
  ]

  return (
    <AdminLayout title="Overview">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-[#dcd8cd] border border-[#dcd8cd]">
        {cards.map((c) => (
          <Link key={c.label} to={c.to} className="bg-[#f7f5f0] p-8 md:p-10 group">
            <p className="label text-[#6e746f]">{c.label}</p>
            <p className="font-display text-[64px] font-extrabold leading-none mt-6 tracking-[-0.02em] group-hover:text-[#1d6151] transition-colors">
              {String(c.total).padStart(2, '0')}
            </p>
            <p className="text-[13px] text-[#6e746f] mt-3">
              {c.label === 'Documents' ? `${c.total} on file` : `${c.live} live · ${c.total - c.live} draft`}
            </p>
          </Link>
        ))}
      </div>
      <p className="text-[14px] text-[#6e746f] leading-[1.7] mt-12 max-w-[560px]">
        Manage the content shown across the THML website. Vacancies appear on the careers page, articles on the news
        page, and events with their images and videos can be attached from the events section. Documents are available
        for download from the compliance and resource areas.
      </p>
    </AdminLayout>
  )
}

export function AdminMedia() {
  const utils = trpc.useUtils()
  const mediaAll = trpc.content.mediaAll.useQuery()
  const del = trpc.content.deleteMedia.useMutation({ onSuccess: () => utils.content.mediaAll.invalidate() })
  const add = trpc.content.createMedia.useMutation({ onSuccess: () => utils.content.mediaAll.invalidate() })

  return (
    <AdminLayout
      title="Media Library"
      action={
        <div className="flex gap-4">
          <FilePicker
            accept="image/*"
            label="Upload image"
            onUploaded={(f) => add.mutate({ kind: 'image', title: f.fileName, url: f.url, mime: f.mime, sizeBytes: String(f.size) })}
          />
          <FilePicker
            accept="video/mp4,video/webm,video/quicktime"
            label="Upload video"
            onUploaded={(f) => add.mutate({ kind: 'video', title: f.fileName, url: f.url, mime: f.mime, sizeBytes: String(f.size) })}
          />
        </div>
      }
    >
      {mediaAll.data && mediaAll.data.length === 0 && (
        <p className="text-[14px] text-[#6e746f] py-10">The library is empty. Upload images or videos to reuse them across the site.</p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-5">
        {(mediaAll.data ?? []).map((m) => (
          <div key={m.id} className="border border-[#dcd8cd] bg-white/40">
            {m.kind === 'image' ? (
              <img src={m.url} alt={m.title} className="w-full aspect-[4/3] object-cover" />
            ) : (
              <video src={m.url} className="w-full aspect-[4/3] object-cover" muted controls />
            )}
            <div className="px-4 py-3">
              <p className="text-[12px] text-[#1c1f1d] truncate">{m.title}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="label !text-[9px] text-[#6e746f]">{m.kind}</span>
                <button
                  className="tlink !text-[11px] !text-[#8c3b2e]"
                  onClick={() => confirm(`Remove "${m.title}"?`) && del.mutate({ id: m.id })}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}


