# Phase 8: Supportagent & Buchhaltungstool Pages - Research

**Researched:** 2026-01-31
**Domain:** Next.js page creation with next-intl, content restructuring
**Confidence:** HIGH

## Summary

This phase is primarily a content-authoring and page-restructuring task, not a technology-discovery task. Both pages already exist as placeholder stubs (`support-agent/page.tsx`, `accounting/page.tsx`) with translation namespaces (`supportAgent`, `accounting`) containing only `title` and `placeholder` keys. All required components already exist: `WorkflowStep`, `SectionHeader`, `FadeInSection`, `FeatureCard`, `ScreenshotFigure`.

The main work is: (1) build out the two page components using existing patterns from the Technology page, (2) write DE+EN translation content, (3) copy 2 images for accounting, (4) restructure Technology page to become a general overview with links, and (5) create a new vertical-timeline WorkflowStep variant (context says "vertical timeline with numbered steps and images below" NOT alternating left/right).

**Primary recommendation:** Clone the Technology page pattern for Supportagent, create a new `WorkflowStepVertical` component for the vertical timeline layout, then simplify Technology page to a high-level overview.

## Standard Stack

No new libraries needed. Everything uses the existing stack.

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next-intl | existing | i18n translations | Already used project-wide |
| next/image | existing | Optimized images | Already used in all components |
| framer-motion | existing | FadeInSection animations | Already used project-wide |
| lucide-react | existing | Icons for FeatureCard | Already used on Technology page |

### Supporting
No additional libraries needed.

## Architecture Patterns

### Existing Component Inventory (reuse these)

| Component | Location | Props | Use For |
|-----------|----------|-------|---------|
| `WorkflowStep` | `components/technology/workflow-step.tsx` | `number, title, description, imageSrc, imageAlt, reverse` | Alternating left/right layout (Technology page only) |
| `SectionHeader` | `components/shared/section-header.tsx` | `title, subtitle?, className?` | Section headings on all pages |
| `FadeInSection` | `components/shared/fade-in-section.tsx` | `children, delay?, className?` | Scroll-reveal wrapper |
| `FeatureCard` | `components/features/feature-card.tsx` | `icon (LucideIcon), title, description` | Card grids (RAG, tools, security) |
| `ScreenshotFigure` | `components/technology/screenshot-figure.tsx` | `src, alt, caption?, width?, height?` | Standalone screenshots with captions |

### Pattern: New Vertical Timeline Step Component

The CONTEXT.md specifies "vertical timeline with numbered steps and images below each step (NOT the alternating left/right pattern)." The existing `WorkflowStep` uses a 2-column grid with alternating `reverse`. A new component is needed.

```typescript
// components/shared/workflow-step-vertical.tsx
interface WorkflowStepVerticalProps {
  number: number;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export function WorkflowStepVertical({
  number, title, description, imageSrc, imageAlt
}: WorkflowStepVerticalProps) {
  return (
    <FadeInSection>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
            {number}
          </span>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
        <div className="overflow-hidden rounded-lg border border-border">
          <Image src={imageSrc} alt={imageAlt} width={1200} height={675} className="w-full" />
        </div>
      </div>
    </FadeInSection>
  );
}
```

### Pattern: Page Structure (Both Pages)

```typescript
// Same async server component pattern as all other pages
export default async function SupportAgentPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("supportAgent");

  return (
    <article className="mx-auto max-w-5xl px-4 pt-24 pb-16">
      {/* 1. Problem Hero */}
      {/* 2. Solution Summary */}
      {/* 3. Step-by-step Workflow (vertical timeline) */}
      {/* 4. Brief sections (RAG, Tools, Security) with links */}
    </article>
  );
}
```

### Pattern: Translation Key Structure

```json
{
  "supportAgent": {
    "title": "...",
    "subtitle": "...",
    "problem": { "title": "...", "description": "..." },
    "solution": { "title": "...", "description": "..." },
    "workflow": {
      "title": "...",
      "step1": { "title": "...", "description": "..." },
      ...
    },
    "rag": { "title": "...", "description": "...", "link": "..." },
    "tools": { "title": "...", "description": "...", "link": "..." },
    "security": { "title": "...", "description": "...", "link": "..." }
  }
}
```

### Pattern: Technology Page Restructure

Current Technology page has: overview, 6 workflow steps, RAG section, Tools section, Security section.

New Technology page should become: high-level tech stack overview, architecture summary, links to `/support-agent` and `/accounting` for details. Remove the 6 workflow steps, RAG details, tools details, security details (those move to support-agent page).

### File Organization

```
webapp/
├── app/[locale]/
│   ├── support-agent/page.tsx    # Expand from stub
│   ├── accounting/page.tsx       # Expand from stub
│   └── technology/page.tsx       # Simplify to overview
├── components/
│   ├── technology/
│   │   ├── workflow-step.tsx          # Keep (maybe unused after refactor)
│   │   └── screenshot-figure.tsx      # Keep, reuse
│   └── shared/
│       └── workflow-step-vertical.tsx  # NEW - vertical timeline variant
├── messages/
│   ├── de.json                   # Add supportAgent + accounting sections
│   └── en.json                   # Add supportAgent + accounting sections
└── public/images/
    ├── workflows/                # Existing, used by support-agent page
    └── accounting/               # NEW directory
        ├── workflow-overview.png  # Copy from Matrealien
        └── workflow-n8n.png      # Copy from Matrealien
```

