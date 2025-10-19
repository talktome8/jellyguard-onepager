# PROJECT STRUCTURE

jellyguard-onepager/
│
├── app/
│   ├── (site)/
│   │   └── [locale]/
│   │       ├── components/
│   │       │   ├── Header.tsx              # Sticky header with language toggle
│   │       │   ├── JellyScroll.tsx         # Animated jellyfish background
│   │       │   └── ContactForm.tsx         # Contact form with validation
│   │       │
│   │       ├── sections/
│   │       │   ├── Hero.tsx                # Hero section
│   │       │   ├── Opening.tsx             # Challenge statement
│   │       │   ├── Promise.tsx             # Value proposition
│   │       │   ├── GlobalImpact.tsx        # Global impact (2 columns)
│   │       │   ├── FourSteps.tsx           # Four steps process
│   │       │   ├── Differentiators.tsx     # Why JellyGuard (4 items)
│   │       │   ├── WhoWeServe.tsx          # Target audiences
│   │       │   ├── SiteRequirements.tsx    # Minimal requirements
│   │       │   ├── CommercialModel.tsx     # Business model
│   │       │   ├── SafetyEcology.tsx       # Safety & ecology
│   │       │   └── FinalCTA.tsx            # Final CTA with contact form
│   │       │
│   │       ├── layout.tsx                  # Locale-specific layout
│   │       └── page.tsx                    # Main page assembly
│   │
│   └── api/
│       └── contact/
│           └── route.ts                    # Contact form API endpoint
│
├── locales/
│   ├── en.json                             # English translations
│   └── he.json                             # Hebrew translations
│
├── public/
│   ├── images/
│   │   └── .gitkeep                        # Placeholder for images
│   └── icons/
│       └── .gitkeep                        # Placeholder for icons
│
├── styles/
│   ├── globals.css                         # Global styles & Tailwind
│   └── theme.css                           # Theme utilities & custom classes
│
├── .env.example                            # Environment variables template
├── .gitignore                              # Git ignore rules
├── i18n.ts                                 # i18n configuration
├── middleware.ts                           # Next.js middleware for locale routing
├── next.config.js                          # Next.js configuration
├── package.json                            # Dependencies and scripts
├── postcss.config.js                       # PostCSS configuration
├── README.md                               # Project documentation
├── tailwind.config.ts                      # Tailwind CSS configuration
└── tsconfig.json                           # TypeScript configuration

## Key Files Description

### Configuration
- **i18n.ts**: Configures supported locales (en, he) and message loading
- **middleware.ts**: Handles locale detection and routing
- **next.config.js**: Next.js config with next-intl plugin
- **tailwind.config.ts**: Custom colors (navy, teal, sand, ink) and fonts
- **tsconfig.json**: TypeScript compiler options

### Layouts & Pages
- **app/(site)/[locale]/layout.tsx**: Root layout with font loading and dir attribute
- **app/(site)/[locale]/page.tsx**: Main page that assembles all sections

### Components
- **Header.tsx**: Navigation with logo, language switcher, CTA
- **JellyScroll.tsx**: SVG-based jellyfish animation with scroll interaction
- **ContactForm.tsx**: Form with validation and API integration

### Sections
All section components are server components that use next-intl for translations.
They follow consistent design patterns with cards, spacing, and color schemes.

### API
- **app/api/contact/route.ts**: POST endpoint for contact form with Zod validation

### Locales
JSON files containing all translatable content organized by section keys.

### Styles
- **globals.css**: Tailwind directives, CSS variables, base styles
- **theme.css**: Reusable utility classes (btn-primary, card, section-container)
