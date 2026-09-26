import React from 'react';
import { Badge } from './Badge';

interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: 'yellow' | 'orange' | 'pink' | 'purple' | 'green' | 'blue' | 'black';
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  badgeVariant = 'pink',
  title,
  subtitle,
  centered = true,
  className = '',
}) => {
  return (
    <div
      className={`mb-8 sm:mb-12 ${
        centered ? 'text-center max-w-2xl mx-auto' : 'max-w-xl'
      } ${className}`}
    >
      {badge && (
        <div className="mb-2.5 sm:mb-3">
          <Badge variant={badgeVariant} rotate="-2">
            {badge}
          </Badge>
        </div>
      )}
      <h2 className="text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#121316] uppercase leading-tight break-words">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2.5 sm:mt-3 text-sm sm:text-base lg:text-lg text-neutral-700 font-medium leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
