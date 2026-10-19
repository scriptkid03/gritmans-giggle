import type { Metadata } from 'next';
import { CommentsClient } from '@/app/comments/CommentsClient';
import { getComments } from '@/lib/db-comments';

export const metadata: Metadata = {
  title: 'Leave Your Laugh | Gritmans Giggle & Chuckle Joint',
  description:
    'Did something here make you laugh? Tell us. Did you come with your own joke? Even better. Post your laugh to the Joint at funnygritmanlaughters.com.',
};

export default async function CommentsPage() {
  const initialComments = await getComments();
  return <CommentsClient initialComments={initialComments} />;
}
