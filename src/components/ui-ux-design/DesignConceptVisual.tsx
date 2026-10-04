import type { ReactNode } from 'react';
import { ArrowRight, Check, CheckCircle2, ChevronRight, LayoutTemplate } from 'lucide-react';

function FlowStep({ number, label }: { number: string; label: string }) {
  return <div className="flex min-w-0 flex-1 items-center gap-1 rounded-md border border-[#d8e5f3] bg-white px-1.5 py-2 text-[10px] font-semibold text-ink sm:gap-2 sm:px-2.5 sm:text-[11px]"><span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[#e9f2ff] text-[9px] text-electric sm:size-5">{number}</span><span className="whitespace-nowrap">{label}</span></div>;
}

function WireframePanel() {
  return (
    <div className="h-full rounded-lg border border-[#dce5ee] bg-white p-3">
      <div className="flex items-center gap-1.5 border-b border-[#e7edf3] pb-2"><span className="size-1.5 rounded-full bg-[#becbd7]" /><span className="size-1.5 rounded-full bg-[#becbd7]" /><span className="size-1.5 rounded-full bg-[#becbd7]" /><span className="ml-auto h-1.5 w-12 rounded bg-[#e3e9ef]" /></div>
      <div className="mt-4 h-2 w-12 rounded bg-[#d8e2ec]" />
      <div className="mt-3 h-4 w-3/4 rounded bg-[#c8d4e0]" />
      <div className="mt-2 h-1.5 w-full rounded bg-[#e0e8f0]" />
      <div className="mt-1.5 h-1.5 w-4/5 rounded bg-[#e0e8f0]" />
      <div className="mt-5 h-2 w-20 rounded bg-[#ccd8e4]" />
      <div className="mt-2 h-9 rounded-md border border-[#d8e2ec] bg-[#f9fbfd]" />
      <div className="mt-4 h-2 w-16 rounded bg-[#ccd8e4]" />
      <div className="mt-2 flex gap-2"><div className="h-8 flex-1 rounded-md border border-[#c8d8e9] bg-[#eaf2fb]" /><div className="h-8 flex-1 rounded-md border border-[#d8e2ec]" /></div>
      <div className="mt-5 h-9 rounded-md bg-[#a9bdd3]" />
    </div>
  );
}

function FinishedPanel() {
  return (
    <div className="h-full rounded-lg border border-[#dce5ee] bg-white p-3 shadow-[0_8px_24px_rgba(16,42,64,.06)]">
      <div className="flex items-center justify-between border-b border-[#e7edf3] pb-2"><span className="text-[11px] font-bold text-ink">ITGS <span className="font-medium text-steel">Workspace</span></span><span className="text-[9px] font-medium text-[#155eef]">2 of 3</span></div>
      <p className="mt-4 text-[9px] font-semibold uppercase tracking-[.12em] text-electric">Your workspace</p>
      <h4 className="mt-1 text-[15px] font-semibold leading-tight tracking-[-.04em] text-ink">Set up your space.</h4>
      <p className="mt-1.5 text-[10px] leading-4 text-steel">A few details to make this yours.</p>
      <div className="mt-4"><p className="text-[10px] font-semibold text-ink">Workspace name</p><div className="mt-1.5 flex h-8 items-center rounded-md border border-[#cdddeb] px-2 text-[10px] text-[#51667a]">My workspace</div></div>
      <p className="mt-4 text-[10px] font-semibold text-ink">What will you do first?</p>
      <div className="mt-2 flex gap-2"><span className="flex flex-1 items-center justify-center gap-1 rounded-md border border-[#9ac3f9] bg-[#eaf3ff] px-1 py-2 text-[9px] font-semibold text-[#1454b8]"><Check size={11} aria-hidden="true" /> Plan work</span><span className="flex flex-1 items-center justify-center rounded-md border border-[#d8e2ec] px-1 py-2 text-[9px] text-steel">Share files</span></div>
      <div className="mt-4 flex h-9 items-center justify-center gap-1 rounded-md bg-electric text-[10px] font-semibold text-white">Continue <ChevronRight size={13} aria-hidden="true" /></div>
    </div>
  );
}

export function DesignWorkspacePreview() {
  return (
    <div role="group" aria-label="ITGS internal concept: user flow, wireframe, and finished interface" className="overflow-hidden rounded-xl border border-[#dce7f2] bg-[#f5f9fd] text-ink shadow-[0_24px_60px_rgba(2,19,41,.16)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e0e9f2] bg-white px-4 py-3"><span className="flex items-center gap-2 text-xs font-bold text-ink"><span className="flex size-7 items-center justify-center rounded-md bg-[#102a40] text-[10px] text-white">IT</span> ITGS Design workspace</span><span className="text-[10px] font-semibold text-[#41627e]">Illustrative data</span></div>
      <div className="p-4 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[.13em] text-electric">01 / User flow</p>
        <div className="mt-2 flex items-center gap-1 sm:gap-1.5"><FlowStep number="1" label="Welcome" /><ArrowRight size={12} className="shrink-0 text-[#96afc7] sm:size-3.5" aria-hidden="true" /><FlowStep number="2" label="Set up" /><ArrowRight size={12} className="shrink-0 text-[#96afc7] sm:size-3.5" aria-hidden="true" /><FlowStep number="3" label="Ready" /></div>
        <div className="mt-5 grid items-stretch gap-3 sm:grid-cols-[minmax(0,1fr)_20px_minmax(0,1fr)]">
          <div className="min-w-0"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.13em] text-[#5d7287]">02 / Wireframe</p><WireframePanel /></div>
          <div className="flex items-center justify-center pt-4"><ArrowRight size={19} className="rotate-90 text-electric sm:rotate-0" aria-hidden="true" /></div>
          <div className="min-w-0"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.13em] text-electric">03 / Interface</p><FinishedPanel /></div>
        </div>
        <p className="mt-4 text-[10px] font-medium text-[#41627e]">One task, from structure to finished screen.</p>
      </div>
    </div>
  );
}

