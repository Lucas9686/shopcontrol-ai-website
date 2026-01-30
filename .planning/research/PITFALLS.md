# Domain Pitfalls

**Domain:** Next.js showcase website with i18n (DE/EN), image-heavy, Framer Motion, dark theme
**Stack:** Next.js 16, React 19, shadcn/ui, Tailwind v4, Framer Motion, Vercel
**Researched:** 2026-01-30
**Overall confidence:** MEDIUM (based on training data, WebSearch unavailable)

---

## Critical Pitfalls

Mistakes that cause rewrites or major issues.

### Pitfall 1: i18n in App Router - Wrong Routing Strategy

**What goes wrong:** Teams try to use the old `next-intl` Pages Router approach or manually hack `[locale]` segments without understanding App Router constraints. The App Router requires all i18n routes to live under a `[locale]` dynamic segment at the root layout level. Mixing server components and client components with locale context leads to hydration mismatches.

**Why it happens:** Most i18n tutorials still target Pages Router. App Router i18n is structurally different.

**Consequences:** Hydration errors in production, broken locale switching, SEO issues (missing hreflang, wrong canonical URLs), flash of wrong language.

**Prevention:**
- Use `next-intl` v3+ which has first-class App Router support with middleware-based locale detection
- Structure: `app/[locale]/layout.tsx` as the root locale boundary
- Use `next-intl` middleware for redirect/rewrite, NOT manual `NextResponse.redirect`
- Set `<html lang={locale}>` in the root layout
- Add `generateStaticParams` returning `[{locale: 'de'}, {locale: 'en'}]` for static generation
- Add hreflang `<link>` tags and proper `alternates` in metadata

**Detection:** Hydration warnings in console, Google Search Console reporting wrong language, locale not persisting on navigation.

**Phase:** Must be correct in Phase 1 (foundation). Retrofitting i18n routing is a rewrite.

**Confidence:** MEDIUM

---

### Pitfall 2: Unoptimized PNG Screenshots Destroying Performance

**What goes wrong:** Showcase sites load 20+ full-resolution PNG screenshots (often 1-3MB each). Teams use `next/image` but miss critical configuration: no `sizes` prop, no format conversion, serving originals on mobile.

**Why it happens:** PNGs from screenshot tools are massive. Developers test on fast connections and don't notice.

**Consequences:** 30+ second load times on mobile, failed Core Web Vitals, Vercel image optimization costs spike, LCP scores tank.

**Prevention:**
- Pre-process all PNGs: run through `sharp` or `squoosh` to convert to WebP/AVIF before committing (or let `next/image` do it, but set `formats: ['image/avif', 'image/webp']` in `next.config`)
- ALWAYS set the `sizes` prop on `<Image>`: e.g., `sizes="(max-width: 768px) 100vw, 50vw"`
- Use `priority` only on above-the-fold hero images (1-2 max per page)
- Set `quality={80}` or lower for screenshots (they compress well)
- Use `placeholder="blur"` with `blurDataURL` for perceived performance
- Consider lazy-loading screenshot galleries with intersection observer

**Detection:** Lighthouse performance score below 70, LCP > 2.5s, Vercel dashboard showing high image optimization usage.

**Phase:** Phase 1 should establish the image pipeline. Every screenshot added later must follow the pattern.

**Confidence:** HIGH (well-documented issue)

---

### Pitfall 3: Framer Motion Bloating Bundle and Janking on Mobile

**What goes wrong:** Importing `framer-motion` adds ~30-40KB gzipped to client bundle. Teams animate everything, use `layout` animations on complex DOM trees, and don't lazy-load animation-heavy sections. Mobile devices stutter on scroll-triggered animations.

**Why it happens:** Framer Motion is easy to use, so developers over-animate. The `motion` component feels lightweight but pulls the entire animation engine.

**Consequences:** Bundle size balloons, TTI increases, scroll jank on mid-range phones, animations competing with image loading.

**Prevention:**
- Import from `framer-motion` using the `m` component + `LazyMotion` with `domAnimation` features for lighter bundle:
  ```tsx
  import { LazyMotion, domAnimation, m } from "framer-motion"
  // Wrap app in <LazyMotion features={domAnimation}>
  // Use <m.div> instead of <motion.div>
  ```
