import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  organization: z.string().min(1, 'Organization is required'),
  role: z.string().min(1, 'Role is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  region: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().optional(), // Spam honeypot field
});

// Simple in-memory rate limiting (token bucket)
const rateLimitMap = new Map<string, { tokens: number; lastRefill: number }>();
const MAX_REQUESTS = 5; // 5 requests
const REFILL_INTERVAL = 60 * 1000; // per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = rateLimitMap.get(ip) || { tokens: MAX_REQUESTS, lastRefill: now };

  // Refill tokens
  const timePassed = now - bucket.lastRefill;
  if (timePassed > REFILL_INTERVAL) {
    bucket.tokens = MAX_REQUESTS;
    bucket.lastRefill = now;
  }

  if (bucket.tokens > 0) {
    bucket.tokens--;
    rateLimitMap.set(ip, bucket);
    return true;
  }

  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    
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

    if (!gasResponse.ok) {
      console.error('Google Apps Script error:', gasResponse.status, gasResponse.statusText);
      return NextResponse.json(
        { success: false, message: 'We could not send your message. Please try again.' },
        { status: 500 }
      );
    }

    const gasResult = await gasResponse.json();
    
    // Log successful submission (without sensitive data)
    console.log('Contact form submitted successfully:', {
      email: validatedData.email,
      organization: validatedData.organization,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: 'Thanks - we will get back to you shortly.' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
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
