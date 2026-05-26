import { handleVideoApi } from "@/lib/server/api-videos";
import { storage } from "@/lib/server/storage";

type RouteContext = { params: Promise<{ category: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { category } = await context.params;
  return handleVideoApi(() => storage.getVideosByCategory(category), {
    empty: [],
    syncIfEmpty: true,
  });
}
