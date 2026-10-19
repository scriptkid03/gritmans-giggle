import { NextRequest, NextResponse } from 'next/server';
import { reactToGalleryItem } from '@/lib/db-gallery';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const updated = await reactToGalleryItem(id);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found or update failed' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    console.error('Error reacting to gallery item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to react to gallery item' },
      { status: 500 }
    );
  }
}
