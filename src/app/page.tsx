import React from 'react';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { FeaturedJoke } from '@/components/FeaturedJoke';
import { CategoryCard } from '@/components/CategoryCard';
import { GalleryCard } from '@/components/GalleryCard';
import { CommentCard } from '@/components/CommentCard';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import {
  LAUGH_CATEGORIES,
  MOCK_JOKES,
  MOCK_GALLERY_ITEMS,
  MOCK_COMMENTS,
} from '@/lib/mock-data';
import { ArrowRight, MessageSquarePlus, Sparkles } from 'lucide-react';

export default function HomePage() {
  const previewGallery = MOCK_GALLERY_ITEMS.slice(0, 3);
  const previewComments = MOCK_COMMENTS.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. FEATURED JOKE: TODAY'S DOSE OF LAUGHTER */}
      <section
        id="todays-dose"
        className="w-full py-10 sm:py-20 bg-amber-50/50 border-y-3 border-black relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-15 comic-dots-subtle pointer-events-none" />

        <div className="max-w-7xl mx-auto px-3 min-[380px]:px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="DAILY PRESCRIPTION"
            badgeVariant="yellow"
            title="TODAY'S DOSE OF LAUGHTER"
            subtitle="Hand-picked certified rib-crackers guaranteed to brighten your day. Hit 'Another One' if you need extra treatment!"
            centered={true}
          />

          <FeaturedJoke initialJoke={MOCK_JOKES[0]} />
        </div>
      </section>

      {/* 3. LAUGH CATEGORIES: WHAT ARE YOU IN THE MOOD FOR? */}
      <section className="w-full py-10 sm:py-24 bg-[#FFFDF7] relative">
        <div className="max-w-7xl mx-auto px-3 min-[380px]:px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="PICK YOUR POISON"
            badgeVariant="pink"
            title="WHAT ARE YOU IN THE MOOD FOR?"
            subtitle="From punchy one-liners to chaotic street tales, pick a lane and prepare to lose your composure."
            centered={true}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-7">
            {LAUGH_CATEGORIES.map((cat, idx) => (
              <CategoryCard key={cat.id} category={cat} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. LAUGH GALLERY PREVIEW */}
      <section className="w-full py-10 sm:py-24 bg-neutral-100/70 border-y-3 border-black relative">
        <div className="max-w-7xl mx-auto px-3 min-[380px]:px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-12">
            <div>
              <Badge variant="orange" size="sm" rotate="-2" className="mb-2">
                VISUAL COMEDY &amp; MEMES
              </Badge>
              <h2 className="text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#121316] uppercase break-words">
                THE LAUGH VAULT
              </h2>
              <p className="mt-2 text-xs sm:text-sm lg:text-base text-neutral-600 font-medium max-w-xl">
                A peek into our collection of viral memes, relatable skits, and
                illustrated scenes from everyday African and global hustle.
              </p>
            </div>

            <div className="w-full md:w-auto">
              <Button
                variant="yellow"
                size="md"
                href="/gallery"
                className="w-full md:w-auto gap-2 min-h-[44px]"
              >
                <span>SEE THE WHOLE GALLERY</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {previewGallery.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-black uppercase text-[#121316] hover:text-[#FF6B00] transition-colors border-b-2 border-black pb-0.5"
            >
              <span>SEE THE WHOLE GALLERY →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. VISITOR COMMENTS PREVIEW: WHAT ARE PEOPLE SAYING? */}
      <section className="w-full py-10 sm:py-24 bg-[#FFFDF7] relative">
        <div className="max-w-7xl mx-auto px-3 min-[380px]:px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="THE CHUCKLE COMMUNITY"
            badgeVariant="purple"
            title="WHAT ARE PEOPLE SAYING?"
            subtitle="Real reactions from verified gigglers around the globe whose ribs were broken in the line of laughter."
            centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 mb-8 sm:mb-12">
            {previewComments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>

          {/* Call to action for comments */}
          <div className="text-center">
            <Button
              variant="pink"
              size="lg"
              href="/comments"
              className="w-full sm:w-auto gap-2 shadow-[4px_4px_0px_#121316] min-h-[48px]"
            >
              <MessageSquarePlus className="w-5 h-5 text-white" />
              <span>LEAVE YOUR LAUGH</span>
            </Button>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA: GOT A JOKE? */}
      <section className="w-full py-12 sm:py-20 bg-[#FFDE00] border-t-4 border-black relative overflow-hidden">
        {/* Comic background circles contained within container */}
        <div className="absolute -top-12 -left-12 w-36 sm:w-48 h-36 sm:h-48 rounded-full bg-white/40 border-2 sm:border-3 border-black pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-44 sm:w-60 h-44 sm:h-60 rounded-full bg-[#FF6B00]/20 border-2 sm:border-3 border-black pointer-events-none" />

        <div className="max-w-4xl mx-auto px-3 min-[380px]:px-4 sm:px-6 text-center relative z-10 space-y-4 sm:space-y-6">
          <div className="inline-block max-w-full">
            <Badge variant="black" size="md" rotate="-2">
              CALLING ALL COMEDIANS 🎤
            </Badge>
          </div>

          <h2 className="text-3xl min-[360px]:text-4xl min-[480px]:text-5xl sm:text-6xl font-black uppercase text-[#121316] tracking-tight leading-tight break-words">
            GOT A JOKE?
          </h2>

          <p className="text-base min-[380px]:text-lg sm:text-2xl font-black text-[#121316] max-w-xl mx-auto leading-relaxed break-words">
            Don&apos;t keep the laughter to yourself. Share it with the Joint.
          </p>

          <p className="text-xs sm:text-base text-neutral-800 font-medium max-w-md mx-auto">
            Got that one joke that always cracks up the family dining table? Drop it
            right here and let the world giggle with you.
          </p>

          <div className="pt-2">
            <Button
              variant="charcoal"
              size="lg"
              href="/comments"
              className="w-full sm:w-auto text-sm min-[380px]:text-base px-6 min-[380px]:px-8 py-3.5 sm:py-4 gap-2.5 shadow-[4px_4px_0px_#FF2E93] sm:shadow-[5px_5px_0px_#FF2E93] min-h-[48px]"
            >
              <Sparkles className="w-5 h-5 text-[#FFDE00]" />
              <span>DROP YOUR JOKE</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
