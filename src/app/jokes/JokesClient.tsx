'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_JOKES } from '@/lib/mock-data';
import { JokeCategory } from '@/lib/types';
import { JokeCard } from '@/components/JokeCard';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Search, Shuffle, Filter, X } from 'lucide-react';

const CATEGORIES: ('All' | JokeCategory)[] = [
  'All',
  'Dad Jokes',
  'One-Liners',
  'Relationship',
  'Work',
  'School',
  'Ghana',
  'Random',
];

export const JokesClient: React.FC = () => {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get('category');

  const initialCat = (
    initialCategoryParam && (CATEGORIES as string[]).includes(initialCategoryParam)
      ? (initialCategoryParam as 'All' | JokeCategory)
      : 'All'
  );

  const [selectedCategory, setSelectedCategory] = useState<'All' | JokeCategory>(initialCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedJokeId, setHighlightedJokeId] = useState<string | null>(null);

  // Filtered list
  const filteredJokes = useMemo(() => {
    return MOCK_JOKES.filter((joke) => {
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
  }, [selectedCategory, searchQuery]);

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
    <div className="w-full py-12 sm:py-16 bg-[#FFFDF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <Badge variant="yellow" size="md" rotate="-2" className="mb-3">
            THE VAULT OF COMEDY 📜
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-[#121316] tracking-tight leading-tight">
            THE JOKE JOINT
          </h1>
          <p className="mt-4 text-base sm:text-lg font-medium text-neutral-700 leading-relaxed">
            Fresh jokes, terrible jokes, dad jokes, random jokes — if it makes
            somebody laugh, it belongs here.
          </p>
        </div>

        {/* Search & Actions Toolbar */}
        <div className="bg-white rounded-3xl border-3 border-black comic-shadow-lg p-5 sm:p-7 mb-10 space-y-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jokes by keyword, trotro, jollof, work..."
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl border-2 border-black font-semibold text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-all"
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

            {/* Random Joke Button */}
            <Button
              variant="orange"
              size="md"
              onClick={handleRandomJoke}
              className="gap-2 shrink-0 justify-center"
            >
              <Shuffle className="w-4 h-4" />
              <span>Surprise Me 🎲</span>
            </Button>
          </div>

          {/* Category Filter Pills */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-black uppercase tracking-wider text-neutral-500">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter by Category:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-black transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFDE00] text-black shadow-[3px_3px_0px_#121316] -translate-y-0.5'
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
          <div className="flex items-center justify-between text-xs font-extrabold text-neutral-500 pt-2 border-t border-neutral-100">
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
                className="text-[#FF2E93] hover:underline cursor-pointer"
              >
                Reset Filters ✕
              </button>
            )}
          </div>
        </div>

        {/* Jokes Grid */}
        {filteredJokes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredJokes.map((joke) => (
              <div
                key={joke.id}
                id={`joke-${joke.id}`}
                className={`transition-all duration-300 rounded-2xl ${
                  highlightedJokeId === joke.id
                    ? 'ring-4 ring-[#FF6B00] scale-[1.02] shadow-[8px_8px_0px_#121316]'
                    : ''
                }`}
              >
                <JokeCard joke={joke} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border-3 border-black comic-shadow p-12 text-center max-w-lg mx-auto my-12">
            <div className="text-5xl mb-4">🫠</div>
            <h3 className="text-2xl font-black uppercase text-[#121316] mb-2">
              No jokes found here!
            </h3>
            <p className="text-neutral-600 text-sm font-medium mb-6">
              Even our best stand-up comedian couldn’t find a match for that. Try
              loosening your search or pick another category.
            </p>
            <Button
              variant="yellow"
              size="md"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
            >
              Show All Jokes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
