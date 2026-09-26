import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'yellow' | 'orange' | 'pink' | 'charcoal' | 'white' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  isExternal?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'yellow',
  size = 'md',
  href,
  className = '',
  isExternal = false,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-bold tracking-wide uppercase transition-all duration-150 rounded-xl border-2 border-black select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black max-w-full text-center';

  const variants = {
    yellow: 'bg-[#FFDE00] text-black hover:bg-[#FFE53B] comic-shadow comic-btn-press',
    orange: 'bg-[#FF6B00] text-white hover:bg-[#FF7A1A] comic-shadow comic-btn-press',
    pink: 'bg-[#FF2E93] text-white hover:bg-[#FF45A2] comic-shadow comic-btn-press',
    charcoal: 'bg-[#121316] text-[#FFDE00] hover:bg-[#23252B] comic-shadow-yellow comic-btn-press',
    white: 'bg-white text-black hover:bg-neutral-50 comic-shadow comic-btn-press',
    outline: 'bg-transparent text-black border-2 border-black hover:bg-neutral-100 comic-shadow-sm comic-btn-press',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 min-h-[36px] gap-1.5',
    md: 'text-xs min-[380px]:text-sm px-4 min-[380px]:px-5 py-2.5 min-h-[42px] gap-2',
    lg: 'text-sm min-[380px]:text-base px-5 min-[380px]:px-7 py-3 min-[380px]:py-3.5 min-h-[48px] gap-2 sm:gap-2.5 shadow-[4px_4px_0px_#121316] sm:shadow-[5px_5px_0px_#121316]',
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedStyles}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  );
};
