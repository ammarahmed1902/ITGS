Revision 3: owner liked the hero and other design; only navigation was refined. Use a dark floating panel, pale links, original logo on a compact white tile, and a #3986FF to #155EEF booking action with a fine highlight border. Keep the panel opaque on light inner pages. Mobile has a labeled Menu control. Previous board: DESIGN-BOARD-v2.svg. Application implementation remains paused.
# ITGS — redesign audit & creative direction

Status: proposed design, awaiting owner review. September 25, 2026.
Scope: audit and design only. No application implementation, commit, push, merge or deployment.
Companion: `DESIGN-BOARD.svg` is a static desktop/mobile composition, not a working website. Use the specification below for dimensions; the board shows scaled artboards. The revised board embeds the actual supplied logo unchanged on a dark floating header with a white logo tile. The original board is retained as DESIGN-BOARD-v1.svg.

## A. Current website assessment

ITGS presents nine services: digital marketing, SEO, lead generation, web development, mobile development, UI/UX, graphic design, virtual assistance and e-commerce. Its primary conversion is a Calendly strategy meeting. Secondary journeys are service evaluation, company research, articles and recruitment.

The likely buyers are business owners, marketing leads and product/operations leaders seeking an external delivery partner. Enterprise positioning appears in the copy, but customer size, geography and specialization are not independently established. The proposed design uses “growing businesses” as a positioning hypothesis for approval, not a verified company fact. Do not publish location or market-leadership claims based on this repository alone.

Useful foundations: a real supplied SVG logo; a coherent navy/blue starting palette; reusable homepage sections; structured service records with deliverables and processes; category filtering; separate blog service/repository layers; an existing scheduling integration. Retain these foundations.

Audit coverage: read all first-party source files, page components, shared components, service/blog models and repositories, configuration and metadata. Inspected the running homepage at desktop width, services at desktop and 375px mobile, mobile menu and booking entry. Browser inspection used the in-app browser after Playwright CLI was unavailable. Not every page or intermediate breakpoint received visual QA in this design stage. No external booking or admin mutations were performed.

## B. Major design problems

| Priority | Evidence | Design consequence |
|---|---|---|
| High | `Navbar.tsx` always uses pale/white links on a transparent initial header; confirmed on Services | Navigation becomes nearly invisible on light pages. Use an opaque dark navigation panel with pale links and a white logo tile. |
| High | Supplied black logo sits on navy; confirmed on homepage | Brand mark loses visibility. Place unchanged logo on white. |
| High | `Hero.tsx` uses 60/96px headings; `index.css` uses 128/224px vertical section padding | Oversized copy and long stretches delay service discovery. Use a 64px desktop hero and 96px section rhythm. |
| High | `btn-outline` is white and reused on light service sections | Secondary actions have poor contrast. Give buttons explicit light/dark surface variants. |
| Medium | 40–56px radii, large shadows, glows, terminal snippets, animated rings and dot grids | Decoration overwhelms the actual services. Replace with a useful capability index. |
| Medium | Picsum images on company, team, blog and services | Images do not establish authentic expertise. Use verified work and real team assets, or intentional text layouts. |
| Medium | Footer draws a different logo | Reuse the supplied brand asset in a white inset or light footer brand area. |

## C. UX problems

Seven top-level navigation items compete with the booking button. Use Services, Company, Insights and one “Book a strategy call” action. Company exposes About, Team, Reviews and Careers through a click-operated disclosure, never hover-only. Preserve all current destinations. Logo returns Home. Footer keeps direct access to every destination.

`App.tsx` switches pages through React state; the address remains `/`. Browser Back, deep links and shareable service URLs are absent. Treat URL routing as a separately scoped enhancement; do not casually rewrite it during visual work. Retain service IDs and page state names in the initial redesign.

Mobile menu button lacks an accessible name and expanded state. Logo is a clickable div. Navigation does not move focus to the new page heading. Blog “Read More,” Careers “Apply,” social icons and policy links are incomplete actions. These are existing gaps, not redesign regressions.

Service cards reveal only four of nine services on Home, with disproportionate emphasis on marketing. Group the complete offer into three easy-to-scan areas, keeping every service accessible. Avoid adding filters to a catalog of only nine services.

## D. Conversion problems

“Scale with Absolute Authority” does not explain the offer. Several differently named primary and secondary buttons lead to the same booking screen. “Request a Quote” also opens scheduling rather than a quote form. Standardize the primary action to “Book a strategy call”; use “Explore services” as the genuinely different secondary path.

