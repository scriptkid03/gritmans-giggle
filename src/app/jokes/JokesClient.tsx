'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_JOKES } from '@/lib/mock-data';
import { Joke, JokeCategory, ReactionType, ReactionCounts } from '@/lib/types';
import { JokeCard } from '@/components/JokeCard';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { SubmitJokeModal } from '@/components/SubmitJokeModal';
import { Search, Shuffle, Filter, X, PlusCircle } from 'lucide-react';

const CATEGORIES: ('All' | JokeCategory)[] = [
  'All',
  'Ghana',
  'Dad Jokes',
  'One-Liners',
  'Relationship',
  'Work',
  'School',
  'Random',
];

interface JokesClientProps {
  initialJokes?: Joke[];
}

export const JokesClient: React.FC<JokesClientProps> = ({ initialJokes }) => {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get('category');

  const initialCat = (
    initialCategoryParam && (CATEGORIES as string[]).includes(initialCategoryParam)
      ? (initialCategoryParam as 'All' | JokeCategory)
      : 'All'
  );

  const [jokes, setJokes] = useState<Joke[]>(initialJokes && initialJokes.length > 0 ? initialJokes : MOCK_JOKES);
  const [selectedCategory, setSelectedCategory] = useState<'All' | JokeCategory>(initialCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedJokeId, setHighlightedJokeId] = useState<string | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Filtered list
  const filteredJokes = useMemo(() => {
    return jokes.filter((joke) => {
      // Category check
      const matchesCategory =
        selectedCategory === 'All' || joke.category === selectedCategory;

      // Query check
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        joke.setup.toLowerCase().includes(q) ||
        joke.punchline.toLowerCase().includes(q) ||
        (joke.author && joke.author.toLowerCase().includes(q)) ||
        joke.category.toLowerCase().includes(q) ||
        (joke.tags && joke.tags.some((t) => t.toLowerCase().includes(q)));

      return matchesCategory && matchesQuery;
    });
  }, [jokes, selectedCategory, searchQuery]);

  // Handle newly created joke from MongoDB
  const handleJokeCreated = (newJoke: Joke) => {
    setJokes((prev) => [newJoke, ...prev]);
    setSelectedCategory('All');
    setSearchQuery('');
    setHighlightedJokeId(newJoke.id);

    setTimeout(() => {
      const el = document.getElementById(`joke-${newJoke.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);

    setTimeout(() => {
      setHighlightedJokeId(null);
    }, 4000);
  };

  // Handle reaction sync with MongoDB
  const handleReaction = async (jokeId: string, reactionType: ReactionType, newCounts: ReactionCounts) => {
    // Optimistically update local state
    setJokes((prev) =>
      prev.map((j) => (j.id === jokeId ? { ...j, reactions: newCounts } : j))
    );

    try {
      await fetch(`/api/jokes/${jokeId}/react`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reactionType }),
      });
    } catch (err) {
      console.warn('Failed to sync reaction to database:', err);
    }
  };

  // Random Joke picker
  const handleRandomJoke = () => {
    if (filteredJokes.length === 0) return;
    const random = filteredJokes[Math.floor(Math.random() * filteredJokes.length)];
    setHighlightedJokeId(random.id);

    // Scroll to the joke card
    const el = document.getElementById(`joke-${random.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    setTimeout(() => {
      setHighlightedJokeId(null);
    }, 2500);
  };

  return (
    <div className="w-full py-8 sm:py-16 bg-[#FFFDF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-3 min-[380px]:px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <Badge variant="yellow" size="md" rotate="-2" className="mb-2.5 sm:mb-3">
            THE VAULT OF COMEDY 📜
            {/* • MONGODB CONNECTED */}
          </Badge>
          <h1 className="text-3xl min-[360px]:text-4xl min-[480px]:text-5xl sm:text-6xl font-black uppercase text-[#121316] tracking-tight leading-tight break-words">
            THE JOKE JOINT
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg font-medium text-neutral-700 leading-relaxed">
            Fresh jokes, terrible jokes, dad jokes, random jokes — saved and served live from MongoDB. If it makes somebody laugh, it belongs here.
          </p>
        </div>

        {/* Search & Actions Toolbar */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border-3 border-black shadow-[4px_4px_0px_#121316] sm:comic-shadow-lg p-4 min-[380px]:p-5 sm:p-7 mb-8 sm:mb-10 space-y-5 sm:space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jokes by keyword, trotro, jollof..."
                className="w-full pl-10 sm:pl-12 pr-9 sm:pr-10 py-3 sm:py-3.5 min-h-[46px] rounded-xl sm:rounded-2xl border-2 border-black font-semibold text-base sm:text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-black cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap sm:flex-nowrap">
              {/* Submit Joke Button */}
              <Button
                variant="yellow"
                size="md"
                onClick={() => setIsSubmitModalOpen(true)}
                className="gap-2 shrink-0 justify-center w-full sm:w-auto min-h-[46px]"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Drop a Joke 🎤</span>
              </Button>

              {/* Random Joke Button */}
              <Button
                variant="orange"
                size="md"
                onClick={handleRandomJoke}
                className="gap-2 shrink-0 justify-center w-full sm:w-auto min-h-[46px]"
              >
                <Shuffle className="w-4 h-4" />
                <span>Surprise Me 🎲</span>
              </Button>
            </div>
          </div>

          {/* Category Filter Container */}
          <div>
            <div className="flex items-center gap-1.5 mb-2.5 text-xs font-black uppercase tracking-wider text-neutral-500">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter by Category:</span>
            </div>

            <div className="flex items-center gap-1.5 min-[380px]:gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap -mx-1 px-1">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 min-[380px]:px-4 py-2 min-h-[38px] rounded-xl text-xs font-black uppercase tracking-wider border-2 border-black transition-all cursor-pointer shrink-0 select-none ${isSelected
                        ? 'bg-[#FFDE00] text-black shadow-[2px_2px_0px_#121316] sm:shadow-[3px_3px_0px_#121316] -translate-y-0.5'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 shadow-[1px_1px_0px_#121316]'
                      }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results count & active tags */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-extrabold text-neutral-500 pt-2 border-t border-neutral-100">
            <span>
              Showing <strong className="text-black">{filteredJokes.length}</strong> jokes
              {selectedCategory !== 'All' ? ` in "${selectedCategory}"` : ''}
              {searchQuery ? ` matching "${searchQuery}"` : ''}
            </span>

            {(selectedCategory !== 'All' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="text-[#FF2E93] hover:underline cursor-pointer text-left sm:text-right"
              >
                Reset Filters ✕
              </button>
            )}
          </div>
        </div>

        {/* Jokes Grid */}
        {filteredJokes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {filteredJokes.map((joke) => (
              <div
                key={joke.id}
                id={`joke-${joke.id}`}
                className={`transition-all duration-300 rounded-2xl ${highlightedJokeId === joke.id
                    ? 'ring-3 sm:ring-4 ring-[#FF6B00] scale-[1.01] sm:scale-[1.02] shadow-[6px_6px_0px_#121316]'
                    : ''
                  }`}
              >
                <JokeCard
                  joke={joke}
                  onReact={(type, newCounts) => handleReaction(joke.id, type, newCounts)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl sm:rounded-3xl border-3 border-black comic-shadow p-6 sm:p-12 text-center max-w-lg mx-auto my-8 sm:my-12">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🫠</div>
            <h3 className="text-xl sm:text-2xl font-black uppercase text-[#121316] mb-2 break-words">
              No jokes found here!
            </h3>
            <p className="text-neutral-600 text-xs sm:text-sm font-medium mb-6">
              Even our best stand-up comedian couldn’t find a match for that. Try
              loosening your search, picking another category, or drop your own joke!
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="yellow"
                size="md"
                onClick={() => setIsSubmitModalOpen(true)}
              >
                Drop a Joke 🎤
              </Button>
              <Button
                variant="charcoal"
                size="md"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
              >
                Show All
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Submit Joke Modal */}
      <SubmitJokeModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onJokeCreated={handleJokeCreated}
      />
    </div>
  );
};
