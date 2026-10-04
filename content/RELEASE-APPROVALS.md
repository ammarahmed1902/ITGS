# ITGS release configuration and external approvals

The remediation retains Vite and generates one static HTML file per approved route. Client-side navigation is progressively enhanced; hosting serves unknown routes with 404.html and HTTP 404.

## Required production decisions

- Set SITE_ENV=production (or VERCEL_ENV=production) and the approved HTTPS SITE_URL. Missing origin stops production builds. No domain has been invented.
- Set SOCIAL_IMAGE_URL to an approved 1200x630 image and validate its dimensions before release.
- Choose the analytics platform. ANALYTICS_ENDPOINT accepts POST JSON {event,path,timestamp}; it must support the site's origin/CORS. Configure an adapter at that endpoint for the chosen platform. Nothing collects until the user grants optional analytics consent. Preview tracking is off unless ANALYTICS_PREVIEW=true for a test destination.
- Choose a privacy-safe MONITORING_ENDPOINT accepting POST JSON {code}. No stack, form values, tokens or CMS bodies are sent.
- Approve/publish the privacy notice and configure PRIVACY_URL. The UI links it only when supplied; no legal policy has been fabricated.
- Confirm BOOKING_URL account ownership, event availability and notification recipients; perform an authorized test booking, receipt/cancellation check and approved backup contact decision.
- Decide whether Graphic Design remains standalone or merges into UI/UX. Its existing URL/content is preserved pending approval; breadcrumb and CTA semantics are fixed.
- Supply approved About facts and real case-study evidence. Work currently describes internal concepts accurately. No client results are invented.

## CMS publication

Run supabase/migrations/20260930_publication.sql on an existing database (or schema.sql on a fresh one). Existing records default to unapproved. Fill slug, author, image_alt, image_url, meta_description and approval before publication. Slugs are unique; anonymous reads require Published, approved and publication time reached. No anonymous write policy exists.

The build reads published records using SUPABASE_URL and SUPABASE_ANON_KEY (legacy VITE names are accepted during migration). It emits article HTML, metadata and sitemap together. These are static snapshots: publishing, editing, unpublishing or reaching a scheduled date requires a new build/deploy. Configure a private CMS webhook/CI deploy hook on publication changes and a scheduled build for scheduled posts. A removed article stays public until the old deployment is replaced; do not rely on a database change alone to retract confidential information. Anonymous access to the live database remains publication-gated.

Neither CMS value: intentional empty Insights state. Only one value: build fails. CMS_REQUIRED=true: both mandatory. Invalid published records or failed configured CMS request stop the build. Do not set a service-role secret as the public key.

## Hosting and staging

Vercel framework is explicitly null; no SPA catch-all exists. Published directory/index.html files are served directly; Vercel uses 404.html for misses. trailingSlash enables the preferred URL format. Headers include nosniff, referrer policy, frame protection, restricted device permissions and a CSP report-only starting policy. Review CSP reports in browser tools and configure a reporting endpoint after approval. HSTS and preferred-host redirects require the verified production domain/HTTPS policy; configure these at the host and test all variants. Preview builds use noindex and an empty sitemap; protect private previews with Vercel Deployment Protection. noindex is not access control.

## Release and monitoring

Run npm run release, then npm run test:e2e. CI runs these and retains browser evidence. Make the QA job a required branch check and connect production deployments to successful checks. Actual hosting permissions and branch rules require repository/hosting-owner access.

Day 1: validate real HTTPS status/canonical/robots/XML, booking receipt, event ingestion, CMS content and assets/errors. Week 1: Search Console sitemap/indexing/soft-404/redirect review plus mobile traces. Month 1: query-to-landing-page intent, conversions, crawl logs and mobile/desktop p75 CWV. Only make migration decisions from approved legacy exports and real evidence.

Do not call the release production-ready until these external decisions and verification results are recorded.
