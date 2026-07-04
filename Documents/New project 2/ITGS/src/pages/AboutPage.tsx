import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Code,
  Target,
  Handshake,
  GraduationCap,
  Megaphone,
  Palette,
  ShoppingCart,
  Users,
  CheckCircle2,
} from 'lucide-react';
import Reveal from '../components/Reveal';
import PageMeta from '../components/PageMeta';
import { ROUTES } from '../config/site';

const CORE_VALUES = [
  {
    icon: Shield,
    title: 'Integrity in Every Engagement',
    desc: 'We tell clients what they need to hear, not what’s easiest to say. If a strategy won’t work, we say so before we take the project — not three months and one invoice later.',
  },
  {
    icon: Code,
    title: 'Technical Excellence',
    desc: 'Every line of code, every campaign, every piece of content reflects the same standard: built correctly the first time, not patched together to meet a deadline.',
  },
  {
    icon: Target,
    title: 'Accountability for Outcomes',
    desc: 'We don’t measure our work by hours logged or tasks completed. We measure it by the business result it produced — because that’s how you measure it too.',
  },
  {
    icon: Handshake,
    title: 'Long-Term Partnership Over Short-Term Wins',
    desc: 'We’re not optimizing for the next invoice. We’re optimizing for the relationship that’s still in place three years from now, when your business has scaled past where it started.',
  },
  {
    icon: GraduationCap,
    title: 'Continuous Learning',
    desc: 'Search algorithms change. Platforms evolve. Frameworks get replaced. Our team treats staying current not as a cost of doing business, but as the baseline requirement for doing it well.',
  },
];

const WHY_CHOOSE = [
  {
    title: 'You Get One Point of Accountability, Not Five',
    desc: 'When your SEO, your website, and your e-commerce stores are managed by the same team, there’s no one left to point a finger at. Results are owned, end to end.',
  },
  {
    title: 'Senior Talent, Not Junior Hand-Offs',
    desc: 'The strategist who scopes your project is involved in delivering it. You’re not handed off to a junior team once the contract is signed.',
  },
  {
    title: 'Decisions Backed by Data, Not Opinion',
    desc: 'Every recommendation — from a homepage redesign to an Amazon PPC bid adjustment — is grounded in what the data shows, not what sounds good in a pitch deck.',
  },
  {
    title: 'Technical Depth Most Agencies Don’t Have',
    desc: 'Marketing agencies that can’t build. Development shops that don’t understand SEO. ITGS was built specifically to close that gap — our developers understand search, and our strategists understand code.',
  },
  {
    title: 'Proven Across Markets, Not Just One',
    desc: 'Serving clients across the US, UK, UAE, and Pakistan has taught us how strategy shifts by market, currency, regulation, and customer behavior — insight you don’t get from an agency that’s only ever served one region.',
  },
  {
    title: 'A Team That Explains Itself',
    desc: 'You’ll never get a report full of jargon and no explanation. We tell you what happened, why it happened, and what we’re doing next — in terms that connect to your business, not just your dashboard.',
  },
];

const EXPERTISE = [
  {
    icon: Megaphone,
    title: 'Digital Marketing & SEO',
    desc: 'From technical SEO audits to full-funnel digital marketing campaigns across Google, Meta, and LinkedIn, our team builds search visibility and demand generation systems designed to compound — not campaigns that stop producing the moment the budget pauses.',
  },
  {
    icon: Code,
    title: 'Web & Mobile App Development',
    desc: 'We build custom websites, web applications, and mobile apps using React, Next.js, Laravel, Flutter, and React Native — engineered for performance, security, and search visibility from the first line of code, not retrofitted after launch.',
  },
  {
    icon: Palette,
    title: 'UI/UX & Graphic Design',
    desc: 'Every interface we design is built around how real users behave, not how a mood board looks. From SaaS dashboards to e-commerce checkout flows to brand identity systems, our design work is measured by what it does to your conversion rate — not just how it looks in a portfolio.',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Solutions — Amazon, eBay & Shopify',
    desc: 'Our e-commerce team manages multi-channel operations as one coordinated strategy: Amazon listing optimization, PPC, and FBA management; eBay store and listing management; and custom Shopify development built for speed and conversion. One team, three platforms, one growth plan.',
  },
  {
    icon: Users,
    title: 'Lead Generation & Virtual Assistance',
    desc: 'We build the systems that keep your pipeline full — from LinkedIn outreach and cold email sequences to dedicated virtual assistants supporting e-commerce operations and administrative workflows, freeing your core team to focus on strategy.',
  },
];

