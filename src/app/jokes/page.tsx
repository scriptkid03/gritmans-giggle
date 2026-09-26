import { Suspense } from 'react';
import type { Metadata } from 'next';
import { JokesClient } from '@/app/jokes/JokesClient';

export const metadata: Metadata = {
  title: 'The Joke Joint | Gritmans Giggle & Chuckle Joint',
  description:
    'Fresh jokes, terrible jokes, dad jokes, random jokes — if it makes somebody laugh, it belongs here.',
};

export default function JokesPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[60vh] flex items-center justify-center">
          <div className="text-center font-black uppercase text-xl animate-pulse">
            Loading Fresh Jokes... 😂
          </div>
        </div>
      }
    >
      <JokesClient />
    </Suspense>
  );
}
