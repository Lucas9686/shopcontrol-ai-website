# Architecture Patterns

**Domain:** Multi-page Next.js showcase website with i18n (DE/EN)
**Project:** ShopControl AI - Jugend Innovativ presentation website
**Researched:** 2026-01-30
**Confidence:** HIGH (well-established Next.js App Router patterns)

## Current State

The existing v0 template is a single-page SaaS landing (`app/page.tsx` + `app/layout.tsx`) with:
- shadcn/ui components in `components/ui/`
- Page-level section components (hero, bento-grid, pricing, footer, navbar)
- Dark theme hardcoded (`className="dark"`)
- Manrope + CalSans + InstrumentSans fonts
- Vercel Analytics
- SmoothScroll wrapper (Lenis-based)

This needs to become a multi-page, bilingual (DE/EN) site.

## Recommended Architecture

### i18n Routing Pattern: `[locale]` Dynamic Segment

Use Next.js App Router's recommended approach: a `[locale]` dynamic route segment at the top of the route tree. No external i18n library needed for a 2-language static site -- use simple JSON dictionary files.

```
app/
  [locale]/
    layout.tsx          # Root layout with locale-aware <html lang={locale}>
    page.tsx            # Home / Landing page
    technik/
      page.tsx          # Technical Deep-Dive page
    ergebnisse/
      page.tsx          # Results / Finance page
    ueber-uns/
      page.tsx          # About / Team page
    not-found.tsx       # 404 page
  layout.tsx            # Bare root layout (just children passthrough)
  page.tsx              # Redirect "/" to "/de" (default locale)
```

**Why this pattern:**
- No middleware complexity for a static site (use `generateStaticParams` to pre-render both locales)
- Clean URLs: `/de`, `/de/technik`, `/en`, `/en/technology`
- Each locale can have its own slug names (DE: `/technik`, EN: `/technology`)

**Slug mapping per locale:**

| Page | DE slug | EN slug |
|------|---------|---------|
| Home | `/de` | `/en` |
| Technical | `/de/technik` | `/en/technology` |
| Results | `/de/ergebnisse` | `/en/results` |
| About | `/de/ueber-uns` | `/en/about` |

### Simplified i18n Without next-intl

For a 4-page static showcase, a lightweight dictionary approach is superior to `next-intl`:

```
lib/
  i18n/
    dictionaries.ts     # getDictionary(locale) function
    de.json             # German translations
    en.json             # English translations
```

```typescript
// lib/i18n/dictionaries.ts
const dictionaries = {
  de: () => import('./de.json').then(m => m.default),
  en: () => import('./en.json').then(m => m.default),
}

export const getDictionary = async (locale: 'de' | 'en') =>
  dictionaries[locale]()
```

Each page calls `getDictionary(params.locale)` server-side. No client-side i18n runtime needed.

### Middleware: Locale Detection + Redirect

```
middleware.ts           # Redirect "/" to "/de" or "/en" based on Accept-Language
```

Minimal middleware that checks `Accept-Language` header and redirects root `/` to the default locale. All other routes are handled by the `[locale]` segment.

## File/Folder Structure (Target)

