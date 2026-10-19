'use client';

import React, { useState } from 'react';
import { Joke, JokeCategory } from '@/lib/types';
import { Button } from './Button';
import { X, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SubmitJokeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJokeCreated: (newJoke: Joke) => void;
}

const CATEGORIES: JokeCategory[] = [
  'Ghana',
  'Dad Jokes',
  'One-Liners',
  'Relationship',
  'Work',
  'School',
  'Random',
];

export const SubmitJokeModal: React.FC<SubmitJokeModalProps> = ({
  isOpen,
  onClose,
  onJokeCreated,
}) => {
  const [setup, setSetup] = useState('');
  const [punchline, setPunchline] = useState('');
  const [category, setCategory] = useState<JokeCategory>('Ghana');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!setup.trim() || !punchline.trim()) {
      setError('Please provide both the joke setup and the punchline!');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/jokes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          setup: setup.trim(),
          punchline: punchline.trim(),
          category,
          author: author.trim() || 'Anonymous Comedian',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit joke');
      }

      setSuccess(true);
      onJokeCreated(data.joke);

      setTimeout(() => {
        setSuccess(false);
        setSetup('');
        setPunchline('');
        setAuthor('');
        onClose();
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Something went wrong while saving your joke.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl border-4 border-black p-5 sm:p-7 shadow-[6px_6px_0px_#121316] animate-comic-pop max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="submit-joke-title"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl border-2 border-black bg-neutral-100 hover:bg-[#FF2E93] hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5 pr-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#FFDE00] border-2 border-black text-black mb-2">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            SAVE TO MONGODB
          </div>
          <h2
            id="submit-joke-title"
            className="text-2xl sm:text-3xl font-black uppercase text-[#121316] tracking-tight"
          >
            DROP YOUR JOKE 🎤
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-1">
            Share a rib-cracker with the Joint. It will be saved directly to MongoDB!
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl border-2 border-rose-500 bg-rose-50 text-rose-800 text-xs sm:text-sm font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2 animate-comic-pop">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Joke saved to MongoDB successfully! 🎉</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Selector */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
              Joke Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as JokeCategory)}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black font-bold text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Setup Input */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
              The Setup / Question
            </label>
            <textarea
              rows={2}
              value={setup}
              onChange={(e) => setSetup(e.target.value)}
              placeholder="e.g. Why did the Ghanaian trotro driver refuse to argue?"
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black font-semibold text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black resize-none"
              required
            />
          </div>

          {/* Punchline Input */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
              The Punchline
            </label>
            <textarea
              rows={2}
              value={punchline}
              onChange={(e) => setPunchline(e.target.value)}
              placeholder="e.g. Petrol is 15 cedis per litre, I don’t have fuel for useless beef!"
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black font-semibold text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black resize-none"
              required
            />
          </div>

          {/* Author Input */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
              Your Name or Nickname (Optional)
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Kwesi Comedian"
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black font-semibold text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border-2 border-black text-xs font-black uppercase tracking-wider hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <Button
              type="submit"
              variant="yellow"
              size="md"
              disabled={isSubmitting}
              className="w-full sm:w-auto min-h-[42px] justify-center"
            >
              {isSubmitting ? 'Saving to DB...' : 'Save Joke 🚀'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
