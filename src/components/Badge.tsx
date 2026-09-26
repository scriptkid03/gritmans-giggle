import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'yellow' | 'orange' | 'pink' | 'purple' | 'green' | 'blue' | 'black' | 'white';
  size?: 'sm' | 'md';
  rotate?: '-3' | '-2' | '-1' | '0' | '1' | '2' | '3';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'yellow',
  size = 'md',
  rotate = '0',
  className = '',
}) => {
  const baseStyles =
    'inline-flex items-center font-extrabold uppercase tracking-wider rounded-lg border-2 border-black select-none max-w-full';

  const variants = {
    yellow: 'bg-[#FFDE00] text-black shadow-[2px_2px_0px_#121316]',
    orange: 'bg-[#FF6B00] text-white shadow-[2px_2px_0px_#121316]',
    pink: 'bg-[#FF2E93] text-white shadow-[2px_2px_0px_#121316]',
    purple: 'bg-[#7C3AED] text-white shadow-[2px_2px_0px_#121316]',
    green: 'bg-[#10B981] text-black shadow-[2px_2px_0px_#121316]',
    blue: 'bg-[#3B82F6] text-white shadow-[2px_2px_0px_#121316]',
    black: 'bg-[#121316] text-[#FFDE00] shadow-[2px_2px_0px_#FF2E93]',
    white: 'bg-white text-black shadow-[2px_2px_0px_#121316]',
  };

  const sizes = {
    sm: 'text-[10px] min-[380px]:text-[11px] px-2 min-[380px]:px-2.5 py-0.5',
    md: 'text-xs px-2.5 min-[380px]:px-3 py-1',
  };

  const rotations = {
    '-3': '-rotate-2 sm:-rotate-3',
    '-2': '-rotate-1 sm:-rotate-2',
    '-1': '-rotate-1',
    '0': '',
    '1': 'rotate-1',
    '2': 'rotate-1 sm:rotate-2',
    '3': 'rotate-2 sm:rotate-3',
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${rotations[rotate]} ${className}`}
    >
      {children}
    </span>
  );
};
