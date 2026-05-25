# GK Animates Website

Animation portfolio for **gkanimates by Gene Kelly Boyle** — built with **Next.js 15** (App Router), React, Tailwind CSS, and YouTube Data API v3.

## Features

- YouTube channel integration (showreel, featured grid, categories)
- Newsletter signup (Postgres + Drizzle)
- Dark/light theme, Framer Motion sections
- Core Web Vitals monitoring (`/performance`)
- Deploy-ready for Vercel

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL (e.g. Neon)
- YouTube Data API v3 key

### Setup

```bash
npm install
cp .env.example .env.local
# Set DATABASE_URL and YOUTUBE_API_KEY
npm run db:push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Postgres connection string |
| `YOUTUBE_API_KEY` | Yes | YouTube Data API v3 key |
| `SYNC_VIDEOS` | No | Set `true` to sync channel on `/api/videos/all` |
| `SYNC_SECRET` | No | Bearer token for `POST /api/sync` |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run db:push` | Push Drizzle schema to database |

## Project structure

```
src/
  app/          # App Router (pages, API routes)
  components/   # UI and home sections
  views/        # Page content (Home, Performance)
  lib/server/   # Database, YouTube sync
shared/         # Drizzle schema
public/         # Static assets
```

## API routes

- `GET /api/videos/showreel` — Latest showreel video ID
- `GET /api/videos/featured` — Top featured videos
- `GET /api/videos/all` — All videos
- `GET /api/videos/category/[category]` — Filter by category
- `POST /api/newsletter/subscribe` — Newsletter signup
- `POST /api/sync` — Trigger YouTube sync (optional `SYNC_SECRET`)

## Deploy (Vercel)

1. Import the repo on Vercel (framework: Next.js).
2. Add `DATABASE_URL`, `YOUTUBE_API_KEY`, and optionally `SYNC_VIDEOS=true`.
3. Run `npm run db:push` against your production database once.

## License

MIT
