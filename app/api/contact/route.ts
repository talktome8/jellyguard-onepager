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
        { success: true, message: 'Contact form submitted successfully' },
        { status: 200 }
      );
    }

    // In a production environment, you would:
    // 1. Send an email notification
    // 2. Store in a database
    // 3. Integrate with a CRM
    // 4. Send confirmation email to the user
    
    // For now, we'll just log it and return success
    console.log('Contact form submission:', {
      ...validatedData,
      honeypot: undefined, // Remove honeypot from logs
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(
      { success: true, message: 'Contact form submitted successfully' },
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
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
