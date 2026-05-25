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
3. Configure the project:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `dist` **or** leave empty — `next.config.ts` sets `distDir: "dist"` on Vercel automatically
   - **Production Branch:** ensure this matches your deploy branch (e.g. `cursor/nextjs-starter-migration-22c8` or `main` after merge)
4. Add the required environment variables (`DATABASE_URL`, `YOUTUBE_API_KEY`).
5. Deploy the project (use **Redeploy** → clear build cache if a previous deploy failed).

## Configuration Files

- `vercel.json`: Next.js framework and security headers
- `next.config.ts`: uses `distDir: "dist"` when `VERCEL=1` for legacy output-directory settings

## Database Migrations

The project is configured to work with Drizzle ORM. To update the database schema:

1. Make changes to the schema in `shared/schema.ts`
2. Run the migration command:
   ```bash
   npm run db:push
   ```

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