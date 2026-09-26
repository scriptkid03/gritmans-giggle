'use client';

import React, { useState } from 'react';
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

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FFFDF7]/95 backdrop-blur-xs border-b-3 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group cursor-pointer select-none"
            >
              <div className="w-11 h-11 rounded-xl border-2 border-black bg-[#FFDE00] flex items-center justify-center comic-shadow-sm group-hover:rotate-6 group-hover:scale-105 transition-transform">
                <Laugh className="w-6 h-6 text-[#121316] stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-[#121316] uppercase font-display leading-none">
                    GRITMANS
                  </span>
                  <Badge variant="pink" size="sm" rotate="-2" className="hidden sm:inline-flex">
                    JOINT
                  </Badge>
                </div>
                <span className="text-[10px] font-black tracking-widest text-[#FF6B00] uppercase mt-0.5">
                  Giggle & Chuckle
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

            {/* Right: Prominent "MAKE ME LAUGH" button */}
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

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setIsJokeModalOpen(true)}
                className="px-3 py-1.5 text-xs font-black uppercase rounded-lg border-2 border-black bg-[#FFDE00] shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
              >
                😂 LAUGH
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl border-2 border-black bg-white hover:bg-neutral-100 comic-shadow-sm comic-btn-press"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
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

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-3 border-black bg-[#FFFDF7] px-4 pt-4 pb-6 space-y-3 animate-comic-pop">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-black uppercase tracking-wider transition-colors border-2 ${
                      isActive
                        ? 'bg-[#FFDE00] text-black border-black shadow-[3px_3px_0px_#121316]'
                        : 'bg-white border-neutral-300 text-neutral-800'
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
                className="w-full justify-center"
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
