'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const t = useTranslations('header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'he' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20" dir={locale === 'he' ? 'rtl' : 'ltr'}>
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${locale}`} className="flex items-center group">
              <div className="text-2xl font-bold text-navy group-hover:text-teal transition-colors">
                JellyGuard
              </div>
            </Link>
          </div>

          {/* Language Toggle - center */}
          <div className="flex items-center">
            <button
              onClick={toggleLocale}
              className="px-4 py-2 text-sm font-semibold text-navy hover:text-teal transition-smooth rounded-lg hover:bg-sand/50 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2"
              aria-label={`Switch to ${locale === 'en' ? 'Hebrew' : 'English'}`}
            >
              {locale === 'en' ? 'עברית' : 'English'}
            </button>
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
    </header>
  );
}
