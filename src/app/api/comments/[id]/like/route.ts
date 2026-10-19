import { NextRequest, NextResponse } from 'next/server';
import { likeComment } from '@/lib/db-comments';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const updated = await likeComment(id);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Comment not found or failed to update' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, comment: updated });
  } catch (error) {
    console.error('Error liking comment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to like comment' },
      { status: 500 }
    );
  }
}
