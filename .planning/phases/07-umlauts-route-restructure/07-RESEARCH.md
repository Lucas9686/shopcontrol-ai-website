# Phase 7: Umlauts & Route Restructure - Research

**Researched:** 2026-01-31
**Domain:** Next.js i18n (next-intl), routing, JSON translation files
**Confidence:** HIGH

## Summary

This phase involves two distinct tasks: (1) replacing ASCII-encoded umlauts with real Unicode characters in translation JSON files, and (2) restructuring the app's routes and navigation. Both are well-understood operations with no complex dependencies.

The webapp uses Next.js App Router with `next-intl` for i18n. Routes are filesystem-based under `webapp/app/[locale]/`. Navigation is defined in `webapp/components/shared/navbar.tsx` with a `navItems` array. Translation strings live in `webapp/messages/de.json` and `webapp/messages/en.json`.

**Primary recommendation:** Do umlaut replacement first (pure text change, no structural risk), then restructure routes and navigation.

## Standard Stack

Already in use -- no new libraries needed:

| Library | Purpose | Relevant File |
|---------|---------|---------------|
| next-intl | i18n routing & translations | `webapp/i18n/routing.ts`, `webapp/i18n/navigation.ts` |
| Next.js App Router | Filesystem-based routing | `webapp/app/[locale]/` |

## Architecture Patterns

### Current Route Structure
```
webapp/app/[locale]/
├── page.tsx           # / (home)
├── about/             # /about
├── impressum/         # /impressum
├── problem/           # /problem      ← REMOVE
├── results/           # /results
├── solution/          # /solution     ← REMOVE
└── technology/        # /technology
```

### Target Route Structure
```
webapp/app/[locale]/
├── page.tsx           # / (home)
├── about/             # /about        (keep)
├── impressum/         # /impressum    (keep)
├── support-agent/     # /support-agent (NEW - replaces /problem + /solution support part)
├── accounting/        # /accounting   (NEW - replaces /solution accounting part)
├── technology/        # /technology   (keep)
├── results/           # /results      (keep)
└── finance-plan/      # /finance-plan (NEW)
```

### Navigation Update
Current `navItems` in `webapp/components/shared/navbar.tsx`:
```typescript
const navItems = [
  { key: "home", href: "/" },
  { key: "problem", href: "/problem" },
  { key: "solution", href: "/solution" },
  { key: "technology", href: "/technology" },
  { key: "results", href: "/results" },
  { key: "about", href: "/about" },
] as const;
```

Target:
```typescript
const navItems = [
  { key: "home", href: "/" },
  { key: "supportAgent", href: "/support-agent" },
  { key: "accounting", href: "/accounting" },
  { key: "technology", href: "/technology" },
  { key: "results", href: "/results" },
  { key: "financePlan", href: "/finance-plan" },
  { key: "about", href: "/about" },
] as const;
```

### Translation Key Updates
Navigation keys in both de.json and en.json must be updated:
```json
"nav": {
  "home": "Startseite",
  "supportAgent": "Supportagent",
  "accounting": "Buchhaltungstool",
  "technology": "Technologien",
  "results": "Ergebnisse",
  "financePlan": "Finanzplan",
  "about": "Über uns"
}
```

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Umlaut replacement | Manual find-replace per word | Systematic ae->ä, oe->ö, ue->ü, ss->ß with careful review | German has words where "ue" is not "ü" (e.g., "abenteuer") -- but in this codebase all instances are ASCII-encoded umlauts |
| Route redirects | Custom redirect logic | Not needed -- old routes can simply be deleted since this is a pre-launch project | No SEO to preserve |

## Common Pitfalls

### Pitfall 1: False Positive Umlaut Replacements
**What goes wrong:** Blindly replacing "ss" with "ß" or "ue" with "ü" breaks words where those are actual letter combinations, not encoded umlauts.
**Why it happens:** German has words like "Strasse" (should be Straße) but also "Resse" or English words with "ss".
**How to avoid:** Review each replacement in context. For de.json: `ss->ß` is valid for "grosser"->"großer", "Strasse"->"Straße". For en.json: English text should NOT have umlauts -- only check for German words that leaked into en.json (like "Lastenstrasse").
**Warning signs:** Words that look wrong after replacement.

### Pitfall 2: Forgetting Internal Links
**What goes wrong:** Pages may link to `/problem` or `/solution` in body content, not just navigation.
**How to avoid:** Search entire codebase for "/problem" and "/solution" string references.

### Pitfall 3: Translation Key Mismatch
**What goes wrong:** Changing nav keys in JSON but not in navbar component (or vice versa).
**How to avoid:** Update both files atomically. Test that `t("supportAgent")` resolves.

### Pitfall 4: New Route Pages Missing Content
**What goes wrong:** Creating route directories without meaningful page content.
**How to avoid:** New pages (support-agent, accounting, finance-plan) need content. Content can be derived from existing problem/solution pages which cover these topics.

## Code Examples

### Creating a New Route Page
```typescript
// webapp/app/[locale]/support-agent/page.tsx
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default function SupportAgentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // Same pattern as existing pages
}
```

### Umlaut Replacement Map (de.json)
```
Key replacements:
  oe -> ö  (Loesung -> Lösung, koennen -> können, Oesterreich -> Österreich)
  ue -> ü  (Ueber -> Über, fuer -> für, gestuetzte -> gestützte, pruefen -> prüfen)
  ae -> ä  (waehrend -> während, Saeulen -> Säulen, haengt -> hängt)
  ss -> ß  (grosser -> großer, Strasse -> Straße)

Special care:
  "ss" in "Wissen", "Ressel" etc. should NOT become ß
  "ue" in compound words -- verify each occurrence
```

## State of the Art

No technology changes needed. This is purely a content and structure refactor.

## Open Questions

1. **Content for new pages:** Where does content for `/support-agent`, `/accounting`, and `/finance-plan` come from?
   - What we know: Current `/problem` and `/solution` pages contain relevant content split across them
   - Recommendation: Redistribute existing content from problem/solution into the new page structure. Finance-plan is new content.

2. **"Technologie" vs "Technologien":** Nav target says "Technologien" (plural) but current route is `/technology` (singular).
   - Recommendation: Keep route as `/technology`, just update the display label in de.json nav to "Technologien".

## Sources

### Primary (HIGH confidence)
- Direct codebase inspection of all relevant files
- `webapp/messages/de.json` -- 265 lines, ~72 lines contain ASCII-encoded umlauts
- `webapp/messages/en.json` -- English translations (minimal umlaut issues, mainly in proper nouns like "Lastenstrasse")
- `webapp/components/shared/navbar.tsx` -- current navItems array
- `webapp/app/[locale]/` -- current filesystem routes
- `webapp/i18n/routing.ts` -- next-intl routing config (locales: de, en)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - already in use, no new deps
- Architecture: HIGH - direct codebase inspection
- Pitfalls: HIGH - well-known German text encoding issues

**Research date:** 2026-01-31
**Valid until:** 2026-03-31 (stable, no external dependencies)
