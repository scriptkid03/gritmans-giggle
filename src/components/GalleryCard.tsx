'use client';

import React, { useState } from 'react';
import { GalleryItem } from '@/lib/types';
import { Badge } from './Badge';
import { Heart, Play, Volume2, Image as ImageIcon } from 'lucide-react';

interface GalleryCardProps {
  item: GalleryItem;
  className?: string;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ item, className = '' }) => {
  const [reactions, setReactions] = useState(item.reactions);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (hasLiked) {
      setReactions((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setReactions((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <div
      className={`group bg-white rounded-2xl border-3 border-black comic-shadow-sm comic-card-hover overflow-hidden flex flex-col justify-between transition-all ${className}`}
    >
      <div>
        {/* Media visual banner / meme box */}
        <div
          className="relative w-full h-48 sm:h-56 p-3 min-[380px]:p-4 flex flex-col justify-between overflow-hidden border-b-3 border-black select-none"
          style={{ backgroundColor: item.accentColor }}
        >
          {/* Halftone / comic dots overlay */}
          <div className="absolute inset-0 opacity-15 comic-dots-bg pointer-events-none" />

          {/* Top badges */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-1.5">
            {item.badge && (
              <Badge variant="black" size="sm" rotate="-1">
                {item.badge}
              </Badge>
            )}

            {item.duration && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 min-[380px]:px-2.5 min-[380px]:py-1 rounded-md bg-black/80 text-white font-mono text-[11px] min-[380px]:text-xs font-bold border border-white/20">
                {item.type === 'video' ? (
                  <Play className="w-3 h-3 fill-current" />
                ) : (
                  <Volume2 className="w-3 h-3" />
                )}
                {item.duration}
              </span>
            )}
          </div>

          {/* Center Graphic / Meme content */}
          {item.type === 'meme' ? (
            <div className="relative z-10 my-auto text-center px-1">
              {item.memeTextTop && (
                <p className="font-black text-[11px] min-[380px]:text-xs sm:text-sm text-black uppercase tracking-wider bg-white/90 px-2 py-1 rounded border-2 border-black inline-block mb-1.5 shadow-[2px_2px_0px_#000] break-words max-w-full">
                  {item.memeTextTop}
                </p>
              )}
              {item.memeTextBottom && (
                <div>
                  <p className="font-black text-[11px] min-[380px]:text-xs sm:text-sm text-black uppercase tracking-wider bg-[#FFDE00] px-2 py-1 rounded border-2 border-black inline-block shadow-[2px_2px_0px_#000] break-words max-w-full">
                    {item.memeTextBottom}
                  </p>
                </div>
              )}
            </div>
          ) : item.type === 'video' ? (
            <div className="relative z-10 my-auto flex flex-col items-center justify-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border-3 border-black flex items-center justify-center comic-shadow group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6B00] fill-current ml-0.5" />
              </div>
              <span className="mt-2 text-[10px] sm:text-xs font-black uppercase text-black bg-white/90 px-2 py-0.5 rounded border border-black">
                Comedy Clip
              </span>
            </div>
          ) : item.type === 'audio' ? (
            <div className="relative z-10 my-auto flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 sm:gap-1.5 h-9 sm:h-10 px-3 sm:px-4 rounded-xl bg-white/95 border-2 border-black">
                <span className="w-1.5 h-5 sm:h-6 bg-[#7C3AED] rounded-full animate-pulse" />
                <span className="w-1.5 h-8 sm:h-10 bg-[#FF2E93] rounded-full animate-bounce" />
                <span className="w-1.5 h-3.5 sm:h-4 bg-[#FF6B00] rounded-full animate-pulse" />
                <span className="w-1.5 h-6 sm:h-8 bg-[#FFDE00] rounded-full animate-bounce" />
                <span className="w-1.5 h-4 sm:h-5 bg-[#121316] rounded-full animate-pulse" />
              </div>
              <span className="mt-2 text-[10px] sm:text-xs font-black uppercase text-black bg-white/90 px-2 py-0.5 rounded border border-black">
                Voice Note Skit
              </span>
            </div>
          ) : (
            <div className="relative z-10 my-auto flex flex-col items-center justify-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-black flex items-center justify-center comic-shadow group-hover:rotate-6 transition-transform">
                <ImageIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#FF2E93]" />
              </div>
              <span className="mt-2 text-[10px] sm:text-xs font-black uppercase text-black bg-white/90 px-2 py-0.5 rounded border border-black">
                Comic Illustration
              </span>
            </div>
          )}

          {/* Visual detail caption snippet */}
          <div className="relative z-10 text-[10px] sm:text-[11px] font-bold text-neutral-800 bg-white/85 px-2 py-0.5 sm:py-1 rounded border border-black truncate">
            {item.visualDetail || item.category}
          </div>
        </div>

        {/* Content details */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] sm:text-xs font-bold text-[#FF6B00] uppercase tracking-wider">
              {item.category}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-[#121316] mb-2 leading-snug group-hover:text-[#FF6B00] transition-colors break-words">
            {item.title}
          </h3>

          <p className="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Footer reaction */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-3 border-t-2 border-neutral-100 flex items-center justify-between">
        <button
          type="button"
          onClick={handleLike}
          className={`inline-flex items-center gap-1.5 px-3 py-2 min-h-[38px] rounded-lg border-2 border-black font-extrabold text-xs transition-all cursor-pointer ${
            hasLiked
              ? 'bg-[#FF2E93] text-white shadow-[2px_2px_0px_#121316] -translate-y-0.5'
              : 'bg-white hover:bg-rose-50 text-neutral-800 shadow-[2px_2px_0px_#121316]'
          }`}
          aria-label="Upvote this laugh"
        >
          <Heart
            className={`w-3.5 h-3.5 ${hasLiked ? 'fill-white' : 'text-[#FF2E93]'}`}
          />
          <span>{reactions.toLocaleString()}</span>
        </button>

        <span className="text-[11px] sm:text-xs font-bold text-neutral-500">
          Gritmans Vault
        </span>
      </div>
    </div>
  );
};
