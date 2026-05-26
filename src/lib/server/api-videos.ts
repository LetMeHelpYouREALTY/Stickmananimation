import { NextResponse } from "next/server";
import { isDatabaseConfigured } from "./db";
import { prepareStorage } from "./runtime";
import { storage } from "./storage";
import { syncYouTubeVideos } from "./youtube-service";

async function maybeSyncFromYouTube(): Promise<void> {
  if (!process.env.YOUTUBE_API_KEY) {
    return;
  }
  const existing = await storage.getAllVideos();
  if (existing.length === 0) {
    await syncYouTubeVideos();
  }
}

/**
 * Shared handler for /api/videos/* routes.
 * Returns empty payloads (200) when DATABASE_URL is missing so the homepage still loads.
 */
export async function handleVideoApi<T>(
  handler: () => Promise<T>,
  options?: {
    empty?: T;
    syncIfEmpty?: boolean;
    allowNotFound?: boolean;
  },
): Promise<NextResponse> {
  if (!isDatabaseConfigured()) {
    console.warn("[videos] DATABASE_URL is not set");
    if (options?.empty !== undefined) {
      return NextResponse.json(options.empty);
    }
    return NextResponse.json(
      { message: "Database not configured", code: "DATABASE_NOT_CONFIGURED" },
      { status: 503 },
    );
  }

  try {
    await prepareStorage();

    if (options?.syncIfEmpty) {
      await maybeSyncFromYouTube().catch((err) => {
        console.error("[videos] YouTube sync failed:", err);
      });
    }

    const result = await handler();

    if (result === undefined || result === null) {
      if (options?.allowNotFound) {
        return NextResponse.json({ message: "Not found" }, { status: 404 });
      }
      if (options?.empty !== undefined) {
        return NextResponse.json(options.empty);
      }
      return NextResponse.json(null);
    }

    return NextResponse.json(result);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error("[videos] API error:", detail, error);
    return NextResponse.json(
      {
        message: "Failed to fetch videos",
        ...(process.env.NODE_ENV !== "production" ? { detail } : {}),
      },
      { status: 500 },
    );
  }
}
