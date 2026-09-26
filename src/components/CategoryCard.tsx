import React from 'react';
import Link from 'next/link';
import { LaughCategoryInfo } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: LaughCategoryInfo;
  index: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, index }) => {
  // Rotations for a comic pop vibe on larger screens
  const rotations = ['sm:-rotate-1', 'sm:rotate-1', 'sm:-rotate-2', 'sm:rotate-2', 'sm:-rotate-1'];
  const rotation = rotations[index % rotations.length];

  return (
    <Link
      href={category.slug}
      className={`group relative flex flex-col justify-between p-5 min-[380px]:p-6 sm:p-7 rounded-2xl border-3 border-black bg-white comic-shadow comic-card-hover ${rotation} transition-all`}
    >
      <div>
        {/* Emoji Icon Bubble */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-black flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-5 bg-[#FFDE00] group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-[3px_3px_0px_#121316]">
          {category.emoji}
        </div>

        {/* Title */}
        <h3 className="text-lg min-[380px]:text-xl sm:text-2xl font-black text-[#121316] mb-2 uppercase group-hover:text-[#FF6B00] transition-colors break-words">
          {category.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm font-medium text-neutral-700 leading-relaxed mb-5 sm:mb-6">
          {category.description}
        </p>
      </div>

      {/* Action link */}
      <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#121316] group-hover:translate-x-1 transition-transform pt-2">
        <span>Dive In</span>
        <ArrowRight className="w-4 h-4 text-[#FF6B00]" />
      </div>
    </Link>
  );
};
