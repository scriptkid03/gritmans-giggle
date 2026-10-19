import { Suspense } from 'react';
import type { Metadata } from 'next';
import { JokesClient } from '@/app/jokes/JokesClient';
import { getJokes } from '@/lib/db-jokes';

export const metadata: Metadata = {
  title: 'The Joke Joint | Gritmans Giggle & Chuckle Joint',
  description:
    'Fresh jokes, terrible jokes, dad jokes, random jokes — if it makes somebody laugh, it belongs here.',
};

export default async function JokesPage() {
  const initialJokes = await getJokes();

  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[60vh] flex items-center justify-center">
          <div className="text-center font-black uppercase text-xl animate-pulse">
            Loading Fresh Jokes from MongoDB... 😂
          </div>
        </div>
      }
    >
      <JokesClient initialJokes={initialJokes} />
    </Suspense>
  );
}
