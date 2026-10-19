import { NextRequest, NextResponse } from 'next/server';
import { getJokes, createJoke } from '@/lib/db-jokes';
import { JokeCategory } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const query = searchParams.get('query') || undefined;
    const featuredParam = searchParams.get('featured');
    const featured = featuredParam !== null ? featuredParam === 'true' : undefined;

    const jokes = await getJokes({ category, query, featured });
    return NextResponse.json({ success: true, jokes });
  } catch (error) {
    console.error('Error fetching jokes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch jokes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { setup, punchline, category, author, tags } = body;

    if (!setup || !setup.trim() || !punchline || !punchline.trim()) {
      return NextResponse.json(
        { success: false, error: 'Setup and punchline are required.' },
        { status: 400 }
      );
    }

    const validCategory = (category || 'Random') as JokeCategory;

    const joke = await createJoke({
      setup,
      punchline,
      category: validCategory,
      author: author || 'Anonymous Giggler',
      tags: Array.isArray(tags) ? tags : [],
    });

    return NextResponse.json({ success: true, joke }, { status: 201 });
  } catch (error) {
    console.error('Error creating joke:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save joke to MongoDB' },
      { status: 500 }
    );
  }
}
