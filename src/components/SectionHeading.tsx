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
      className={`mb-10 sm:mb-12 ${
        centered ? 'text-center max-w-2xl mx-auto' : 'max-w-xl'
      } ${className}`}
    >
      {badge && (
        <div className="mb-3">
          <Badge variant={badgeVariant} rotate="-2">
            {badge}
          </Badge>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#121316] uppercase leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-neutral-700 font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
};
