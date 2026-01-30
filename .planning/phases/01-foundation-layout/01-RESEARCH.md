# Phase 1: Foundation & Layout - Research

**Researched:** 2026-01-30
**Domain:** Next.js 16 App Router site shell with i18n routing, dark theme, Vercel deployment
**Confidence:** HIGH

## Summary

Phase 1 transforms the existing v0 SaaS template (single-page, English-only, zinc-themed) into a bilingual multi-page site shell with dark blue theme, deployed on Vercel. The three critical workstreams are: (1) next-intl i18n routing with `[locale]` segment, (2) dark blue theme customization of the existing OKLCH CSS variables, and (3) adapting the existing navbar/hero/footer components to accept translated content.

The two flagged concerns from project research are now resolved:
- **Tailwind v4 + shadcn/ui:** Fully compatible. The existing template already uses Tailwind v4 with `@theme inline` and OKLCH colors. shadcn/ui has full v4 support. No action needed.
- **next-intl v4 API:** Verified via official docs. The API uses `defineRouting`, `createNavigation`, `getRequestConfig`, and notably in Next.js 16, the file is called `proxy.ts` (not `middleware.ts`).

**Primary recommendation:** Use next-intl for i18n (not hand-rolled dictionaries as the project-level research suggested). For a 2-locale site the overhead is minimal, and it provides locale-aware navigation helpers, middleware/proxy-based redirects, and type-safe translations that prevent bugs.

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| Next.js | 16.0.10 | Framework | Installed |
| React | 19.2.0 | UI | Installed |
| Tailwind CSS | 4.1.9 | Styling | Installed |
| Framer Motion | 12.24.5 | Animations | Installed |
| shadcn/ui | Various Radix | Component primitives | Installed |
| next-themes | 0.4.6 | Dark mode | Installed |
| Lucide React | 0.454.0 | Icons | Installed |

### To Add for Phase 1
| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| next-intl | ^4.1 | i18n routing + translations | De-facto Next.js App Router i18n. Provides proxy-based locale detection, `[locale]` routing, `useTranslations`, navigation helpers. |
| sharp | ^0.33 | Image optimization engine | Required for `next/image` blur placeholders and local builds. Vercel provides it automatically but explicit install ensures CI works. |

### Alternatives Considered
| Instead of | Could Use | Why Not |
|------------|-----------|---------|
| next-intl | Hand-rolled JSON dictionaries | Loses locale-aware `<Link>`, middleware redirects, type-safe keys, `generateMetadata` integration. The overhead of next-intl is ~15KB, worth it. |
| next-intl | react-intl | No Next.js routing integration, no middleware, manual App Router plumbing. |

**Installation:**
```bash
pnpm add next-intl sharp
```

## Architecture Patterns

### Recommended Project Structure
```
app/
  layout.tsx                    # Bare root layout (just <html> passthrough, no locale)
  page.tsx                      # Redirect "/" to "/de" (or detect via proxy)
  [locale]/
    layout.tsx                  # Locale layout: fonts, navbar, footer, NextIntlClientProvider
    page.tsx                    # Landing page (hero + CTA)
    not-found.tsx
components/
  ui/                           # shadcn/ui primitives (keep as-is from template)
  shared/
    navbar.tsx                  # Responsive nav + language switcher
    footer.tsx                  # Project info, HTL logo, links
    language-switcher.tsx       # DE/EN toggle preserving current path
    section-wrapper.tsx         # Consistent section spacing + fade animation
i18n/
  routing.ts                    # defineRouting({ locales: ['de', 'en'], defaultLocale: 'de' })
  request.ts                    # getRequestConfig with locale validation
  navigation.ts                 # createNavigation(routing) -> Link, usePathname, etc.
messages/
  de.json                       # German translations
  en.json                       # English translations
proxy.ts                        # next-intl middleware (Next.js 16 uses proxy.ts, NOT middleware.ts)
public/
  images/                       # Organized screenshot/diagram assets
```

### Pattern 1: next-intl Setup for Next.js 16

**Critical:** Next.js 16 renamed `middleware.ts` to `proxy.ts`. The next-intl middleware goes in `proxy.ts`.

**i18n/routing.ts:**
```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de', 'en'],
  defaultLocale: 'de'
});
```

**proxy.ts:**
```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
```

**i18n/request.ts:**
```typescript
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
```

