import type { Metadata } from 'next';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Mail, Globe, Smile } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Welcome to the Joint | Gritmans Giggle & Chuckle Joint',
  description:
    'Learn the story behind Gritmans Giggle & Chuckle Joint, who we are, what we do, and why we believe laughter is medicine at funnygritmanlaughters.com.',
};

export default function AboutPage() {
  const rules = [
    {
      number: '01',
      title: 'Laugh at yourself first',
      desc: 'The quickest way to disarm stress is to realize we are all walking around doing funny, clumsy things every day.',
    },
    {
      number: '02',
      title: 'Zero dulling tolerated',
      desc: 'If life is throwing you heat, we respond with high-energy giggles and unstoppable optimism.',
    },
    {
      number: '03',
      title: 'Share the rib-cracking',
      desc: 'A joke laughed alone is good, but a joke that makes your coworker snort coffee on their keyboard is legendary.',
    },
    {
      number: '04',
      title: 'African warmth for everybody',
      desc: 'Our humor carries the heartbeat of bustling markets, lively family living rooms, and communal joy that knows no borders.',
    },
  ];

  return (
    <div className="w-full py-8 sm:py-20 bg-[#FFFDF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-3 min-[380px]:px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <Badge variant="yellow" size="md" rotate="-2" className="mb-2.5 sm:mb-3">
            THE STORY BEHIND THE GIGGLES 📖
          </Badge>
          <h1 className="text-3xl min-[360px]:text-4xl min-[480px]:text-5xl sm:text-6xl font-black uppercase text-[#121316] tracking-tight leading-tight break-words">
            WELCOME TO THE JOINT
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-xl font-black text-[#FF6B00]">
            Where your ribs break and your worries fade.
          </p>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-neutral-700 font-medium leading-relaxed">
            We are not a tech startup. We are not a solemn conference panel. We are
            a digital comedy sanctuary built to rescue human beings from the exhausting
            seriousness of adulthood.
          </p>
        </div>

        {/* 3 Main Sections: Who We Are, What We Do, Why We Love Laughter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-14 sm:mb-20">
          {/* Card 1: Who We Are */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border-3 border-black shadow-[4px_4px_0px_#121316] sm:comic-shadow p-5 min-[380px]:p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FFDE00] border-2 border-black flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6 shadow-[3px_3px_0px_#121316]">
                👑
              </div>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#121316] mb-2 sm:mb-3 break-words">
                WHO WE ARE
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-neutral-700 font-medium leading-relaxed">
                Founded by Gritman and a band of unapologetic humor enthusiasts, we
                are storytellers, banter curators, and rib-cracking architects.
                Infused with vibrant Ghanaian soul and universal comedy instinct, we
                bring the energetic joy of an Accra chop bar or bustling family gathering
                straight to your screen.
              </p>
            </div>
            <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-neutral-200 text-xs font-black uppercase text-[#FF6B00]">
              Certified Chuckle Masters
            </div>
          </div>

          {/* Card 2: What We Do */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border-3 border-black shadow-[4px_4px_0px_#121316] sm:comic-shadow p-5 min-[380px]:p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FF2E93] text-white border-2 border-black flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6 shadow-[3px_3px_0px_#121316]">
                🎯
              </div>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#121316] mb-2 sm:mb-3 break-words">
                WHAT WE DO
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-neutral-700 font-medium leading-relaxed">
                We craft and curate the funniest jokes, real-life misadventures,
                sharp one-liners, and viral memes known to mankind. Whether it’s
                debating the true culinary supremacy of Jollof rice or capturing the
                perils of adulting, we turn everyday chaos into genuine belly laughs.
              </p>
            </div>
            <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-neutral-200 text-xs font-black uppercase text-[#FF2E93]">
              Daily Prescription of Joy
            </div>
          </div>

          {/* Card 3: Why We Love Laughter */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border-3 border-black shadow-[4px_4px_0px_#121316] sm:comic-shadow p-5 min-[380px]:p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#10B981] border-2 border-black flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6 shadow-[3px_3px_0px_#121316]">
                ❤️
              </div>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#121316] mb-2 sm:mb-3 break-words">
                WHY WE LOVE LAUGHTER
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-neutral-700 font-medium leading-relaxed">
                Because laughter is the only medicine with zero copay and no
                prescription required. Life can be tough, bills don’t stop knocking,
                and traffic doesn’t clear by magic. But for the 5 or 10 minutes you
                spend inside this Joint, your worries are forced to wait outside.
              </p>
            </div>
            <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-neutral-200 text-xs font-black uppercase text-[#10B981]">
              Anti-Stress Guarantee
            </div>
          </div>
        </div>

        {/* House Rules of Laughter */}
        <div className="bg-amber-50 rounded-2xl sm:rounded-3xl border-3 border-black shadow-[4px_4px_0px_#121316] sm:comic-shadow-lg p-5 min-[380px]:p-6 sm:p-8 md:p-12 mb-14 sm:mb-20">
          <div className="max-w-2xl mb-6 sm:mb-8">
            <Badge variant="orange" size="sm" rotate="-2" className="mb-2">
              THE HOUSE CODE
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-[#121316] break-words">
              THE 4 LAWS OF THE JOINT
            </h2>
            <p className="mt-2 text-xs sm:text-sm lg:text-base text-neutral-700 font-medium">
              Simple principles to ensure maximum rib comfort during your visit:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {rules.map((rule) => (
              <div
                key={rule.number}
                className="bg-white rounded-xl sm:rounded-2xl border-2 border-black p-4 sm:p-6 shadow-[2px_2px_0px_#121316]"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 mb-2">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FFDE00] border-2 border-black flex items-center justify-center font-black text-xs sm:text-sm text-black shrink-0">
                    {rule.number}
                  </span>
                  <h3 className="text-base sm:text-lg font-black uppercase text-[#121316] break-words">
                    {rule.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Connect Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border-3 border-black shadow-[4px_4px_0px_#121316] sm:comic-shadow-lg p-5 min-[380px]:p-6 sm:p-8 md:p-12 text-center max-w-3xl mx-auto">
          <Badge variant="pink" size="md" rotate="2" className="mb-3 sm:mb-4">
            REACH THE CREW 📬
          </Badge>
          <h2 className="text-2xl min-[380px]:text-3xl sm:text-4xl font-black uppercase text-[#121316] mb-2 sm:mb-3 break-words">
            HAVE A QUESTION OR COLLAB?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-neutral-600 font-medium max-w-lg mx-auto mb-6 sm:mb-8 leading-relaxed">
            Want to book Gritman for a comedy set, sponsor a joke series, or just
            send us a private laugh? Our lines are wide open.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto mb-6 sm:mb-8">
            <div className="p-3.5 sm:p-4 rounded-xl border-2 border-black bg-neutral-50 flex items-center gap-2.5 sm:gap-3 text-left">
              <Mail className="w-5 h-5 text-[#FF6B00] shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-black uppercase text-neutral-500">
                  Email Us
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-black font-mono break-all">
                  laughter@funnygritmanlaughters.com
                </div>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl border-2 border-black bg-neutral-50 flex items-center gap-2.5 sm:gap-3 text-left">
              <Globe className="w-5 h-5 text-[#FF2E93] shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-black uppercase text-neutral-500">
                  Web Home
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-black font-mono break-all">
                  funnygritmanlaughters.com
                </div>
              </div>
            </div>
          </div>

          <Button variant="yellow" size="lg" href="/jokes" className="w-full sm:w-auto min-h-[48px]">
            <Smile className="w-5 h-5 text-black" />
            <span>BACK TO THE JOKES</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
