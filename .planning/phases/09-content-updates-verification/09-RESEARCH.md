# Phase 9: Content Updates & Verification - Research

**Researched:** 2026-01-31
**Domain:** Content authoring, page restructuring, PDF-to-website content verification
**Confidence:** HIGH

## Summary

Phase 9 is a content-focused phase with six tasks: (1) build out the Finanzplan page from its current placeholder stub, (2) restructure the Ergebnisse page to remove financial content, (3) update the Startseite with CTAs to the new site structure, (4) verify the Technologien page against the Projektbericht, (5) verify the Ueber-uns page, and (6) cross-check all text against both PDFs.

The codebase is mature with established patterns. All components needed already exist. The primary work is content writing in DE+EN translation JSON files and page component updates. The Finanzplan page is currently a stub with only `title` and `placeholder` keys. The Results page currently contains the entire financial plan (charts, pricing, forecast, scenario) which must be moved to the Finanzplan page. Existing Recharts chart components can be reused directly.

**Primary recommendation:** Move financial chart sections from Results page to Finanzplan page, add Kostenstruktur and Geschaeftsmodell content from PDFs, update Results page to show Ergebnisse/Markt/Zielgruppe/Geschaeftsmodell, update Startseite CTAs, then do a systematic verification pass against both PDFs.

## Standard Stack

No new libraries needed. Everything uses the existing stack.

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next-intl | existing | i18n translations | Already used project-wide |
| recharts | existing | Financial charts | Already used for 3 chart components |
| framer-motion | existing | FadeInSection animations | Already used project-wide |
| lucide-react | existing | Icons | Already used on all pages |
| shadcn/ui | existing | Card, Badge components | Already used on all pages |

## Architecture Patterns

### Current Page State Analysis

| Page | File | Lines | Current State | Phase 9 Work |
|------|------|-------|---------------|--------------|
| Finanzplan | `app/[locale]/finance-plan/page.tsx` | 25 | Placeholder stub | Build full page with charts |
| Ergebnisse | `app/[locale]/results/page.tsx` | 124 | Contains financial charts | Remove financials, add Zielgruppe/Geschaeftsmodell |
| Startseite | `app/[locale]/page.tsx` | 55 | Hero + demo video | Add CTAs to new pages |
| Technologien | `app/[locale]/technology/page.tsx` | 98 | Tech overview + detail links | Verify content accuracy |
| Ueber uns | `app/[locale]/about/page.tsx` | 96 | Author/school/supervisors | Verify content accuracy |

### Existing Chart Components (move to Finanzplan)

| Component | File | Props (labels) | Data |
|-----------|------|----------------|------|
| `PricingComparisonChart` | `components/results/pricing-comparison-chart.tsx` | title, description, labels (basic/pro/enterprise/pricePerMonth) | Hardcoded |
| `RevenueForecastChart` | `components/results/revenue-forecast-chart.tsx` | title, description, labels (revenue/costs/year1-3) | Hardcoded |
| `ScenarioChart` | `components/results/scenario-chart.tsx` | title, description, labels (optimistic/realistic/pessimistic/year1-3) | Hardcoded |

These components import from `@/components/results/` -- after moving to Finanzplan page, the import paths stay the same (components stay in place, only the page importing them changes).

### Translation Key Structure Changes

**Current `results` namespace** contains both market/results AND financial plan content. Phase 9 must:
1. Move `results.financials.*` and `results.charts.*` keys to new `financePlan.*` namespace
2. Add new keys for Kostenstruktur, Zielgruppe, Geschaeftsmodell to appropriate namespaces
3. Keep `results.market.*` and expand with Zielgruppe and Geschaeftsmodell

**New `financePlan` namespace structure:**
```json
{
  "financePlan": {
    "title": "Finanzplan",
    "subtitle": "...",
    "costs": {
      "title": "Kostenstruktur",
      "subtitle": "...",
      "tokenCosts": { ... },
      "monthlyCosts": { ... },
      "comparison": { ... }
    },
    "pricing": {
      "title": "Preismodell",
      "description": "...",
      "starter": { ... },
      "pro": { ... },
      "enterprise": { ... }
    },
    "forecast": { "title": "...", "description": "..." },
    "scenario": { "title": "...", "description": "..." },
    "charts": { ... }
  }
}
```