**i18n/navigation.ts:**
```typescript
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

**next.config.mjs:**
```javascript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default withNextIntl(nextConfig);
```

**Confidence:** HIGH (verified from official next-intl docs, Jan 2026)

### Pattern 2: Locale Layout with Static Rendering

```typescript
// app/[locale]/layout.tsx
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className={`${fontVariables} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <div className="noise-overlay" aria-hidden="true" />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Key:** Call `setRequestLocale(locale)` in every layout and page for static rendering.

### Pattern 3: Language Switcher Using next-intl Navigation

```typescript
"use client"
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const otherLocale = locale === 'de' ? 'en' : 'de';

  return (
    <button onClick={() => router.replace(pathname, { locale: otherLocale })}>
      {otherLocale.toUpperCase()}
    </button>
  );
}
```

### Pattern 4: Dark Blue Theme (Replacing Zinc)

The existing template uses OKLCH colors in `globals.css`. To shift from zinc/gray to dark blue, modify the CSS variables. The `@theme inline` block and `.dark` class are already set up correctly for Tailwind v4 + shadcn/ui.

**Key color changes (dark mode only, since site is always dark):**
```css
.dark {
  /* Replace zinc neutrals with dark blue tones */
  --background: oklch(0.13 0.02 260);       /* Deep navy instead of zinc-950 */
  --foreground: oklch(0.95 0.01 260);       /* Slightly blue-tinted white */
  --card: oklch(0.16 0.02 260);             /* Slightly lighter navy */
  --secondary: oklch(0.22 0.03 260);        /* Blue-tinted secondary */
  --muted: oklch(0.22 0.02 260);
  --accent: oklch(0.25 0.04 260);           /* Accent with blue shift */
  --border: oklch(0.25 0.03 260);           /* Blue-tinted borders */
  /* Keep primary white for contrast */
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.13 0.02 260);
}
```

**Approach:** Only modify the CSS variables. Do NOT change any component code or Tailwind classes. The entire shadcn/ui system picks up the new colors automatically through the variable system.

**Confidence:** HIGH (OKLCH color system is already in place, just changing hue values)

### Anti-Patterns to Avoid

- **Don't duplicate route files per locale.** Use single `[locale]` segment with dictionary-driven content.
- **Don't wrap everything in `"use client"`.** Only navbar (interactive), language switcher (usePathname), and animation wrappers need client directive.
- **Don't use `<a href>` for navigation.** Use the next-intl `Link` from `@/i18n/navigation` which is locale-aware.
- **Don't hardcode locale in URLs.** Always use `Link` or `router.push` from next-intl navigation helpers.
- **Don't remove `typescript.ignoreBuildErrors` yet.** Fix it in a later phase when all pages exist. Removing it now blocks iteration on Phase 1.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Locale detection + redirects | Custom proxy.ts with Accept-Language parsing | next-intl middleware | Handles edge cases (cookie persistence, prefix stripping, domain routing) |
| Locale-aware `<Link>` | Custom Link wrapper that prepends locale | `createNavigation(routing).Link` | Handles locale switching, pathname resolution, active state |
| Translation loading | Custom `getDictionary()` with dynamic imports | next-intl `getMessages()` + `useTranslations()` | Type safety, namespace splitting, ICU format support |
| Dark mode toggle | Custom class toggling | next-themes (already installed) | Handles SSR flash, localStorage persistence, system preference |
| Responsive mobile menu | Custom state management | Sheet component from shadcn/ui | Accessible, animated, handles focus trapping |

## Common Pitfalls

### Pitfall 1: proxy.ts vs middleware.ts (Next.js 16)
**What goes wrong:** Using `middleware.ts` filename which was renamed to `proxy.ts` in Next.js 16. The proxy silently does not run.
**Why it happens:** Every tutorial and Stack Overflow answer uses `middleware.ts`.
**How to avoid:** File MUST be named `proxy.ts` at the project root.
**Warning signs:** Locale detection not working, root `/` not redirecting, no locale prefix in URL.
**Confidence:** HIGH (stated in next-intl official docs: "proxy.ts was called middleware.ts up until Next.js 16")

### Pitfall 2: Missing setRequestLocale for Static Rendering
**What goes wrong:** Pages build as dynamic instead of static. Build output shows lambda symbols instead of static pages.
**Why it happens:** next-intl opts into dynamic rendering by default when `useTranslations` is used in Server Components.
**How to avoid:** Call `setRequestLocale(locale)` at the top of every page and layout that uses next-intl.
**Warning signs:** `next build` output shows dynamic routes where static is expected. Slow response times on Vercel.
**Confidence:** HIGH (documented in next-intl official setup guide)

### Pitfall 3: params is a Promise in Next.js 16
**What goes wrong:** Destructuring `params` synchronously causes type errors or runtime issues.
**Why it happens:** Next.js 15+ changed `params` to be async (Promise-based).
**How to avoid:** Always `const { locale } = await params` in async server components.
**Warning signs:** TypeScript error about Promise type, runtime "Cannot read property of undefined".
**Confidence:** HIGH (visible in existing template layout.tsx pattern)

### Pitfall 4: Dark Blue Theme Too Subtle or Too Saturated
**What goes wrong:** OKLCH chroma values too high make the site look garish. Too low and it still looks gray/zinc.
**Why it happens:** OKLCH chroma of 0.02-0.04 is subtle. Developers overshoot to 0.1+ which looks neon.
**How to avoid:** Start with chroma 0.02-0.03 at hue 260 (blue). Test on multiple monitors. Keep the muted, professional SaaS aesthetic.
**Warning signs:** Blue tint visible in text areas, borders looking colored instead of neutral-blue.

### Pitfall 5: Windows Case Sensitivity on Vercel Deploy
**What goes wrong:** Import `from '@/Components/Navbar'` works on Windows but fails on Linux (Vercel).
**Why it happens:** Windows filesystem is case-insensitive, Linux is case-sensitive.
**How to avoid:** Use kebab-case for all files and folders. Match import casing exactly.
**Warning signs:** Build passes locally, fails on Vercel with "Module not found".

## Code Examples

### Complete Page with next-intl
```typescript
// app/[locale]/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Hero } from '@/components/pages/home/hero';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Hero />;
}
```

### Hero Component Using Translations
```typescript
"use client"
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20 pointer-events-none" />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 font-display">
            {t('title')}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            {t('subtitle')}
          </p>
          <Button size="lg" className="shimmer-btn rounded-full px-8 h-12">
            {t('cta')}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
