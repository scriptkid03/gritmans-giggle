'use client';

import React, { useState } from 'react';
import { Joke, ReactionType, ReactionCounts } from '@/lib/types';
import { Badge } from './Badge';
import { ReactionButtons } from './ReactionButtons';
import { Copy, Check, Sparkles, Eye, EyeOff } from 'lucide-react';

interface JokeCardProps {
  joke: Joke;
  initiallyRevealed?: boolean;
  className?: string;
  onReact?: (type: ReactionType, newCounts: ReactionCounts) => void;
}

type BadgeColor = 'yellow' | 'orange' | 'pink' | 'purple' | 'blue' | 'green' | 'white';

export const JokeCard: React.FC<JokeCardProps> = ({
  joke,
  initiallyRevealed = false,
  className = '',
  onReact,
}) => {
  const [isRevealed, setIsRevealed] = useState(initiallyRevealed);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `"${joke.setup}"\n\n— ${joke.punchline}\n\nVia Gritmans Giggle and Chuckle Joint (funnygritmanlaughters.com)`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryBadgeVariant = (category: string): BadgeColor => {
    switch (category) {
      case 'Ghana':
        return 'yellow';
      case 'Dad Jokes':
        return 'orange';
      case 'One-Liners':
        return 'pink';
      case 'Relationship':
        return 'purple';
      case 'Work':
        return 'blue';
      case 'School':
        return 'green';
      default:
        return 'white';
    }
  };

  return (
    <article
      className={`relative bg-white rounded-2xl border-3 border-[#121316] comic-shadow-sm comic-card-hover p-4 min-[380px]:p-5 sm:p-6 flex flex-col justify-between transition-all ${className}`}
    >
      <div>
        {/* Top bar: Category & Actions */}
        <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-4">
          <Badge
            variant={getCategoryBadgeVariant(joke.category)}
            size="sm"
            rotate="-1"
          >
            {joke.category}
          </Badge>

          <button
            type="button"
            onClick={handleCopy}
            className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg border-2 border-black bg-neutral-100 hover:bg-[#FFDE00] transition-colors comic-btn-press cursor-pointer shrink-0"
            title="Copy this joke"
            aria-label="Copy joke"
          >
            {copied ? (
              <span className="flex items-center text-xs font-bold text-emerald-800 gap-1 px-1">
                <Check className="w-3.5 h-3.5" /> Copied!
              </span>
            ) : (
              <Copy className="w-3.5 h-3.5 text-neutral-800" />
            )}
          </button>
        </div>

        {/* Joke Setup */}
        <p className="text-base sm:text-lg font-bold text-[#121316] leading-snug mb-4 break-words">
          {joke.setup}
        </p>

        {/* Punchline Section */}
        <div className="mb-4">
          {isRevealed ? (
            <div className="p-3.5 sm:p-4 rounded-xl border-2 border-dashed border-[#121316] bg-amber-50/80 animate-comic-pop">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-900 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
                The Punchline:
              </div>
              <p className="text-base sm:text-lg font-black text-[#121316] leading-relaxed break-words">
                {joke.punchline}
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsRevealed(true)}
              className="w-full py-3 px-4 min-h-[44px] rounded-xl border-2 border-black bg-[#FFE53B]/20 hover:bg-[#FFE53B]/40 text-black font-extrabold text-xs min-[380px]:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              <Eye className="w-4 h-4 text-[#FF6B00] group-hover:scale-110 transition-transform" />
              <span>Tap to Crack Up 👀</span>
            </button>
          )}

          {isRevealed && !initiallyRevealed && (
            <div className="text-right mt-1.5">
              <button
                type="button"
                onClick={() => setIsRevealed(false)}
                className="text-xs font-bold text-neutral-500 hover:text-black inline-flex items-center gap-1 py-1 cursor-pointer"
              >
                <EyeOff className="w-3 h-3" /> Hide Punchline
              </button>
            </div>
          )}
        </div>

        {/* Author / Source */}
        {joke.author && (
          <p className="text-xs font-semibold text-neutral-500 italic mb-4">
            — {joke.author}
          </p>
        )}
      </div>

      {/* Footer: Reactions */}
      <div className="pt-3 border-t-2 border-neutral-100 flex items-center justify-between flex-wrap gap-2">
        <ReactionButtons initialReactions={joke.reactions} onReact={onReact} size="sm" />
      </div>
    </article>
  );
};
