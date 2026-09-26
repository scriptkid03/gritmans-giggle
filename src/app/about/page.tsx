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
    <div className="w-full py-12 sm:py-20 bg-[#FFFDF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="yellow" size="md" rotate="-2" className="mb-3">
            THE STORY BEHIND THE GIGGLES 📖
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-[#121316] tracking-tight leading-tight">
            WELCOME TO THE JOINT
          </h1>
          <p className="mt-4 text-lg sm:text-xl font-black text-[#FF6B00]">
            Where your ribs break and your worries fade.
          </p>
          <p className="mt-3 text-base text-neutral-700 font-medium leading-relaxed">
            We are not a tech startup. We are not a solemn conference panel. We are
            a digital comedy sanctuary built to rescue human beings from the exhausting
            seriousness of adulthood.
          </p>
        </div>

        {/* 3 Main Sections: Who We Are, What We Do, Why We Love Laughter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Card 1: Who We Are */}
          <div className="bg-white rounded-3xl border-3 border-black comic-shadow p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#FFDE00] border-2 border-black flex items-center justify-center text-3xl mb-6 shadow-[3px_3px_0px_#121316]">
                👑
              </div>
              <h2 className="text-2xl font-black uppercase text-[#121316] mb-3">
                WHO WE ARE
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 font-medium leading-relaxed">
                Founded by Gritman and a band of unapologetic humor enthusiasts, we
                are storytellers, banter curators, and rib-cracking architects.
                Infused with vibrant Ghanaian soul and universal comedy instinct, we
                bring the energetic joy of an Accra chop bar or bustling family gathering
                straight to your screen.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200 text-xs font-black uppercase text-[#FF6B00]">
              Certified Chuckle Masters
            </div>
          </div>

          {/* Card 2: What We Do */}
          <div className="bg-white rounded-3xl border-3 border-black comic-shadow p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#FF2E93] text-white border-2 border-black flex items-center justify-center text-3xl mb-6 shadow-[3px_3px_0px_#121316]">
                🎯
              </div>
              <h2 className="text-2xl font-black uppercase text-[#121316] mb-3">
                WHAT WE DO
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 font-medium leading-relaxed">
                We craft and curate the funniest jokes, real-life misadventures,
                sharp one-liners, and viral memes known to mankind. Whether it’s
                debating the true culinary supremacy of Jollof rice or capturing the
                perils of adulting, we turn everyday chaos into genuine belly laughs.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200 text-xs font-black uppercase text-[#FF2E93]">
              Daily Prescription of Joy
            </div>
          </div>

          {/* Card 3: Why We Love Laughter */}
          <div className="bg-white rounded-3xl border-3 border-black comic-shadow p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#10B981] border-2 border-black flex items-center justify-center text-3xl mb-6 shadow-[3px_3px_0px_#121316]">
                ❤️
              </div>
              <h2 className="text-2xl font-black uppercase text-[#121316] mb-3">
                WHY WE LOVE LAUGHTER
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 font-medium leading-relaxed">
                Because laughter is the only medicine with zero copay and no
                prescription required. Life can be tough, bills don’t stop knocking,
                and traffic doesn’t clear by magic. But for the 5 or 10 minutes you
                spend inside this Joint, your worries are forced to wait outside.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200 text-xs font-black uppercase text-[#10B981]">
              Anti-Stress Guarantee
            </div>
          </div>
        </div>

        {/* House Rules of Laughter */}
        <div className="bg-amber-50 rounded-3xl border-3 border-black comic-shadow-lg p-8 sm:p-12 mb-20">
          <div className="max-w-2xl mb-8">
            <Badge variant="orange" size="sm" rotate="-2" className="mb-2">
              THE HOUSE CODE
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#121316]">
              THE 4 LAWS OF THE JOINT
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-700 font-medium">
              Simple principles to ensure maximum rib comfort during your visit:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rules.map((rule) => (
              <div
                key={rule.number}
                className="bg-white rounded-2xl border-2 border-black p-5 sm:p-6 comic-shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 rounded-lg bg-[#FFDE00] border-2 border-black flex items-center justify-center font-black text-sm text-black">
                    {rule.number}
                  </span>
                  <h3 className="text-lg font-black uppercase text-[#121316]">
                    {rule.title}
                  </h3>
                </div>
                <p className="text-sm text-neutral-700 font-medium leading-relaxed">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Connect Section */}
        <div className="bg-white rounded-3xl border-3 border-black comic-shadow-lg p-8 sm:p-12 text-center max-w-3xl mx-auto">
          <Badge variant="pink" size="md" rotate="2" className="mb-4">
            REACH THE CREW 📬
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#121316] mb-3">
            HAVE A QUESTION OR COLLAB?
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-medium max-w-lg mx-auto mb-8 leading-relaxed">
            Want to book Gritman for a comedy set, sponsor a joke series, or just
            send us a private laugh? Our lines are wide open.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mb-8">
            <div className="p-4 rounded-xl border-2 border-black bg-neutral-50 flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#FF6B00] shrink-0" />
              <div className="text-left">
                <div className="text-[10px] font-black uppercase text-neutral-500">
                  Email Us
                </div>
                <div className="text-xs font-bold text-black font-mono">
                  laughter@funnygritmanlaughters.com
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border-2 border-black bg-neutral-50 flex items-center gap-3">
              <Globe className="w-5 h-5 text-[#FF2E93] shrink-0" />
              <div className="text-left">
                <div className="text-[10px] font-black uppercase text-neutral-500">
                  Web Home
                </div>
                <div className="text-xs font-bold text-black font-mono">
                  funnygritmanlaughters.com
                </div>
              </div>
            </div>
          </div>

          <Button variant="yellow" size="lg" href="/jokes">
            <Smile className="w-5 h-5 text-black" />
            <span>BACK TO THE JOKES</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
