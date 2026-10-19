import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { MOCK_JOKES, MOCK_COMMENTS, MOCK_GALLERY_ITEMS } from '@/lib/mock-data';

export async function POST() {
  return handleSeed();
}

export async function GET() {
  return handleSeed();
}

async function handleSeed() {
  try {
    let jokesCount = 0;
    let commentsCount = 0;
    let galleryCount = 0;

    // 1. Seed Jokes if empty
    const existingJokes = await prisma.joke.count();
    if (existingJokes === 0) {
      for (const j of MOCK_JOKES) {
        await prisma.joke.create({
          data: {
            setup: j.setup,
            punchline: j.punchline,
            category: j.category,
            author: j.author || null,
            tags: j.tags || [],
            featured: j.featured || false,
            reactions: {
              set: {
                smirk: j.reactions.smirk,
                chuckle: j.reactions.chuckle,
                laugh: j.reactions.laugh,
                finished: j.reactions.finished,
              },
            },
          },
        });
        jokesCount++;
      }
    } else {
      jokesCount = existingJokes;
    }

    // 2. Seed Comments if empty
    const existingComments = await prisma.comment.count();
    if (existingComments === 0) {
      for (const c of MOCK_COMMENTS) {
        await prisma.comment.create({
          data: {
            stageName: c.stageName,
            avatarColor: c.avatarColor,
            comment: c.comment,
            reaction: c.reaction,
            likes: c.likes,
          },
        });
        commentsCount++;
      }
    } else {
      commentsCount = existingComments;
    }

    // 3. Seed Gallery Items if empty
    const existingGallery = await prisma.galleryItem.count();
    if (existingGallery === 0) {
      for (const g of MOCK_GALLERY_ITEMS) {
        await prisma.galleryItem.create({
          data: {
            title: g.title,
            type: g.type,
            category: g.category,
            description: g.description,
            reactions: g.reactions,
            accentColor: g.accentColor,
            badge: g.badge || null,
            duration: g.duration || null,
            memeTextTop: g.memeTextTop || null,
            memeTextBottom: g.memeTextBottom || null,
            visualDetail: g.visualDetail || null,
          },
        });
        galleryCount++;
      }
    } else {
      galleryCount = existingGallery;
    }

    return NextResponse.json({
      success: true,
      message: 'MongoDB database initialized successfully!',
      stats: {
        jokes: jokesCount,
        comments: commentsCount,
        galleryItems: galleryCount,
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Database seeding failed',
      },
      { status: 500 }
    );
  }
}
