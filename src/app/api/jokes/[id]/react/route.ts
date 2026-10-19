import { NextRequest, NextResponse } from 'next/server';
import { reactToJoke } from '@/lib/db-jokes';
import { ReactionType } from '@/lib/types';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { reactionType, increment = true } = body;

    if (!reactionType) {
      return NextResponse.json(
        { success: false, error: 'reactionType is required' },
        { status: 400 }
      );
    }

    const updatedJoke = await reactToJoke(id, reactionType as ReactionType, increment);

    if (!updatedJoke) {
      return NextResponse.json(
        { success: false, error: 'Joke not found or update failed' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, joke: updatedJoke });
  } catch (error) {
    console.error('Error updating reaction:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update reaction' },
      { status: 500 }
    );
  }
}
