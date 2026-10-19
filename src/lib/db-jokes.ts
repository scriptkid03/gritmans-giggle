import { prisma } from './prisma';
import { Joke, JokeCategory, ReactionType } from './types';
import { MOCK_JOKES } from './mock-data';

/**
 * Format a Prisma Joke document into our client Joke type
 */
function formatJoke(j: any): Joke {
  return {
    id: j.id,
    setup: j.setup,
    punchline: j.punchline,
    category: j.category as JokeCategory,
    author: j.author || undefined,
    reactions: {
      smirk: j.reactions?.smirk ?? 0,
      chuckle: j.reactions?.chuckle ?? 0,
      laugh: j.reactions?.laugh ?? 0,
      finished: j.reactions?.finished ?? 0,
    },
    tags: j.tags || [],
    featured: j.featured || false,
  };
}

/**
 * Retrieve jokes from MongoDB, with optional category & query filtering.
 * Falls back to mock data if MongoDB is unreachable or empty.
 */
export async function getJokes(filter?: {
  category?: string;
  query?: string;
  featured?: boolean;
}): Promise<Joke[]> {
  try {
    const where: any = {};

    if (filter?.category && filter.category !== 'All') {
      where.category = filter.category;
    }

    if (filter?.featured !== undefined) {
      where.featured = filter.featured;
    }

    if (filter?.query && filter.query.trim()) {
      const q = filter.query.trim();
      where.OR = [
        { setup: { contains: q, mode: 'insensitive' } },
        { punchline: { contains: q, mode: 'insensitive' } },
        { author: { contains: q, mode: 'insensitive' } },
        { category: { contains: q, mode: 'insensitive' } },
      ];
    }

    const jokes = await prisma.joke.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    if (!jokes || jokes.length === 0) {
      // If db has no jokes yet or filter returned empty, check if we should fallback to mock
      if (!filter?.category && !filter?.query && !filter?.featured) {
        return MOCK_JOKES;
      }
      // If filtered query against mock data
      return filterMockJokes(filter);
    }

    return jokes.map(formatJoke);
  } catch (error) {
    console.warn('[MongoDB] Falling back to mock jokes:', error instanceof Error ? error.message : error);
    return filterMockJokes(filter);
  }
}

/**
 * Fallback filter helper for mock data
 */
function filterMockJokes(filter?: { category?: string; query?: string; featured?: boolean }): Joke[] {
  return MOCK_JOKES.filter((joke) => {
    if (filter?.category && filter.category !== 'All' && joke.category !== filter.category) {
      return false;
    }
    if (filter?.featured !== undefined && joke.featured !== filter.featured) {
      return false;
    }
    if (filter?.query && filter.query.trim()) {
      const q = filter.query.toLowerCase().trim();
      const matches =
        joke.setup.toLowerCase().includes(q) ||
        joke.punchline.toLowerCase().includes(q) ||
        (joke.author && joke.author.toLowerCase().includes(q)) ||
        joke.category.toLowerCase().includes(q);
      if (!matches) return false;
    }
    return true;
  });
}

/**
 * Get single featured joke or fallback to first joke
 */
export async function getFeaturedJoke(): Promise<Joke> {
  try {
    const featured = await prisma.joke.findFirst({
      where: { featured: true },
    });

    if (featured) {
      return formatJoke(featured);
    }

    const anyJoke = await prisma.joke.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    if (anyJoke) {
      return formatJoke(anyJoke);
    }
  } catch (error) {
    console.warn('[MongoDB] Failed to fetch featured joke, using mock:', error);
  }

  return MOCK_JOKES[0];
}

/**
 * Save a new joke to MongoDB
 */
export async function createJoke(data: {
  setup: string;
  punchline: string;
  category: JokeCategory;
  author?: string;
  tags?: string[];
  featured?: boolean;
}): Promise<Joke> {
  const newJoke = await prisma.joke.create({
    data: {
      setup: data.setup.trim(),
      punchline: data.punchline.trim(),
      category: data.category,
      author: data.author?.trim() || null,
      tags: data.tags || [],
      featured: data.featured || false,
      reactions: {
        set: {
          smirk: 0,
          chuckle: 0,
          laugh: 0,
          finished: 0,
        },
      },
    },
  });

  return formatJoke(newJoke);
}

/**
 * Update reaction count for a joke in MongoDB
 */
export async function reactToJoke(
  jokeId: string,
  reactionType: ReactionType,
  increment: boolean = true
): Promise<Joke | null> {
  try {
    const existing = await prisma.joke.findUnique({
      where: { id: jokeId },
    });

    if (!existing) return null;

    const currentReactions = existing.reactions || { smirk: 0, chuckle: 0, laugh: 0, finished: 0 };
    const currentCount = (currentReactions as any)[reactionType] || 0;
    const newCount = increment ? currentCount + 1 : Math.max(0, currentCount - 1);

    const updated = await prisma.joke.update({
      where: { id: jokeId },
      data: {
        reactions: {
          set: {
            ...currentReactions,
            [reactionType]: newCount,
          },
        },
      },
    });

    return formatJoke(updated);
  } catch (error) {
    console.error(`[MongoDB] Failed to react to joke ${jokeId}:`, error);
    return null;
  }
}