```
project-root/
  app/
    layout.tsx                    # Bare root (no HTML -- just children)
    page.tsx                      # Redirect to /de
    [locale]/
      layout.tsx                  # <html>, <body>, fonts, navbar, footer
      page.tsx                    # Landing/Home
      technik/page.tsx            # (DE) or technology/page.tsx (EN) -- see note
      ergebnisse/page.tsx         # (DE) or results/page.tsx (EN)
      ueber-uns/page.tsx          # (DE) or about/page.tsx (EN)
      not-found.tsx
  components/
    ui/                           # shadcn/ui primitives (keep as-is)
    shared/                       # Shared across pages
      navbar.tsx                  # Language switcher + nav links
      footer.tsx
      section-wrapper.tsx         # Consistent section spacing/animations
      animated-heading.tsx        # Framer Motion heading component
      language-switcher.tsx       # DE/EN toggle
    pages/                        # Page-specific section components
      home/
        hero.tsx
        logo-marquee.tsx
        features-bento.tsx
        cta-section.tsx
      technik/
        workflow-diagram.tsx
        architecture-section.tsx
        tech-stack-section.tsx
      ergebnisse/
        metrics-dashboard.tsx
        finance-chart.tsx
        testimonials.tsx
      about/
        team-section.tsx
        timeline.tsx
        project-story.tsx
  lib/
    i18n/
      dictionaries.ts
      de.json
      en.json
    utils.ts                      # cn() helper etc.
  public/
    images/
      workflows/                  # n8n workflow screenshots
      diagrams/                   # Architecture diagrams
      team/                       # Team photos
      logos/                      # Partner/tech logos
  middleware.ts
```

**Note on localized slugs:** The simplest approach is to use the SAME folder names for both locales (e.g., `/de/technology` and `/en/technology`) rather than localized slugs. This avoids route duplication. If localized URLs are essential for SEO, use `rewrites` in `next.config.ts` to map `/de/technik` to the `technology` page.

**Recommendation:** Use English folder names universally. Localized slugs add complexity with near-zero SEO benefit for a showcase site.

## Component Boundaries

### Shared Components (used on 2+ pages)

| Component | Responsibility | Props |
|-----------|---------------|-------|
| `Navbar` | Navigation + language switcher | `locale`, `dictionary.nav` |
| `Footer` | Links, copyright | `locale`, `dictionary.footer` |
| `SectionWrapper` | Consistent padding, max-width, fade-in animation | `children`, `className` |
| `AnimatedHeading` | Framer Motion reveal animation for headings | `children`, `as` (h1/h2) |
| `LanguageSwitcher` | DE/EN toggle, preserves current path | `locale`, `currentPath` |

### Page-Specific Components (one page only)

Organized under `components/pages/{pageName}/`. Each is a self-contained section:

**Home:** `Hero`, `LogoMarquee`, `FeaturesBento`, `CTASection`
**Technik:** `WorkflowDiagram`, `ArchitectureSection`, `TechStackSection`
**Ergebnisse:** `MetricsDashboard`, `FinanceChart`, `Testimonials`
**About:** `TeamSection`, `Timeline`, `ProjectStory`

### UI Primitives

Keep existing shadcn/ui `components/ui/` directory untouched. These are consumed by both shared and page-specific components.

## Data Flow

```
                    Server (Build Time)
                    ==================
  [locale] param
       |
       v
  getDictionary(locale) --> JSON translations
       |
       v
  Page Component (Server Component)
       |
       +---> Shared layout (Navbar, Footer) receive dictionary subset
       |
       +---> Page sections receive dictionary subset as props
                    |
                    v
              Client Components (where needed)
              ================================
              - Framer Motion animations (use "use client")
              - Language switcher (uses usePathname)
              - Interactive elements (tabs, accordions)
```

**Key rule:** All components are Server Components by default. Only add `"use client"` for:
1. Framer Motion animations
2. Interactive UI (tabs, accordions, mobile menu)
3. `usePathname` in language switcher

**Dictionary flow:** Page fetches full dictionary, passes relevant subset to each section component. Never pass the entire dictionary to client components.

## Layout Structure

```typescript
// app/[locale]/layout.tsx
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale as 'de' | 'en')

  return (
    <html lang={locale} className="dark">
      <body className={`${fonts} font-sans antialiased`}>
        <div className="noise-overlay" aria-hidden="true" />
        <Navbar locale={locale} dict={dict.nav} />
        <main className="min-h-screen bg-zinc-950">
          {children}
        </main>
        <Footer locale={locale} dict={dict.footer} />
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }]
}
```

## Image Handling