### Startseite CTA Pattern

Current homepage has Hero + Demo Video. Needs overview cards linking to key pages. Use the same card-link pattern from Technology page's `detailPages` section:

```typescript
<Link href="/support-agent" className="group rounded-lg border ...">
  <h3>...</h3>
  <p>...</p>
</Link>
```

### Page Structure Pattern (all pages follow same pattern)

```typescript
export default async function Page({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("namespace");
  return (
    <article className="mx-auto max-w-5xl px-4 pt-24 pb-16">
      <header>...</header>
      <FadeInSection>...</FadeInSection>
    </article>
  );
}
```

## Content Discrepancies Found (PDF vs Website)

Based on comparing both PDFs against current `de.json` translations:

### Technology Page Discrepancies

| Item | Website (de.json) | PDF (Zusammenfassung) | Severity |
|------|-------------------|----------------------|----------|
| Vector DB | `technology.techStack.qdrant` says "Qdrant" | PDF Sec 7 says "Pinecone" | HIGH -- wrong DB name |
| LLM | `technology.techStack.openai` says "OpenAI GPT-4o" | PDF Sec 7 says "Claude / GPT" (both) | MEDIUM -- incomplete |
| Reranker | `technology.rag` mentions "Cohere Reranker" | PDF Sec 7 says just "Reranker" (no brand) | LOW |
| Hosting | Not on tech stack cards | PDF Sec 7 lists "Hostinger" for n8n hosting | LOW |
| Gmail API | Not on tech stack cards | PDF Sec 7 lists "Gmail API" | LOW |
| Telegram | Not on tech stack cards | PDF Sec 7 lists "Telegram" for error notifications | LOW |

**CRITICAL:** The Technology page currently says "Qdrant" as the vector database but both PDFs say "Pinecone". This is a factual error that must be fixed.

### About Page Discrepancies

| Item | Website (de.json) | PDF (Projektbericht) | Severity |
|------|-------------------|---------------------|----------|
| Supervisor 1 name | "Mag. Albin Weiss B.Sc." | "Mag. Albin Weiss B.Sc." (cover: "Weis" with one s) | LOW -- PDF itself inconsistent |
| School name | "HTL Lastenstrasse Klagenfurt" | "Hohere Technische Bundeslehranstalt Klagenfurt, Lastenstrasse 1" | LOW -- shortened is OK |
| Role | "Entwickler & Gruender" | PDF says "Betreiber eines eigenen Online-Shops" + "Gewerbeschein" | LOW |

### Results Page -- Content Gaps

The Results page currently has brief `market.results.description` and `market.differentiation.description` but is missing:
- **Zielgruppe** (PDF Sec 10): Kleine und mittlere Online-Shops im DACH-Raum
- **Geschaeftsmodell** (PDF Sec 11): SaaS-Loesung, Proof of Concept
- **Marktvergleichstabelle** (PDF Sec 9): Herkoemmliche Loesungen vs ShopControl AI

### Finanzplan Page -- Content Needed from PDFs

| Section | Source | Key Data Points |
|---------|--------|-----------------|
| Kostenstruktur | PDF Sec 12 | Token costs (4k/17k tokens), monthly costs (50-80 EUR), vs. human (800-1500 EUR) |
| Preismodell | PDF Sec 13 | Starter 149/99 EUR, Pro 249/179 EUR, Enterprise individuell, Marge 60-90% |
| Kernannahmen | PDF Sec 14 | 180 EUR avg revenue, 80-120 EUR CAC, 5-8% churn |
| Kundenentwicklung | PDF Sec 14 | 15/60/180 customers over 3 years |
| Kostenplanung | PDF Sec 14 | Personal 0/12k/36k, Server 1k/3k/8k, etc. |
| Ergebnisuebersicht | PDF Sec 14 | Revenue 32.4k/129.6k/388.8k, Profit 28.8k/106.1k/321.8k |
| Szenarioanalyse | PDF Sec 14 | Optimistisch vs Konservativ (40% Kunden) |

### Startseite -- Content Gaps

