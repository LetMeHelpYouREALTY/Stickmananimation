import { handleVideoApi } from "@/lib/server/api-videos";
import { storage } from "@/lib/server/storage";

export async function GET() {
  return handleVideoApi(
    async () => {
      const showreel = await storage.getShowreel();
      return showreel ? { videoId: showreel.videoId } : null;
    },
    { empty: { videoId: "" }, syncIfEmpty: true, allowNotFound: false },
  );
}