### Anti-Patterns to Avoid
- **Duplicating translation content between Technology and Supportagent pages:** Move content, don't copy. Technology page should link out, not repeat.
- **Using alternating layout for new pages:** Context explicitly says vertical timeline, not left/right alternating.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Custom img tags | `next/image` via existing components | Already handles lazy loading, sizing |
| Scroll animations | Custom intersection observer | `FadeInSection` component | Already wraps framer-motion |
| Section headers | Custom h2 styling | `SectionHeader` component | Consistent styling |
| Screenshot display | Custom figure elements | `ScreenshotFigure` component | Consistent border, caption |

**Key insight:** Every visual pattern needed already exists as a component. The only new component needed is the vertical timeline variant of WorkflowStep.

## Common Pitfalls

### Pitfall 1: Forgetting to Update Both Language Files
**What goes wrong:** Adding DE translations but missing EN, or vice versa.
**How to avoid:** Write both DE and EN translations in the same task. Test both locales.
**Warning signs:** Build warnings about missing translation keys.

### Pitfall 2: Breaking Technology Page Links
**What goes wrong:** Removing content from Technology page but not adding links to new pages, leaving dead ends.
**How to avoid:** Restructure Technology page in same task batch as new pages, with explicit cross-links.

### Pitfall 3: Image Paths
**What goes wrong:** Images referenced but not at correct path. The public dir is `webapp/public/`, so image paths in code are relative to that (e.g., `/images/workflows/...`).
**How to avoid:** Verify images exist at `webapp/public/images/workflows/` and `webapp/public/images/accounting/` before referencing.

### Pitfall 4: Translation Namespace Mismatch
**What goes wrong:** Page calls `getTranslations("supportAgent")` but JSON key is different.
**How to avoid:** Existing stubs already use `supportAgent` and `accounting` namespaces. Keep these exact names.

### Pitfall 5: Accounting Images Not Copied
**What goes wrong:** Referencing `/images/accounting/workflow-overview.png` but file was never copied from Matrealien.
**How to avoid:** First task should copy images, verify they exist, then build the page.

## Code Examples

### Existing Page Pattern (from Technology page)
```typescript
// Server component with next-intl
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("namespace");
  // ... render with t("key")
}
```

### Steps Array Pattern (from Technology page)
```typescript
const steps = [
  { key: "step1", image: "/images/workflows/get-emails.png" },
  { key: "step2", image: "/images/workflows/filter-sektion.png" },
  // ...
] as const;

// Render with map
{steps.map((step, i) => (
  <WorkflowStepVertical
    key={step.key}
    number={i + 1}
    title={t(`workflow.${step.key}.title`)}
    description={t(`workflow.${step.key}.description`)}
    imageSrc={step.image}
    imageAlt={t(`workflow.${step.key}.title`)}
  />
))}
```

## Existing Images Inventory

### Support Agent (all exist at `webapp/public/images/workflows/`)
| File | Used For |
|------|----------|
| `get-emails.png` | Step 1: E-Mail-Abruf |
| `filter-sektion.png` | Step 2: Filterung |
| `bildanalyse-sektion.png` | Step 3: Bild-Analyse |
| `support-agent-mit-tools.png` | Step 4: Agent-Verarbeitung |
| `send-emails.png` | Step 5: E-Mail-Versand |
| `performance-logging.png` | Step 6: Performance-Logging |
| `rag-upload.png` | RAG section |
| `error-trigger.png` | Security section |

### Accounting (need to copy from Matrealien)
| Source | Target | Used For |
|--------|--------|----------|
| `Matrealien/Buchaltungs_workflow_ablauf.png` | `webapp/public/images/accounting/workflow-overview.png` | Workflow overview |
| `Matrealien/Buchhaltungs_Workflow_in_N8N.png` | `webapp/public/images/accounting/workflow-n8n.png` | N8N workflow screenshot |

### Note on Accounting Page
Only 2 images available for 5 workflow steps. Some steps will not have screenshots. The planner should decide whether to use the 2 images at specific steps or show one as overview and one inline.

## Content Source

All page content comes from the existing Technology page translations (DE) which already contain the full 6-step workflow, RAG, tools, and security text. The EN translations mirror this. For the Buchhaltungstool, content exists in `de.json` under `hero.problems.accounting` and `hero.solutions.accounting` but is brief -- detailed step content needs to be written from the Projektbericht.

### Existing Translation Keys to Move/Reuse
- `technology.workflow.*` -> `supportAgent.workflow.*`
- `technology.rag.*` -> `supportAgent.rag.*` (abbreviated)
- `technology.tools.*` -> `supportAgent.tools.*` (abbreviated)
- `technology.security.*` -> `supportAgent.security.*` (abbreviated)

## Open Questions

1. **Buchhaltungstool 5-step content details**
   - What we know: Only 2 images and brief hero text exist. Need 5 detailed workflow steps.
   - What's unclear: Exact content for each of the 5 steps. The Projektbericht (docx) is the source but cannot be read programmatically.
   - Recommendation: Planner should include a task to extract/write Buchhaltungstool content from Projektbericht. The implementer will need to read the docx or the user will need to provide the step-by-step text.

2. **Technology page new content**
   - What we know: It should become a general tech overview with links.
   - What's unclear: Exact new content for the simplified Technology page.
   - Recommendation: Keep it minimal -- tech stack list, brief architecture paragraph, prominent links to both detail pages.

## Sources

### Primary (HIGH confidence)
- Codebase inspection: all existing components, pages, translations, and image files
- CONTEXT.md: locked decisions on layout, image handling, content overlap

### Secondary (MEDIUM confidence)
- None needed -- this is a content task using established patterns

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - no new libraries, fully existing stack
- Architecture: HIGH - patterns directly observed from Technology page code
- Pitfalls: HIGH - based on concrete codebase analysis

**Research date:** 2026-01-31
**Valid until:** 2026-03-01 (stable -- content pages, no dependency changes)
