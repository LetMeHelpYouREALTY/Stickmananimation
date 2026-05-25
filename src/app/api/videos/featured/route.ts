import { NextResponse } from 'next/server';
import { storage } from '@/lib/server/storage';

export async function GET() {
  try {
    const featuredVideos = await storage.getFeaturedVideos();
    return NextResponse.json(featuredVideos);
  } catch {
    return NextResponse.json({ message: 'Failed to fetch featured videos' }, { status: 500 });
  }
}
