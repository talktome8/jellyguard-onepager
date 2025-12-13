'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' }
];

export default function Footer() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];
  const isRTL = locale === 'he' || locale === 'ar';

  const switchLanguage = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
    setIsLangMenuOpen(false);
  };

  return (
    <footer className="bg-[#0a1929] text-white py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Logo */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
              <img 
                src="/logo.svg" 
                alt="JellyGuard" 
                className="h-20 w-20 sm:h-24 sm:w-24 drop-shadow-lg"
              />
              <div className="text-3xl sm:text-4xl font-bold text-teal">
                JellyGuard
              </div>
            </div>
            <p className="text-white/60 text-sm" dir="ltr">Clean water, naturally.</p>
          </div>
          
          {/* Language Selector */}
          <div className="relative flex items-center gap-3">
            <span className="text-sm text-white/60">Language:</span>
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="px-4 py-2 text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-[#0a1929] flex items-center gap-2"
              aria-label="Select language"
            >
              <span>{currentLanguage.flag}</span>
              <span>{currentLanguage.name}</span>
              <svg className={`w-4 h-4 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isLangMenuOpen && (
              <div className="absolute bottom-full mb-2 bg-[#0a1929] border border-white/20 rounded-lg shadow-2xl py-2 min-w-48 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code)}
                    className={`w-full px-4 py-2 text-left hover:bg-white/10 transition-colors flex items-center gap-3 ${
                      locale === lang.code ? 'bg-teal/20 text-teal font-semibold' : 'text-white'
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
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
        
        <div className="border-t border-white/5 pt-6">
          <p className="text-xs text-white/60 text-center mb-3 italic">
            JellyGuard is currently in research & development. Early Interest Program participants receive priority access and exclusive updates.
          </p>
          <p className="text-xs text-white/40 text-center">© 2025 JellyGuard. All rights reserved.</p>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {isLangMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsLangMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </footer>
  );
}
