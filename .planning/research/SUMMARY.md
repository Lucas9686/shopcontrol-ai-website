# Project Research Summary

**Project:** ShopControl AI - Jugend Innovativ Showcase Website
**Domain:** Multi-page bilingual (DE/EN) competition showcase website for Austrian tech diploma thesis
**Researched:** 2026-01-30
**Confidence:** MEDIUM-HIGH

## Executive Summary

ShopControl AI is a showcase website for an Austrian Jugend Innovativ competition submission (HTL diploma thesis). The project presents an autonomous AI support agent with automated accounting for online shops. The website must communicate complex technical content to a competition jury while appearing professional and polished. Research shows this is best accomplished using the existing Next.js 16 App Router foundation with careful additions for internationalization and image optimization, not extensive new frameworks.

The recommended approach is a static, bilingual (German primary, English secondary) multi-page site that prioritizes clarity over complexity. Use the existing shadcn/ui dark theme template as a foundation, add next-intl for i18n routing, and focus on excellent content presentation through scroll animations and visual hierarchy. The biggest risks are performance degradation from unoptimized screenshots and over-engineering the i18n implementation. Both are mitigated through Next.js built-in image optimization (currently disabled in config) and a lightweight dictionary-based translation approach.

The jury evaluates the PROJECT, not the website's technical sophistication. Therefore, every feature should serve comprehension and professionalism, not demonstrate web development skills. The workflow visualization and demo video are higher ROI than complex animations.

## Key Findings

### Recommended Stack

The existing v0 template provides an excellent foundation. Only three additions are needed: next-intl for internationalization, sharp for image processing, and optional speed-insights for monitoring. The project is already well-equipped with Next.js 16, React 19, Tailwind v4, Framer Motion, shadcn/ui, and Vercel Analytics.

**Core technologies:**
- **next-intl (v4+)**: De-facto App Router i18n library with middleware-based locale detection, server component support, and type-safe translations
- **sharp (v0.33)**: Image processing engine for Next.js optimization, required for local builds and blur placeholders (automatic on Vercel)
- **Next.js Image (built-in)**: Enable by removing `images: { unoptimized: true }` from next.config.mjs — this is currently disabling all optimization
- **@vercel/speed-insights (optional)**: Core Web Vitals monitoring, complements existing analytics, good for competition credibility

**Critical cleanup needed:**
- Remove `@nuxt/kit` (wrong framework, added by mistake)
- Remove unused dependencies: `input-otp`, `react-day-picker`, `date-fns`, `cmdk`, `react-resizable-panels`, `autoprefixer` (redundant with Tailwind v4)
- Verify if `react-hook-form`, `zod`, and `recharts` are needed (keep only if contact form or data visualizations are planned)

### Expected Features

Showcase websites for Austrian tech competitions follow clear patterns. The jury expects professional presentation, technical depth, and business viability (entrepreneurship category). Missing table stakes signals incompleteness; differentiators create competitive advantage.

**Must have (table stakes):**
- Clear hero with project name and one-liner explaining what it does
- Problem statement showing relevance (pain points of shop owners)
- Solution overview covering both pillars (AI support + accounting automation)
- Technical explanation with diagrams and workflow steps
- About/team section emphasizing solo project achievement
- Responsive design for tablet/mobile judging scenarios
- German language as primary (jury is Austrian)
- Contact/Impressum (Austrian legal requirement)
- Fast load times (jury has limited patience)
- Real product screenshots proving it exists and works

**Should have (competitive differentiators):**
- Scroll-triggered animations for SaaS-level polish (subtle, not flashy)
- Interactive workflow visualization showing 6-step AI process
- English language toggle demonstrating international ambition
- Financial projections with charts (entrepreneurship category)
- Before/after comparison (manual pain vs. automated solution)
- Live demo video (30-60s screen capture of AI agent working)
- Security section with trust signals (most students ignore this)
- Smooth page transitions and dark mode consistency
- Proper SEO/OG meta tags (professional link previews when shared)

