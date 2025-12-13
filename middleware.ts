import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales } from './i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always', // Always show locale in URL to avoid redirect loops
  localeDetection: false // Disable browser language detection - always start with English
});

// Generate nonce for CSP (in production, use crypto.randomUUID())
function generateNonce(): string {
  return Buffer.from(crypto.randomUUID()).toString('base64');
}

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  const nonce = generateNonce();

  // === CORE SECURITY HEADERS ===
  
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY');
  
  // XSS Protection (legacy browsers)
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Control referrer information
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Disable dangerous browser features
  response.headers.set('Permissions-Policy', 
    'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=(), bluetooth=(), magnetometer=(), gyroscope=(), accelerometer=()'
  );
  
  // === HTTPS ENFORCEMENT ===
  
  // HTTP Strict Transport Security (2 years, include subdomains, preload)
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  
  // === CROSS-ORIGIN POLICIES ===
  
  // Isolate browsing context
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  
  // Restrict resource loading
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  
  // Allow credentialless cross-origin requests (for fonts, images)
  response.headers.set('Cross-Origin-Embedder-Policy', 'credentialless');
  
  // === CONTENT SECURITY POLICY ===
  
  const isDev = process.env.NODE_ENV === 'development';
  
  // Build CSP directives
  const cspDirectives = [
    // Default: only allow same-origin
    "default-src 'self'",
    
    // Scripts: self + inline (needed for Next.js hydration)
    isDev 
      ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'" 
      : `script-src 'self' 'unsafe-inline'`, // Remove unsafe-eval in production
    
    // Styles: self + inline (needed for CSS-in-JS and Tailwind)
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    
    // Fonts: Google Fonts
    "font-src 'self' https://fonts.gstatic.com data:",
    
    // Images: self + data URIs + HTTPS sources
    "img-src 'self' data: blob: https://images.unsplash.com",
    
    // API connections
    "connect-src 'self' https://script.google.com https://script.googleusercontent.com",
    
    // Prevent embedding in frames
    "frame-ancestors 'none'",
    
    // Restrict base URI
    "base-uri 'self'",
    
    // Restrict form submissions
    "form-action 'self'",
    
    // Disallow object/embed
    "object-src 'none'",
    
    // Upgrade insecure requests
    "upgrade-insecure-requests",
    
    // Block mixed content
    "block-all-mixed-content",
    
    // Web workers
    "worker-src 'self' blob:",
    
    // Media sources
    "media-src 'self'",
    
    // Manifest
    "manifest-src 'self'",
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', cspDirectives);
  
  // === ADDITIONAL SECURITY ===
  
  // Prevent DNS prefetch abuse
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  
  // Remove server identification
  response.headers.delete('X-Powered-By');
  response.headers.delete('Server');

  return response;
}

export const config = {
  matcher: ['/', '/(en|he|es|fr|zh|ar)/:path*']
};