Homepage metrics, service results, reviews, founding history, team identities, locations and contact details are hardcoded without supporting records. They may be genuine, but the repository does not verify them. Do not amplify or silently treat them as established proof. The design works without them. Preserve original content in source/history until the owner confirms changes, and publish proof only after validation.

Calendly is the only working lead destination found. Its iframe URL contains an old hosted embed domain. During inspection the frame did not present a usable calendar; no conclusion about availability for all visitors is possible. Design a loading state and a persistent “Open booking calendar” link to the same verified account. Do not show an invented success state or add an unconnected contact form.

## E. Technical constraints and baseline

- React 19, TypeScript, Vite, Tailwind 4, Motion and Lucide. Installed Vite reports 6.4.2. Keep this stack; no framework migration is needed.
- All pages are imported eagerly. Service content is duplicated in `constants.tsx` and `MockServiceRepository.tsx`; current service screens use constants. Avoid editing one source and assuming both are synchronized.
- Blog persistence is module memory only. Reload discards edits. Login uses a client-side hardcoded credential comparison, not server authentication. Do not reproduce those credential values in design artifacts or treat this as a production CMS.
- Admin image upload area is decorative; URL input is functional. Save operations have no pending/error UI. Labels are not associated with controls. Existing draft/published, edit and delete behaviors need preservation.
- Generic `index.html` title; no page-level metadata wiring, canonical, Open Graph, structured data, sitemap or robots file found. Stored blog SEO fields are not applied to document metadata. Existing live URLs/search equity cannot be established from this local project.
- No implemented analytics, checkout, search, backend form endpoint or live API-driven service catalog found. Declared dependencies alone do not prove integrations.
- Motion includes 144 animated grid cells plus continuous rings/nodes/bits; reduced-motion handling is absent. Google Fonts uses CSS import. Images generally lack explicit reserved dimensions and lazy loading.
- Baseline `npm run lint` fails with TS2307 for the supplied SVG import in `Logo.tsx`. Dev server runs. This is pre-existing; no code fix was made. Production build/performance and cross-browser behavior were not certified.
- Git started on `main` with modified `src/components/Logo.tsx`, untracked `package-lock.json`, and untracked `src/assets/images/ITGS Logo.png`. Preserved all three. Design work is on `redesign/premium-ui-v2`.

## F. One creative direction: Technology in motion (revision 2)

A premium technology partner with an atmospheric navy hero and a cinematic glass-cloud illustration, grounded by warm white service sections and a clear service catalog. This revision follows the owner's request to use the gradient from Section.svg and take inspiration from the supplied hero image.

The defining composition is a dark two-column hero below a dark floating header with a white logo tile. The left side has a large, readable three-line headline, concrete service copy, a white primary action and an outlined secondary action. The right side has glass-cloud and server artwork with blue illumination and cyan reflections. This is a conceptual illustration, not a claim that ITGS owns cloud infrastructure. The Build / Reach / Operate index remains in the service directory below the hero.

Retain the actual logo on white; the reference image's plain white ITGS wordmark is not authorization to redesign the supplied logo. The opaque dark navigation panel also stays usable on light inner pages.

Five-second message: ITGS offers websites, apps, design and digital marketing; visitors can explore those services or book a strategy call.

Proposed hero copy:

> DESIGN · DEVELOPMENT · DIGITAL GROWTH
>
> Technology that moves business forward.
>
> Websites, apps, design and digital marketing for your next stage of growth.
>
> Book a strategy call · Explore services

Reference-derived background: Section.svg has a #06131F base, two near-transparent #22D3EE linear overlays at group opacity 0.7, a #2B7FFF glow at 0.20 opacity (center 734.4,312; radius 280; blur 120), and a #00D3F3 glow at 0.10 opacity (center 423.462,589.3; radius 128; blur 90) on its 886.4×717.3 background. Its linear gradients each have coincident stops, so most visible atmosphere comes from the blurred color fields. The board preserves these colors and approximates the blurred fields with radial gradients. Generated artwork adds the stronger localized highlights requested through the hero reference. Do not describe it as pixel-identical to Section.svg.

Use this gradient atmosphere on the hero, compact dark service intros and final CTA; keep long reading/service sections light. No animated background is required. Keep the text area dark; strong illumination stays behind the artwork.
## G. Design system

### Palette

