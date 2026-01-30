# Technology Stack

**Project:** Jugend Innovativ - ShopControl AI Showcase Website
**Researched:** 2026-01-30
**Mode:** Stack additions to existing Next.js 16 template

## Existing Stack (Already in package.json)

| Technology | Version | Status |
|------------|---------|--------|
| Next.js | 16.0.10 | Installed |
| React | 19.2.0 | Installed |
| Tailwind CSS | 4.1.9 | Installed |
| Framer Motion | 12.24.5 | Installed |
| shadcn/ui (Radix primitives) | Various | Installed |
| next-themes | 0.4.6 | Installed (dark mode ready) |
| Lenis | 1.3.17 | Installed (smooth scroll) |
| Lucide React | 0.454.0 | Installed (icons) |
| Vercel Analytics | 1.3.1 | Installed |

## Libraries to ADD

### 1. Internationalization: next-intl

| | |
|---|---|
| **Library** | `next-intl` |
| **Version** | `^4.1` (latest stable) |
| **Confidence** | HIGH |
| **Why this** | The de-facto i18n library for Next.js App Router. Supports server components, middleware-based locale detection, and message ICU formatting. Works seamlessly with Next.js 15/16 App Router routing. |
| **Why not alternatives** | `next-i18next` is Pages Router only, effectively deprecated for App Router. `react-intl` works but has no Next.js routing integration. Rolling your own is error-prone. |

**What it provides:**
- `[locale]` dynamic route segment for DE/EN
- Middleware for locale detection and redirects
- `useTranslations()` hook for client components
- Server component translation support
- Type-safe message keys (with TypeScript plugin)

**Configuration pattern:**
```
/messages/de.json   -- German translations
/messages/en.json   -- English translations
/app/[locale]/...   -- Locale-prefixed routes
/middleware.ts       -- Locale detection
/i18n/request.ts    -- next-intl config
```

### 2. Image Optimization: Next.js built-in `<Image>`

| | |
|---|---|
| **Library** | Built-in `next/image` (no install needed) |
| **Confidence** | HIGH |
| **Why this** | Next.js has best-in-class image optimization built in. On Vercel, it uses their edge image optimization automatically. Supports WebP/AVIF, lazy loading, blur placeholders, and responsive sizes. |
| **Action needed** | Remove `images: { unoptimized: true }` from `next.config.mjs`. This is currently DISABLING all image optimization. |

**For screenshots/diagrams specifically:**
- Use `<Image>` with `placeholder="blur"` for PNG screenshots
- Use `quality={85}` for screenshots (detail matters more than compression)
- Use `sizes` prop to avoid oversized images on mobile

### 3. Sharp (Image Processing Engine)

| | |
|---|---|
| **Library** | `sharp` |
| **Version** | `^0.33` |
| **Confidence** | HIGH |
| **Why this** | Next.js image optimization uses Sharp under the hood for local builds. On Vercel it is provided automatically, but installing it explicitly ensures `next build` works locally and in CI. Required for blur placeholder generation at build time. |

### 4. Speed Insights (Optional, Vercel)

| | |
|---|---|
| **Library** | `@vercel/speed-insights` |
| **Version** | `^0.1` |
| **Confidence** | MEDIUM |
| **Why this** | Already using `@vercel/analytics`. Speed Insights adds Core Web Vitals monitoring for free on Vercel. Trivial to add. Good for a competition project to show you care about performance. |

## Libraries to NOT Add

