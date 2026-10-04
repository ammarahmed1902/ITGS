import { useState, type ReactNode } from 'react';
import { ArrowLeft, CalendarDays, Check, CheckCircle2, ChevronRight, Clock3, Pencil, Video, type LucideIcon } from 'lucide-react';

type BookingState = 'Details' | 'Confirmed' | 'Manage';

function PhoneFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div role="group" aria-label={label} className="w-full max-w-[284px] overflow-hidden rounded-[30px] border-[5px] border-[#153149] bg-white shadow-[0_22px_44px_rgba(2,19,41,.18)]">
      <div className="relative flex h-9 items-center justify-center border-b border-[#edf1f5] bg-white">
        <span className="absolute left-4 text-[10px] font-semibold text-ink">9:41</span>
        <span className="h-3 w-16 rounded-full bg-[#102a40]" aria-hidden="true" />
        <span className="absolute right-4 flex items-center gap-1" aria-hidden="true"><span className="h-2 w-1.5 rounded-sm bg-ink" /><span className="h-2.5 w-1.5 rounded-sm bg-ink" /><span className="h-2 w-4 rounded-sm border border-ink"><span className="block h-full w-2.5 bg-ink" /></span></span>
      </div>
      <div className="min-h-[476px] bg-[#f8fbfe] p-4 text-ink">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[12px] font-bold tracking-[-.02em]">ITGS <span className="font-medium text-steel">Bookings</span></span>
          <span className="text-[9px] font-medium text-[#41627e]">Illustrative data</span>
        </div>
        {children}
      </div>
      <div className="flex h-5 items-center justify-center bg-white"><span className="h-1 w-20 rounded-full bg-[#102a40]" aria-hidden="true" /></div>
    </div>
  );
}

