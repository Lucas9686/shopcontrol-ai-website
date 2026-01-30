# Phase 2: Core Content Pages - Research

**Researched:** 2026-01-30
**Domain:** Next.js App Router content pages with next-intl i18n
**Confidence:** HIGH

## Summary

Phase 2 adds 5 content pages to the existing Next.js 16 + next-intl app: problem, solution (features), technology (deep-dive), about, and impressum/datenschutz. The foundation from Phase 1 provides the layout, navbar (already linking to `/problem`, `/solution`, `/technology`, `/results`, `/about`), footer, and i18n infrastructure.

The primary work is: (1) create page files under `app/[locale]/[page]/page.tsx`, (2) add translation keys to `de.json` and `en.json`, (3) copy screenshot images to `public/`, and (4) build reusable section components. No new libraries are needed -- everything uses the existing stack.

**Primary recommendation:** Create each page as a server component using `getTranslations`, compose from shared section components (SectionHeader, FeatureCard, WorkflowStep), and store all images in `public/images/`.

## Standard Stack

### Core (already installed, no changes needed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.0.10 | Framework, App Router, next/image | Already in project |
| next-intl | 4.8.1 | i18n with `getTranslations` (server) / `useTranslations` (client) | Already set up |
| tailwindcss | 4.1.9 | Styling | Already in project |
| framer-motion | 12.24.5 | Scroll animations, page transitions | Already in project |
| lucide-react | 0.454.0 | Icons for feature cards | Already in project |
| shadcn/ui components | - | Card, Badge, Tabs, Accordion | Already in project |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @radix-ui/react-tabs | 1.1.2 | Tab component for technology deep-dive sections | Already installed |
| @radix-ui/react-accordion | 1.2.2 | Expandable sections for workflow steps | Already installed |

### Alternatives Considered
No new libraries needed. Everything required is already installed.

**Installation:**
```bash
# No installation needed -- all dependencies already present
```

## Architecture Patterns

### Recommended Project Structure
```
app/[locale]/
├── page.tsx                    # Landing (exists)
├── problem/page.tsx            # CONT-01: Problem statement
├── solution/page.tsx           # CONT-02: Feature overview
├── technology/page.tsx         # CONT-03: Technical deep-dive
├── about/page.tsx              # META-01: About page
├── impressum/page.tsx          # META-02: Impressum/Datenschutz
components/
├── shared/
│   ├── navbar.tsx              # (exists)
│   ├── footer.tsx              # (exists)
│   └── section-header.tsx      # NEW: reusable section title + subtitle
├── features/
│   ├── feature-card.tsx        # Card with icon + title + description
│   └── feature-grid.tsx        # Grid layout for feature cards
├── technology/
│   ├── workflow-step.tsx       # Numbered step with screenshot
│   ├── workflow-timeline.tsx   # Vertical timeline of steps
│   └── screenshot-figure.tsx   # Image with caption, lightbox-ready
messages/
├── de.json                     # Add keys for all new pages
├── en.json                     # Add keys for all new pages
public/
├── images/
│   ├── workflows/              # n8n workflow screenshots
│   ├── diagrams/               # Architecture diagrams
│   └── team/                   # Team/author photos
```

### Pattern 1: Server Component Page with Translations
**What:** Each content page is an async server component using `getTranslations`
**When to use:** Every page in this phase
**Example:**
```typescript
// Source: existing app/[locale]/page.tsx pattern from Phase 1
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("problem");

  return (
    <article className="mx-auto max-w-4xl px-4 py-24">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{t("intro")}</p>
      {/* sections */}
    </article>
  );
}
```

### Pattern 2: Namespaced Translation Keys
**What:** Each page gets its own top-level namespace in messages JSON
**When to use:** All content pages
**Example:**
```json
{
  "problem": {
    "title": "Das Problem",
    "intro": "Kleine Online-Shops stehen vor...",
    "challenges": {
      "support": "24/7 Kundenservice...",
      "accounting": "Manuelle Buchhaltung..."
    }
  },
  "solution": {
    "title": "Die Lösung",
    "supportAgent": { "title": "...", "description": "..." },
    "buchhaltung": { "title": "...", "description": "..." }
  }
}
```

### Pattern 3: Screenshot Images with next/image
**What:** Use `next/image` for all screenshots with proper alt text
**When to use:** Technology deep-dive page with workflow screenshots
**Example:**
```typescript
import Image from "next/image";

<figure className="my-8 overflow-hidden rounded-lg border border-border">
  <Image
    src="/images/workflows/gesamter-workflow.png"
    alt={t("workflow.screenshot_alt")}
    width={1200}
    height={675}
    className="w-full"
  />
  <figcaption className="bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
    {t("workflow.caption")}
  </figcaption>
</figure>
```
Note: `images.unoptimized: true` is set in next.config.mjs, so next/image works without optimization server.

### Pattern 4: Framer Motion Scroll Reveal
**What:** Animate sections on scroll entry
**When to use:** Feature cards, workflow steps, any visual section
**Example:**
```typescript
"use client";
import { motion } from "framer-motion";

export function FadeInSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
```

