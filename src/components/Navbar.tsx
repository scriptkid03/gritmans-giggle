'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './Button';
import { Badge } from './Badge';
import { RandomJokeModal } from './RandomJokeModal';
import { Menu, X, Sparkles, Laugh } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isJokeModalOpen, setIsJokeModalOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Jokes', href: '/jokes' },
    { label: 'Laugh Gallery', href: '/gallery' },
    { label: 'Comments', href: '/comments' },
    { label: 'About', href: '/about' },
  ];

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FFFDF7]/95 backdrop-blur-xs border-b-3 border-black">
        <div className="max-w-7xl mx-auto px-3 min-[380px]:px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Brand Logo */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer select-none min-w-0"
              aria-label="Gritmans Giggle Joint Home"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl border-2 border-black bg-[#FFDE00] flex items-center justify-center shrink-0 comic-shadow-sm group-hover:rotate-6 transition-transform">
                <Laugh className="w-5 h-5 sm:w-6 sm:h-6 text-[#121316] stroke-[2.5]" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="text-lg min-[360px]:text-xl sm:text-2xl font-black tracking-tight text-[#121316] uppercase font-display leading-none truncate">
                    GRITMANS
                  </span>
                  <Badge variant="pink" size="sm" rotate="-2" className="hidden sm:inline-flex">
                    JOINT
                  </Badge>
                </div>
                <span className="text-[9px] min-[360px]:text-[10px] font-black tracking-widest text-[#FF6B00] uppercase mt-0.5 truncate">
                  Giggle &amp; Chuckle
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-xl text-sm font-black uppercase tracking-wider transition-all duration-150 ${
                      isActive
                        ? 'bg-[#FFDE00] text-black border-2 border-black shadow-[2px_2px_0px_#121316]'
                        : 'text-neutral-700 hover:text-black hover:bg-neutral-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Desktop "MAKE ME LAUGH" button */}
            <div className="hidden md:flex items-center">
              <Button
                variant="yellow"
                size="md"
                onClick={() => setIsJokeModalOpen(true)}
                className="gap-2 shadow-[4px_4px_0px_#121316]"
              >
                <Sparkles className="w-4 h-4 text-[#FF6B00]" />
                <span>MAKE ME LAUGH</span>
              </Button>
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
              {/* Compact Quick Laugh button for screens >= 380px */}
              <button
                type="button"
                onClick={() => setIsJokeModalOpen(true)}
                className="hidden min-[380px]:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-black uppercase rounded-lg border-2 border-black bg-[#FFDE00] shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                aria-label="Get a quick joke"
              >
                <span>😂</span>
                <span>LAUGH</span>
              </button>

              {/* Hamburger Button with comfortable 44px min touch target */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-11 h-11 rounded-xl border-2 border-black bg-white hover:bg-neutral-100 flex items-center justify-center comic-shadow-sm comic-btn-press cursor-pointer shrink-0"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-black stroke-[2.5]" />
                ) : (
                  <Menu className="w-6 h-6 text-black stroke-[2.5]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu with viewport constraint and smooth scroll */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-3 border-black bg-[#FFFDF7] px-4 pt-4 pb-6 space-y-4 animate-comic-pop max-h-[calc(100dvh-4.25rem)] overflow-y-auto">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`min-h-[48px] px-4 py-3 rounded-xl text-base font-black uppercase tracking-wider flex items-center transition-colors border-2 ${
                      isActive
                        ? 'bg-[#FFDE00] text-black border-black shadow-[3px_3px_0px_#121316]'
                        : 'bg-white border-neutral-300 text-neutral-800 hover:bg-neutral-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-2">
              <Button
                variant="yellow"
                size="lg"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsJokeModalOpen(true);
                }}
                className="w-full justify-center min-h-[48px] text-base"
              >
                <Sparkles className="w-5 h-5 text-[#FF6B00]" />
                <span>MAKE ME LAUGH</span>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Global Interactive Random Joke Modal */}
      <RandomJokeModal
        isOpen={isJokeModalOpen}
        onClose={() => setIsJokeModalOpen(false)}
      />
    </>
  );
};
