'use client';

import React, { useState } from 'react';
import { Joke } from '@/lib/types';
import { MOCK_JOKES } from '@/lib/mock-data';
import { Badge } from './Badge';
import { ReactionButtons } from './ReactionButtons';
import { RefreshCw, Sparkles, Share2, Check } from 'lucide-react';

interface FeaturedJokeProps {
  initialJoke?: Joke;
}

export const FeaturedJoke: React.FC<FeaturedJokeProps> = ({
  initialJoke = MOCK_JOKES[0],
}) => {
  const [currentJoke, setCurrentJoke] = useState<Joke>(initialJoke);
  const [isAnimating, setIsAnimating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleNextJoke = () => {
    setIsAnimating(true);
    setTimeout(() => {
      // Pick a different joke at random
      const available = MOCK_JOKES.filter((j) => j.id !== currentJoke.id);
      const randomIndex = Math.floor(Math.random() * available.length);
      setCurrentJoke(available[randomIndex] || MOCK_JOKES[0]);
      setIsAnimating(false);
    }, 200);
  };

  const handleShare = () => {
    const text = `😂 Today's Joke from Gritmans Giggle & Chuckle Joint:\n\n"${currentJoke.setup}"\n\n👉 ${currentJoke.punchline}\n\nCheck out funnygritmanlaughters.com for more!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto py-2 sm:py-6">
      {/* Decorative comic pop stickers */}
      <div className="hidden sm:block absolute -top-4 -left-4 z-10">
        <Badge variant="pink" size="md" rotate="-3" className="animate-bounce">
          🔥 CERTIFIED FRESH!
        </Badge>
      </div>
      <div className="hidden sm:block absolute -bottom-3 -right-3 z-10">
        <Badge variant="yellow" size="md" rotate="3">
          100% RIBS CRACKED 😂
        </Badge>
      </div>

      {/* Main Comic Box */}
      <div className="relative bg-white rounded-2xl sm:rounded-3xl border-3 border-black shadow-[4px_4px_0px_#121316] sm:comic-shadow-xl p-4 min-[380px]:p-5 sm:p-8 md:p-10 overflow-hidden">
        {/* Top header within card */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-5 pb-4 border-b-2 border-dashed border-neutral-300">
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#FF2E93] animate-pulse shrink-0" />
            <span className="text-[11px] sm:text-sm font-black uppercase tracking-wider text-neutral-800 truncate">
              FEATURED RIB-TICKLER
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="yellow" size="sm" rotate="1">
              {currentJoke.category}
            </Badge>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 min-h-[36px] text-xs font-bold rounded-lg border-2 border-black bg-neutral-100 hover:bg-neutral-200 cursor-pointer transition-colors"
              title="Share Joke"
              aria-label="Share Joke"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Joke Content with animation */}
        <div
          className={`transition-all duration-200 ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {/* Joke Setup */}
          <div className="mb-5 sm:mb-6">
            <h3 className="text-lg min-[380px]:text-xl sm:text-2xl md:text-3xl font-black text-[#121316] leading-snug sm:leading-tight mb-2 break-words">
              &ldquo;{currentJoke.setup}&rdquo;
            </h3>
            {currentJoke.author && (
              <p className="text-xs sm:text-sm font-semibold text-neutral-500 italic">
                Source: {currentJoke.author}
              </p>
            )}
          </div>

          {/* Big Comic Speech Bubble for Punchline */}
          <div className="relative bg-[#FFDE00]/30 rounded-xl sm:rounded-2xl border-2 sm:border-3 border-[#121316] p-4 min-[380px]:p-5 sm:p-7 mb-6 sm:mb-8 shadow-[3px_3px_0px_#121316]">
            <div className="flex items-center gap-1.5 mb-1.5 text-xs font-black uppercase tracking-wider text-[#FF6B00]">
              <Sparkles className="w-3.5 h-3.5" />
              THE PUNCHLINE:
            </div>
            <p className="text-base min-[380px]:text-lg sm:text-2xl md:text-3xl font-black text-[#121316] leading-snug break-words">
              {currentJoke.punchline}
            </p>
          </div>
        </div>

        {/* Bottom Toolbar: Reactions & Another One button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t-2 border-neutral-200">
          <div className="w-full sm:w-auto">
            <div className="text-xs font-extrabold uppercase text-neutral-500 mb-2">
              Rate your reaction:
            </div>
            <ReactionButtons
              key={currentJoke.id}
              initialReactions={currentJoke.reactions}
              size="md"
            />
          </div>

          <div className="w-full sm:w-auto pt-1 sm:pt-0">
            <button
              type="button"
              onClick={handleNextJoke}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 min-h-[48px] bg-[#FF6B00] text-white font-black text-xs min-[380px]:text-sm uppercase tracking-wider rounded-xl border-2 border-black comic-shadow comic-btn-press cursor-pointer"
            >
              <RefreshCw
                className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`}
              />
              <span>Another One!</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