### Anti-Patterns to Avoid
- **Putting all content inline in page.tsx:** Extract reusable section components, keep pages as composition of sections
- **Using client components for static content:** Pages should be server components; only wrap animation wrappers as client components
- **Hardcoding text:** ALL visible text must go through next-intl translations, even legal text on impressum

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Icon system | Custom SVG sprite | lucide-react | Already installed, 1000+ icons |
| Image optimization | Manual resize/compress | next/image (unoptimized mode) | Handles lazy loading, sizing, alt text |
| Card layouts | Custom div grids | shadcn/ui Card + Tailwind grid | Consistent styling, accessible |
| Tabbed content | Custom tab state | Radix Tabs (via shadcn) | Keyboard nav, ARIA, already installed |
| Expandable sections | Custom toggle state | Radix Accordion (via shadcn) | Already installed, accessible |
| Scroll animations | Custom IntersectionObserver | Framer Motion whileInView | Already installed, handles variants |

**Key insight:** The shadcn/ui template already provides Card, Tabs, Accordion, Badge, and other components. Use them rather than building custom layouts.

## Common Pitfalls

### Pitfall 1: Forgetting setRequestLocale in Every Page
**What goes wrong:** Static generation fails without `setRequestLocale(locale)` call
**Why it happens:** Easy to forget when creating new page files
**How to avoid:** Every page.tsx must call `setRequestLocale(locale)` before any `getTranslations` call
**Warning signs:** Build errors about missing locale context

### Pitfall 2: Missing Translation Keys
**What goes wrong:** Page shows raw key strings like "problem.title" instead of content
**Why it happens:** Adding page component but forgetting to add keys to both de.json and en.json
**How to avoid:** Always update BOTH language files simultaneously. Add all keys before building the component.
**Warning signs:** Raw key strings visible in browser

### Pitfall 3: Images Not in public/ Directory
**What goes wrong:** Screenshots from "Neu Bilder/" won't load in the browser
**Why it happens:** The source images are in project root "Neu Bilder/" folder, not in public/
**How to avoid:** Copy and rename all needed images to `public/images/` before referencing them
**Warning signs:** Broken image icons, 404 in network tab

### Pitfall 4: Page Top Cut Off by Fixed Navbar
**What goes wrong:** First heading hidden behind the fixed floating navbar
**Why it happens:** Navbar is `fixed top-4` with no scroll offset on pages
**How to avoid:** Every page needs `pt-24` (or similar) top padding to clear the navbar
**Warning signs:** Content starts behind the navbar

### Pitfall 5: Navbar Links Not Matching Page Routes
**What goes wrong:** Navbar already links to `/problem`, `/solution`, `/technology`, `/results`, `/about` -- page folder names must match exactly
**Why it happens:** Creating pages with different slugs than navbar expects
**How to avoid:** Use exact route names from navbar: `problem`, `solution`, `technology`, `about`, plus new `impressum`
**Warning signs:** 404 when clicking navbar links

## Code Examples

### Content Page Skeleton
```typescript
// app/[locale]/problem/page.tsx
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("problem");

  return (
    <article className="mx-auto max-w-4xl px-4 pt-24 pb-16">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
      </header>
      {/* Page-specific sections */}
    </article>
  );
}
```

### Feature Card Component
```typescript
// components/features/feature-card.tsx
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="border-border bg-card/50">
      <CardHeader>
        <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="size-5 text-primary" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
```

### Workflow Step with Screenshot
```typescript
// components/technology/workflow-step.tsx
import Image from "next/image";

interface WorkflowStepProps {
  number: number;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export function WorkflowStep({ number, title, description, imageSrc, imageAlt }: WorkflowStepProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <div className="mb-2 flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
          {number}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </div>
      <figure className="overflow-hidden rounded-lg border border-border">
        <Image src={imageSrc} alt={imageAlt} width={600} height={338} className="w-full" />
      </figure>
    </div>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `pages/` directory routing | `app/[locale]/` App Router | Next.js 13+ | All pages use folder-based routing |
| `useTranslations` everywhere | `getTranslations` for server components | next-intl 3+ | Server components are default, only animation wrappers need "use client" |
| Manual `params.locale` | `params: Promise<{ locale: string }>` + await | Next.js 15+ | Params are async in latest Next.js |

## Open Questions

1. **Content extraction from Projektbericht PDF**
   - What we know: 27-page PDF exists with all content for problem, solution, technology sections
   - What's unclear: Exact text to use for each page (needs human decision on what to include/exclude)
   - Recommendation: Planner should create tasks that reference specific content sections from the PDF

2. **Images for about page**
   - What we know: public/ has placeholder headshots but no actual team photos
   - What's unclear: Whether real photos of Lucas Nessel / supervisors are available
   - Recommendation: Use placeholder approach with easy swap path

3. **Legal text for Impressum/Datenschutz**
   - What we know: META-02 requires legally required information
   - What's unclear: Exact legal text content
   - Recommendation: Create page structure with placeholder text that user fills in

## Sources

### Primary (HIGH confidence)
- Existing codebase: `app/[locale]/page.tsx`, `app/[locale]/layout.tsx`, `components/shared/navbar.tsx` -- verified patterns
- `package.json` -- confirmed all library versions
- `next.config.mjs` -- confirmed image config and next-intl plugin setup
- `messages/de.json` -- confirmed translation structure

### Secondary (MEDIUM confidence)
- next-intl server component pattern with `getTranslations` + `setRequestLocale` -- verified from Phase 1 working code

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all libraries already installed and verified in Phase 1
- Architecture: HIGH - follows established patterns from Phase 1 page.tsx and layout.tsx
- Pitfalls: HIGH - derived from actual codebase inspection (fixed navbar, existing routes, image locations)

**Research date:** 2026-01-30
**Valid until:** 2026-03-01 (stable, no library changes expected)
