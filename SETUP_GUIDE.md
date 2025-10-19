# JellyGuard One-Pager - Setup & Deployment Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install:
- next ^14.2.0
- next-intl ^3.11.0
- react ^18.3.0
- react-dom ^18.3.0
- zod ^3.22.4
- TypeScript and related dev dependencies
- Tailwind CSS and PostCSS

### 2. Run Development Server

```bash
npm run dev
```

Visit:
- English: http://localhost:3000/en
- Hebrew: http://localhost:3000/he

The root path (/) will redirect to /en by default.

### 3. Build for Production

```bash
npm run build
```

This creates an optimized production build in `.next/`

### 4. Start Production Server

```bash
npm start
```

## Project Configuration

### Fonts

The project uses Google Fonts:
- **Inter** for English (weights: 400, 500, 600, 700)
- **Heebo** for Hebrew (weights: 400, 500, 600, 700)

Fonts are loaded via `next/font/google` in `layout.tsx` for optimal performance.

### Color Scheme

Custom colors defined in `tailwind.config.ts`:
- **navy**: #0b1b2b (primary dark)
- **teal**: #1aa3a3 (accent/CTA)
- **sand**: #edf5f7 (background)
- **ink**: #0f172a (text)

### Internationalization

Locales are configured in `i18n.ts`:
- Supported: `en`, `he`
- Default: `en`
- Locale prefix: always (e.g., /en/*, /he/*)

Content files:
- `locales/en.json` - English translations
- `locales/he.json` - Hebrew translations

### RTL Support

Hebrew pages automatically apply:
- `dir="rtl"` on `<html>` element
- Heebo font family
- Mirrored layouts via Flexbox/Grid

## Customization

### Adding/Editing Content

Edit the JSON files in `/locales/`:

```json
// locales/en.json
{
  "hero": {
    "title": "Your Custom Title",
    "tagline": "Your custom tagline"
  }
}
```

### Modifying Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  navy: '#0b1b2b',
  teal: '#1aa3a3',
  // Add your custom colors
}
```

### Adjusting Animation

Edit `app/(site)/[locale]/components/JellyScroll.tsx`:
- Change jellyfish count: modify array length in `initialJellyfishes`
- Adjust speed: modify `speed` range in initialization
- Change skim zone: modify `skimThreshold` value

### Customizing Form Fields

Edit `app/(site)/[locale]/components/ContactForm.tsx` and update:
1. Form state in `formData`
2. Validation schema in `app/api/contact/route.ts`
3. Labels in locale JSON files

## API Integration

### Contact Form Endpoint

**Endpoint**: `POST /api/contact`

**Request Body**:
```json
{
  "name": "John Doe",
  "organization": "Acme Corp",
  "role": "CTO",
  "email": "john@example.com",
  "phone": "+1234567890",
  "region": "North America",
  "message": "Interested in learning more..."
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Contact form submitted successfully"
}
```

**Error Response** (400):
```json
{
  "success": false,
  "errors": [/* Zod validation errors */]
}
```

### Extending the API

To add email functionality:

1. Install nodemailer: `npm install nodemailer`
2. Add SMTP credentials to `.env.local`
3. Update `app/api/contact/route.ts`:

```typescript
import nodemailer from 'nodemailer';

// Configure transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// In POST handler, after validation:
await transporter.sendMail({
  from: process.env.SMTP_USER,
  to: 'contact@jellyguard.com',
  subject: 'New Contact Form Submission',
  html: `<p>Name: ${validatedData.name}</p>...`,
});
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Configure build settings:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Add environment variables (if any)
5. Deploy

### Other Platforms

**Build command**: `npm run build`  
**Start command**: `npm start`  
**Node version**: 18+

Platforms supported:
- Netlify
- AWS Amplify
- Railway
- Render
- DigitalOcean App Platform

### Environment Variables

Create `.env.local` for local development:

```bash
# Example variables
NEXT_PUBLIC_SITE_URL=https://jellyguard.com
CONTACT_EMAIL=contact@jellyguard.com
```

Add these to your hosting platform's environment variables.

## Performance Optimization

### Images

1. Place images in `/public/images/`
2. Use Next.js Image component:

```tsx
import Image from 'next/image';

<Image
  src="/images/hero.webp"
  alt="JellyGuard"
  width={1200}
  height={600}
  priority
/>
```

3. Convert images to WebP format for optimal compression

### Fonts

Fonts are already optimized using `next/font/google` with:
- Automatic font optimization
- No layout shift
- Preloaded critical fonts

### Code Splitting

Next.js automatically code-splits by route. All sections are server components except:
- `Header` (uses client-side navigation)
- `JellyScroll` (uses browser APIs)
- `ContactForm` (uses React state)

## Testing

### Manual Testing Checklist

- [ ] English version loads correctly
- [ ] Hebrew version loads correctly and displays RTL
- [ ] Language toggle switches between locales
- [ ] All sections display properly
- [ ] Jellyfish animation runs smoothly
- [ ] Reduced motion preference is respected
- [ ] Contact form validation works
- [ ] Contact form submission succeeds
- [ ] Form displays success/error messages
- [ ] Mobile responsive on all screen sizes
- [ ] Keyboard navigation works
- [ ] Focus styles are visible
- [ ] Color contrast is sufficient

### Browser Testing

Test on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Troubleshooting

### Build Errors

**Error**: Module not found
- **Solution**: Run `npm install` to ensure all dependencies are installed

**Error**: TypeScript compilation errors
- **Solution**: Check `tsconfig.json` and ensure all required types are installed

### Runtime Errors

**Error**: 404 on locale routes
- **Solution**: Ensure middleware is properly configured and locales are defined in `i18n.ts`

**Error**: Translations not loading
- **Solution**: Check JSON files for syntax errors and verify import paths

**Error**: Styles not applying
- **Solution**: Ensure Tailwind is properly configured and CSS files are imported in layout

### Animation Issues

**Issue**: Jellyfish animation is choppy
- **Solution**: Reduce number of jellyfish sprites or simplify SVG paths

**Issue**: Animation doesn't stop with reduced motion
- **Solution**: Check that `prefers-reduced-motion` media query is working

## Maintenance

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all dependencies
npm update

# Update Next.js specifically
npm install next@latest react@latest react-dom@latest
```

### Adding New Sections

1. Create component in `app/(site)/[locale]/sections/`
2. Add translations to locale JSON files
3. Import and add to `page.tsx`
4. Update README with section description

### Adding New Locales

1. Add locale code to `i18n.ts`:
```typescript
export const locales = ['en', 'he', 'es'] as const;
```

2. Create locale file: `locales/es.json`

3. Update middleware matcher in `middleware.ts`:
```typescript
matcher: ['/', '/(he|en|es)/:path*']
```

4. Translate all content in new JSON file

## Support & Contact

For technical issues or questions about this implementation:
- Review the code comments in each file
- Check the README.md for architecture overview
- Consult Next.js documentation: https://nextjs.org/docs
- Consult next-intl documentation: https://next-intl-docs.vercel.app/

## License

© 2025 JellyGuard. All rights reserved.
