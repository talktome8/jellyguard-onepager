'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' }
];

export default function Header() {
  const t = useTranslations('header');
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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20" dir={isRTL ? 'rtl' : 'ltr'}>
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${locale}`} className="flex items-center group">
              <Image 
                src="/logo.svg" 
                alt="JellyGuard" 
                width={64}
                height={64}
                className="h-14 w-14 sm:h-16 sm:w-16 mr-3 transition-transform duration-300 group-hover:scale-110 drop-shadow-md"
                priority
              />
              <div className="text-2xl sm:text-3xl font-bold text-navy group-hover:text-teal transition-colors">
                JellyGuard
              </div>
            </Link>
          </div>

          {/* Language Selector - center */}
          <div className="relative flex items-center">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="px-4 py-2 text-sm font-semibold text-navy hover:text-teal transition-smooth rounded-lg hover:bg-sand/50 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 flex items-center gap-2"
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
              <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-48 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code)}
                    className={`w-full px-4 py-2 text-left hover:bg-sand/50 transition-colors flex items-center gap-3 ${
                      locale === lang.code ? 'bg-teal/10 text-teal font-semibold' : 'text-navy'
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA Button */}
          <div className="flex-shrink-0">
            <a 
              href="#contact" 
              className="btn-primary focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2"
            >
              {t('cta')}
            </a>
          </div>
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
    </header>
  );
}