- Limit scroll-triggered animations to 5-8 per page max
- Use `will-change: transform` sparingly (only on actively animating elements)
- Use `prefers-reduced-motion` media query to disable animations for users who want it
- Avoid `layout` prop on large component trees (causes expensive recalculations)
- Use CSS transitions for simple opacity/transform instead of Framer Motion

**Detection:** Bundle analyzer showing framer-motion > 40KB, mobile Lighthouse performance < 80, visible scroll jank on mid-range Android.

**Phase:** Phase 1 should set up `LazyMotion` wrapper. Animation guidelines should be established before content pages are built.

**Confidence:** HIGH

---

## Moderate Pitfalls

Mistakes that cause delays or technical debt.

### Pitfall 4: Dark Theme Flash (FOUC) and Color Mismatch

**What goes wrong:** Dark mode implementation causes a white flash on page load (theme not applied before hydration). shadcn/ui components use CSS variables that don't update correctly. Screenshots look wrong on dark backgrounds.

**Why it happens:** The theme preference is stored client-side (localStorage). Server-rendered HTML doesn't know the preference, so it renders light theme first.

**Prevention:**
- Use `next-themes` with `attribute="class"` and `defaultTheme="system"`
- Add the `next-themes` script to `<head>` via the `ThemeProvider` wrapper (it injects a blocking script that reads localStorage before paint)
- In `layout.tsx`: `<html suppressHydrationWarning>` to prevent React warnings from the theme script
- For screenshots on dark backgrounds: add subtle borders/shadows or use rounded containers so screenshots don't "float" awkwardly
- Test BOTH themes on every page during development, not just at the end
- shadcn/ui already uses CSS variables that respect `.dark` class -- do NOT create a parallel color system

**Detection:** White flash visible on page load with dark mode, shadcn components rendering in wrong colors, screenshots blending into background.

**Phase:** Phase 1 theme setup. Must be correct before any UI work begins.

**Confidence:** HIGH

---

### Pitfall 5: i18n Content Management Becoming Unmaintainable

**What goes wrong:** Translation files grow chaotic. Keys are inconsistent (`home.hero.title` vs `homeHeroTitle`), orphaned keys accumulate, one language gets ahead of the other, no type safety on translation keys.

**Why it happens:** Two languages feels manageable at first, so teams skip structure. Content grows faster than expected on showcase sites.

**Prevention:**
- Use nested JSON structure with consistent naming: `{page}.{section}.{element}`
- Use `next-intl` TypeScript integration for type-safe `t()` calls
- Keep translation files at `messages/de.json` and `messages/en.json`
- Write content in German first (primary audience for Jugend Innovativ), then translate
- Use a shared `defaultLocale` so missing keys fall back gracefully
- Consider co-locating page-specific translations or splitting by page if files exceed ~500 lines

**Detection:** TypeScript not catching missing translation keys, `t()` calls returning key strings instead of content, one language showing untranslated sections.

**Phase:** Phase 1 establishes structure. Enforce from first content page onward.

**Confidence:** MEDIUM

---

### Pitfall 6: Vercel Deployment Surprises

**What goes wrong:** Build works locally but fails on Vercel. Common causes: case-sensitivity (Windows dev -> Linux build), environment variables missing, build memory limits hit with large image processing, middleware running at edge without Node.js APIs.

**Why it happens:** Windows filesystem is case-insensitive, Vercel builds on Linux. Middleware runs in Edge Runtime by default.

