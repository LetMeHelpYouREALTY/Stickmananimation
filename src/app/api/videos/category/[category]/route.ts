import { NextResponse } from 'next/server';
import { prepareStorage } from '@/lib/server/runtime';
import { storage } from '@/lib/server/storage';

type RouteContext = { params: Promise<{ category: string }> };

export async function GET(_request: Request, context: RouteContext) {
  try {
    await prepareStorage();
    const { category } = await context.params;
    const videos = await storage.getVideosByCategory(category);
    return NextResponse.json(videos);
  } catch {
    return NextResponse.json({ message: 'Failed to fetch videos by category' }, { status: 500 });
  }
}
