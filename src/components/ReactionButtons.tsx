'use client';

import React, { useState } from 'react';
import { ReactionCounts, ReactionType } from '@/lib/types';
import { REACTION_CONFIG } from '@/lib/mock-data';

interface ReactionButtonsProps {
  initialReactions: ReactionCounts;
  onReact?: (type: ReactionType, newCounts: ReactionCounts) => void;
  size?: 'sm' | 'md';
  className?: string;
}

export const ReactionButtons: React.FC<ReactionButtonsProps> = ({
  initialReactions,
  onReact,
  size = 'sm',
  className = '',
}) => {
  const [reactions, setReactions] = useState<ReactionCounts>(initialReactions);
  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);

  const handleReaction = (type: ReactionType) => {
    setReactions((prev) => {
      const next = { ...prev };
      if (userReaction === type) {
        // Toggle off
        next[type] = Math.max(0, next[type] - 1);
        setUserReaction(null);
      } else {
        // Remove previous if any
        if (userReaction) {
          next[userReaction] = Math.max(0, next[userReaction] - 1);
        }
        // Add new
        next[type] = next[type] + 1;
        setUserReaction(type);
      }
      if (onReact) {
        onReact(type, next);
      }
      return next;
    });
  };

  const reactionKeys: ReactionType[] = ['smirk', 'chuckle', 'laugh', 'finished'];

  return (
    <div className={`flex flex-wrap items-center gap-1.5 sm:gap-2 ${className}`}>
      {reactionKeys.map((key) => {
        const config = REACTION_CONFIG[key];
        const isSelected = userReaction === key;
        const count = reactions[key];

        return (
          <button
            key={key}
            type="button"
            onClick={() => handleReaction(key)}
            className={`inline-flex items-center gap-1 sm:gap-1.5 rounded-lg border-2 border-black font-bold transition-all duration-150 cursor-pointer select-none ${
              size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'
            } ${
              isSelected
                ? 'bg-[#FFDE00] shadow-[2px_2px_0px_#121316] -translate-y-0.5'
                : 'bg-white hover:bg-neutral-100 shadow-[2px_2px_0px_#121316]'
            }`}
            title={config.label}
            aria-pressed={isSelected}
          >
            <span className="text-sm sm:text-base leading-none">{config.emoji}</span>
            <span className="font-extrabold text-[#121316]">{count}</span>
          </button>
        );
      })}
    </div>
  );
};
