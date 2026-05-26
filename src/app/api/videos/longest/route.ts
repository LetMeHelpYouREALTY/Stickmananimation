import { NextResponse } from 'next/server';
import { prepareStorage } from '@/lib/server/runtime';
import { storage } from '@/lib/server/storage';

export async function GET() {
  try {
    await prepareStorage();
    const longestVideo = await storage.getLongestVideo();
    if (!longestVideo) {
      return NextResponse.json({ message: 'No videos found' }, { status: 404 });
    }
    return NextResponse.json(longestVideo);
  } catch {
    return NextResponse.json({ message: 'Failed to fetch longest video' }, { status: 500 });
  }
}
