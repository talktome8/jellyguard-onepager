import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Heebo } from 'next/font/google';
import { locales } from '@/i18n';
import ScrollProgress from './components/ScrollProgress';
import ScrollJellyfish3D from './components/ScrollJellyfish3D';
import CookieConsent from './components/CookieConsent';
import '@/styles/globals.css';
import '@/styles/theme.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const heebo = Heebo({
  subsets: ['hebrew'],
  variable: '--font-heebo',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();
  const direction = locale === 'he' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} className={`${inter.variable} ${heebo.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>JellyGuard - Clean Water, Naturally</title>
        <meta name="description" content="Nature-inspired technology to protect marine intake systems from jellyfish blooms" />
        
        {/* Security meta tags - X-Frame-Options set via HTTP headers in middleware */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        
        {/* Preconnect to trusted origins only */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={locale === 'he' ? 'font-heebo' : 'font-inter'}>
        <NextIntlClientProvider messages={messages}>
          {/* Scroll progress bar */}
          <ScrollProgress />
          
          {/* Floating jellyfish - hidden on mobile for performance */}
          <ScrollJellyfish3D />
          
          {/* Page content */}
          {children}
          
          {/* Cookie consent banner */}
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
