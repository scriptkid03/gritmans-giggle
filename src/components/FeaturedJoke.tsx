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
    <section className="relative w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
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
      <div className="relative bg-white rounded-3xl border-3 border-black comic-shadow-xl p-6 sm:p-10 overflow-hidden">
        {/* Top header within card */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b-2 border-dashed border-neutral-300">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 rounded-full bg-[#FF2E93] animate-pulse" />
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-neutral-800">
              FEATURED RIB-TICKLER
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="yellow" size="sm" rotate="1">
              {currentJoke.category}
            </Badge>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg border-2 border-black bg-neutral-100 hover:bg-neutral-200 cursor-pointer transition-colors"
              title="Share Joke"
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
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#121316] leading-tight mb-2">
              &ldquo;{currentJoke.setup}&rdquo;
            </h3>
            {currentJoke.author && (
              <p className="text-sm font-semibold text-neutral-500 italic">
                Source: {currentJoke.author}
              </p>
            )}
          </div>

          {/* Big Comic Speech Bubble for Punchline */}
          <div className="relative bg-[#FFDE00]/30 rounded-2xl border-3 border-[#121316] p-5 sm:p-7 mb-8 comic-shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-xs font-black uppercase tracking-wider text-[#FF6B00]">
              <Sparkles className="w-4 h-4" />
              THE PUNCHLINE:
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-black text-[#121316] leading-snug">
              {currentJoke.punchline}
            </p>
          </div>
        </div>

        {/* Bottom Toolbar: Reactions & Another One button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t-2 border-neutral-200">
          <div>
            <div className="text-xs font-extrabold uppercase text-neutral-500 mb-2">
              Rate your reaction:
            </div>
            <ReactionButtons
              key={currentJoke.id}
              initialReactions={currentJoke.reactions}
              size="md"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleNextJoke}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#FF6B00] text-white font-black text-sm uppercase tracking-wider rounded-xl border-2 border-black comic-shadow comic-btn-press cursor-pointer"
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
