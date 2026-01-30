---
phase: 02-core-content-pages
plan: 01
subsystem: content-pages
tags: [next-intl, framer-motion, shadcn, content]
dependency-graph:
  requires: [01-01]
  provides: [problem-page, solution-page, shared-components, workflow-images]
  affects: [02-02, 02-03, 03]
tech-stack:
  added: []
  patterns: [server-component-pages, getTranslations, FadeInSection-scroll-reveal]
key-files:
  created:
    - app/[locale]/problem/page.tsx
    - app/[locale]/solution/page.tsx
    - components/shared/section-header.tsx
    - components/shared/fade-in-section.tsx
    - components/features/feature-card.tsx
    - public/images/workflows/ (12 files)
    - public/images/diagrams/ (2 files)
  modified:
    - messages/de.json
    - messages/en.json
decisions:
  - Used FeatureCard for problem challenges, inline Card for solution pillars (pillars need feature lists)
  - Kebab-case image naming convention for public/images/
metrics:
  duration: 5min
  completed: 2026-01-31
---

# Phase 02 Plan 01: Problem & Solution Pages Summary

Bilingual problem/solution pages with reusable shared components and 14 workflow/diagram images in public/.

## What Was Done

### Task 1: Copy images and create shared components
- Copied 12 workflow screenshots from "Neu Bilder/" to `public/images/workflows/` with kebab-case names
- Copied 2 diagram images to `public/images/diagrams/`
- Created `SectionHeader` (server component: centered h2 + optional subtitle)
- Created `FadeInSection` (client component: Framer Motion scroll-reveal wrapper)
- Created `FeatureCard` (server component: icon + Card with title/description)
- **Commit:** c845007

### Task 2: Create problem and solution pages with translations
- Added full `problem` and `solution` translation namespaces to de.json and en.json
- Problem page: intro paragraph, 3 challenge cards (Headphones/Calculator/TrendingUp icons), conclusion callout
- Solution page: 2 pillar cards (Bot/FileSpreadsheet) with 4-feature checklists each, tech stack badges
- Both pages follow existing async server component pattern with `setRequestLocale`
- **Commit:** 7afe1b3

## Deviations from Plan

None - plan executed exactly as written.

## Verification

- `npm run build` succeeds with `/de/problem`, `/en/problem`, `/de/solution`, `/en/solution` all statically generated
- All 14 images present in public/images/

## Next Phase Readiness

Shared components (SectionHeader, FadeInSection, FeatureCard) are ready for reuse in 02-02 and 02-03.