**Defer (v2+ or skip entirely):**
- Live chatbot demo on website (unreliable, use video instead)
- Backend/API integration (adds failure points for zero value)
- CMS or admin panel (over-engineering for fixed content)
- Complex 3D animations (slow, distracting)
- User accounts/login (no purpose)
- Analytics dashboard with "real data" (backend dependency)
- Pricing page with "Buy Now" (product not for sale yet)

### Architecture Approach

The recommended architecture uses Next.js App Router's `[locale]` dynamic segment pattern for internationalization, with a simple JSON dictionary approach rather than heavyweight i18n frameworks. The existing v0 template provides the layout foundation; the transformation is from single-page to multi-page with locale routing.

**Major components:**
1. **i18n Infrastructure** — `app/[locale]/layout.tsx` as root locale boundary, middleware for locale detection and `/` redirect, simple `getDictionary(locale)` function loading JSON translations server-side
2. **Shared Layout** — Navbar with language switcher, Footer, SectionWrapper for consistent spacing/animations, all receiving dictionary subsets as props from server components
3. **Page-Specific Sections** — Organized under `components/pages/{pageName}/`, each page (home, technik, ergebnisse, ueber-uns) has self-contained section components receiving translations as props
4. **Client Boundaries** — Only animation wrappers (Framer Motion), interactive UI (mobile menu, tabs), and language switcher need `"use client"` — everything else stays server-rendered
5. **Image Pipeline** — Use Next.js `<Image>` with `sizes` prop, `quality={80}` for screenshots, `placeholder="blur"` for perceived performance, formats: WebP/AVIF

**Key architectural decisions:**
- Use English folder names universally (`/de/technology`, `/en/technology`) rather than localized slugs to avoid route duplication
- Load translations server-side, pass only needed strings to client components (avoid client-side dictionary loading)
- Keep all components as Server Components by default, add `"use client"` only when required
- Use `generateStaticParams` for static generation of both locales (fully static export possible)
- Store workflow screenshots in `public/images/workflows/`, diagrams in `public/images/diagrams/`

### Critical Pitfalls

Research identified nine domain-specific pitfalls. The top five have the potential to cause rewrites or significant delays.

1. **i18n in App Router routing strategy** — Using wrong approach (Pages Router patterns, manual hacks) causes hydration mismatches, broken locale switching, SEO issues. Prevention: Use next-intl v3+ with App Router, structure as `app/[locale]/layout.tsx`, add proper hreflang and alternates metadata. Must be correct in Phase 1 (foundation).

2. **Unoptimized PNG screenshots destroying performance** — 20+ full-resolution screenshots (1-3MB each) with missing `sizes` prop causes 30+ second mobile load times, failed Core Web Vitals, spiking Vercel costs. Prevention: Pre-process to WebP/AVIF, always set `sizes` prop, use `quality={80}`, add `placeholder="blur"`. Establish pipeline in Phase 1.

3. **Framer Motion bloating bundle and janking on mobile** — Over-animation pulls 30-40KB+ client bundle, causes scroll jank on mid-range phones. Prevention: Use `LazyMotion` + `domAnimation` features with `m` component, limit to 5-8 animations per page, respect `prefers-reduced-motion`, avoid `layout` prop on large trees. Set up wrapper in Phase 1.

4. **Dark theme flash (FOUC) and color mismatch** — Theme stored client-side causes white flash before hydration, screenshots float awkwardly on dark backgrounds. Prevention: Use `next-themes` with blocking script, add `<html suppressHydrationWarning>`, test both themes continuously, add borders/shadows to screenshots.

5. **i18n content management becoming unmaintainable** — Inconsistent key naming, orphaned keys, one language ahead of the other, no type safety. Prevention: Use nested JSON with `{page}.{section}.{element}` convention, next-intl TypeScript integration, German-first workflow with fallback to default locale.

