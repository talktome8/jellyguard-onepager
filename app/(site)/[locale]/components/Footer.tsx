'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'he' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <footer className="bg-[#0a1929] text-white py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Logo */}
          <div className="text-center md:text-left">
            <div className="text-xl font-bold text-teal mb-1 flex items-center gap-2 justify-center md:justify-start">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M12 2C9.24 2 7 4.24 7 7c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                <path d="M8 14c-1 .5-1.5 1-1.5 3v5h11v-5c0-2-.5-2.5-1.5-3" strokeLinecap="round" />
              </svg>
              JellyGuard
            </div>
            <p className="text-white/60 text-sm">Clean water, naturally.</p>
          </div>
          
          {/* Language toggle */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/60">Language:</span>
            <button
              onClick={toggleLocale}
              className="px-4 py-2 text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-[#0a1929]"
              aria-label={`Switch to ${locale === 'en' ? 'Hebrew' : 'English'}`}
            >
              {locale === 'en' ? '🇮🇱 עברית' : '🇺🇸 English'}
            </button>
          </div>
          
          {/* Simple link row */}
          <div className="flex items-center gap-6 text-sm">
            <a 
              href="#opening" 
              className="text-white/70 hover:text-teal transition-colors focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-[#0a1929] rounded px-2 py-1"
            >
              About
            </a>
            <a 
              href="#contact" 
              className="text-white/70 hover:text-teal transition-colors focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-[#0a1929] rounded px-2 py-1"
            >
              Contact
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-6 text-center">
          <p className="text-xs text-white/40">© 2025 JellyGuard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