```

### Translation File Structure
```json
// messages/de.json
{
  "home": {
    "hero": {
      "title": "KI-gestuetzte Webshop-Verwaltung",
      "subtitle": "Vollautonomer Support-Agent und automatisierte Buchhaltung fuer Online-Shops",
      "cta": "Projekt entdecken"
    }
  },
  "nav": {
    "home": "Start",
    "technology": "Technik",
    "results": "Ergebnisse",
    "about": "Ueber mich"
  },
  "footer": {
    "project": "ShopControl AI",
    "school": "HTL Klagenfurt",
    "copyright": "Lucas Nessel"
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `middleware.ts` | `proxy.ts` | Next.js 16 | File must be renamed |
| `tailwind.config.js` | CSS `@theme inline` | Tailwind v4 | Already done in template |
| HSL color variables | OKLCH color variables | shadcn/ui + Tailwind v4 | Already done in template |
| `forwardRef` in components | Direct ref prop | React 19 | shadcn/ui already updated |
| `next-intl` v3 setup | v4 with `defineRouting` + `createNavigation` | next-intl v4 | Use new API |

## Open Questions

1. **proxy.ts exact behavior in Next.js 16**
   - What we know: next-intl docs state proxy.ts replaced middleware.ts
   - What's unclear: Whether any config changes are needed beyond renaming
   - Recommendation: Test early; if proxy.ts doesn't work, fall back to middleware.ts and check Next.js 16 release notes
   - Confidence: MEDIUM (single source: next-intl docs)

2. **next-intl plugin compatibility with Next.js 16**
   - What we know: `createNextIntlPlugin` wraps next.config
   - What's unclear: Whether v4.1 has been tested against Next.js 16.0.10 specifically
   - Recommendation: Install and test immediately; if incompatible, fall back to hand-rolled dictionary approach from ARCHITECTURE.md
   - Confidence: MEDIUM

## Sources

### Primary (HIGH confidence)
- [next-intl official docs: App Router setup with i18n routing](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing) - Complete setup guide fetched 2026-01-30
- [shadcn/ui Tailwind v4 page](https://ui.shadcn.com/docs/tailwind-v4) - Confirmed full v4 compatibility
- Existing template codebase analysis (`Web design/` directory) - globals.css, layout.tsx, navbar.tsx, hero.tsx, footer.tsx

### Secondary (MEDIUM confidence)
- [next-intl routing configuration](https://next-intl.dev/docs/routing/configuration) - WebSearch result, consistent with fetched docs
- [shadcn/ui + Tailwind v4 discussion](https://github.com/shadcn-ui/ui/discussions/2996) - Community confirmation of compatibility

### Tertiary (LOW confidence)
- proxy.ts vs middleware.ts rename claim - Only source is next-intl docs mentioning it in passing. Needs validation during implementation.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Template already has everything except next-intl
- Architecture: HIGH - next-intl setup verified from official docs, file structure follows established patterns
- Pitfalls: HIGH - proxy.ts rename is the key risk, well-documented
- Theme customization: HIGH - OKLCH variables already in place, just need hue shift

**Research date:** 2026-01-30
**Valid until:** 2026-03-01 (stable stack, unlikely to change)
