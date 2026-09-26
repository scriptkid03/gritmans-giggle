'use client';

import React, { useState } from 'react';
import { Joke } from '@/lib/types';
import { MOCK_JOKES } from '@/lib/mock-data';
import { Badge } from './Badge';
import { ReactionButtons } from './ReactionButtons';
import { X, RefreshCw, Sparkles } from 'lucide-react';

interface RandomJokeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RandomJokeModal: React.FC<RandomJokeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [jokeIndex, setJokeIndex] = useState(0);

  if (!isOpen) return null;

  const currentJoke: Joke = MOCK_JOKES[jokeIndex % MOCK_JOKES.length] || MOCK_JOKES[0];

  const handleNext = () => {
    setJokeIndex((prev) => (prev + 1) % MOCK_JOKES.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 min-[380px]:p-4 bg-black/75 backdrop-blur-xs animate-comic-pop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-black shadow-[4px_4px_0px_#121316] sm:comic-shadow-xl p-4 min-[380px]:p-5 sm:p-8 z-10 max-h-[90dvh] overflow-y-auto">
        {/* Close Button - safe positioning on mobile without clipping */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:-top-3 sm:-right-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-black bg-[#FF2E93] text-white flex items-center justify-center font-black comic-shadow-sm comic-btn-press hover:bg-[#FF45A2] cursor-pointer z-20"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3.5 pr-8 sm:pr-0">
          <Badge variant="yellow" size="sm" rotate="-1">
            🚨 EMERGENCY LAUGH DOSE
          </Badge>
          <Badge variant="pink" size="sm">
            {currentJoke.category}
          </Badge>
        </div>

        {/* Joke Setup */}
        <h3
          id="modal-title"
          className="text-lg min-[380px]:text-xl sm:text-2xl font-black text-[#121316] leading-snug mb-3.5 break-words"
        >
          &ldquo;{currentJoke.setup}&rdquo;
        </h3>

        {/* Big Punchline Box */}
        <div className="bg-[#FFDE00]/40 rounded-xl sm:rounded-2xl border-2 sm:border-3 border-black p-3.5 min-[380px]:p-4 sm:p-5 mb-4 sm:mb-5">
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#FF6B00] mb-1">
            <Sparkles className="w-4 h-4" />
            THE PUNCHLINE:
          </div>
          <p className="text-base min-[380px]:text-lg sm:text-xl font-black text-[#121316] leading-snug break-words">
            {currentJoke.punchline}
          </p>
        </div>

        {/* Reaction Row */}
        <div className="mb-4 sm:mb-5 pb-3 sm:pb-4 border-b-2 border-neutral-100">
          <div className="text-xs font-bold uppercase text-neutral-500 mb-2">
            Did it crack your ribs?
          </div>
          <ReactionButtons initialReactions={currentJoke.reactions} size="sm" />
        </div>

        {/* Actions - Stacks cleanly on mobile */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={handleNext}
            className="w-full sm:flex-1 py-3 px-4 min-h-[44px] rounded-xl border-2 border-black bg-[#FF6B00] text-white font-black text-xs min-[380px]:text-sm uppercase tracking-wider flex items-center justify-center gap-2 comic-shadow-sm comic-btn-press cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Another Joke! 🎲</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-5 min-h-[44px] rounded-xl border-2 border-black bg-neutral-100 hover:bg-neutral-200 text-black font-black text-xs min-[380px]:text-sm uppercase tracking-wider comic-btn-press cursor-pointer text-center"
          >
            I&apos;m Satisfied
          </button>
        </div>
      </div>
    </div>
  );
};
