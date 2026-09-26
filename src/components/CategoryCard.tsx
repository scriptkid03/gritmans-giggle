import React from 'react';
import Link from 'next/link';
import { LaughCategoryInfo } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: LaughCategoryInfo;
  index: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, index }) => {
  // Rotations for a comic pop vibe
  const rotations = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', '-rotate-1'];
  const rotation = rotations[index % rotations.length];

  return (
    <Link
      href={category.slug}
      className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border-3 border-black bg-white comic-shadow comic-card-hover ${rotation} transition-all`}
    >
      <div>
        {/* Emoji Icon Bubble */}
        <div className="w-16 h-16 rounded-2xl border-2 border-black flex items-center justify-center text-3xl mb-5 bg-[#FFDE00] group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-[3px_3px_0px_#121316]">
          {category.emoji}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-[#121316] mb-2 uppercase group-hover:text-[#FF6B00] transition-colors">
          {category.title}
        </h3>

        {/* Description */}
        <p className="text-sm font-medium text-neutral-700 leading-relaxed mb-6">
          {category.description}
        </p>
      </div>

      {/* Action link */}
      <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#121316] group-hover:translate-x-1 transition-transform">
        <span>Dive In</span>
        <ArrowRight className="w-4 h-4 text-[#FF6B00]" />
      </div>
    </Link>
  );
};
