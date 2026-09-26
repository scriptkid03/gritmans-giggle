'use client';

import React, { useState } from 'react';
import { Comment, ReactionType } from '@/lib/types';
import { REACTION_CONFIG } from '@/lib/mock-data';
import { Button } from './Button';
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface CommentFormProps {
  onCommentSubmitted: (comment: Comment) => void;
  className?: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  onCommentSubmitted,
  className = '',
}) => {
  const [stageName, setStageName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedReaction, setSelectedReaction] = useState<ReactionType>('laugh');
  const [commentText, setCommentText] = useState('');
  const [errors, setErrors] = useState<{ stageName?: string; comment?: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const avatarColors = [
    'bg-amber-400 text-amber-950',
    'bg-rose-400 text-white',
    'bg-sky-400 text-sky-950',
    'bg-purple-400 text-white',
    'bg-emerald-400 text-emerald-950',
    'bg-pink-400 text-white',
  ];

  const validate = () => {
    const errs: { stageName?: string; comment?: string } = {};
    if (!stageName.trim()) {
      errs.stageName = 'Please enter a stage name or nickname!';
    } else if (stageName.trim().length < 2) {
      errs.stageName = 'Stage name must be at least 2 characters.';
    }

    if (!commentText.trim()) {
      errs.comment = 'Don’t leave us hanging! Write your comment or joke.';
    } else if (commentText.trim().length < 5) {
      errs.comment = 'Your laugh/joke must be at least 5 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Pick random avatar color
    const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    const newComment: Comment = {
      id: `c-local-${Date.now()}`,
      stageName: stageName.trim(),
      avatarColor: randomColor,
      comment: commentText.trim(),
      reaction: selectedReaction,
      createdAt: 'Just now',
      likes: 1,
      isNew: true,
    };

    // Simulate short network pulse for realistic feel
    setTimeout(() => {
      onCommentSubmitted(newComment);
      setIsSubmitting(false);
      setIsSuccess(true);
      setCommentText('');
      setStageName('');
      setEmail('');
      setErrors({});

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 400);
  };

  const reactions: ReactionType[] = ['smirk', 'chuckle', 'laugh', 'finished'];

  return (
    <div
      className={`bg-white rounded-3xl border-3 border-black comic-shadow-lg p-6 sm:p-9 ${className}`}
    >
      {isSuccess && (
        <div className="mb-6 p-4 rounded-2xl border-2 border-black bg-[#FFDE00]/40 flex items-start gap-3 animate-comic-pop">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-black text-black text-base">
              BOOM! YOUR LAUGH IS LIVE! 🎉
            </h4>
            <p className="text-xs sm:text-sm text-neutral-800 font-medium mt-0.5">
              Your comment has been added to the feed. Gritmans approves this message!
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Stage Name & Email Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label
              htmlFor="stageName"
              className="block text-xs font-black uppercase tracking-wider text-[#121316] mb-1.5"
            >
              Stage Name / Nickname <span className="text-[#FF2E93]">*</span>
            </label>
            <input
              id="stageName"
              type="text"
              placeholder="e.g. Kofi GiggleKing, Auntie Joyce"
              value={stageName}
              onChange={(e) => {
                setStageName(e.target.value);
                if (errors.stageName) setErrors((prev) => ({ ...prev, stageName: undefined }));
              }}
              className={`w-full px-4 py-3 rounded-xl border-2 font-medium text-sm text-[#121316] bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-colors ${
                errors.stageName ? 'border-[#FF2E93] ring-1 ring-[#FF2E93]' : 'border-black'
              }`}
            />
            {errors.stageName && (
              <p className="mt-1.5 text-xs font-bold text-[#FF2E93] flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.stageName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-black uppercase tracking-wider text-[#121316] mb-1.5"
            >
              Email <span className="text-neutral-400 font-semibold normal-case">(optional, stays private)</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@funnygritmanlaughters.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-black font-medium text-sm text-[#121316] bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-colors"
            />
          </div>
        </div>

        {/* Reaction Choice */}
        <div className="mb-5">
          <label className="block text-xs font-black uppercase tracking-wider text-[#121316] mb-2">
            How hard did you laugh? <span className="text-[#FF2E93]">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {reactions.map((key) => {
              const cfg = REACTION_CONFIG[key];
              const isSelected = selectedReaction === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedReaction(key)}
                  className={`p-3 rounded-xl border-2 border-black flex flex-col items-center justify-center gap-1 text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFDE00] shadow-[3px_3px_0px_#121316] -translate-y-0.5'
                      : 'bg-white hover:bg-neutral-50 shadow-[1px_1px_0px_#121316]'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="text-2xl leading-none">{cfg.emoji}</span>
                  <span className="text-xs font-extrabold text-[#121316] mt-0.5">
                    {cfg.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Comment Textarea */}
        <div className="mb-6">
          <label
            htmlFor="comment"
            className="block text-xs font-black uppercase tracking-wider text-[#121316] mb-1.5"
          >
            Your Comment or Favorite Joke <span className="text-[#FF2E93]">*</span>
          </label>
          <textarea
            id="comment"
            rows={4}
            placeholder="Drop your thoughts, reactions, or post your own rib-cracker here..."
            value={commentText}
            onChange={(e) => {
              setCommentText(e.target.value);
              if (errors.comment) setErrors((prev) => ({ ...prev, comment: undefined }));
            }}
            className={`w-full px-4 py-3 rounded-xl border-2 font-medium text-sm text-[#121316] bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-colors ${
              errors.comment ? 'border-[#FF2E93] ring-1 ring-[#FF2E93]' : 'border-black'
            }`}
          />
          {errors.comment && (
            <p className="mt-1.5 text-xs font-bold text-[#FF2E93] flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.comment}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            variant="pink"
            size="lg"
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            <Sparkles className="w-5 h-5 text-white" />
            <span>{isSubmitting ? 'POSTING TO THE JOINT...' : 'POST MY LAUGH'}</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
