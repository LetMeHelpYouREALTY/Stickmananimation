import { NextResponse } from 'next/server';
import { prepareStorage } from '@/lib/server/runtime';
import { storage } from '@/lib/server/storage';

export async function GET() {
  try {
    await prepareStorage();
    const showreel = await storage.getShowreel();
    if (!showreel) {
      return NextResponse.json({ message: 'Showreel not found' }, { status: 404 });
    }
    return NextResponse.json({ videoId: showreel.videoId });
  } catch {
    return NextResponse.json({ message: 'Failed to fetch showreel' }, { status: 500 });
  }
}
