# Complete File Tree

```
jellyguard-onepager/
│
├── .gitignore
├── .env.example
├── package.json
├── tsconfig.json
├── next.config.js
├── postcss.config.js
├── tailwind.config.ts
├── README.md
├── SETUP_GUIDE.md
├── PROJECT_STRUCTURE.md
│
├── i18n.ts
├── middleware.ts
│
├── app/
│   ├── (site)/
│   │   └── [locale]/
│   │       ├── components/
│   │       │   ├── Header.tsx
│   │       │   ├── JellyScroll.tsx
│   │       │   └── ContactForm.tsx
│   │       │
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
│   │       │
│   │       ├── layout.tsx
│   │       └── page.tsx
│   │
│   └── api/
│       └── contact/
│           └── route.ts
│
├── locales/
│   ├── en.json
│   └── he.json
│
├── public/
│   ├── images/
│   │   └── .gitkeep
│   └── icons/
│       └── .gitkeep
│
└── styles/
    ├── globals.css
    └── theme.css
```

## File Count Summary

**Total Files**: 36
- Configuration: 8 files
- Documentation: 3 files
- TypeScript/TSX: 18 files
- JSON: 2 files
- CSS: 2 files
- Placeholder: 2 files
- Root config: 1 file

## Key Directories

### `/app/`
Next.js 14 App Router structure with:
- Route groups: `(site)`
- Dynamic segments: `[locale]`
- API routes: `api/contact`

### `/locales/`
i18n translation files in JSON format

### `/public/`
Static assets (images, icons, fonts if needed)

### `/styles/`
Global CSS and theme utilities

## File Purposes

### Root Level
- `.gitignore` - Git ignore patterns
- `.env.example` - Environment variables template
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `next.config.js` - Next.js configuration
- `postcss.config.js` - PostCSS configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `i18n.ts` - Internationalization configuration
- `middleware.ts` - Next.js middleware for routing
- `README.md` - Project overview
- `SETUP_GUIDE.md` - Detailed setup instructions
- `PROJECT_STRUCTURE.md` - Architecture documentation

### Components (3 files)
- `Header.tsx` - Navigation header with language switcher
- `JellyScroll.tsx` - Animated background with jellyfish
- `ContactForm.tsx` - Contact form with validation

### Sections (11 files)
All section components for the one-pager:
1. Hero - Main landing section
2. Opening - Problem statement
3. Promise - Solution promise
4. GlobalImpact - Impact breakdown
5. FourSteps - Process steps
6. Differentiators - Key benefits
7. WhoWeServe - Target audience
8. SiteRequirements - Installation needs
9. CommercialModel - Business model
10. SafetyEcology - Environmental focus
11. FinalCTA - Contact section

### API (1 file)
- `contact/route.ts` - Form submission endpoint

### Layouts (2 files)
- `layout.tsx` - Root layout with fonts and i18n
- `page.tsx` - Main page composition

### Locales (2 files)
- `en.json` - English translations
- `he.json` - Hebrew translations

### Styles (2 files)
- `globals.css` - Base styles and Tailwind
- `theme.css` - Custom utility classes
```
