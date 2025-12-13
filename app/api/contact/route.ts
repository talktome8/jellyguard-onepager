import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// === INPUT SANITIZATION ===

// Sanitize string input to prevent XSS and injection attacks
function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .slice(0, 5000); // Limit length
}

// Sanitize email specifically
function sanitizeEmail(email: string): string {
  return email
    .trim()
    .toLowerCase()
    .replace(/[<>"']/g, '') // Remove dangerous characters
    .slice(0, 254); // RFC 5321 max length
}

// === VALIDATION SCHEMA ===

const contactSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name too long')
    .transform(sanitizeString),
  organization: z.string()
    .min(1, 'Organization is required')
    .max(200, 'Organization name too long')
    .transform(sanitizeString),
  role: z.string()
    .min(1, 'Role is required')
    .max(100, 'Role too long')
    .transform(sanitizeString),
  email: z.string()
    .email('Invalid email address')
    .max(254, 'Email too long')
    .transform(sanitizeEmail),
  phone: z.string()
    .max(30, 'Phone too long')
    .optional()
    .transform((val) => val ? sanitizeString(val) : ''),
  region: z.string()
    .max(100, 'Region too long')
    .optional()
    .transform((val) => val ? sanitizeString(val) : ''),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message too long')
    .transform(sanitizeString),
  honeypot: z.string().optional(), // Spam honeypot field
});

// === RATE LIMITING ===

// Enhanced rate limiting with IP tracking and burst protection
const rateLimitMap = new Map<string, { tokens: number; lastRefill: number; blockedUntil?: number }>();
const MAX_REQUESTS = 5; // 5 requests
const REFILL_INTERVAL = 60 * 1000; // per minute
const BLOCK_DURATION = 15 * 60 * 1000; // 15 minutes block after abuse

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const bucket = rateLimitMap.get(ip) || { tokens: MAX_REQUESTS, lastRefill: now };

  // Check if IP is blocked
  if (bucket.blockedUntil && now < bucket.blockedUntil) {
    return { allowed: false, retryAfter: Math.ceil((bucket.blockedUntil - now) / 1000) };
  }

  // Refill tokens
  const timePassed = now - bucket.lastRefill;
  if (timePassed > REFILL_INTERVAL) {
    bucket.tokens = MAX_REQUESTS;
    bucket.lastRefill = now;
    delete bucket.blockedUntil; // Remove block after refill period
  }

  if (bucket.tokens > 0) {
    bucket.tokens--;
    rateLimitMap.set(ip, bucket);
    return { allowed: true };
  }

  // Block IP for repeated abuse
  bucket.blockedUntil = now + BLOCK_DURATION;
  rateLimitMap.set(ip, bucket);
  return { allowed: false, retryAfter: BLOCK_DURATION / 1000 };
}

// Clean up old entries periodically (prevent memory leak)
setInterval(() => {
  const now = Date.now();
  for (const [ip, bucket] of rateLimitMap.entries()) {
    if (now - bucket.lastRefill > REFILL_INTERVAL * 10) {
      rateLimitMap.delete(ip);
    }
  }
}, 60 * 1000); // Clean every minute

export async function POST(request: NextRequest) {
  try {
    // === SECURITY CHECKS ===
    
    // Verify Content-Type header (prevent CSRF with simple requests)
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { success: false, message: 'Invalid content type' },
        { status: 415 }
      );
    }
    
    // Check request origin (basic CSRF protection)
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    if (origin && host && !origin.includes(host.split(':')[0])) {
      // Log suspicious cross-origin request (without sensitive data)
      console.warn('Cross-origin request blocked:', { origin, host, timestamp: new Date().toISOString() });
      return NextResponse.json(
        { success: false, message: 'Invalid request origin' },
        { status: 403 }
      );
    }

    // Rate limiting with enhanced blocking
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      const response = NextResponse.json(
        { success: false, message: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
      if (rateLimit.retryAfter) {
        response.headers.set('Retry-After', String(rateLimit.retryAfter));
      }
      return response;
    }

    // Parse body with size limit check
    const bodyText = await request.text();
    if (bodyText.length > 50000) { // 50KB max
      return NextResponse.json(
        { success: false, message: 'Request too large' },
        { status: 413 }
      );
    }
    
    let body;
    try {
      body = JSON.parse(bodyText);
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON' },
        { status: 400 }
      );
    }
    
    // Log sanitized info only in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Received form submission from:', ip.substring(0, 10) + '***');
    }
    
    // Validate the request body
    const validatedData = contactSchema.parse(body);

    // Honeypot spam check - if honeypot field is filled, reject
    if (validatedData.honeypot && validatedData.honeypot.length > 0) {
      // Silent rejection for bots
      return NextResponse.json(
        { success: true, message: 'Thanks - we will get back to you shortly.' },
        { status: 200 }
      );
    }

    // Get Google Apps Script endpoint from environment variable
    const gasEndpoint = process.env.GAS_CONTACT_URL;
    if (!gasEndpoint) {
      console.error('GAS_CONTACT_URL not configured');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Collect metadata
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const referer = request.headers.get('referer') || '';
    const page = referer ? new URL(referer).pathname : 'unknown';

    // Prepare payload for Google Sheets (exclude honeypot)
    const payload = {
      name: validatedData.name,
      organization: validatedData.organization,
      role: validatedData.role,
      email: validatedData.email,
      phone: validatedData.phone || '',
      region: validatedData.region || '',
      message: validatedData.message,
      page,
      userAgent,
      ip,
    };

    // Forward to Google Apps Script
    const gasResponse = await fetch(gasEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('GAS Response Status:', gasResponse.status);
    console.log('GAS Response Headers:', Object.fromEntries(gasResponse.headers.entries()));
    
    const gasText = await gasResponse.text();
    console.log('GAS Response Text:', gasText);

    if (!gasResponse.ok) {
      console.error('Google Apps Script error:', gasResponse.status, gasResponse.statusText);
      return NextResponse.json(
        { success: false, message: 'We could not send your message. Please try again.' },
        { status: 500 }
      );
    }

    let gasResult;
    try {
      gasResult = JSON.parse(gasText);
    } catch (e) {
      console.error('Failed to parse GAS response as JSON:', gasText);
      return NextResponse.json(
        { success: false, message: 'Invalid response from backend.' },
        { status: 500 }
      );
    }
    
    // Log successful submission (minimal data, no PII)
    console.log('Contact form submitted successfully:', {
      timestamp: new Date().toISOString(),
      hasOrganization: !!validatedData.organization,
    });

    return NextResponse.json(
      { success: true, message: 'Thanks - we will get back to you shortly.' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log('Validation errors:', JSON.stringify(error.errors, null, 2));
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'We could not send your message. Please try again.' },
      { status: 500 }
    );
  }
}