function SelectionScreen() {
  return (
    <PhoneFrame label="ITGS internal concept mobile screen: choose a service and time">
      <p className="text-[10px] font-semibold uppercase tracking-[.12em] text-electric">Book an appointment</p>
      <h3 className="mt-2 text-[22px] font-semibold leading-tight tracking-[-.045em] text-ink">Choose what you need.</h3>
      <p className="mt-2 text-[11px] leading-4 text-steel">Start with a service, then choose a time that works.</p>
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between rounded-lg border border-[#8eb9f6] bg-[#eaf3ff] p-3">
          <div><p className="text-[12px] font-semibold text-ink">Intro session</p><p className="mt-0.5 text-[10px] text-steel">30 minutes · Video call</p></div>
          <span className="flex size-5 items-center justify-center rounded-full bg-electric text-white"><Check size={12} aria-hidden="true" /></span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-[#e1e9f1] bg-white p-3"><div><p className="text-[12px] font-semibold text-ink">Follow-up</p><p className="mt-0.5 text-[10px] text-steel">20 minutes · Video call</p></div><span className="size-5 rounded-full border border-[#c7d3df]" aria-hidden="true" /></div>
      </div>
      <div className="mt-5 flex items-center gap-2 text-[11px] font-semibold text-ink"><CalendarDays size={15} className="text-electric" aria-hidden="true" /> Available times</div>
      <div className="mt-2 flex gap-2"><span className="rounded-md border border-[#9dc2f4] bg-[#eaf3ff] px-2.5 py-2 text-[10px] font-semibold text-[#1454b8]">Thu</span><span className="rounded-md border border-[#e1e9f1] bg-white px-2.5 py-2 text-[10px] text-steel">Fri</span><span className="rounded-md border border-[#e1e9f1] bg-white px-2.5 py-2 text-[10px] text-steel">Mon</span></div>
      <div className="mt-2 flex gap-2"><span className="rounded-md bg-electric px-2.5 py-2 text-[10px] font-semibold text-white">10:30 AM</span><span className="rounded-md border border-[#e1e9f1] bg-white px-2.5 py-2 text-[10px] text-steel">2:00 PM</span></div>
      <div className="mt-5 flex min-h-9 items-center justify-center gap-1 rounded-md bg-electric text-[11px] font-semibold text-white">Continue <ChevronRight size={14} aria-hidden="true" /></div>
    </PhoneFrame>
  );
}

function SummaryRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return <div className="flex items-start gap-2.5 border-b border-[#edf1f5] py-2.5 last:border-0"><Icon className="mt-0.5 shrink-0 text-electric" size={15} aria-hidden="true" /><div><p className="text-[10px] text-steel">{label}</p><p className="text-[12px] font-semibold text-ink">{value}</p></div></div>;
}

function JourneyScreen({ state }: { state: BookingState }) {
  const confirmed = state === 'Confirmed';
  const managing = state === 'Manage';
  return (
    <PhoneFrame label={`ITGS internal concept mobile screen: ${state.toLowerCase()} appointment`}>
      <div className="flex items-center gap-2 text-[11px] font-semibold text-[#41627e]"><ArrowLeft size={14} aria-hidden="true" /> Appointments</div>
      {confirmed ? (
        <div className="mt-6 text-center"><span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#e6f1ff] text-electric"><CheckCircle2 size={29} strokeWidth={1.8} aria-hidden="true" /></span><h3 className="mt-3 text-[22px] font-semibold leading-tight tracking-[-.045em] text-ink">Booking confirmed.</h3><p className="mt-1.5 text-[11px] leading-4 text-steel">Your appointment details are ready below.</p></div>
      ) : (
        <div className="mt-5"><p className="text-[10px] font-semibold uppercase tracking-[.12em] text-electric">{managing ? 'Your appointment' : 'Almost there'}</p><h3 className="mt-2 text-[22px] font-semibold leading-tight tracking-[-.045em] text-ink">{managing ? 'Manage your booking.' : 'Review your booking.'}</h3><p className="mt-1.5 text-[11px] leading-4 text-steel">{managing ? 'The key details, all in one place.' : 'Check the details before confirming.'}</p></div>
      )}
      <div className={`${confirmed ? 'mt-5' : 'mt-6'} rounded-lg border border-[#e1e9f1] bg-white p-3.5`}>
        <p className="text-[11px] font-semibold text-ink">Intro session</p>
        <SummaryRow icon={CalendarDays} label="When" value="Thursday · 10:30 AM" />
        <SummaryRow icon={Clock3} label="Duration" value="30 minutes" />
        <SummaryRow icon={Video} label="Where" value="Video call" />
      </div>
      {managing ? (
        <div className="mt-4 space-y-2"><div className="flex min-h-10 items-center justify-between rounded-md border border-[#cbdbee] bg-white px-3 text-[11px] font-semibold text-[#1454b8]"><span className="flex items-center gap-2"><Pencil size={14} aria-hidden="true" /> Change time</span><ChevronRight size={14} aria-hidden="true" /></div><div className="flex min-h-10 items-center justify-between rounded-md border border-[#e1e9f1] bg-white px-3 text-[11px] font-medium text-steel">View appointment details <ChevronRight size={14} aria-hidden="true" /></div></div>
      ) : (
        <div className={`flex min-h-10 items-center justify-center gap-1 rounded-md text-[11px] font-semibold ${confirmed ? 'mt-4 border border-[#a6c5eb] bg-white text-[#1454b8]' : 'mt-5 bg-electric text-white'}`}>{confirmed ? 'Manage booking' : 'Confirm appointment'} <ChevronRight size={14} aria-hidden="true" /></div>
      )}
      <p className="mt-4 text-center text-[10px] text-steel">ITGS internal concept</p>
    </PhoneFrame>
  );
}

export default function BookingPreview({ interactive = false }: { interactive?: boolean }) {
  const [state, setState] = useState<BookingState>('Confirmed');
  const states: BookingState[] = ['Details', 'Confirmed', 'Manage'];
  return (
    <div role="group" aria-label="ITGS internal concept appointment-booking screens" className="min-w-0">
      {interactive && <div className="mb-5 flex flex-wrap items-center gap-2" aria-label="Preview appointment states"><span className="mr-1 text-xs font-medium text-steel">Preview state:</span>{states.map((item) => <button key={item} type="button" aria-pressed={state === item} onClick={() => setState(item)} className={`min-h-11 rounded-md border px-3 text-xs font-semibold transition-colors ${state === item ? 'border-electric bg-electric text-white' : 'border-border bg-white text-ink hover:border-electric'}`}>{item}</button>)}</div>}
      <div className="grid justify-items-center gap-5 sm:grid-cols-2 sm:items-start sm:gap-4">
        <SelectionScreen />
        <JourneyScreen state={state} />
      </div>
      {interactive && <p className="mt-4 text-xs font-medium text-steel">Self-initiated concept · Not client work · Illustrative data</p>}
    </div>
  );
}
