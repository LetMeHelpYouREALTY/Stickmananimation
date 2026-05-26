import { NextResponse } from "next/server";
import { handleVideoApi } from "@/lib/server/api-videos";
import { storage } from "@/lib/server/storage";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id: idParam } = await context.params;
  const id = parseInt(idParam, 10);

  if (Number.isNaN(id)) {
    return NextResponse.json({ message: "Invalid video ID" }, { status: 400 });
  }

  return handleVideoApi(() => storage.getVideoById(id), {
    syncIfEmpty: true,
    allowNotFound: true,
  });
}
