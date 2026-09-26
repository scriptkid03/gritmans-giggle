'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { RandomJokeModal } from './RandomJokeModal';
import { Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const [isJokeModalOpen, setIsJokeModalOpen] = useState(false);

  return (
    <>
      <section className="relative w-full overflow-hidden pt-8 pb-16 sm:py-20 lg:py-24 bg-[#FFFDF7]">
        {/* Halftone background texture for comic pop */}
        <div className="absolute inset-0 opacity-20 comic-dots-subtle pointer-events-none" />

        {/* Ambient comic glow orbs */}
        <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-[#FFDE00]/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-[#FF2E93]/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline, Subtitle, Copy, CTAs */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6 sm:space-y-7">
              {/* Eyebrow badge */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <Badge variant="yellow" size="md" rotate="-2">
                  ⚡ CERTIFIED 100% GIGGLES
                </Badge>
                <Badge variant="pink" size="sm" rotate="2" className="hidden sm:inline-flex">
                  NO DULLING ALLOWED 🚫
                </Badge>
              </div>

              {/* Large Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#121316] leading-[1.05]">
                GRITMANS GIGGLE &amp;{' '}
                <span className="relative inline-block text-[#FF6B00]">
                  CHUCKLE
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-[#FF2E93]"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                    fill="currentColor"
                  >
                    <path d="M0,8 Q50,0 100,8 L100,12 Q50,4 0,12 Z" />
                  </svg>
                </span>{' '}
                JOINT
              </h1>

              {/* Supporting Subheadline */}
              <p className="text-xl sm:text-2xl font-black text-[#121316] tracking-tight">
                Where your ribs break and your worries fade.
              </p>

              {/* Supporting Paragraph */}
              <p className="text-base sm:text-lg text-neutral-700 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                Welcome to your ultimate sanctuary for jokes, funny stories,
                unfiltered laughter, and entertaining banter. Whether you’re recovering
                from Accra traffic, office madness, or just need an instant burst of joy,
                you have arrived at the right joint.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button
                  variant="yellow"
                  size="lg"
                  onClick={() => setIsJokeModalOpen(true)}
                  className="w-full sm:w-auto text-base gap-2.5 shadow-[5px_5px_0px_#121316]"
                >
                  <Sparkles className="w-5 h-5 text-[#FF6B00]" />
                  <span>MAKE ME LAUGH</span>
                </Button>

                <Button
                  variant="white"
                  size="lg"
                  href="/jokes"
                  className="w-full sm:w-auto text-base gap-2 shadow-[5px_5px_0px_#121316]"
                >
                  <span>EXPLORE THE LAUGHS</span>
                </Button>
              </div>

              {/* Quick funny stat ticks */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm font-bold text-neutral-600">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">🤣</span>
                  <span>Over 10,000+ Ribs Broken</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">🇬🇭</span>
                  <span>Pure African Energy</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">💊</span>
                  <span>0% Stress Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Right Column: Playful CSS-based Visual Composition */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md sm:max-w-lg aspect-square flex items-center justify-center">
                {/* Central Comic Character Card */}
                <div className="relative z-20 w-72 sm:w-80 bg-white rounded-3xl border-4 border-black comic-shadow-xl p-6 rotate-2 transform hover:rotate-0 transition-transform duration-300">
                  {/* Top Bar with mock dots */}
                  <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#FF2E93] border border-black" />
                      <span className="w-3 h-3 rounded-full bg-[#FFDE00] border border-black" />
                      <span className="w-3 h-3 rounded-full bg-[#10B981] border border-black" />
                    </div>
                    <span className="text-[11px] font-black uppercase text-neutral-500 tracking-wider">
                      LIVE LAUGH MONITOR
                    </span>
                  </div>

                  {/* Character Illustration via CSS Pop Art */}
                  <div className="w-full h-44 rounded-2xl bg-[#FFDE00] border-3 border-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-15 comic-dots-bg" />

                    {/* Laughing face composition */}
                    <div className="relative z-10 w-24 h-24 rounded-full bg-white border-3 border-black flex flex-col items-center justify-center comic-shadow-sm animate-wiggle-slow">
                      {/* Eyes (happy curves) */}
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-2 border-t-3 border-black rounded-t-full" />
                        <div className="w-3 h-2 border-t-3 border-black rounded-t-full" />
                      </div>
                      {/* Open laughing mouth */}
                      <div className="w-12 h-6 bg-[#FF2E93] border-2 border-black rounded-b-full flex items-start justify-center overflow-hidden">
                        <div className="w-6 h-2 bg-white rounded-b-md" />
                      </div>
                      {/* Tears of joy */}
                      <div className="absolute -left-2 top-8 text-xs">💧</div>
                      <div className="absolute -right-2 top-8 text-xs">💧</div>
                    </div>

                    <div className="relative z-10 mt-3 px-3 py-1 bg-black text-[#FFDE00] font-black text-xs uppercase tracking-wider rounded-lg border border-black">
                      GRITMAN HIMSELF
                    </div>
                  </div>

                  {/* Comic quote inside card */}
                  <div className="mt-4 p-3 rounded-xl bg-neutral-50 border-2 border-black text-center">
                    <p className="text-xs font-black text-neutral-800">
                      &ldquo;If life gives you lemons, add sugar and sell it to trotro passengers!&rdquo;
                    </p>
                  </div>
                </div>

                {/* Floating Comic Stickers / Speech Bubbles around */}
                {/* Sticker 1: LOL */}
                <div className="absolute top-2 -left-2 sm:left-4 z-30 animate-bounce">
                  <div className="px-3.5 py-1.5 bg-[#FF2E93] text-white font-black text-sm uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_#121316] -rotate-6">
                    LOL! 😂
                  </div>
                </div>

                {/* Sticker 2: HAHA! */}
                <div className="absolute top-4 -right-2 sm:right-4 z-30">
                  <div className="px-4 py-2 bg-[#FFDE00] text-black font-black text-base uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_#121316] rotate-6">
                    HAHA! 🤣
                  </div>
                </div>

                {/* Sticker 3: NO WAY! */}
                <div className="absolute bottom-6 -left-4 sm:left-0 z-30">
                  <div className="px-3.5 py-1.5 bg-[#10B981] text-black font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_#121316] -rotate-12">
                    NO WAY! 🤯
                  </div>
                </div>

                {/* Sticker 4: I CAN'T BREATHE */}
                <div className="absolute -bottom-4 right-0 sm:right-6 z-30">
                  <div className="px-4 py-2 bg-[#7C3AED] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_#121316] rotate-3">
                    I CAN&apos;T BREATHE 💀
                  </div>
                </div>

                {/* Sticker 5: CHALE! */}
                <div className="absolute top-1/2 -right-6 sm:-right-8 z-30 hidden sm:block">
                  <div className="px-3 py-1 bg-white text-[#FF6B00] font-black text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-[2px_2px_0px_#121316] rotate-12">
                    CHALE! 🇬🇭
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal trigger */}
      <RandomJokeModal
        isOpen={isJokeModalOpen}
        onClose={() => setIsJokeModalOpen(false)}
      />
    </>
  );
};
