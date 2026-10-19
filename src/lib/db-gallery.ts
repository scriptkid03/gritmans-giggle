import { prisma } from './prisma';
import { GalleryItem, GalleryItemType } from './types';
import { MOCK_GALLERY_ITEMS } from './mock-data';

function formatGalleryItem(item: any): GalleryItem {
  return {
    id: item.id,
    title: item.title,
    type: item.type as GalleryItemType,
    category: item.category,
    description: item.description,
    reactions: item.reactions ?? 0,
    accentColor: item.accentColor,
    badge: item.badge || undefined,
    duration: item.duration || undefined,
    memeTextTop: item.memeTextTop || undefined,
    memeTextBottom: item.memeTextBottom || undefined,
    visualDetail: item.visualDetail || undefined,
  };
}

/**
 * Get gallery items from MongoDB (or fallback to mock items)
 */
export async function getGalleryItems(type?: string): Promise<GalleryItem[]> {
  try {
    const where: any = {};
    if (type && type !== 'all') {
      where.type = type;
    }

    const items = await prisma.galleryItem.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    if (!items || items.length === 0) {
      if (type && type !== 'all') {
        return MOCK_GALLERY_ITEMS.filter((i) => i.type === type);
      }
      return MOCK_GALLERY_ITEMS;
    }

    return items.map(formatGalleryItem);
  } catch (error) {
    console.warn('[MongoDB] Falling back to mock gallery items:', error instanceof Error ? error.message : error);
    if (type && type !== 'all') {
      return MOCK_GALLERY_ITEMS.filter((i) => i.type === type);
    }
    return MOCK_GALLERY_ITEMS;
  }
}

/**
 * React to a gallery item
 */
export async function reactToGalleryItem(id: string): Promise<GalleryItem | null> {
  try {
    const updated = await prisma.galleryItem.update({
      where: { id },
      data: {
        reactions: { increment: 1 },
      },
    });

    return formatGalleryItem(updated);
  } catch (error) {
    console.error(`[MongoDB] Failed to react to gallery item ${id}:`, error);
    return null;
  }
}
