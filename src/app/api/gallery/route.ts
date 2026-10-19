import { NextRequest, NextResponse } from 'next/server';
import { getGalleryItems } from '@/lib/db-gallery';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || undefined;

    const items = await getGalleryItems(type);
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery items' },
      { status: 500 }
    );
  }
}