| Token | Value | Use |
|---|---|---|
| Primary / ink | `#102538` | Headings and footer |
| Secondary | `#28475E` | Supporting dark surfaces |
| Accent / action | `#155EEF` | Primary buttons and links on light backgrounds |
| Accent on dark | `#8FC7FF` | Links and small highlights on navy |
| Background | `#F7F8F5` | Main canvas |
| Surface | `#FFFFFF` | Header, controls, content panels |
| Elevated surface | `#EDF2F5` | Secondary panels |
| Main text | `#102538` | Reading text |
| Secondary text | `#4D5F6E` | Supporting paragraphs |
| Muted text | `#63717D` | Captions on white only; verify other pairings |
| Border | `#D7DFE4` | Decorative separators |
| Control border | `#7A8995` | Inputs and meaningful control boundaries |
| Success | `#176B47` | Status with icon and text |
| Warning | `#805400` | Status with icon and text |
| Error | `#B42318` | Validation and failure text |

Hero base: #06131F; atmospheric blue: #2B7FFF at 20%; cyan: #00D3F3 at 10%. Use white on the action blue and hero navy. The hero primary button is white with #06131F text; its secondary button is transparent with a pale border and white text. Blue primary buttons remain on light sections. Body copy on navy uses `#D3DEE6`. Never lower text contrast through arbitrary opacity. Validate actual pairings to AA during implementation; this is not a completed accessibility certification.

### Type

Retain Inter for all text, including headings; remove the need to fetch Poppins. Use 400/500/600 weights, with 600 for headings. No all-caps navigation. Eyebrows alone use uppercase and 0.08em tracking.

| Role | Desktop size / line height | Mobile size / line height |
|---|---|---|
| Display, home H1 | 64 / 68px | 40 / 44px; 36 / 40px below 375 |
| Inner H1 | 52 / 58px | 36 / 42px |
| H2 | 40 / 46px | 30 / 36px |
| H3 | 26 / 34px | 24 / 32px |
| H4 | 20 / 28px | 20 / 28px |
| Body large | 20 / 30px | 18 / 28px |
| Body | 16 / 26px | 16 / 26px |
| Small | 14 / 22px | 14 / 22px |
| Caption | 12 / 18px | 12 / 18px |
| Button / navigation | 15 / 20px, 600 / 500 | 15 / 20px |

Use fluid interpolation between sizes, not a large jump at a single breakpoint. Paragraphs max 65ch; hero copy max 46ch. Avoid fixed line breaks on mobile; the board's desktop breaks are compositional references.

### Layout, space and surfaces

Max container 1248px at desktop; 12 columns with 24px gaps. At 1440px this gives 96px side margins. Tablet 8 columns / 32px gutters; mobile 4 columns / 20px gutters, reduced to 16px at 320px. Section spacing 96px desktop, 72px tablet, 56px mobile. Space scale: 4, 8, 12, 16, 24, 32, 48, 56, 64, 72, 96, 128.

Header 88px desktop, 76px mobile: an inset dark panel with 12px radius, a restrained #183D59 to #102A40 to #0A1C2D gradient, a fine translucent blue border and soft downward shadow. Use 24px desktop / 12px mobile outer insets and at least 56px panel height. Maintain 44px touch targets in implementation. Sticky without shrinking or covering page content; use scroll padding. Logo retains intrinsic aspect ratio in a maximum 96×56px slot; inspect SVG whitespace before setting the visible size.

Radii: controls 6px, cards 12px, imagery 8px. No pill buttons. Default cards have a 1px border and no shadow. Floating menu only: 0 12px 32px navy at 12% opacity. Buttons min-height 48px and 20–24px horizontal padding. Focus: visible 2px outline with 3px offset, dark on light and pale blue on navy. Keep focus visible underneath the sticky header.

Service discovery uses three full-width rows with a category title, short description, and named service links. Proof, when verified, uses one generous image and adjacent editorial narrative instead of three matching cards. Lucide outline icons at 20/24px, 1.5–2px strokes; arrows indicate navigation, not decoration.

Motion: color transitions 160ms; disclosure 180–220ms. Optional entrance opacity with max 8px movement, once, under 240ms. Content must be immediately readable without animation. Disable decorative movement under reduced motion; no scroll gating, perpetual motion, animated counters or layout jumps.

## H. Homepage architecture

