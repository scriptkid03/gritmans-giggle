import { Suspense } from 'react';
import type { Metadata } from 'next';
import { GalleryClient } from '@/app/gallery/GalleryClient';

export const metadata: Metadata = {
  title: 'The Laugh Gallery | Gritmans Giggle & Chuckle Joint',
  description:
    'Visual comedy, viral African memes, relatable skits, and comic clips at funnygritmanlaughters.com.',
};

export default function GalleryPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[60vh] flex items-center justify-center">
          <div className="text-center font-black uppercase text-xl animate-pulse">
            Loading Laugh Gallery... 🖼️
          </div>
        </div>
      }
    >
      <GalleryClient />
    </Suspense>
  );
}
