# ITGS website

React 19, TypeScript, Vite and Tailwind CSS 4. The production build generates static HTML for approved routes and articles while preserving client-side navigation.

- `npm ci`
- `npm run dev` for quick client development (not production HTTP QA).
- `npm run release` runs lint, unit tests, strict TypeScript, client/SSR builds, prerendering and static route tests.
- `npm run preview` serves the generated site locally with real 404 responses.
- `npm run test:e2e` runs Chromium, Firefox and WebKit journey/accessibility checks after a build.

Copy `.env.example` to `.env.local`. Production requires an approved SITE_URL and SITE_ENV=production. Without these, the build is a noindex preview. No mock articles are published. Configured CMS reads occur at build time; editorial changes require deployment. See `BLOG-CMS-SETUP.md` and `content/RELEASE-APPROVALS.md` for publication and external release gates.

Vercel uses the generated files and 404.html without an SPA catch-all. Application deployment is blocked by type/build/static-route failures via the release command. Require the browser QA workflow before production promotion.
