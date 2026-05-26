import { handleVideoApi } from "@/lib/server/api-videos";
import { storage } from "@/lib/server/storage";

export async function GET() {
  return handleVideoApi(() => storage.getLongestVideo(), {
    syncIfEmpty: true,
    allowNotFound: true,
  });
}
