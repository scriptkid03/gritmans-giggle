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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-comic-pop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl border-4 border-black comic-shadow-xl p-6 sm:p-8 z-10">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 -right-3 w-10 h-10 rounded-full border-2 border-black bg-[#FF2E93] text-white flex items-center justify-center font-black comic-shadow-sm comic-btn-press hover:bg-[#FF45A2] cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="yellow" size="md" rotate="-2">
            🚨 EMERGENCY LAUGH DOSE
          </Badge>
          <Badge variant="pink" size="sm">
            {currentJoke.category}
          </Badge>
        </div>

        <h3
          id="modal-title"
          className="text-xl sm:text-2xl font-black text-[#121316] leading-tight mb-4"
        >
          &ldquo;{currentJoke.setup}&rdquo;
        </h3>

        {/* Big Punchline Box */}
        <div className="bg-[#FFDE00]/40 rounded-2xl border-3 border-black p-4 sm:p-5 mb-5">
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#FF6B00] mb-1">
            <Sparkles className="w-4 h-4" />
            THE PUNCHLINE:
          </div>
          <p className="text-lg sm:text-xl font-black text-[#121316]">
            {currentJoke.punchline}
          </p>
        </div>

        {/* Reaction Row */}
        <div className="mb-5 pb-4 border-b-2 border-neutral-100">
          <div className="text-xs font-bold uppercase text-neutral-500 mb-2">
            Did it crack your ribs?
          </div>
          <ReactionButtons initialReactions={currentJoke.reactions} size="sm" />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 py-3 px-4 rounded-xl border-2 border-black bg-[#FF6B00] text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 comic-shadow-sm comic-btn-press cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Another Joke! 🎲</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="py-3 px-5 rounded-xl border-2 border-black bg-neutral-100 hover:bg-neutral-200 text-black font-black text-xs sm:text-sm uppercase tracking-wider comic-btn-press cursor-pointer"
          >
            I&apos;m Satisfied
          </button>
        </div>
      </div>
    </div>
  );
};
