'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_GALLERY_ITEMS } from '@/lib/mock-data';
import { GalleryCard } from '@/components/GalleryCard';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Sparkles, Film, Image as ImageIcon, Volume2, Smile, ArrowRight } from 'lucide-react';

export const GalleryClient: React.FC = () => {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get('filter');

  const initialFilter = useMemo(() => {
    if (filterParam === 'videos') return 'video';
    if (filterParam === 'stories' || filterParam === 'nonsense') return 'meme';
    return 'all';
  }, [filterParam]);

  const [activeType, setActiveType] = useState<string>(initialFilter);

  const filteredItems = useMemo(() => {
    if (activeType === 'all') return MOCK_GALLERY_ITEMS;
    return MOCK_GALLERY_ITEMS.filter((item) => item.type === activeType);
  }, [activeType]);

  const filterTabs = [
    { id: 'all', label: 'All Content', icon: Sparkles },
    { id: 'meme', label: 'Memes & Quotes', icon: Smile },
    { id: 'video', label: 'Video Clips', icon: Film },
    { id: 'audio', label: 'Audio Skits', icon: Volume2 },
    { id: 'image', label: 'Comic Art', icon: ImageIcon },
  ];

  return (
    <div className="w-full py-12 sm:py-16 bg-[#FFFDF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <Badge variant="pink" size="md" rotate="-2" className="mb-3">
            VISUAL ENTERTAINMENT 🎨
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-[#121316] tracking-tight leading-tight">
            THE LAUGH GALLERY
          </h1>
          <p className="mt-4 text-base sm:text-lg font-medium text-neutral-700 leading-relaxed">
            A curated exhibition of viral visual comedy, everyday African realities,
            stand-up clips, and unhinged audio sketches.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeType === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveType(tab.id)}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl border-2 border-black font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#FFDE00] text-black shadow-[3px_3px_0px_#121316] -translate-y-0.5'
                    : 'bg-white hover:bg-neutral-100 text-neutral-800 shadow-[1px_1px_0px_#121316]'
                }`}
              >
                <Icon className="w-4 h-4 text-[#FF6B00]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredItems.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-white rounded-3xl border-3 border-black comic-shadow-lg p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <Badge variant="orange" size="sm" rotate="-1">
              COMMUNITY MEME DROP
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#121316]">
              Created a funny meme or skit?
            </h3>
            <p className="text-sm font-medium text-neutral-600 max-w-lg">
              We regularly feature community creations in the Laugh Gallery. Tell us about
              your funny moment or leave a comment!
            </p>
          </div>

          <Button
            variant="pink"
            size="lg"
            href="/comments"
            className="shrink-0 gap-2 shadow-[4px_4px_0px_#121316]"
          >
            <span>SUBMIT TO THE JOINT</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
