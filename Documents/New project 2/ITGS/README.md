# ITGS — Global Technology Authority

Enterprise marketing website with admin CMS, contact API, and job application pipeline.

## Prerequisites

- Node.js 18+

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment template and configure:
   ```bash
   cp .env.example .env.local
   ```
   Set `ADMIN_API_KEY` and `VITE_ADMIN_API_KEY` to the same secure value.

3. Run development (API + frontend):
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:3000
   - API: http://localhost:3001

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start API + Vite dev server |
| `npm run build` | Production frontend build |
| `npm start` | Serve production build + API |
| `npm run lint` | TypeScript type check |
| `npm test` | Run unit & API tests |
| `npm run validate` | lint + test + build |

## Production

```bash
npm run validate
npm start
```

## Architecture

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS 4, React Router
- **Backend:** Express (contact form, job applications)
- **Admin CMS:** Client-side with localStorage (blog/jobs) + server-backed applications