1. **Header:** supplied logo, Services, Company disclosure, Insights, booking action. Keep the action text identical sitewide.
2. **Hero:** 7/5 split, 64px gap, 80px vertical padding; H1, supporting sentence, primary and secondary actions. Right: generated glass-cloud artwork inspired by the supplied hero reference. Keep meaningful service links in the directory below. Height follows content, not `100vh`.
3. **Service directory:** “The right expertise for your next move.” Three category rows, all nine named links. Build: Web Development, Mobile App Development, UI/UX Design, Graphic Design. Reach: Digital Marketing, SEO, Lead Generation. Operate: E-commerce Solutions, Virtual Assistance. This groups, not renames, service IDs.
4. **Delivery approach:** proposed “A clear path from brief to delivery.” Discover → Define → Deliver → Improve. Explain concrete steps in one sentence each; owner should confirm this cross-service process before publication. Desktop numbered columns; mobile vertical sequence.
5. **Verified work, conditional:** a single real engagement, showing problem, scope, deliverables and a substantiated outcome. If none supplied, omit this module entirely. Never publish a “coming soon” proof placeholder or fictional customer.
6. **Company introduction:** short explanation of who delivers the work; link to Company. Real people/photo only after supplied. A text layout is the intentional fallback.
7. **Final CTA:** “Let’s discuss what you need next.” One booking button and concise expectation-setting text. No response-time or free-consultation promise without confirmation.
8. **Footer:** consistent logo, full service list, company links, Insights and verified contact channels. Legal links only when real documents exist. Preserve access to the admin surface during visual work without presenting it as a trust signal.

Remove the unverified metrics dashboard and repetitive testimonial grid from the proposed public composition pending content review. Do not replace them with invented proof. Homepage should feel complete without them.

## I. Other pages

| Destination | Proposed structure and behavior |
|---|---|
| Services | Compact introduction; category anchors; complete grouped directory; contextual booking CTA. No oversized icon grid. |
| All nine service details | Services breadcrumb; service name and clear scope; deliverables; existing service-specific steps; approved tools as plain text; verified result if available; related services; booking CTA. Preserve IDs and current navigation contracts. |
| About | Plain company explanation, validated history, operating approach, real people and CTA. Existing 2015/SF story requires confirmation. |
| Team | Real approved portraits, names, roles and concise expertise. Avoid synthetic people or random stock portraits. Retain destination with truthful introductory content if biographies are not yet approved. |
| Reviews | Verified quotes with permission, correct attribution and context. Resolve inconsistent attributions between homepage and Reviews. No automatic five-star decoration. |
| Blog / Insights | Featured real article, category filter and restrained article list. Preserve published-only filtering and empty state. Read More requires an article view; scope that addition explicitly instead of linking to a dead end. |
| Careers | Actual roles with location/type, role details and a verified application destination. If no real vacancies, publish an honest empty state after owner confirmation. |
| Booking | Page title “Book a strategy call”; short explanation; calendar with reserved height; loading/failure guidance and external calendar link. Keep the existing account unless owner changes it. Do not book during QA. |
| Admin | Compact functional forms and list, persistent action visibility on touch/keyboard, associated labels, validation, pending/success/failure states. Preserve draft/publish/edit/delete contracts. Server auth and durable storage are separate functional work, not solved by styling. |

## J. Mobile strategy

Below 1100px use the compact menu to avoid the current tablet navigation squeeze. Expand the menu below the header as an in-flow panel, with an accessible toggle, Escape close and focus return. Keep the page scrollable; no modal focus trap is needed for this nonmodal panel. Close on navigation; move focus to the destination heading.

At 375px hero copy comes first, 38–40px H1, full-width white primary button, secondary text link, then a compact approximately 240px-high crop of the glass-cloud artwork. Keep illustration below the actions and preserve the full meaning without it. Do not squeeze copy beside an image on mobile. Service groups become stacked labels and 44px-minimum link rows. Process becomes a vertical sequence. Footer groups stack. Calendar takes available width; provide an external link independent of iframe scrolling. At 320px reduce gutters and display size, allow button text wrapping, and avoid fixed card widths.

Implementation review widths: 320, 375, 390, 768, 1024, 1100, 1280, 1440, 1920. Verify intermediate widths, portrait/landscape, 200% zoom, keyboard use, focus visibility and no unintended horizontal scroll.

## K. Reusable components

Update Navbar, Logo wrapper, Footer, shared button styles, Reveal/Stagger, Hero, ServicesPreview and CTASection. Replace ResultsSection with a conditional verified-work composition and WhyChooseSection with a specific process/company composition after approval. Keep testimonial presentation conditional.

Introduce only useful shared patterns: PageIntro, SectionHeading, ServiceGroup, ServiceLink, ProcessSteps, Breadcrumbs, BookingPanel and FormField. Keep layout wrappers simple. Avoid introducing a component library or animation dependency. Retain entity, repository and service interfaces during the visual pass.

States to specify before coding: hover/focus/pressed/disabled buttons; current and expanded navigation; loading/empty/error content; calendar loading/unavailable/available; invalid and pending admin forms; deletion confirmation and save failure. A disabled control still needs readable contrast and a reason where useful.

## L. Content recommendations

