# BIG Bulk Migration Checklist

This workspace contains the production rebuild that should replace the current placeholder in `darylcklau/big-bulk-beta`.

## 1. Copy the rebuilt app into the real repo

From your machine:

```bash
git clone https://github.com/darylcklau/big-bulk-beta.git
cd big-bulk-beta
```

Then copy the contents of this workspace into the repo root, replacing the placeholder files.

Source workspace:

`C:\Users\daryl\Documents\Codex\2026-04-23-you-are-codex-acting-as-my`

## 2. Install dependencies

```bash
npm install
```

## 3. Create environment variables

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL`

For local development:

`NEXT_PUBLIC_APP_URL=http://localhost:3000`

## 4. Set up Supabase

In your Supabase project:

1. Enable Email auth
2. Enable Magic Link auth if desired
3. Run the SQL in `supabase/schema.sql`
4. Add redirect URLs:

- `http://localhost:3000/auth/callback`
- `https://<your-vercel-domain>/auth/callback`

## 5. Verify locally

```bash
npm run dev
```

Recommended checks:

- Sign in with email/password
- Sign in with magic link
- Log a typed workout
- Test voice input in a supported browser
- Confirm dashboard metrics update
- Confirm exercise history charts render
- Confirm one user cannot see another user’s data

## 6. Ship to GitHub

```bash
git checkout -b production-rebuild
git add .
git commit -m "feat: rebuild BIG Bulk as production-ready Phase 1 app"
git push -u origin production-rebuild
```

Then open a PR into `main`.

## 7. Deploy to Vercel

In the existing Vercel project:

1. Set the same environment variables
2. Point production to the updated branch or merge to `main`
3. Redeploy

## 8. Post-deploy smoke test

- Load `/login`
- Complete auth callback successfully
- Log 2-3 sets
- Confirm dashboard and history pages populate
- Install the PWA on mobile

## Notes

- The current remote repo is still a placeholder.
- This rebuilt workspace is ready to become the new production base.
- Phase 2 hooks are scaffolded but intentionally not implemented yet.
