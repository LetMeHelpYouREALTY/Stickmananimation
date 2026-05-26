# Google Search Console setup — GK Animates

## 1. Set production URL

In Vercel (and `.env.local` for local testing):

```env
NEXT_PUBLIC_SITE_URL=https://www.your-live-domain.com
```

This powers canonical URLs, `sitemap.xml`, `robots.txt`, and Open Graph links.

## 2. Verify ownership

1. Open [Google Search Console](https://search.google.com/search-console)
2. Add property → **URL prefix** → your live domain
3. Choose **HTML tag** verification
4. Copy the `content` value from the meta tag
5. Add to Vercel env: `GOOGLE_SITE_VERIFICATION=that_content_value`
6. Redeploy, then click **Verify** in Search Console

## 3. Submit sitemap

After deploy:

```
https://www.your-live-domain.com/sitemap.xml
```

In Search Console: **Sitemaps** → add the URL above → Submit.

## 4. Request indexing

- **URL inspection** → enter homepage → **Request indexing**
- Repeat for important sections if you add dedicated URLs later

## 5. What this site ships for SEO

| Asset | Path |
|-------|------|
| Sitemap | `/sitemap.xml` |
| Robots | `/robots.txt` (blocks `/api/*`, `/performance`) |
| JSON-LD | Organization, Person, WebSite, VideoObject (featured videos) |
| Metadata | Title, description, canonical, Open Graph, Twitter cards |

## 6. Monitor Google Search status

For **platform-wide** Search issues (not just your site), use the [Google Search Status Dashboard](https://status.search.google.com).

## 7. Ongoing checks

- **Pages** → indexing coverage
- **Experience** → Core Web Vitals (aligns with `/performance` tooling)
- **Enhancements** → structured data valid after deploy
- Keep `YOUTUBE_API_KEY` + `SYNC_VIDEOS` or `/api/sync` so video metadata stays fresh