**Prevention:**
- File naming: use kebab-case for ALL files, never rely on case differences
- Environment variables: define all in Vercel dashboard, use `NEXT_PUBLIC_` prefix for client-side vars
- Middleware: `next-intl` middleware is Edge-compatible, but verify any custom middleware doesn't use Node.js APIs (fs, path, etc.)
- If build runs out of memory with many images, set `images.unoptimized: false` and let Vercel optimize on-demand rather than at build time
- Set up preview deployments from PRs for early detection
- Add `vercel.json` only if needed (most Next.js projects don't need it)

**Detection:** "Module not found" errors mentioning wrong case, middleware crashes in production but works locally, build timeout.

**Phase:** Phase 1 should deploy a skeleton to Vercel immediately. Catch deployment issues before content exists.

**Confidence:** HIGH

---

### Pitfall 7: Tailwind v4 Migration Traps

**What goes wrong:** Tailwind v4 has significant breaking changes from v3. Config moved from `tailwind.config.js` to CSS-based `@theme` directive. Some utility names changed. PostCSS plugin setup differs.

**Why it happens:** Most tutorials and shadcn/ui examples were written for Tailwind v3. Tailwind v4 was released relatively recently.

**Prevention:**
- Verify shadcn/ui version supports Tailwind v4 before starting (check shadcn docs)
- Use `@import "tailwindcss"` in CSS instead of `@tailwind` directives
- Theme customization goes in CSS via `@theme { }` block, not JS config
- If shadcn/ui doesn't fully support v4 yet, consider using Tailwind v3 instead -- compatibility is more important than latest version for a showcase site
- Check that all shadcn components render correctly with v4 before building pages

**Detection:** Styles not applying, `@apply` breaking, theme colors not working, shadcn components unstyled.

**Phase:** Phase 0 / project setup. Must validate before any UI work.

**Confidence:** LOW (Tailwind v4 + shadcn/ui compatibility status uncertain without web search verification -- VALIDATE THIS)

---

## Minor Pitfalls

### Pitfall 8: Missing Metadata and SEO Basics

**What goes wrong:** Showcase site has no OpenGraph images, missing descriptions, no sitemap. Competition judges or social media shares show blank previews.

**Prevention:**
- Use Next.js Metadata API in each page's layout/page: `export const metadata = { ... }`
- Generate OG images with `next/og` (ImageResponse) or use static OG images
- Add `sitemap.ts` and `robots.ts` in app root
- Set per-locale metadata with `generateMetadata` function

**Phase:** Can be added in final polish phase, but page structure should accommodate it from Phase 1.

**Confidence:** HIGH

---

### Pitfall 9: Not Testing Both Languages End-to-End

**What goes wrong:** German version looks perfect, English version has layout breaks (longer/shorter text), missing translations showing keys, or wrong date/number formats.

**Prevention:**
- Design with both languages in mind (German text is ~30% longer than English)
- Use `min-h` instead of fixed heights for text containers
- Test every page in both languages before marking complete
- Use `Intl.DateTimeFormat` and `Intl.NumberFormat` with locale, not hardcoded formats

**Phase:** Every phase, every page. Include in definition of done.

**Confidence:** HIGH

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Project setup | Tailwind v4 + shadcn/ui incompatibility (#7) | Validate compatibility first, fall back to v3 if needed |
| Foundation/routing | i18n routing structure wrong (#1) | Use `next-intl` v3+ with App Router pattern from day 1 |
| Theme setup | Dark mode FOUC (#4) | `next-themes` with blocking script, test both themes |
| Content pages | PNG screenshots too large (#2) | Establish image pipeline before first content page |
| Animations | Framer Motion bloat (#3) | `LazyMotion` + `m` components, limit animations per page |
| Translation content | i18n keys unmaintainable (#5) | Type-safe keys, consistent naming, German-first workflow |
| Deployment | Case sensitivity, env vars (#6) | Deploy skeleton to Vercel in Phase 1 |
| Final polish | Missing SEO/metadata (#8) | Add metadata API usage to each page |
| QA | Language layout breaks (#9) | Test both languages for every page |

---

## Validation Needed

The following findings are based on training data and should be verified:

1. **Tailwind v4 + shadcn/ui compatibility** (LOW confidence) -- check current shadcn docs before committing to v4
2. **Next.js 16 specific changes** (LOW confidence) -- verify Next.js 16 is released and check for breaking changes vs 15
3. **`next-intl` v3+ App Router API** (MEDIUM confidence) -- verify current API shape with official docs
4. **Framer Motion `LazyMotion` bundle savings** (MEDIUM confidence) -- verify exact bundle size reduction with current version
