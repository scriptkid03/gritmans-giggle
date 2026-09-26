export type ReactionType = 'smirk' | 'chuckle' | 'laugh' | 'finished';

export interface ReactionCounts {
  smirk: number;
  chuckle: number;
  laugh: number;
  finished: number;
}

export type JokeCategory =
  | 'Dad Jokes'
  | 'One-Liners'
  | 'Relationship'
  | 'Work'
  | 'School'
  | 'Ghana'
  | 'Random';

export interface Joke {
  id: string;
  setup: string;
  punchline: string;
  category: JokeCategory;
  author?: string;
  reactions: ReactionCounts;
  tags?: string[];
  featured?: boolean;
}

export type GalleryItemType = 'image' | 'meme' | 'video' | 'audio';

export interface GalleryItem {
  id: string;
  title: string;
  type: GalleryItemType;
  category: string;
  description: string;
  reactions: number;
  accentColor: string;
  badge?: string;
  duration?: string; // for video/audio
  memeTextTop?: string;
  memeTextBottom?: string;
  visualDetail?: string;
}

export interface Comment {
  id: string;
  stageName: string;
  avatarColor: string;
  comment: string;
  reaction: ReactionType;
  createdAt: string;
  likes: number;
  isNew?: boolean;
}

export interface LaughCategoryInfo {
  id: string;
  title: string;
  emoji: string;
  description: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  slug: string;
}
