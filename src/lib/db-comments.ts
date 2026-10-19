import { prisma } from './prisma';
import { Comment, ReactionType } from './types';
import { MOCK_COMMENTS } from './mock-data';

function formatComment(c: any): Comment {
  return {
    id: c.id,
    stageName: c.stageName,
    avatarColor: c.avatarColor,
    comment: c.comment,
    reaction: c.reaction as ReactionType,
    createdAt: formatTimeAgo(c.createdAt),
    likes: c.likes ?? 0,
  };
}

function formatTimeAgo(date: Date | string): string {
  if (typeof date === 'string') return date;
  const now = new Date();
  const diffInSec = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

  if (diffInSec < 60) return 'Just now';
  const diffInMin = Math.floor(diffInSec / 60);
  if (diffInMin < 60) return `${diffInMin}m ago`;
  const diffInHours = Math.floor(diffInMin / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

/**
 * Get all comments from MongoDB (falls back to mock comments if db empty or unavailable)
 */
export async function getComments(): Promise<Comment[]> {
  try {
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (!comments || comments.length === 0) {
      return MOCK_COMMENTS;
    }

    return comments.map(formatComment);
  } catch (error) {
    console.warn('[MongoDB] Falling back to mock comments:', error instanceof Error ? error.message : error);
    return MOCK_COMMENTS;
  }
}

/**
 * Save a new comment to MongoDB
 */
export async function createComment(data: {
  stageName: string;
  avatarColor: string;
  comment: string;
  reaction: ReactionType;
}): Promise<Comment> {
  const newComment = await prisma.comment.create({
    data: {
      stageName: data.stageName.trim(),
      avatarColor: data.avatarColor,
      comment: data.comment.trim(),
      reaction: data.reaction,
      likes: 1,
    },
  });

  return formatComment(newComment);
}

/**
 * Like a comment
 */
export async function likeComment(commentId: string): Promise<Comment | null> {
  try {
    const updated = await prisma.comment.update({
      where: { id: commentId },
      data: {
        likes: { increment: 1 },
      },
    });

    return formatComment(updated);
  } catch (error) {
    console.error(`[MongoDB] Failed to like comment ${commentId}:`, error);
    return null;
  }
}