const INDUSTRIES: [string, string][] = [
  ['Healthcare & Dental', 'Patient acquisition through local search and compliant web development'],
  ['Finance & FinTech', 'Secure, scalable application development and regulated digital marketing'],
  ['Real Estate', 'Lead generation systems and property-focused web platforms'],
  ['SaaS & Technology', 'Product development, technical SEO, and B2B demand generation'],
  ['E-Commerce & Retail', 'Multi-channel Amazon, eBay, and Shopify growth management'],
  ['Legal Services', 'Local SEO and lead generation built for case acquisition'],
  ['Manufacturing & Logistics', 'B2B lead generation and enterprise-grade web platforms'],
  ['Hospitality & Travel', 'Booking-optimized websites and demand generation campaigns'],
];

const PROCESS: [string, string][] = [
  ['Understand', 'Before we propose anything, we learn your business — your market, your goals, your constraints, and what’s actually been holding growth back.'],
  ['Architect a Strategy', 'We design a roadmap across the relevant disciplines, built around outcomes you can measure, not deliverables you have to take on faith.'],
  ['Build in Parallel', 'Development, design, and marketing move forward together — coordinated by senior specialists who already understand how the pieces connect.'],
  ['Measure What Matters', 'We track performance against the metrics tied to your business — rankings, revenue, conversion rate, pipeline — not vanity numbers that look good in a slide deck.'],
  ['Refine and Scale', 'Growth isn’t a project with an end date. As results compound, we help you expand into new channels, markets, and platforms using the same integrated approach.'],
];

const COMMITMENTS: [string, string][] = [
  ['Transparent communication.', 'You’ll always know what’s happening, why, and what it means for your business — not just what was technically completed this sprint.'],
  ['Realistic timelines.', 'We’d rather tell you a project takes ten weeks than promise four and deliver something rushed.'],
  ['Work that’s actually yours.', 'No vendor lock-in tactics, no proprietary platforms holding your data hostage. What we build belongs to you.'],
  ['Honesty when something isn’t working.', 'If a strategy needs to change, we’ll tell you before the budget runs out — not after.'],
];

const FAQS: [string, string][] = [
  ['What does ITGS stand for?', 'ITGS stands for Integrate Technical and General Solutions. The name reflects our core approach: integrating digital marketing, web development, design, and e-commerce management into one accountable technology partnership, rather than offering disconnected services.'],
  ['What makes ITGS different from a typical digital marketing agency?', 'Most digital marketing agencies focus only on marketing and outsource development, design, or e-commerce management to third parties. ITGS keeps all of these disciplines in-house and coordinated, so your strategy, your website, and your e-commerce stores are managed by one team working toward one outcome.'],
  ['Does ITGS only work with large enterprises?', 'No. ITGS works with businesses at every stage — from early-stage startups building their first product to established enterprises modernizing legacy systems. Our process scales to the size and complexity of your business.'],
  ['Which countries does ITGS serve?', 'ITGS serves clients across the United States, United Kingdom, UAE, and Pakistan, with experience adapting strategy to different markets, regulatory environments, and customer behaviors.'],
  ['Can ITGS manage Amazon, eBay, and Shopify at the same time?', 'Yes. Our e-commerce team manages multi-channel operations as a single coordinated strategy — including Amazon listing optimization and PPC, eBay store management, and Shopify development — rather than treating each platform as a separate project.'],
  ['Will I work directly with senior team members, or will my project be handed to junior staff?', 'The senior strategist or developer who scopes your project stays involved in delivering it. ITGS does not operate on a bait-and-switch model where you’re sold by senior staff and serviced by junior ones.'],
  ['How does ITGS measure success?', 'We measure success by the business outcomes that matter to you — search rankings, organic traffic, conversion rates, qualified leads, and revenue growth — not by the number of tasks completed or hours logged.'],
  ['How do I start working with ITGS?', 'Reach out for an initial conversation about your business and goals. We’ll assess where the real opportunities are and recommend the right combination of services — no generic package, no pressure.'],
];

