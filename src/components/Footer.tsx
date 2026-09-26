import React from 'react';
import Link from 'next/link';
import { Laugh } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = 2026;

  const socialLinks = [
    { name: 'TikTok', href: '#', icon: '🎵' },
    { name: 'YouTube', href: '#', icon: '▶️' },
    { name: 'Instagram', href: '#', icon: '📸' },
    { name: 'Facebook', href: '#', icon: '👥' },
    { name: 'X', href: '#', icon: '𝕏' },
  ];

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Jokes', href: '/jokes' },
    { label: 'Laugh Gallery', href: '/gallery' },
    { label: 'Comments', href: '/comments' },
    { label: 'About', href: '/about' },
  ];

  return (
    <footer className="w-full bg-[#121316] text-white border-t-4 border-black relative overflow-hidden">
      {/* Decorative comic dots top border */}
      <div className="h-3 w-full bg-[#FFDE00] border-b-2 border-black" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b-2 border-neutral-800">
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#FFDE00] text-black border-2 border-black flex items-center justify-center font-black">
                <Laugh className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                GRITMANS GIGGLE & CHUCKLE JOINT
              </span>
            </div>

            <p className="text-base font-bold text-[#FFDE00] leading-snug">
              Where your ribs break and your worries fade.
            </p>

            <p className="text-sm text-neutral-400 font-medium leading-relaxed max-w-sm">
              Your certified sanctuary for Ghanaian wit, unadulterated African humor,
              and universal comedy that leaves tears in your eyes and joy in your soul.
            </p>

            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-neutral-700 bg-neutral-900 text-xs font-mono text-[#FFDE00]">
                🌐 funnygritmanlaughters.com
              </span>
            </div>
          </div>

          {/* Quick navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-[#FF2E93]">
              Navigation
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-bold text-neutral-300 hover:text-[#FFDE00] transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Laugh Guarantee */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-[#FF6B00]">
              Catch The Banter
            </h4>
            <p className="text-xs text-neutral-400 font-medium">
              Follow our daily doses of madness and behind-the-scenes giggles:
            </p>

            {/* Social pills */}
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  className="px-3 py-1.5 rounded-lg border border-neutral-700 bg-neutral-900 hover:bg-[#FFDE00] hover:text-black hover:border-black font-extrabold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  title={soc.name}
                >
                  <span>{soc.icon}</span>
                  <span>{soc.name}</span>
                </a>
              ))}
            </div>

            {/* Comic disclaimer card */}
            <div className="p-3 rounded-xl border border-neutral-700 bg-neutral-900/80 text-[11px] text-neutral-400 font-medium leading-relaxed">
              ⚠️ <strong className="text-neutral-200">Health Warning:</strong> Side effects of visiting this joint include sudden snorting in public, uncontrollable cheek cramps, and an elevated zest for life.
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-neutral-400">
          <div>
            © {currentYear} Gritmans Giggle and Chuckle Joint. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Made with pure joy &</span>
            <span className="text-[#FF2E93] font-black">100% Giggles</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
