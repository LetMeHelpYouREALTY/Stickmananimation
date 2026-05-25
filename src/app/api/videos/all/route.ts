import { NextResponse } from 'next/server';
import { storage } from '@/lib/server/storage';
import { syncYouTubeVideos } from '@/lib/server/youtube-service';

export async function GET() {
  try {
    if (process.env.SYNC_VIDEOS === 'true') {
      await syncYouTubeVideos().catch((err) => {
        console.error('YouTube sync failed:', err);
      });
    }
    const allVideos = await storage.getAllVideos();
    return NextResponse.json(allVideos);
  } catch {
    return NextResponse.json({ message: 'Failed to fetch all videos' }, { status: 500 });
  }
}
