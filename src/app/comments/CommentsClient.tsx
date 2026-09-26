'use client';

import React, { useState } from 'react';
import { MOCK_COMMENTS } from '@/lib/mock-data';
import { Comment, ReactionType } from '@/lib/types';
import { CommentForm } from '@/components/CommentForm';
import { CommentCard } from '@/components/CommentCard';
import { Badge } from '@/components/Badge';

type FilterType = 'all' | ReactionType;

export const CommentsClient: React.FC = () => {
  // Local state for comments (Ready for Supabase integration)
  // SUPABASE INTEGRATION POINT:
  // In the next phase, replace this client state with:
  // const { data: comments, error } = await supabase.from('comments').select('*').order('created_at', { ascending: false });
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [reactionFilter, setReactionFilter] = useState<FilterType>('all');

  const handleNewComment = (newComment: Comment) => {
    // SUPABASE INTEGRATION POINT:
    // await supabase.from('comments').insert([{ stage_name: newComment.stageName, ... }]);
    setComments((prev) => [newComment, ...prev]);

    // Scroll to the comment feed
    const feedEl = document.getElementById('comments-feed');
    if (feedEl) {
      feedEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredComments = comments.filter((c) => {
    if (reactionFilter === 'all') return true;
    return c.reaction === reactionFilter;
  });

  const filterOptions: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'laugh', label: '🤣 Laugh' },
    { id: 'finished', label: '💀 Finished' },
    { id: 'chuckle', label: '😂 Chuckle' },
    { id: 'smirk', label: '🙂 Smirk' },
  ];

  return (
    <div className="w-full py-12 sm:py-16 bg-[#FFFDF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <Badge variant="yellow" size="md" rotate="-2" className="mb-3">
            THE CHUCKLE WALL 📣
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-[#121316] tracking-tight leading-tight">
            LEAVE YOUR LAUGH
          </h1>
          <p className="mt-4 text-base sm:text-lg font-medium text-neutral-700 leading-relaxed">
            Did something here make you laugh? Tell us. Did you come with your own
            joke? Even better.
          </p>
        </div>

        {/* Form and Side Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-16 items-start">
          {/* Form Column */}
          <div className="lg:col-span-8">
            <CommentForm onCommentSubmitted={handleNewComment} />
          </div>

          {/* Side Info Box */}
          <div className="lg:col-span-4 space-y-6">
            {/* Box 1: Why share? */}
            <div className="bg-amber-50 rounded-3xl border-3 border-black comic-shadow p-6 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✨</span>
                <h3 className="text-lg font-black uppercase text-[#121316]">
                  COMMUNITY GUIDELINES
                </h3>
              </div>
              <ul className="text-xs sm:text-sm font-semibold text-neutral-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span>👉</span>
                  <span>Keep it hilarious, friendly, and respectful.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>👉</span>
                  <span>Share real stories, dad jokes, or clever one-liners.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>👉</span>
                  <span>No hate, no dulling. Only positive laughter energy!</span>
                </li>
              </ul>
            </div>

            {/* Box 2: Quick Stats */}
            <div className="bg-white rounded-3xl border-3 border-black comic-shadow p-6 space-y-3">
              <h3 className="text-xs font-black uppercase text-neutral-500 tracking-wider">
                COMMUNITY PULSE
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-neutral-100 border-2 border-black text-center">
                  <div className="text-2xl font-black text-[#FF6B00]">
                    {comments.length}
                  </div>
                  <div className="text-[11px] font-black uppercase text-neutral-600">
                    Total Laughs
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-100 border-2 border-black text-center">
                  <div className="text-2xl font-black text-[#FF2E93]">
                    100%
                  </div>
                  <div className="text-[11px] font-black uppercase text-neutral-600">
                    Good Vibes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Comments Feed */}
        <div id="comments-feed" className="pt-8 border-t-3 border-black">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#121316]">
                RECENT GIGGLES &amp; JOKES
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 font-medium">
                Live feedback from visitors who survived our comedy vault.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-xs font-extrabold text-neutral-500 uppercase mr-1">
                Filter:
              </span>
              {filterOptions.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setReactionFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg border-2 border-black font-extrabold text-xs transition-all cursor-pointer ${
                    reactionFilter === f.id
                      ? 'bg-[#FFDE00] text-black shadow-[2px_2px_0px_#121316]'
                      : 'bg-white hover:bg-neutral-100 text-neutral-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of comments */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredComments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
