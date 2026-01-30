---
phase: 01-foundation-layout
plan: 01
subsystem: i18n-and-theme
tags: [next-intl, i18n, oklch, tailwind-v4, dark-theme, next-js-16]
requires: []
provides: [locale-routing, dark-blue-theme, message-files, i18n-infrastructure]
affects: [01-02, 02-xx, 03-xx, 04-xx]
tech-stack:
  added: [next-intl@4.8.1, sharp]
  patterns: [proxy.ts-middleware, locale-segmented-app-dir, oklch-css-variables, generateStaticParams]
key-files:
  created: [i18n/routing.ts, i18n/request.ts, i18n/navigation.ts, proxy.ts, messages/de.json, messages/en.json, app/[locale]/layout.tsx, app/[locale]/page.tsx, app/[locale]/not-found.tsx]
  modified: [package.json, next.config.mjs, app/globals.css, app/layout.tsx, app/page.tsx]
key-decisions:
  - Used getTranslations (server) instead of useTranslations (client) for async page component
  - Copied Web design template to project root as foundation (template files were only in Web design/ subdirectory)
  - Inter font replaces Manrope/CalSans/InstrumentSans custom fonts
duration: 8min
completed: 2026-01-30
---

# Phase 1 Plan 1: i18n and Theme Foundation Summary
**next-intl v4 locale routing (DE/EN) with dark blue hue-260 OKLCH theme on Next.js 16 using proxy.ts middleware**

## Performance
- 2 tasks, 2 commits
- Build: static generation of /de and /en routes confirmed
- No build errors

## Accomplishments
- Installed next-intl v4.8.1 and sharp
- Created full i18n infrastructure: routing, request config, navigation helpers
- Created proxy.ts (Next.js 16 middleware pattern) with locale routing
- Created DE and EN message files with nav, hero, and footer translation keys
- Wrapped next.config.mjs with createNextIntlPlugin
- Replaced root layout with bare pass-through (locale layout handles html/body)
- Root page redirects / to /de
- Locale layout provides NextIntlClientProvider, Inter font, dark class
- Locale page renders translated hero content
- Updated all CSS variables to dark blue hue 260 OKLCH palette
- Both :root and .dark selectors use consistent blue-tinted dark theme

## Task Commits
| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Install deps and i18n infrastructure | 56c1ce6 | package.json, i18n/*, proxy.ts, next.config.mjs, messages/* |
| 2 | Locale app directory with dark blue theme | 29ace4e | app/layout.tsx, app/[locale]/*, app/globals.css |

## Files Created/Modified
**Created:** i18n/routing.ts, i18n/request.ts, i18n/navigation.ts, proxy.ts, messages/de.json, messages/en.json, app/[locale]/layout.tsx, app/[locale]/page.tsx, app/[locale]/not-found.tsx
**Modified:** package.json, pnpm-lock.yaml, next.config.mjs, app/globals.css, app/layout.tsx, app/page.tsx, tsconfig.json

## Decisions Made
1. **getTranslations over useTranslations** - Page component is async (Next.js 16 params are Promises), so used server-side getTranslations instead of client hook useTranslations
2. **Template copy to root** - Web design/ template files copied to project root since no Next.js project existed at root level
3. **Inter font** - Replaced template's Manrope/CalSans/InstrumentSans with Inter from next/font/google per plan spec

## Deviations from Plan
### Auto-fixed Issues
**1. [Rule 3 - Blocking] Copied Web design template to project root**
- **Found during:** Task 1 setup
- **Issue:** Project root had no package.json, tsconfig.json, or app/ directory - only the Web design/ subdirectory had them
- **Fix:** Copied all template files (package.json, tsconfig.json, postcss.config.mjs, components.json, app/, components/, hooks/, lib/, public/, styles/) to project root
- **Files modified:** Multiple template files copied

**2. [Rule 1 - Bug] Fixed async page component using wrong translation API**
- **Found during:** Task 2
- **Issue:** useTranslations cannot be used in async server components; Next.js 16 requires params as Promise
- **Fix:** Changed to getTranslations (async server API) and made page component async with awaited params
- **Files modified:** app/[locale]/page.tsx

## Issues Encountered
- next-intl v4 API confirmed working: defineRouting, createNavigation, hasLocale, getRequestConfig all resolved correctly
- Tailwind v4 @theme inline pattern preserved and working with OKLCH variables

## Next Phase Readiness
- i18n routing fully operational for all subsequent plans
- Dark blue theme applied globally via CSS variables
- Plan 01-02 can build navbar/footer/hero on this foundation
- All template components (from Web design/) available in components/ for reference
