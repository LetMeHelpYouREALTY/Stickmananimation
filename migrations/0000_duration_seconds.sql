-- Run if /api/videos/shorts returns 500 after deploy (missing column on older DBs)
ALTER TABLE videos ADD COLUMN IF NOT EXISTS duration_seconds integer NOT NULL DEFAULT 0;
