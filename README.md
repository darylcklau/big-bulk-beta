# BIG Bulk

BIG Bulk is a mobile-first PWA for fast private workout logging, built on Next.js App Router, TypeScript, Tailwind CSS, and Supabase.

## Phase 1 shipped in this codebase

- Email/password and magic-link authentication
- Natural-language workout logging
- Dashboard with today, recent logs, weekly sets, and weekly volume
- Exercise history with charts for weight, reps, and volume
- Mobile-first layout with voice input enhancement
- Supabase schema with row-level security
- PWA manifest and Apple web app metadata

## Tech stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase Auth + Postgres
- Recharts
- Zod

## Folder structure

```text
app/
  (auth)/
  (app)/
components/
  charts/
  forms/
  layout/
  ui/
features/
  auth/
  dashboard/
  progress/
  workouts/
lib/
  parser.ts
  supabase/
  validation.ts
supabase/
  schema.sql
types/
```

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template:

   ```bash
   cp .env.example .env.local
   ```

3. Fill in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL`

4. In Supabase:

- Create a project
- Enable email auth
- Optionally enable magic link auth
- Run the SQL in [supabase/schema.sql](/C:/Users/daryl/Documents/Codex/2026-04-23-you-are-codex-acting-as-my/supabase/schema.sql)

5. Start the app:

   ```bash
   npm run dev
   ```

## Vercel deployment

1. Push this code to `darylcklau/big-bulk-beta`
2. Open the existing Vercel project
3. Set the same environment variables in Vercel
4. Redeploy the `main` branch
5. In Supabase Auth settings, add:

- Local redirect: `http://localhost:3000/auth/callback`
- Production redirect: `https://<your-domain>/auth/callback`

## Product notes

- Privacy defaults are enforced through Supabase RLS.
- Voice input uses the browser speech recognition API when available.
- The workout parser expects one set per line in the format `Exercise 8 reps 80kg`.

## Phase 2 scaffolding

Comments are included in the schema and codebase for:

- friend requests
- progression comparison permissions
- Google Sheets sync
- Google Drive export
- AI coaching insights

These are intentionally not fully implemented in Phase 1.