- Use `next/image` for all images with explicit `width`/`height` or `fill`
- Store workflow screenshots in `public/images/workflows/`
- Use WebP format where possible for build-time optimization
- For the existing PNG screenshots, consider converting to WebP during build or manually beforehand
- Large hero images: use `priority` prop for LCP optimization

## Patterns to Follow

### Pattern 1: Section Component with Dictionary
```typescript
// components/pages/home/hero.tsx
interface HeroProps {
  dict: {
    title: string
    subtitle: string
    cta: string
  }
}

export function Hero({ dict }: HeroProps) {
  return (
    <SectionWrapper>
      <AnimatedHeading>{dict.title}</AnimatedHeading>
      <p>{dict.subtitle}</p>
      <Button>{dict.cta}</Button>
    </SectionWrapper>
  )
}
```

### Pattern 2: Client Animation Wrapper
```typescript
// components/shared/animated-heading.tsx
"use client"
import { motion } from "framer-motion"

export function AnimatedHeading({ children, as: Tag = "h2" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Tag>{children}</Tag>
    </motion.div>
  )
}
```

### Pattern 3: Language Switcher
```typescript
// components/shared/language-switcher.tsx
"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"

export function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname()
  const otherLocale = locale === 'de' ? 'en' : 'de'
  const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`)

  return (
    <Link href={newPath}>
      {otherLocale.toUpperCase()}
    </Link>
  )
}
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: next-intl for a 4-page site
**What:** Installing next-intl or similar full i18n framework
**Why bad:** Massive overhead (middleware configuration, provider setup, message compilation) for 4 pages with 2 languages. The dictionary pattern above covers everything needed.
**Instead:** Simple JSON + `getDictionary()` function.

### Anti-Pattern 2: Client-side dictionary loading
**What:** Sending the full translation JSON to the client
**Why bad:** Increases bundle size, adds loading flash, no SEO benefit
**Instead:** Load dictionary server-side, pass only the needed strings as props to client components.

### Anti-Pattern 3: Duplicating page files per locale
**What:** Having `app/de/page.tsx` AND `app/en/page.tsx` with separate code
**Why bad:** Every change requires updating two files. Drift is inevitable.
**Instead:** Single `app/[locale]/page.tsx` with dictionary-driven content.

### Anti-Pattern 4: Wrapping everything in "use client"
**What:** Making all components client components for Framer Motion
**Why bad:** Loses server rendering benefits, increases JS bundle
**Instead:** Keep section components as server components. Only the animation wrapper (`AnimatedHeading`, `SectionWrapper` with motion) needs `"use client"`.

## Build Order (Implementation Sequence)

This directly informs roadmap phase ordering:

| Order | What | Why First |
|-------|------|-----------|
| 1 | i18n infrastructure (`lib/i18n/`, middleware, `[locale]` layout) | Everything depends on this routing structure |
| 2 | Shared components (Navbar, Footer, SectionWrapper, LanguageSwitcher) | Every page needs these |
| 3 | Home page (adapt existing v0 sections) | Lowest risk -- adapting existing code |
| 4 | Technical Deep-Dive page | Most content-rich, benefits from patterns established in step 3 |
| 5 | Results/Finance page | Charts/metrics may need additional libraries |
| 6 | About page | Simplest content page, can be done last |
| 7 | Polish (animations, SEO meta, OG images, performance) | Cross-cutting concerns after all pages exist |

## Static Export Consideration

Since this is a showcase site with no dynamic data, consider `output: 'export'` in `next.config.ts` for static HTML generation. This allows hosting on any static host (GitHub Pages, Netlify, simple server) without a Node.js runtime. The `generateStaticParams` approach works perfectly with static export.

**Caveat:** If using `output: 'export'`, middleware does not run. The root `/` redirect must be done with a client-side redirect in `app/page.tsx` or a simple meta refresh.

## Sources

- Next.js App Router documentation (official pattern for i18n with `[locale]` segment)
- Existing project codebase analysis (`Web design/` directory)
- Next.js `generateStaticParams` documentation for static generation
- shadcn/ui component library conventions
