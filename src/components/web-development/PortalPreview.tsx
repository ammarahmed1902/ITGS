import { useState, type KeyboardEvent } from 'react';
import { Activity, CalendarDays, FileCode2, FileText, FolderClosed, LayoutDashboard, Search } from 'lucide-react';

type PortalTab = 'Overview' | 'Files' | 'Updates';

const files = [
  { name: 'User journeys', detail: 'Planning document', icon: FileText },
  { name: 'Interface prototype', detail: 'Design preview', icon: FileCode2 },
  { name: 'Integration notes', detail: 'Technical document', icon: FileText },
];

const updates = [
  { title: 'Prototype ready for review', detail: 'Interface design' },
  { title: 'User journeys refined', detail: 'Product planning' },
  { title: 'Project brief organized', detail: 'Discovery' },
];

function FilesList() {
  return (
    <div className="overflow-hidden rounded-lg border border-[#e2eaf2] bg-white">
      <div className="flex items-center justify-between border-b border-[#e2eaf2] px-4 py-3">
        <h4 className="text-sm font-semibold tracking-normal text-ink">Project files</h4>
        <FolderClosed size={16} className="text-electric" aria-hidden="true" />
      </div>
      <ul className="divide-y divide-[#edf1f5]">
        {files.map(({ name, detail, icon: Icon }) => (
          <li key={name} className="flex items-center gap-3 px-4 py-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-[#eaf3ff] text-electric"><Icon size={17} aria-hidden="true" /></span>
            <span className="min-w-0"><span className="block truncate text-[13px] font-semibold text-ink">{name}</span><span className="block text-[11px] text-steel">{detail}</span></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UpdatesList() {
  return (
    <div className="overflow-hidden rounded-lg border border-[#e2eaf2] bg-white">
      <div className="flex items-center justify-between border-b border-[#e2eaf2] px-4 py-3">
        <h4 className="text-sm font-semibold tracking-normal text-ink">Latest updates</h4>
        <Activity size={16} className="text-electric" aria-hidden="true" />
      </div>
      <ol className="divide-y divide-[#edf1f5]">
        {updates.map(({ title, detail }) => (
          <li key={title} className="flex gap-3 px-4 py-3">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-electric" aria-hidden="true" />
            <span><span className="block text-[13px] font-semibold leading-5 text-ink">{title}</span><span className="block text-[11px] text-steel">{detail}</span></span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function PortalPreview({ interactive = false }: { interactive?: boolean }) {
  const [tab, setTab] = useState<PortalTab>('Overview');
  const tabs: PortalTab[] = ['Overview', 'Files', 'Updates'];

  const handleTabKey = (event: KeyboardEvent<HTMLButtonElement>, current: PortalTab) => {
    const index = tabs.indexOf(current);
    const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length
      : event.key === 'ArrowLeft' ? (index - 1 + tabs.length) % tabs.length
      : event.key === 'Home' ? 0
      : event.key === 'End' ? tabs.length - 1
      : -1;
    if (next < 0) return;
    event.preventDefault();
    setTab(tabs[next]);
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('button')[next]?.focus();
  };

  return (
    <div role="group" className="overflow-hidden rounded-xl border border-[#dce7f2] bg-[#f8fbfe] text-ink shadow-[0_24px_60px_rgba(2,19,41,.16)]" aria-label="ITGS internal concept portal, illustrative data">
      <div className="flex h-14 items-center justify-between gap-3 border-b border-[#e2eaf2] bg-white px-4 sm:px-5">
        <div className="flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-md bg-[#102a40] text-[11px] font-bold tracking-tight text-white">IT</span>
          <span className="text-sm font-bold tracking-[-.02em] text-ink">ITGS <span className="font-medium text-steel">Portal</span></span>
        </div>
        <span className="hidden items-center gap-2 rounded-md border border-[#e2eaf2] px-3 py-1.5 text-xs text-steel sm:inline-flex"><Search size={13} aria-hidden="true" /> Find a file</span>
        <span className="flex size-8 items-center justify-center rounded-full bg-[#e9f1ff] text-[11px] font-semibold text-[#1454b8]" aria-label="ITGS concept workspace">IT</span>
      </div>

      <div className="grid sm:grid-cols-[144px_minmax(0,1fr)]">
        <aside className="hidden border-r border-[#e2eaf2] bg-[#f2f7fc] p-3 sm:block" aria-label="Concept portal navigation">
          <p className="px-2 py-2 text-[10px] font-semibold uppercase tracking-[.13em] text-steel">Workspace</p>
          {[{ label: 'Overview', icon: LayoutDashboard }, { label: 'Projects', icon: FolderClosed }, { label: 'Files', icon: FileText }, { label: 'Updates', icon: Activity }, { label: 'Timeline', icon: CalendarDays }].map(({ label, icon: Icon }) => (
            <div key={label} className={`mb-1 flex items-center gap-2 rounded-md px-2.5 py-2 text-xs ${label === (interactive ? tab : 'Overview') ? 'bg-[#e3efff] font-semibold text-[#155eef]' : 'text-steel'}`}>
              <Icon size={15} aria-hidden="true" />{label}
            </div>
          ))}
        </aside>

        <div className="min-w-0 p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.13em] text-[#155eef]">ITGS internal concept</p>
              <h3 className="mt-1 text-lg font-semibold tracking-[-.04em] text-ink sm:text-xl">Web platform project</h3>
              <p className="mt-1 text-xs text-steel">A clear place for plans, files, and decisions.</p>
            </div>
            <span className="rounded-full border border-[#cfe0f5] bg-[#eef6ff] px-2.5 py-1 text-[10px] font-semibold text-[#1454b8]">Illustrative data</span>
          </div>

          <div className="mt-5 flex gap-1 overflow-x-auto border-b border-[#dce7f2]" role={interactive ? 'tablist' : undefined} aria-label={interactive ? 'Explore the concept portal' : undefined}>
            {tabs.map((item) => interactive ? (
              <button key={item} id={`portal-tab-${item.toLowerCase()}`} role="tab" type="button" onClick={() => setTab(item)} onKeyDown={(event) => handleTabKey(event, item)} aria-selected={tab === item} aria-controls="portal-example-panel" tabIndex={tab === item ? 0 : -1} className={`min-h-11 shrink-0 border-b-2 px-3 text-xs font-semibold transition-colors ${tab === item ? 'border-electric text-electric' : 'border-transparent text-steel hover:text-ink'}`}>{item}</button>
            ) : (
              <span key={item} className={`flex min-h-10 shrink-0 items-center border-b-2 px-3 text-xs font-semibold ${item === 'Overview' ? 'border-electric text-electric' : 'border-transparent text-steel'}`}>{item}</span>
            ))}
          </div>

          <div id={interactive ? 'portal-example-panel' : undefined} role={interactive ? 'tabpanel' : undefined} aria-labelledby={interactive ? `portal-tab-${tab.toLowerCase()}` : undefined} tabIndex={interactive ? 0 : undefined}>
          {tab === 'Overview' || !interactive ? (
            <div className="mt-4 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-[#e2eaf2] bg-white p-3.5">
                  <span className="text-[11px] text-steel">Current focus</span>
                  <span className="mt-1 flex items-center gap-2 text-[13px] font-semibold text-ink"><span className="flex size-7 items-center justify-center rounded-md bg-[#eaf3ff] text-electric"><LayoutDashboard size={15} aria-hidden="true" /></span> Prototype review</span>
                </div>
                <div className="rounded-lg border border-[#e2eaf2] bg-white p-3.5">
                  <span className="text-[11px] text-steel">Next step</span>
                  <span className="mt-1 flex items-center gap-2 text-[13px] font-semibold text-ink"><span className="flex size-7 items-center justify-center rounded-md bg-[#eaf3ff] text-electric"><CalendarDays size={15} aria-hidden="true" /></span> Agree build scope</span>
                </div>
              </div>
              <div className="grid gap-3 lg:grid-cols-[1fr_1fr]">
                <FilesList />
                <UpdatesList />
              </div>
              <div className="rounded-lg border border-[#e2eaf2] bg-white px-4 py-3">
                <p className="text-xs font-semibold text-ink">Delivery timeline</p>
                <div className="mt-3 grid grid-cols-4 gap-1" aria-label="Concept timeline: discovery, prototype, build, launch">
                  {['Discovery', 'Prototype', 'Build', 'Launch'].map((stage, index) => <div key={stage} className="min-w-0"><div className={`mb-1.5 h-1 rounded-full ${index < 2 ? 'bg-electric' : 'bg-[#d7e4f3]'}`} /><span className="block truncate text-[10px] text-steel">{stage}</span></div>)}
                </div>
              </div>
            </div>
          ) : tab === 'Files' ? (
            <div className="mt-4 space-y-3"><p className="text-xs leading-5 text-steel">Plans and working files are organized around the decisions the team needs to make.</p><FilesList /></div>
          ) : (
            <div className="mt-4 space-y-3"><p className="text-xs leading-5 text-steel">A shared activity view makes reviews and next steps easier to follow.</p><UpdatesList /></div>
          )}
          </div>

          {interactive && <p className="mt-4 text-[11px] font-medium text-[#1454b8]">Self-initiated concept · Not client work</p>}
        </div>
      </div>
    </div>
  );
}
