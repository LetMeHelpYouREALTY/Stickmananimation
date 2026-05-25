import { NextResponse } from 'next/server';
import { syncYouTubeVideos } from '@/lib/server/youtube-service';

export async function POST(request: Request) {
  const secret = process.env.SYNC_SECRET;
  if (secret) {
    const auth = request.headers.get('authorization');
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    await syncYouTubeVideos();
    return NextResponse.json({ success: true, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Sync failed:', error);
    return NextResponse.json({ message: 'Sync failed' }, { status: 500 });
  }
}