## Implications for Roadmap

Based on research, suggested phase structure prioritizes foundation over features, establishes patterns before content, and defers polish until all pages exist.

### Phase 1: Foundation & i18n Infrastructure
**Rationale:** All content depends on routing structure and translation system. Getting i18n wrong requires rewrites (Pitfall #1). Establishing image pipeline early prevents performance disasters (Pitfall #2).

**Delivers:**
- `[locale]` routing with middleware
- Translation system (`lib/i18n/dictionaries.ts`, `de.json`, `en.json`)
- Root layout with locale-aware HTML and theme setup
- Shared components (Navbar with language switcher, Footer, SectionWrapper)
- Image optimization configuration (enable Next.js Image, add sharp)
- Framer Motion LazyMotion wrapper (prevent bundle bloat, Pitfall #3)
- Deployment to Vercel (catch deployment issues early, Pitfall #6)

**Addresses:**
- Table stakes: Navigation, German/English, responsive foundation
- Differentiators: Dark mode consistency setup, smooth transition foundation

**Avoids:**
- Pitfall #1 (wrong i18n routing)
- Pitfall #2 (image pipeline established)
- Pitfall #3 (LazyMotion configured)
- Pitfall #4 (dark theme FOUC)
- Pitfall #6 (Vercel deployment validated early)

### Phase 2: Core Content Pages
**Rationale:** With infrastructure solid, build content pages following established patterns. Home page adapts existing v0 template (lowest risk). Technical deep-dive is most content-rich and establishes section component patterns for other pages.

**Delivers:**
- Home/Landing page (hero, problem statement, solution overview, CTA)
- Technical Deep-Dive page (workflow visualization, architecture diagrams, tech stack)
- About/Team page (solo project emphasis, school, supervisors, Impressum)
- All content in both DE and EN with consistent translation key structure

**Addresses:**
- Table stakes: Hero, problem statement, solution, technical explanation, about section, real screenshots
- Differentiators: Interactive workflow visualization, before/after comparison, security section

**Avoids:**
- Pitfall #5 (consistent translation structure from start)
- Pitfall #9 (test both languages continuously)

**Stack elements used:**
- next-intl for content loading
- Next.js Image for screenshots with proper `sizes`/`quality`
- shadcn/ui components for layout primitives

### Phase 3: Business & Results Page
**Rationale:** Financial projections may need charts library (recharts already in package.json). Defer until other content patterns established. Entrepreneurship category demands business viability demonstration.

**Delivers:**
- Results/Finance page (financial projections, pricing model, metrics, 3-year forecast)
- Charts/visualizations for business data
- Testimonial or pilot data section (if available)

**Addresses:**
- Differentiators: Financial projections visualization, speed/performance metrics, testimonials

**Uses:**
- recharts (if available) or simple SVG/CSS visualizations
- Framer Motion for chart reveal animations

### Phase 4: Polish & Optimization
**Rationale:** Cross-cutting concerns applied after all pages exist. Scroll animations, page transitions, and SEO metadata enhance existing content.

**Delivers:**
- Scroll-triggered animations on all pages (Framer Motion, limited per-page)
- Page transition animations
- Demo video embed (30-60s screen capture)
- OG images and metadata (per-locale using generateMetadata)
- Favicon and SEO tags (sitemap.ts, robots.ts)
- Performance optimization (Lighthouse audit, Core Web Vitals)
- Final cleanup (remove unused dependencies)

**Addresses:**
- Differentiators: SaaS-level polish, smooth transitions, live demo video, professional link previews
- Table stakes: Fast load times (optimized)

**Avoids:**
- Pitfall #8 (missing SEO/metadata)
- Pitfall #9 (both languages tested end-to-end)

### Phase Ordering Rationale

- **Foundation first** because i18n routing errors require full rewrites if discovered late
- **Infrastructure before content** because image pipeline and theme setup affect all pages
- **Home page second** because it adapts existing v0 code (de-risk)
- **Technical page third** because it's most complex and establishes patterns for About page
- **Business page fourth** because it may need charts library (isolate dependency)
- **Polish last** because animations and SEO are cross-cutting enhancements, not page structure

This ordering minimizes rework by establishing patterns early, validates deployment infrastructure immediately, and defers nice-to-haves until core content exists.

### Research Flags

**Phases likely needing deeper research during planning:**
- **Phase 1:** next-intl v4 API shape needs verification (training data is May 2025, library may have changed)
- **Phase 1:** Tailwind v4 + shadcn/ui compatibility uncertain without web verification — may need fallback to v3
- **Phase 3:** recharts integration patterns if financial visualizations are complex

**Phases with standard patterns (skip research-phase):**
- **Phase 2:** Content pages follow established Next.js patterns, no novel integration
- **Phase 4:** Framer Motion scroll animations and Next.js metadata API are well-documented

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | next-intl is established standard for App Router i18n, Next.js Image is built-in, stack additions are minimal and low-risk |
| Features | MEDIUM | Based on domain knowledge of Austrian competition websites and SaaS landing pages, not verified against current Jugend Innovativ judging criteria |
| Architecture | HIGH | Next.js App Router `[locale]` pattern is official recommendation, dictionary approach is proven for static sites |
| Pitfalls | MEDIUM-HIGH | i18n, image optimization, and Framer Motion pitfalls are well-documented; Tailwind v4 compatibility is LOW confidence without verification |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

Areas where research was inconclusive or needs validation during implementation:

- **Tailwind v4 + shadcn/ui compatibility:** Training data shows Tailwind v4 has breaking changes from v3, but shadcn/ui compatibility status is uncertain. CRITICAL: Validate this in Phase 0 before any UI work. If incompatible, fall back to Tailwind v3 for stability.

- **Next.js 16 release status:** Training data cutoff is January 2025. Verify Next.js 16 is released and check for breaking changes vs v15. Package.json shows v16.0.10 installed, so likely stable.

- **next-intl v4 API:** Version recommendation based on training data. Run `pnpm info next-intl version` to verify latest stable before installation. API shape may have changed.

- **Framer Motion bundle size with LazyMotion:** Exact savings uncertain without current version check. Validate bundle analyzer shows reduction vs full import.

- **Competition judging criteria:** Feature prioritization based on general competition website patterns, not current Jugend Innovativ 2026 rubric. Validate with competition materials if available.

- **recharts usage:** Package.json includes recharts but unclear if financial projections need charts. Clarify with content requirements before Phase 3.

- **Form libraries:** `react-hook-form`, `@hookform/resolvers`, and `zod` are installed but unclear if contact form is needed. Clarify before cleanup phase.

## Sources

### Primary (HIGH confidence)
- Next.js App Router documentation — i18n routing patterns, metadata API, Image component
- Existing codebase analysis — `Web design/` directory, package.json, next.config.mjs
- Established library knowledge — next-intl v4 App Router support, sharp for image processing
- Austrian Mediengesetz legal requirements — Impressum mandatory for public websites

### Secondary (MEDIUM confidence)
- Domain knowledge — competition showcase website patterns, SaaS landing page conventions, HTL diploma thesis presentation standards
- Framer Motion LazyMotion documentation — bundle size optimization patterns
- shadcn/ui component library conventions — server/client component boundaries

### Tertiary (LOW confidence, needs validation)
- Tailwind v4 breaking changes and shadcn/ui compatibility — based on Tailwind v4 release notes but not verified with current shadcn version
- Next.js 16 stability and API — assumed stable based on package.json version, but training data cutoff may miss recent changes
- next-intl v4 version number — based on training data, verify latest stable version
- Framer Motion LazyMotion bundle savings — exact numbers uncertain without version-specific check

---
*Research completed: 2026-01-30*
*Ready for roadmap: yes*
