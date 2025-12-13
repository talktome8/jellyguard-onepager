'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_CONSENT_KEY = 'jellyguard-cookie-consent';
const COOKIE_PREFERENCES_KEY = 'jellyguard-cookie-preferences';

export default function CookieConsent() {
  const t = useTranslations('cookies');
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setShowBanner(true);
    } else {
      // Load saved preferences
      const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPrefs) {
        setPreferences(JSON.parse(savedPrefs));
      }
    }
  }, []);

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(allAccepted);
  };

  const acceptNecessary = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    saveConsent(necessaryOnly);
  };

  const savePreferences = () => {
    saveConsent(preferences);
    setShowSettings(false);
  };

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);

    // Set actual cookies based on preferences
    setCookie('necessary_consent', 'true', 365);
    
    if (prefs.analytics) {
      setCookie('analytics_consent', 'true', 365);
      // Initialize analytics here if needed
    } else {
      deleteCookie('analytics_consent');
    }
    
    if (prefs.marketing) {
      setCookie('marketing_consent', 'true', 365);
      // Initialize marketing cookies here if needed
    } else {
      deleteCookie('marketing_consent');
    }
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
        <div className="max-w-6xl mx-auto">
          {!showSettings ? (
            // Main Banner
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1 text-sm text-gray-700">
                <p className="font-medium text-gray-900 mb-1">{t('title')}</p>
                <p>{t('description')}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {t('settings')}
                </button>
                <button
                  onClick={acceptNecessary}
                  className="px-4 py-2 text-sm font-medium bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                >
                  {t('rejectAll')}
                </button>
                <button
                  onClick={acceptAll}
                  className="px-6 py-2 text-sm font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
                >
                  {t('acceptAll')}
                </button>
              </div>
            </div>
          ) : (
            // Settings Panel
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{t('settingsTitle')}</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid gap-3">
                {/* Necessary Cookies */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{t('necessary.title')}</p>
                    <p className="text-sm text-gray-600">{t('necessary.description')}</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="w-5 h-5 accent-teal-600 cursor-not-allowed"
                    />
                    <span className="ml-2 text-xs text-gray-500">{t('required')}</span>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{t('analytics.title')}</p>
                    <p className="text-sm text-gray-600">{t('analytics.description')}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{t('marketing.title')}</p>
                    <p className="text-sm text-gray-600">{t('marketing.description')}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={acceptNecessary}
                  className="px-4 py-2 text-sm font-medium bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                >
                  {t('rejectAll')}
                </button>
                <button
                  onClick={savePreferences}
                  className="px-6 py-2 text-sm font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
                >
                  {t('savePreferences')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Cookie utility functions
function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax;Secure`;
}

// Export utility to check consent status
export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  const prefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
  if (!prefs) return false;
  return JSON.parse(prefs).analytics === true;
}

export function hasMarketingConsent(): boolean {
  if (typeof window === 'undefined') return false;
  const prefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
  if (!prefs) return false;
  return JSON.parse(prefs).marketing === true;
}