Current homepage has only Hero + Demo Video. Missing:
- Overview of both systems (Support-Agent + Buchhaltung)
- CTAs to key pages (Support-Agent, Buchhaltungstool, Ergebnisse, Finanzplan)
- Brief problem statement or value proposition

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Financial charts | Custom chart components | Existing `PricingComparisonChart`, `RevenueForecastChart`, `ScenarioChart` | Already built with Recharts, hardcoded data |
| Section layouts | Custom layouts | `FadeInSection` + `SectionHeader` + `Card` | Consistent with all other pages |
| Navigation links | Custom link components | `Link` from `@/i18n/navigation` | Handles locale-aware routing |
| Icon cards | Custom card layouts | `FeatureCard` component | Consistent styling |

## Common Pitfalls

### Pitfall 1: Forgetting to Update Both Language Files
**What goes wrong:** Adding DE translations but missing EN, or vice versa.
**How to avoid:** Write both DE and EN translations in the same task. The files are small (356 lines each), so it is manageable.
**Warning signs:** Missing translation key warnings at build time.

### Pitfall 2: Chart Data Mismatch with PDF Numbers
**What goes wrong:** Chart components have hardcoded data that may not match PDF numbers exactly.
**How to avoid:** Before moving charts to Finanzplan page, verify hardcoded data in chart components against PDF tables. Fix any discrepancies.
**Warning signs:** Numbers on website differ from PDF tables.

### Pitfall 3: Qdrant vs Pinecone Error
**What goes wrong:** Website says "Qdrant" but PDFs consistently say "Pinecone".
**How to avoid:** Search for "Qdrant" in codebase and replace with "Pinecone" in technology translations.
**Warning signs:** Tech stack card showing wrong vector database.

### Pitfall 4: Orphaned Translation Keys
**What goes wrong:** Moving financial content from `results.*` to `financePlan.*` but leaving old keys, creating confusion.
**How to avoid:** Remove old keys from `results` namespace after moving to `financePlan`.

### Pitfall 5: Broken Internal Links After Restructure
**What goes wrong:** CTA buttons or navigation links pointing to old content locations.
**How to avoid:** After restructuring, test all internal navigation links on every page.

### Pitfall 6: Supervisor Name Spelling
**What goes wrong:** PDF cover page says "Weiss" (with ss), body says "Weiss" too, but website summary PDF says "Weiss" -- need to verify which spelling is canonical.
**How to avoid:** The Projektbericht cover page says "Mag. Albin Weiss B.Sc." -- use this as the canonical spelling.

## Code Examples

### Moving Charts from Results to Finanzplan

```typescript
// finance-plan/page.tsx - import existing chart components
import { RevenueForecastChart } from "@/components/results/revenue-forecast-chart";
import { PricingComparisonChart } from "@/components/results/pricing-comparison-chart";
import { ScenarioChart } from "@/components/results/scenario-chart";

// Use same pattern as results/page.tsx but with financePlan namespace
const t = await getTranslations("financePlan");

<PricingComparisonChart
  title={t("pricing.title")}
  description={t("pricing.description")}
  labels={{
    basic: t("charts.basic"),
    pro: t("charts.pro"),
    enterprise: t("charts.enterprise"),
    pricePerMonth: t("charts.pricePerMonth"),
  }}
/>
```

### Adding Kostenstruktur Section (new content)

```typescript
// Tables using Card + simple HTML table or grid
<FadeInSection>
  <SectionHeader title={t("costs.title")} subtitle={t("costs.subtitle")} />
  <div className="mt-8 grid gap-6 md:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle>{t("costs.tokenCosts.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Token cost breakdown table */}
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>{t("costs.comparison.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Cost comparison: ShopControl AI vs human */}
      </CardContent>
    </Card>
  </div>
</FadeInSection>
```

### Startseite CTA Grid

```typescript
// Homepage overview section with links to key pages
<FadeInSection className="mt-16">
  <SectionHeader title={t("overview.title")} subtitle={t("overview.subtitle")} />
  <div className="mt-8 grid gap-6 md:grid-cols-2">
    {[
      { href: "/support-agent", key: "supportAgent" },
      { href: "/accounting", key: "accounting" },
      { href: "/results", key: "results" },
      { href: "/finance-plan", key: "financePlan" },
    ].map((item) => (
      <Link key={item.key} href={item.href} className="group rounded-lg border ...">
        <h3>{t(`overview.${item.key}.title`)}</h3>
        <p>{t(`overview.${item.key}.description`)}</p>
      </Link>
    ))}
  </div>
</FadeInSection>
```

