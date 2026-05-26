import { NextResponse } from 'next/server';
import { prepareStorage } from '@/lib/server/runtime';
import { storage } from '@/lib/server/storage';

export async function GET() {
  try {
    await prepareStorage();
    const featuredVideos = await storage.getFeaturedVideos();
    return NextResponse.json(featuredVideos);
  } catch {
    return NextResponse.json({ message: 'Failed to fetch featured videos' }, { status: 500 });
  }
}