| Library | Why Not |
|---------|---------|
| `next-i18next` | Pages Router only. Dead end for App Router projects. |
| `react-intl` (standalone) | No Next.js routing integration. next-intl wraps the same ICU format with better DX. |
| `i18next` / `react-i18next` | Possible but requires manual App Router plumbing. next-intl does this out of the box. |
| `plaiceholder` | For blur placeholders. Unnecessary -- Next.js `<Image placeholder="blur">` with static imports handles this natively. |
| `next-seo` | Next.js 16 has built-in `metadata` export in App Router. No library needed. |
| `@next/font` | Merged into `next/font` in Next.js 13.2+. Already built in. |
| `tailwindcss-animate` | Already installed but NOTE: with Tailwind v4 + `tw-animate-css`, this may be redundant. The project already has `tw-animate-css` in devDependencies. Verify which one is actually used and remove the other. |
| `autoprefixer` | Listed in dependencies but Tailwind v4 with `@tailwindcss/postcss` handles prefixing. Can be removed. |

## Libraries Already Installed but Likely Unused

These are in package.json but seem irrelevant for a showcase website:

| Library | Verdict |
|---------|---------|
| `@nuxt/kit` | REMOVE. This is a Nuxt.js package, not Next.js. Likely added by mistake. |
| `@emotion/is-prop-valid` | Likely a Framer Motion peer dep. Keep. |
| `react-hook-form` + `@hookform/resolvers` + `zod` | Only needed if the site has forms (contact form?). Keep if yes, remove if no. |
| `recharts` | Only needed if rendering data charts on the site. Keep if showing analytics/data visualizations. |
| `react-resizable-panels` | Unlikely needed for a showcase. Remove unless used. |
| `input-otp` | OTP input component. Remove -- not needed for showcase. |
| `react-day-picker` + `date-fns` | Date picker. Remove unless needed. |
| `cmdk` | Command palette. Cool but probably unnecessary. Remove unless used. |

## Recommended next.config.mjs

```js
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // REMOVE typescript.ignoreBuildErrors before production
  images: {
    // REMOVE unoptimized: true -- this disables ALL optimization
    formats: ['image/avif', 'image/webp'],
  },
};

export default withNextIntl(nextConfig);
```

## Installation

```bash
# Required additions
pnpm add next-intl sharp

# Optional
pnpm add @vercel/speed-insights

# Cleanup (verify unused first)
pnpm remove @nuxt/kit input-otp react-day-picker date-fns cmdk react-resizable-panels autoprefixer
```

## SEO / Metadata (No Library Needed)

Next.js 16 App Router has built-in metadata API:

```ts
// app/[locale]/layout.tsx
export async function generateMetadata({ params }: { params: { locale: string } }) {
  return {
    title: locale === 'de' ? 'ShopControl AI' : 'ShopControl AI',
    description: locale === 'de'
      ? 'KI-gesteuerte Webshop-Verwaltung'
      : 'AI-powered webshop management',
    openGraph: { /* ... */ },
  };
}
```

## Summary: Final Stack

| Category | Solution | Install? |
|----------|----------|----------|
| Framework | Next.js 16 | Already installed |
| UI | shadcn/ui + Radix | Already installed |
| Styling | Tailwind CSS v4 | Already installed |
| Animation | Framer Motion 12 | Already installed |
| Dark mode | next-themes | Already installed |
| Smooth scroll | Lenis | Already installed |
| Icons | Lucide React | Already installed |
| **i18n** | **next-intl** | **ADD** |
| **Image engine** | **sharp** | **ADD** |
| **Speed monitoring** | **@vercel/speed-insights** | **ADD (optional)** |
| SEO | Next.js metadata API | Built-in |
| Analytics | @vercel/analytics | Already installed |
| Deployment | Vercel | No package needed |

## Sources

- next-intl: Based on established library knowledge. next-intl v4 is the App Router-native version. HIGH confidence.
- next/image + sharp: Next.js built-in. Verified by examining next.config.mjs which currently disables it. HIGH confidence.
- next-themes: Already in package.json at v0.4.6. HIGH confidence.
- Cleanup recommendations: Based on reading package.json. `@nuxt/kit` is definitively wrong (Nuxt package in Next.js project). HIGH confidence.

**Note:** WebSearch was unavailable during this research. Version numbers for next-intl are based on training data (May 2025). Verify `next-intl` latest version with `pnpm info next-intl version` before installing.