Replace “authority,” “dominate,” “global elite,” “infinite scalability” and “future-proof” with named work and concrete deliverables. Keep paragraphs to 2–4 sentences. Do not promise a result simply because a tool appears in a service's list.

Owner evidence needed before publication: client permissions and results; actual company history/location; valid contact channels; real team biographies/photos; current vacancies; approved reviews; calendar ownership; policy documents; target buyer preference. Future-dated Published blog entries and short stub bodies require editorial review. Record approval of claims in a content register with source, owner and permitted usage; do not invent evidence.

## M. Asset requirements

- Keep supplied ITGS SVG unchanged, presented on white; use the same mark sitewide. A white/reversed variant may be created only with brand approval, not silently recolored.
- Hero artwork: design/assets/hero-cloud-v2.png, created with the built-in imagegen tool from the supplied hero reference. Keep text and buttons as separate semantic elements during implementation. Produce optimized AVIF/WebP and mobile crops during coding, reserve image dimensions, and check LCP. Use the standalone asset rather than the embedded design-board image as the production source. Prompt and provenance are documented in HERO-REVISION.md.
- Work image: actual customer-approved screenshot, 1600×1000 master, remove confidential information, export responsive AVIF/WebP with reserved ratio. No fabricated screenshots.
- Team portraits: actual people, 4:5 crop, neutral background, soft daylight, consistent eye line; obtain permission. Do not generate employee stand-ins.
- Optional company image: real working context, 3:2 crop, natural colors and credible activity. Omit rather than use unrelated scenery.
- Blog covers: relevant, approved images or simple editorial diagrams with an intentional 3:2 ratio. No Picsum fallback in final public design.
- Social preview: branded 1200×630 composition using approved title and mark, produced after the copy is approved.

## N. Implementation handoff for Sol

Design is not yet approved. Start implementation only after the owner approves this direction and selects the intended coding model. No automatic model switch occurred in this task.

1. Check Git status and retain the user's logo edits, SVG and lockfile. Stay on `redesign/premium-ui-v2`; never reset, clean or stash user work without a reason and authorization. No push/merge/deploy.
2. Capture settled baseline screenshots and a destination/action matrix. Record the existing SVG typing failure separately. Add the minimal Vite asset declaration when implementation is authorized, then rerun TypeScript.
3. Implement tokens, typography and layout only. Check real color contrast and control boundaries. Keep React/Vite/Tailwind and repository contracts.
4. Implement header, menu, footer and button variants; test keyboard and light/dark surfaces before page work.
5. Build approved Home composition, Services and one representative detail page. Compare rendered desktop/mobile views with the board and this specification. Apply shared patterns across the remaining service records.
6. Refine remaining pages and admin form presentation without changing persistence/auth contracts. Document broken pre-existing actions. Obtain scope decisions for article views, recruitment submission, routing, durable CMS and server authentication rather than pretending visual redesign completes them.
7. Preserve the calendar account, add a genuine external fallback, and verify its loading state without submitting a meeting. Apply approved content only; no unverified metrics or substitute testimonials.
8. Audit all destinations, mobile menu, category filters and admin states. Do not perform destructive admin actions against real content. Check page focus and reduced motion.
9. SEO pass: replace generic title with approved ITGS metadata. Do not invent canonical URLs; obtain the production domain. If real routing is separately approved, map existing live URLs first, preserve service slugs, implement Back/refresh and hosting fallback, then add page metadata/sitemap. No framework rewrite solely for appearance.
10. Run TypeScript and build, inspect browser console, review requested widths, test keyboard/zoom, and validate Chrome/Edge plus Safari/Firefox where available. Reserve image space and lazy-load below-fold media. Measure LCP/CLS/INP under documented conditions; treat <2.5s / <0.1 / <200ms as targets, not certified results from this audit.

Suggested bounded coding batches: foundations and navigation; homepage; services/detail template; supporting pages and booking; functional gap work only if authorized; final visual/accessibility/SEO/performance review. Each batch reports files changed, screenshots and checks. Do not reinterpret the visual direction independently in each batch.

Acceptance: original mark legible; clear offer and primary action in the first mobile viewport; every service discoverable; no disappearing navigation or light-on-light buttons; no decorative invented data; no broken existing working journey; no horizontal overflow; visible keyboard focus; no unreviewed production changes.

## Review decision

Approve or revise the Technology in motion direction, revised hero and Build / Reach / Operate service grouping before coding. Missing verified proof does not block the visual direction: its deliberate fallback is a complete, text-led site. Content and backend gaps remain explicit prerequisites for a truthful production release.
