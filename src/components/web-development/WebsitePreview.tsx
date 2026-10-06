import { ArrowUpRight, BarChart3, Check, Code2, Gauge, LayoutDashboard, Menu, MonitorSmartphone, Sparkles } from 'lucide-react';

export default function WebsitePreview() {
  return (
    <div className="relative mx-auto w-full max-w-[660px]" aria-label="ITGS internal website concept with illustrative data" role="img">
      <div className="absolute -inset-5 rounded-[2rem] bg-electric/10 blur-3xl" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-[#071b2f] p-2 shadow-[0_32px_80px_rgba(0,8,24,.45)] sm:p-3">
        <div className="overflow-hidden rounded-xl border border-[#cfe0ef] bg-white">
          <div className="flex h-10 items-center gap-2 border-b border-[#dce7f2] bg-[#f5f8fb] px-3">
            <span className="size-2 rounded-full bg-[#9fb1bf]" /><span className="size-2 rounded-full bg-[#b8c6d1]" /><span className="size-2 rounded-full bg-[#d0dae1]" /><span className="ml-2 h-5 flex-1 rounded-md border border-[#dce7f2] bg-white" />
          </div>
          <div className="grid min-h-[310px] sm:grid-cols-[1.12fr_.88fr]">
            <div className="flex flex-col justify-between bg-[#f8fbfe] p-5 sm:p-7">
              <div>
                <div className="flex items-center justify-between"><span className="text-sm font-bold tracking-[-.04em] text-ink">NORTH/ONE</span><Menu className="text-steel" size={17} aria-hidden="true" /></div>
                <p className="mt-10 text-[10px] font-semibold uppercase tracking-[.15em] text-electric">Digital operations</p>
                <p className="mt-3 max-w-[310px] text-[clamp(1.5rem,3vw,2.35rem)] font-semibold leading-[1.02] tracking-[-.055em] text-ink">A clearer way to run the work.</p>
                <p className="mt-4 max-w-[300px] text-xs leading-5 text-steel">One focused experience for projects, decisions and delivery.</p>
              </div>
              <div className="mt-7 flex items-center gap-3"><span className="inline-flex min-h-9 items-center gap-2 rounded-md bg-electric px-3 text-[11px] font-semibold text-white">Explore platform <ArrowUpRight size={13} /></span><span className="text-[10px] font-semibold text-steel">ITGS internal concept</span></div>
            </div>
            <div className="relative overflow-hidden bg-[#0a2844] p-4 sm:p-5">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(143,199,255,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(143,199,255,.22) 1px, transparent 1px)', backgroundSize: '28px 28px' }} aria-hidden="true" />
              <div className="relative grid gap-3">
                <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <div className="flex items-center justify-between"><span className="text-[10px] font-semibold uppercase tracking-[.12em] text-sky">Delivery overview</span><LayoutDashboard size={15} className="text-sky" /></div>
                  <div className="mt-5 grid grid-cols-3 gap-2">{['Plan', 'Build', 'Launch'].map((item, index) => <div key={item} className="rounded-lg bg-white/8 p-2"><span className={`mb-2 flex size-5 items-center justify-center rounded-full ${index < 2 ? 'bg-electric text-white' : 'bg-white/15 text-sky'}`}>{index < 2 ? <Check size={11} /> : <span className="text-[9px]">3</span>}</span><span className="text-[9px] font-semibold text-white/80">{item}</span></div>)}</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/15 bg-white p-3 text-ink"><Gauge size={17} className="text-electric" /><p className="mt-4 text-[10px] text-steel">Performance</p><p className="mt-1 text-sm font-semibold">Core-first build</p></div>
                  <div className="rounded-xl border border-white/15 bg-[#155eef] p-3 text-white"><BarChart3 size={17} /><p className="mt-4 text-[10px] font-medium text-white">Measurement</p><p className="mt-1 text-sm font-semibold text-white">Useful events</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -left-3 top-[31%] hidden min-w-36 items-center gap-3 rounded-xl border border-white/20 bg-white p-3 text-ink shadow-xl sm:flex"><span className="flex size-9 items-center justify-center rounded-lg bg-[#eaf3ff] text-electric"><Code2 size={18} /></span><span><span className="block text-[10px] text-steel">Built to fit</span><strong className="text-xs">Custom development</strong></span></div>
      <div className="absolute -right-2 top-[17%] hidden min-w-36 items-center gap-3 rounded-xl border border-white/20 bg-[#155eef] p-3 text-white shadow-xl md:flex"><MonitorSmartphone size={18} /><span><span className="block text-[10px] font-medium text-white">Every screen</span><strong className="text-xs text-white">Responsive by design</strong></span></div>
      <div className="absolute -bottom-5 right-[12%] hidden min-w-36 items-center gap-3 rounded-xl border border-white/20 bg-white p-3 text-ink shadow-xl sm:flex"><Sparkles size={18} className="text-electric" /><span><span className="block text-[10px] text-steel">Clear by default</span><strong className="text-xs">Purposeful interface</strong></span></div>
    </div>
  );
}
