import { NextResponse } from 'next/server';
import { prepareStorage } from '@/lib/server/runtime';
import { storage } from '@/lib/server/storage';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  try {
    await prepareStorage();
    const { id: idParam } = await context.params;
    const id = parseInt(idParam, 10);

    if (Number.isNaN(id)) {
      return NextResponse.json({ message: 'Invalid video ID' }, { status: 400 });
    }

    const video = await storage.getVideoById(id);
    if (!video) {
      return NextResponse.json({ message: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json(video);
  } catch {
    return NextResponse.json({ message: 'Failed to fetch video' }, { status: 500 });
  }
}
