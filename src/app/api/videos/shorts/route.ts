import { NextResponse } from "next/server";
import { prepareStorage } from "@/lib/server/runtime";
import { storage } from "@/lib/server/storage";

export async function GET() {
  try {
    await prepareStorage();
    const shorts = await storage.getShortVideos();
    return NextResponse.json(shorts);
  } catch {
    return NextResponse.json({ message: "Failed to fetch shorts" }, { status: 500 });
  }
}

