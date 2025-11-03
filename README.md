# JellyGuard One-Pager

A bilingual (English/Hebrew) marketing website for JellyGuard built with Next.js 14, React, TypeScript, Tailwind CSS, and next-intl.

## Features

- **Bilingual Support**: Full internationalization with English and Hebrew locales
- **RTL Support**: Complete right-to-left layout support for Hebrew
- **Cinematic Scroll Animation**: Jellyfish silhouettes float upward, background ambient jellyfish drift slowly, depth-feeling gradient transitions
- **Value-Focused Copy**: Emphasis on operational protection, cost savings, and environmental responsibility
- **Responsive Design**: Mobile-first approach with clean, modern aesthetics
- **Accessibility**: Keyboard navigation, reduced motion support, and WCAG compliance
- **Performance Optimized**: Next.js 14 with App Router, optimized images, GPU-accelerated animations

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl
- **Fonts**: Inter (English), Heebo (Hebrew)
- **Validation**: Zod

## Color Palette

- Navy: `#0b1b2b`
- Teal: `#1aa3a3`
- Sand: `#edf5f7`
- Ink: `#0f172a`

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development

The development server will start at `http://localhost:3000`

- English version: `http://localhost:3000/en`
- Hebrew version: `http://localhost:3000/he`

## Project Structure

```
jellyguard-onepager/
├── app/
│   ├── (site)/
│   │   └── [locale]/
│   │       ├── components/
│   │       │   ├── Header.tsx
│   │       │   ├── JellyScroll.tsx
│   │       │   └── ContactForm.tsx
│   │       ├── sections/
│   │       │   ├── Hero.tsx
│   │       │   ├── Opening.tsx
│   │       │   ├── Promise.tsx
│   │       │   ├── GlobalImpact.tsx
│   │       │   ├── FourSteps.tsx
│   │       │   ├── Differentiators.tsx
│   │       │   ├── WhoWeServe.tsx
│   │       │   ├── SiteRequirements.tsx
│   │       │   ├── CommercialModel.tsx
│   │       │   ├── SafetyEcology.tsx
│   │       │   └── FinalCTA.tsx
│   │       ├── layout.tsx
│   │       └── page.tsx
│   └── api/
│       └── contact/
│           └── route.ts
├── locales/
│   ├── en.json
│   └── he.json
├── public/
│   ├── images/
│   └── icons/
├── styles/
│   ├── globals.css
│   └── theme.css
├── i18n.ts
├── middleware.ts
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── postcss.config.js
└── package.json
```

## Sections

1. **Header**: Sticky navigation with logo, language toggle, and CTA button
2. **Hero**: Main value proposition with animated background
3. **Opening**: Challenge statement
4. **Promise**: Core value proposition
5. **Global Impact**: Two-column benefits breakdown
6. **Four Steps**: Process visualization (Sense → Lift → Skim → Process)
7. **Differentiators**: Four key advantages
8. **Who We Serve**: Target audiences
9. **Site Requirements**: Minimal deployment needs
10. **Commercial Model**: Business approach
11. **Safety & Ecology**: Environmental commitment
12. **Final CTA**: Contact form with validation

## Animation

The jellyfish animation system includes:
- **Active sprites**: Float upward at varying speeds as the user scrolls, get "skimmed" into a thin elliptical layer at the top
- **Ambient jellyfish**: 6-8 background silhouettes with slow vertical drift (20-35s cycles) using CSS keyframes
- **GPU-accelerated**: Uses only CSS transforms and opacity for 60fps performance
- **Accessible**: Respects `prefers-reduced-motion` settings with static fallback

## Contact Form API

The contact form endpoint (`/api/contact`) accepts POST requests with:

```json
{
  "name": "string (required)",
  "organization": "string (required)",
  "role": "string (required)",
  "email": "string (required, valid email)",
  "phone": "string (optional)",
  "region": "string (optional)",
  "message": "string (required, min 10 chars)"
}
```

## Internationalization

Content is stored in JSON files:
- `/locales/en.json` - English translations
- `/locales/he.json` - Hebrew translations

To add a new language:
1. Add locale code to `i18n.ts`
2. Create `/locales/{locale}.json`
3. Update middleware matcher

## Performance

Target metrics:
- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus visible styles
- Color contrast ratio > 4.5:1
- Reduced motion support

## License

© 2025 JellyGuard. All rights reserved.

## Support

For questions or support, please use the contact form on the website.