function OnboardingScreen({ step, title, caption, children }: { step: number; title: string; caption: string; children: ReactNode }) {
  return (
    <div className="min-w-0 w-full max-w-[310px] flex-1">
      <div className="min-h-[326px] rounded-lg border border-[#dce5ee] bg-white p-4 shadow-[0_10px_28px_rgba(16,42,64,.07)]">
        <div className="flex items-center justify-between border-b border-[#e7edf3] pb-3"><span className="text-xs font-bold text-ink">ITGS</span><span className="text-[10px] text-steel">{step} of 3</span></div>
        <div className="mt-4 flex gap-1.5" aria-hidden="true">{[1, 2, 3].map((number) => <span key={number} className={`h-1 flex-1 rounded-full ${number <= step ? 'bg-electric' : 'bg-[#dbe6f0]'}`} />)}</div>
        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[.12em] text-electric">{title}</p>
        {children}
      </div>
      <p className="mt-3 text-center text-xs font-medium text-[#41627e]">{caption}</p>
    </div>
  );
}

export function OnboardingConcept() {
  return (
    <div role="group" aria-label="ITGS internal concept: three connected onboarding screens" className="rounded-xl border border-[#dce7f2] bg-[#f5f9fd] p-4 text-ink sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2"><span className="text-xs font-semibold text-ink">ITGS internal concept · Onboarding</span><span className="text-[10px] font-semibold text-[#41627e]">Illustrative data</span></div>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:gap-2">
        <OnboardingScreen step={1} title="Welcome" caption="One clear starting point">
          <h3 className="mt-2 text-[18px] font-semibold leading-tight tracking-[-.04em] text-ink">Let’s get you started.</h3>
          <p className="mt-2 text-[11px] leading-5 text-steel">Set up a place for your work in a few clear steps.</p>
          <div className="mt-6 flex size-12 items-center justify-center rounded-xl bg-[#eaf3ff] text-electric"><LayoutTemplate size={25} strokeWidth={1.7} aria-hidden="true" /></div>
          <div className="mt-7 flex min-h-10 items-center justify-center rounded-md bg-electric text-[11px] font-semibold text-white">Create workspace <ChevronRight size={14} aria-hidden="true" /></div>
        </OnboardingScreen>
        <ArrowRight size={18} className="my-auto shrink-0 rotate-90 text-electric sm:mt-36 sm:rotate-0" aria-hidden="true" />
        <OnboardingScreen step={2} title="Set up" caption="Make selection visible">
          <h3 className="mt-2 text-[18px] font-semibold leading-tight tracking-[-.04em] text-ink">What will you do first?</h3>
          <p className="mt-2 text-[11px] leading-5 text-steel">Choose a starting point. You can adjust it later.</p>
          <div className="mt-5 space-y-2"><div className="flex items-center justify-between rounded-md border border-[#9ac3f9] bg-[#eaf3ff] px-3 py-2.5 text-[11px] font-semibold text-[#1454b8]">Plan a project <Check size={14} aria-hidden="true" /></div><div className="rounded-md border border-[#d8e2ec] px-3 py-2.5 text-[11px] text-steel">Share updates</div></div>
          <div className="mt-5 flex min-h-10 items-center justify-center rounded-md bg-electric text-[11px] font-semibold text-white">Continue <ChevronRight size={14} aria-hidden="true" /></div>
        </OnboardingScreen>
        <ArrowRight size={18} className="my-auto shrink-0 rotate-90 text-electric sm:mt-36 sm:rotate-0" aria-hidden="true" />
        <OnboardingScreen step={3} title="Ready" caption="Confirm the next action">
          <div className="mt-4 flex size-12 items-center justify-center rounded-full bg-[#eaf3ff] text-electric"><CheckCircle2 size={27} strokeWidth={1.7} aria-hidden="true" /></div>
          <h3 className="mt-3 text-[18px] font-semibold leading-tight tracking-[-.04em] text-ink">Your space is ready.</h3>
          <p className="mt-2 text-[11px] leading-5 text-steel">Your next step is to add the first project.</p>
          <div className="mt-7 flex min-h-10 items-center justify-center rounded-md bg-electric text-[11px] font-semibold text-white">Open workspace <ChevronRight size={14} aria-hidden="true" /></div>
        </OnboardingScreen>
      </div>
      <p className="mt-6 text-xs font-medium text-steel">Self-initiated concept · Not client work. This concept has not been validated with real users.</p>
    </div>
  );
}