## Verification Checklist (CONTENT-04)

Systematic comparison points for the final verification pass:

### Against Zusammenfassungs-PDF
| Section | PDF Chapter | Website Page | Key Facts to Check |
|---------|-------------|-------------|-------------------|
| Projekt-Uebersicht | Sec 1 | Hero/Startseite | Tagline, Kurzbeschreibung |
| Problem | Sec 2 | Problem sections | 80% wiederkehrend, Zeitfresser |
| Marktluecke | Sec 3 | Results/Marktabgrenzung | Chatbots vs Ticket-Systeme vs ShopControl |
| Loesung | Sec 4 | Solution sections | Zwei unabhaengige Systeme |
| Support-Agent | Sec 5 | Support-Agent page | 6 Schritte, RAG, Tools, 4 Sicherheitsebenen |
| Buchhaltung | Sec 6 | Accounting page | 5 Schritte, WhatsApp trigger |
| Tech-Stack | Sec 7 | Technology page | 11 Technologien (n8n, Hostinger, Claude/GPT, Pinecone, Reranker, Shopify, Gmail, Supabase, Sheets, WhatsApp, Telegram) |
| Herausforderungen | Sec 8 | Technology page | 4 Bereiche |
| Ergebnisse | Sec 9 | Results page | Funktionsfaehige Prototypen, Marktvergleich |
| Zielgruppe | Sec 10 | Results page | DACH-Raum, kleine Shops |
| Geschaeftsmodell | Sec 11 | Results page | SaaS, Gewerbeschein |
| Kostenstruktur | Sec 12 | Finanzplan page | Token-Kosten, 50-80 EUR/Monat |
| Preismodell | Sec 13 | Finanzplan page | 3 Stufen, Starter/Pro/Enterprise |
| Finanzplan | Sec 14 | Finanzplan page | 3-Jahres-Prognose, Szenarioanalyse |

### Against Projektbericht
| Key Fact | PDF Location | Expected on Website |
|----------|-------------|-------------------|
| "Mag. Albin Weiss B.Sc." | Cover page | About page supervisor1 |
| "MMag. Dr. Mario Kraiger" | Cover page | About page supervisor2 |
| "Abteilung fuer Mechatronik" | Cover page | About page school.department |
| Pinecone (not Qdrant) | Sec 3.2, 4.3 | Technology page techStack |
| Buchhaltung uses Python | Sec 2 (Ziele) | Accounting page (currently not mentioned) |
| Human-in-the-Loop option | Sec 4.2.5 | Support-Agent or Technology page |
| "Supabase" for chat memory | Sec 3.5, 4.4.1 | Technology page |

## Open Questions

1. **Chart hardcoded data accuracy**
   - What we know: Charts have hardcoded data in TSX files. PDF has specific numbers.
   - What's unclear: Whether the current chart data matches PDF numbers exactly.
   - Recommendation: Task should include verifying hardcoded chart data against PDF tables (Sec 12-14).

2. **Buchhaltung uses Python (per Projektbericht Sec 2)**
   - What we know: Projektbericht says "automatisierte Buchhaltungsloesung mit Python"
   - What's unclear: Website/Zusammenfassung doesn't mention Python specifically for Buchhaltung
   - Recommendation: Consider mentioning Python on the Accounting page if accurate.

3. **EN translation completeness**
   - What we know: DE and EN files have same structure (356 lines each)
   - What's unclear: Whether EN translations are accurate translations of DE content
   - Recommendation: EN should be verified alongside DE during the content pass.

## Sources

### Primary (HIGH confidence)
- Codebase inspection: all page components, translation files, chart components
- `Matrealien/ShopControl_AI_Website_Zusammenfassung.pdf` - 20 pages, all content sections
- `Matrealien/da_webshop_agent_bericht (7).pdf` - 27 pages, full Projektbericht

### Secondary (MEDIUM confidence)
- Phase 8 research (08-RESEARCH.md) for established patterns and component inventory

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - no new libraries, fully existing stack
- Architecture: HIGH - patterns directly observed from existing pages
- Content discrepancies: HIGH - based on direct PDF-to-JSON comparison
- Pitfalls: HIGH - based on concrete codebase analysis

**Research date:** 2026-01-31
**Valid until:** 2026-03-01 (stable -- content pages, no dependency changes)
