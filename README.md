# jellyguard-onepager

Bilingual Next.js one-pager for JellyGuard. EN+HE with full RTL, jellyfish scroll overlay, Tailwind styling, next-intl, secure contact API.

## Tech Stack

- **Next.js 14** - App Router with TypeScript
- **Tailwind CSS** - Utility-first CSS framework
- **next-intl** - Internationalization for EN (English) and HE (Hebrew) with RTL support
- **ESLint** - Code linting

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

The app will automatically detect your browser's language preference and redirect to the appropriate locale:
- English: `http://localhost:3000/en`
- Hebrew (RTL): `http://localhost:3000/he`

### Building for Production

```bash
npm run build
```

### Running Production Build

```bash
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
.
├── app/
│   ├── [locale]/           # Locale-specific routes
│   │   ├── layout.tsx      # Layout with RTL support
│   │   └── page.tsx        # Home page
│   ├── globals.css         # Global styles
│   └── fonts/              # Local fonts
├── i18n/
│   └── request.ts          # i18n configuration
├── messages/
│   ├── en.json            # English translations
│   └── he.json            # Hebrew translations
├── middleware.ts          # Locale detection & routing
└── .github/
    └── workflows/
        └── ci.yml         # GitHub Actions CI
```

## Internationalization

The project uses `next-intl` for internationalization:

- Supported locales: English (en), Hebrew (he)
- Hebrew pages automatically use RTL layout
- Locale detection via browser settings or URL
- Translation files in `messages/` directory

## CI/CD

GitHub Actions workflow runs on every push to `main`:
- Installs dependencies
- Runs linter
- Builds the project

## License

MIT