const SectionHeading = ({
  eyebrow,
  title,
  intro,
  light = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  light?: boolean;
}) => (
  <div className="max-w-3xl mb-12">
    {eyebrow && (
      <span className="text-electric font-bold uppercase tracking-[0.4em] text-xs mb-5 block">{eyebrow}</span>
    )}
    <h2 className={`text-3xl md:text-5xl font-extrabold leading-tight ${light ? 'text-white' : 'text-midnight'}`}>
      {title}
    </h2>
    {intro && (
      <p className={`mt-6 text-lg font-light leading-relaxed ${light ? 'text-white/60' : 'text-steel/80'}`}>
        {intro}
      </p>
    )}
  </div>
);

const AboutPage = () => (
  <>
    <PageMeta
      title="Integrate Technical and General Solutions"
      description="Learn how Integrate Technical and General Solutions (ITGS) became a trusted technology partner — delivering SEO, web development, and e-commerce growth."
      path={ROUTES.about}
    />

    <div className="bg-starfield">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-36 md:pt-44 pb-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <span className="text-electric font-bold uppercase tracking-[0.4em] text-xs mb-6 block">
              About ITGS
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-midnight mb-8 text-balance leading-tight">
              Built to Be the Last Technology Partner You Ever Have to <span className="text-electric">Hire</span>
            </h1>
            <p className="text-lg sm:text-xl text-steel/80 max-w-3xl mx-auto leading-relaxed font-light mb-10">
              Integrate Technical and General Solutions (ITGS) was founded on a simple frustration: businesses were tired of managing five vendors to get one result. We exist to be the team that ends that cycle — combining digital marketing, web development, and e-commerce management into a single, accountable technology partner.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to={ROUTES.contact} className="btn-primary group">
                Talk to Our Team
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
              </Link>
              <Link to={ROUTES.services} className="btn-outline-light">
                See What We Do
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── About ITGS ───────────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <img
              src="https://picsum.photos/seed/itgs-about/800/600"
              alt="ITGS integrated team of strategists, developers, and designers"
              loading="lazy"
              className="rounded-3xl shadow-xl w-full aspect-[4/3] object-cover border border-midnight/10"
              referrerPolicy="no-referrer"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <span className="text-electric font-bold uppercase tracking-[0.4em] text-xs mb-5 block">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-midnight mb-6 leading-tight">
              About ITGS — <span className="text-electric">Integrate Technical and General Solutions</span>
            </h2>
            <div className="space-y-5 text-steel/90 leading-relaxed font-light">
              <p>If you’ve worked with multiple agencies before, you already know the pattern. The SEO team blames the developer. The developer says the design wasn’t built for performance. The marketing agency can’t explain why the website they didn’t build isn’t converting. Everyone’s accountable for their slice — and no one’s accountable for the result.</p>
              <p>Integrate Technical and General Solutions was built to remove that pattern entirely.</p>
              <p>ITGS is a full-service technology and digital growth company. We bring SEO strategists, web and mobile app developers, UI/UX designers, e-commerce specialists, and lead generation experts together under one roof — working from one strategy, toward one outcome: your business growth.</p>
              <p>The name isn’t a marketing flourish. “Integrate” is the actual operating principle behind how we work. Your website, your search visibility, your e-commerce stores, your lead pipeline — these aren’t separate projects to us. They’re one system. And we build, manage, and optimize that system as a single team, not a relay race between disconnected vendors.</p>
            </div>
            <Link
              to={ROUTES.services}
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-midnight hover:text-electric transition-colors"
            >
              See Our Full Range of Services <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionHeading eyebrow="Our Journey" title={<>Our <span className="text-electric">Story</span></>} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-3xl space-y-5 text-steel/90 text-lg leading-relaxed font-light">
              <p>Every technology company says it was “founded to solve a problem.” Ours is specific.</p>
              <p>ITGS began with founders who had sat on both sides of the table — inside agencies delivering one piece of a client’s puzzle, and inside businesses trying to assemble that puzzle from five different vendors who’d never spoken to each other. We watched good businesses lose months to miscommunication between their marketing team and their developers. We watched e-commerce sellers manage Amazon, eBay, and Shopify like three separate businesses instead of one growth channel. We watched founders pay for “SEO” that never touched the technical issues actually holding their site back.</p>
              <p>The pattern was always the same: talented specialists, working in silos, producing results that didn’t add up to the outcome the client actually needed.</p>
              <p>So we built something different. Not another agency offering one service with a list of “partners” for everything else — a single team where the SEO strategist, the developer, and the e-commerce manager are in the same room, working from the same brief, accountable to the same result.</p>
              <p>That’s not a tagline. It’s the reason ITGS exists.</p>
              <p>Today, ITGS serves clients across the United States, United Kingdom, UAE, and Pakistan — supporting everything from early-stage startups building their first product to established enterprises modernizing their digital infrastructure. The markets have grown. The principle hasn’t changed.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Mission & Vision ─────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <Reveal>
            <div className="card-premium h-full">
              <span className="text-electric font-bold uppercase tracking-[0.4em] text-xs mb-5 block">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-midnight mb-6">Our <span className="text-electric">Mission</span></h2>
              <div className="space-y-5 text-steel/90 leading-relaxed font-light">
                <p>To give businesses one accountable technology partner capable of delivering real, measurable growth — across marketing, development, and e-commerce — without the friction, cost, and miscommunication of managing multiple disconnected vendors.</p>
                <p>We measure our success the same way you measure yours: in revenue, rankings, conversions, and growth that compounds over time — not in deliverables checked off a list.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="card-premium h-full">
              <span className="text-electric font-bold uppercase tracking-[0.4em] text-xs mb-5 block">Our Vision</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-midnight mb-6">Our <span className="text-electric">Vision</span></h2>
              <div className="space-y-5 text-steel/90 leading-relaxed font-light">
                <p>To become the global standard for what an integrated technology partner should be — recognized not for the size of our service list, but for the depth of trust our clients place in us to handle the systems their business runs on.</p>
                <p>We believe the agencies and consultancies that last aren’t the ones offering the most services. They’re the ones whose clients never feel the need to look elsewhere.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Core Values ──────────────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionHeading
              eyebrow="What We Stand For"
              title={<>Our <span className="text-electric">Core Values</span></>}
              intro="These aren’t values we framed and hung on a wall. They’re the standard every project gets measured against before it goes out the door."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {CORE_VALUES.map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.title} className="card-premium h-full group">
                    <div className="w-14 h-14 bg-electric/10 rounded-2xl flex items-center justify-center text-electric mb-6 group-hover:bg-electric group-hover:text-white transition-all duration-500">
                      <Icon size={26} aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-midnight mb-3">{value.title}</h3>
                    <p className="text-steel/80 leading-relaxed font-light">{value.desc}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Why Business Leaders Choose ITGS ─────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionHeading
              eyebrow="The Difference"
              title={<>Why Business Leaders <span className="text-electric">Choose ITGS</span></>}
              intro="You’ve evaluated agencies before. Here’s what’s actually different about working with ITGS."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              {WHY_CHOOSE.map((item, i) => (
                <div key={item.title} className="flex gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-electric/10 flex-shrink-0 flex items-center justify-center text-electric font-black group-hover:bg-electric group-hover:text-white transition-all duration-500">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-midnight mb-2">{item.title}</h3>
                    <p className="text-steel/80 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Our Expertise ────────────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionHeading
              eyebrow="What We Do"
              title={<>Our <span className="text-electric">Expertise</span></>}
              intro="ITGS brings deep, hands-on expertise across the disciplines that drive modern business growth."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {EXPERTISE.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="card-premium h-full group">
                    <div className="w-14 h-14 bg-electric/10 rounded-2xl flex items-center justify-center text-electric mb-6 group-hover:bg-electric group-hover:text-white transition-all duration-500">
                      <Icon size={26} aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-midnight mb-3">{item.title}</h3>
                    <p className="text-steel/80 leading-relaxed font-light">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12">
              <Link to={ROUTES.services} className="btn-outline-light inline-flex items-center gap-2">
                Explore All ITGS Services <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Industries We Serve ──────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Where We Work"
              title={<>Industries <span className="text-electric">We Serve</span></>}
              intro="Different industries demand different strategy — what works for a SaaS company won’t work for a dental practice, and what converts in e-commerce won’t convert for a law firm. ITGS has delivered results across:"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {INDUSTRIES.map(([name, desc]) => (
                <div key={name} className="card-premium h-full">
                  <CheckCircle2 size={22} className="text-electric mb-4" aria-hidden="true" />
                  <h3 className="text-lg font-bold text-midnight mb-2">{name}</h3>
                  <p className="text-steel/80 text-sm leading-relaxed font-light">{desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 text-steel/80 text-lg font-light leading-relaxed max-w-3xl">
              If your industry isn’t listed, that doesn’t mean we haven’t worked in it — it means we’d rather have the conversation than guess at your context from a homepage list.
            </p>
            <Link
              to={ROUTES.contact}
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-midnight hover:text-electric transition-colors"
            >
              Discuss Your Industry’s Challenges <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Our Process ──────────────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionHeading
              eyebrow="How We Deliver"
              title={<>Our Process — <span className="text-electric">How We Work With You</span></>}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6">
              {PROCESS.map(([title, desc], i) => (
                <div key={title} className="flex gap-6 items-start card-premium">
                  <div className="w-14 h-14 rounded-2xl bg-electric/10 flex-shrink-0 flex items-center justify-center text-electric font-black text-xl">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-midnight mb-2">{title}</h3>
                    <p className="text-steel/80 leading-relaxed font-light">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Our Commitment ───────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Our Promise"
              title={<>Our Commitment <span className="text-electric">to Clients</span></>}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-3xl space-y-5 text-steel/90 text-lg leading-relaxed font-light mb-10">
              <p>We know what’s actually at stake when you choose a technology partner. It’s not just a budget line — it’s your website, your search visibility, your customer data, and in many cases, your primary sales channel.</p>
              <p>Here’s what we commit to, every time:</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid md:grid-cols-2 gap-6">
              {COMMITMENTS.map(([lead, desc]) => (
                <div key={lead} className="flex gap-4 card-premium h-full">
                  <CheckCircle2 size={24} className="text-electric flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-steel/90 leading-relaxed font-light">
                    <span className="font-bold text-midnight">{lead}</span> {desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 text-steel/90 text-lg font-light leading-relaxed max-w-3xl">
              This is what it means to be a long-term technology partner instead of a vendor you hire once and never call again.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── The People Behind ITGS ───────────────────────────────────────── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Our Team"
              title={<>The People Behind <span className="text-electric">ITGS</span></>}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-3xl text-steel/90 text-lg leading-relaxed font-light">
              ITGS is built on senior-level talent — strategists, developers, and designers with 7+ years of hands-on experience delivering real business outcomes for clients across the US, UK, UAE, and Pakistan. Every project is led by someone who has done the work before, not someone learning on your budget.
            </p>
            <Link to={ROUTES.team} className="btn-primary mt-8 inline-flex items-center gap-2">
              Meet the Full Team <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Good to Know"
              title={<>Frequently Asked <span className="text-electric">Questions</span></>}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-4">
              {FAQS.map(([q, a]) => (
                <div key={q} className="card-premium">
                  <h3 className="text-lg font-bold text-midnight mb-2">{q}</h3>
                  <p className="text-steel/80 leading-relaxed font-light">{a}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="section-padding bg-deep-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-electric/10 to-transparent" aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-8 leading-tight text-balance">
              Let’s Start Building <span className="text-electric">Together</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl mb-5 max-w-2xl mx-auto font-light leading-relaxed">
              You’ve read what ITGS believes and how we work. The next step is simple: tell us where your business is today, and let’s figure out together what it takes to get you where you’re trying to go.
            </p>
            <p className="text-white/60 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              No generic pitch. No bloated proposal. Just a real conversation about your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
              <Link to={ROUTES.booking} className="btn-primary text-lg px-10 md:px-14 py-5 group">
                Book Your Free Strategy Call
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link to={ROUTES.services} className="btn-outline text-lg px-10 md:px-14 py-5">
                Explore Our Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  </>
);

export default AboutPage;
