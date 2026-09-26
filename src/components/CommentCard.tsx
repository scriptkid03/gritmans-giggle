import React from 'react';
import { Comment } from '@/lib/types';
import { REACTION_CONFIG } from '@/lib/mock-data';
import { Badge } from './Badge';

interface CommentCardProps {
  comment: Comment;
  className?: string;
}

export const CommentCard: React.FC<CommentCardProps> = ({ comment, className = '' }) => {
  const reaction = REACTION_CONFIG[comment.reaction] || REACTION_CONFIG.laugh;

  // Extract initial
  const initial = comment.stageName.charAt(0).toUpperCase() || 'G';

  return (
    <article
      className={`relative bg-white rounded-2xl border-3 border-black comic-shadow-sm p-5 flex flex-col justify-between transition-all ${
        comment.isNew ? 'ring-4 ring-[#FF2E93] animate-comic-pop' : ''
      } ${className}`}
    >
      {comment.isNew && (
        <div className="absolute -top-3 -right-2">
          <Badge variant="pink" size="sm" rotate="2">
            JUST POSTED! 🔥
          </Badge>
        </div>
      )}

      <div>
        {/* Header: Avatar, Stage Name, Timestamp */}
        <div className="flex items-center gap-3 mb-3.5">
          <div
            className={`w-11 h-11 rounded-xl border-2 border-black flex items-center justify-center font-black text-lg shadow-[2px_2px_0px_#121316] ${comment.avatarColor}`}
          >
            {initial}
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-base font-black text-[#121316] truncate">
              {comment.stageName}
            </h4>
            <p className="text-xs font-semibold text-neutral-500">
              {comment.createdAt}
            </p>
          </div>

          {/* Reaction pill */}
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border-2 border-black text-xs font-bold bg-neutral-50 shadow-[1px_1px_0px_#121316]"
            title={reaction.label}
          >
            <span>{reaction.emoji}</span>
            <span className="hidden sm:inline text-[11px] font-extrabold text-neutral-700">
              {reaction.label}
            </span>
          </div>
        </div>

        {/* Comment Text */}
        <p className="text-neutral-800 text-sm sm:text-base font-medium leading-relaxed mb-4">
          &ldquo;{comment.comment}&rdquo;
        </p>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-semibold">
        <span>Verified Chuckler</span>
        <span>❤️ {comment.likes} laughs</span>
      </div>
    </article>
  );
};
