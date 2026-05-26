# Deploying to Vercel

This document provides instructions for deploying the GK Animates portfolio website to Vercel.

## Prerequisites

Before deploying, ensure you have:

1. A [Vercel](https://vercel.com) account
2. A [Neon PostgreSQL](https://neon.tech) database (or any other PostgreSQL provider)
3. A [YouTube API key](https://developers.google.com/youtube/v3/getting-started)

## Environment Variables

You need to set the following environment variables in your Vercel project:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `YOUTUBE_API_KEY` | YouTube Data API v3 key | Yes |
| `VERCEL` | Set to '1' to enable serverless mode | Yes |
| `SYNC_VIDEOS` | Set to 'true' to sync videos on deployment | Optional |
| `NODE_ENV` | Set to 'production' | Yes |
| `NEXT_PUBLIC_SITE_URL` | `https://www.stickmananimations.com` (canonical OG/sitemap; optional if using default) | Recommended |

## Deployment Steps

### Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from the project root:
   ```bash
   vercel --prod
   ```

4. Follow the prompts to set up your project.

### Using Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).
2. Connect your repository to Vercel.
3. Configure the project (critical):
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build` (default — must run `next build`)
   - **Output Directory:** leave **empty** (delete `dist` if it is still set from the old Vite app)
   - **Production Branch:** `cursor/nextjs-starter-migration-22c8` or `main` after merge
4. Add the required environment variables (`DATABASE_URL`, `YOUTUBE_API_KEY`).
5. Deploy with **Redeploy** and **clear build cache**.

### Always deploy to production (automated)

The workflow [`.github/workflows/vercel-production.yml`](../.github/workflows/vercel-production.yml) runs on every successful Vercel deployment for `main` or `cursor/nextjs-starter-migration-22c8` and runs `vercel promote` so **stickmananimations.com** updates without clicking Promote in the dashboard.

**One-time setup:** In GitHub → **Settings → Secrets and variables → Actions**, add:

| Secret | Value |
|--------|--------|
| `VERCEL_TOKEN` | [Vercel account token](https://vercel.com/account/tokens) with deploy access |

> If you see `.next was not found`, Output Directory is wrong or `distDir` was customized — use default `.next` only. In **Project Settings → Build & Development**, clear **Output Directory** (leave empty for Next.js).

## Configuration Files

- `vercel.json`: Next.js framework and security headers (no `outputDirectory`)

## Database Migrations

The project is configured to work with Drizzle ORM. To update the database schema:

1. Make changes to the schema in `shared/schema.ts`
2. Run the migration command (with `DATABASE_URL` set to your Neon production URL):
   ```bash
   npm run db:push
   ```

If video APIs return **500** after deploy, check Vercel **Runtime Logs** for `[videos] API error`. Common fixes:

| Cause | Fix |
|-------|-----|
| `DATABASE_URL` missing | Add Neon connection string in Vercel → Environment Variables (Production + Preview) |
| `duration_seconds` column missing | Run `npm run db:push` or `migrations/0000_duration_seconds.sql` on the database |
| Empty database | Set `YOUTUBE_API_KEY`; first request auto-syncs channel videos |

Video routes return **200 with `[]`** when `DATABASE_URL` is unset so the homepage still loads (sections stay empty until the DB is configured).

## Troubleshooting

### Cannot Connect to Database

- Verify your `DATABASE_URL` is correctly set in Vercel's environment variables.
- Ensure your database allows connections from Vercel's IP ranges.
- For Neon, ensure you're using the correct connection string format with SSL enabled.

### YouTube API Issues

- Check that your `YOUTUBE_API_KEY` is valid and has the necessary permissions.
- Verify you haven't exceeded quota limits.

### Deployment Errors

- Check the Vercel build logs for specific error messages.
- Ensure your Node.js version is compatible (project uses Node.js 18.x).
- If you encounter serverless function size limits, optimize your code or consider splitting functions.

## Performance Optimizations

- The `SYNC_VIDEOS` environment variable controls when to sync videos from YouTube.
  - Set to 'true' for infrequent syncing (e.g., once per day using a cron job).
  - Set to 'false' for regular operation to avoid API quota usage.
- Consider implementing caching strategies for frequently accessed data.

## Support

If you encounter issues with deployment, please:

1. Check the [Vercel documentation](https://vercel.com/docs)
2. Consult the [Neon documentation](https://neon.tech/docs) for database issues
3. Open an issue in the project repository