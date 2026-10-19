import { NextRequest, NextResponse } from 'next/server';
import { getComments, createComment } from '@/lib/db-comments';
import { ReactionType } from '@/lib/types';

export async function GET() {
  try {
    const comments = await getComments();
    return NextResponse.json({ success: true, comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { stageName, avatarColor, comment, reaction } = body;

    if (!stageName || !comment) {
      return NextResponse.json(
        { success: false, error: 'stageName and comment are required' },
        { status: 400 }
      );
    }

    const created = await createComment({
      stageName,
      avatarColor: avatarColor || 'bg-amber-400 text-amber-950',
      comment,
      reaction: (reaction || 'laugh') as ReactionType,
    });

    return NextResponse.json({ success: true, comment: created }, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save comment to MongoDB' },
      { status: 500 }
    );
  }
}
