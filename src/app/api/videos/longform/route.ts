import { NextResponse } from "next/server";
import { prepareStorage } from "@/lib/server/runtime";
import { storage } from "@/lib/server/storage";

export async function GET() {
  try {
    await prepareStorage();
    const videos = await storage.getLongFormVideos();
    return NextResponse.json(videos);
  } catch {
    return NextResponse.json({ message: "Failed to fetch videos" }, { status: 500 });
  }
}

