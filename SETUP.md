# GK Animates — Setup Guide

## 1. Install dependencies

```bash
npm install
```

## 2. Configure environment

Copy `.env.example` to `.env.local` and set:

- `DATABASE_URL` — Neon or local Postgres
- `YOUTUBE_API_KEY` — from [Google Cloud Console](https://console.developers.google.com/) (YouTube Data API v3 enabled)

## 3. Database

```bash
npm run db:push
```

On first API request without data, sample videos are seeded when the database is reachable.

## 4. Sync YouTube channel

With `YOUTUBE_API_KEY` set:

```bash
curl -X POST http://localhost:3000/api/sync
```

Or set `SYNC_VIDEOS=true` so `/api/videos/all` triggers a sync.

## 5. Development

```bash
npm run dev
```

Visit `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

Or deploy to Vercel with the Next.js preset (see root `vercel.json`).
