# Phase 3: Results & Financials - Research

**Researched:** 2026-01-31
**Domain:** Data visualization (charts) + bilingual content page
**Confidence:** HIGH

## Summary

Phase 3 adds a single `/results` page combining project results, market differentiation, and financial projections with interactive charts. The route is already referenced in the navbar (`nav.results`).

The critical discovery: **Recharts 2.15.4 is already installed** and the **shadcn/ui `<ChartContainer>` wrapper is already present** at `components/ui/chart.tsx`. This means no new charting library is needed. The shadcn chart component is a `"use client"` component that wraps Recharts with theme-aware styling (light/dark mode CSS variables).

**Primary recommendation:** Build chart wrapper components as client components using the existing shadcn `ChartContainer`/`ChartTooltip`/`ChartLegend` exports. Keep the page itself as a server component (async, using `getTranslations`), and embed client chart components within it.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| recharts | 2.15.4 | Chart rendering (Bar, Line, Area, Pie) | Already installed, pairs with shadcn/ui chart wrapper |
| shadcn/ui chart | n/a | Theme-aware chart container + tooltip/legend | Already at `components/ui/chart.tsx`, handles dark mode |
| next-intl | 4.8.1 | i18n for DE/EN translations | Project standard, use `getTranslations` on server |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | 0.454.0 | Icons for section headers and cards | Already used across all pages |
| framer-motion | 12.24.5 | Fade-in animations via `FadeInSection` | Already used on every content page |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Recharts | Chart.js / Nivo | Recharts already installed + shadcn wrapper exists. No reason to switch. |

**Installation:**
```bash
# Nothing to install - all dependencies already present
```

## Architecture Patterns

### Recommended Project Structure
```
app/[locale]/results/
└── page.tsx                    # Server component (async, getTranslations)

components/results/
├── revenue-forecast-chart.tsx  # "use client" - 3-year revenue line/area chart
├── pricing-comparison-chart.tsx # "use client" - pricing model bar chart
└── scenario-chart.tsx          # "use client" - scenario analysis (optimistic/realistic/pessimistic)
```

### Pattern 1: Server Page with Client Chart Islands
**What:** The page component stays async (server) for translations. Chart components are separate `"use client"` files that receive data as props.
**When to use:** Always for this project (consistent with all other pages using `getTranslations`).
**Example:**
```typescript
// app/[locale]/results/page.tsx (SERVER)
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RevenueForecastChart } from "@/components/results/revenue-forecast-chart";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("results");

  return (
    <article className="mx-auto max-w-5xl px-4 pt-24 pb-16">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
      </header>
      {/* Static text sections render server-side */}
      {/* Charts are client islands */}
      <RevenueForecastChart
        labels={{ year1: t("charts.year1"), year2: t("charts.year2") }}
      />
    </article>
  );
}
```

### Pattern 2: shadcn ChartContainer Usage
**What:** Use `ChartContainer` with a `ChartConfig` object to get theme-aware colors.
**When to use:** Every chart on the results page.
**Example:**
```typescript
// components/results/revenue-forecast-chart.tsx
"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  costs: {
    label: "Costs",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const data = [
  { year: "Year 1", revenue: 12000, costs: 8000 },
  { year: "Year 2", revenue: 36000, costs: 15000 },
  { year: "Year 3", revenue: 72000, costs: 25000 },
];

export function RevenueForecastChart({ labels }: { labels: Record<string, string> }) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area dataKey="revenue" fill="var(--color-revenue)" stroke="var(--color-revenue)" />
        <Area dataKey="costs" fill="var(--color-costs)" stroke="var(--color-costs)" />
      </AreaChart>
    </ChartContainer>
  );
}
```

### Pattern 3: Passing Translated Labels to Client Charts
**What:** Translate labels server-side and pass as props, since `getTranslations` is server-only.
**When to use:** For chart axis labels, tooltips, and legends that need i18n.
**Example:**
```typescript
// Server page passes translated strings:
<ScenarioChart
  labels={{
    optimistic: t("charts.scenario.optimistic"),
    realistic: t("charts.scenario.realistic"),
    pessimistic: t("charts.scenario.pessimistic"),
  }}
/>
```

### Anti-Patterns to Avoid
- **Importing `getTranslations` in client components:** Server-only function. Pass translations as props instead.
- **Putting chart data in translation files:** Financial numbers are language-independent. Keep data in the chart component or a separate data file. Only labels/descriptions go in messages JSON.
- **Making the entire page "use client":** Breaks the established server component pattern. Only chart components need client rendering.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Chart theming for dark mode | Custom CSS for chart colors | `ChartContainer` + `ChartConfig` with `--chart-1` etc. CSS variables | Already handles light/dark theme switching |
| Responsive charts | Manual resize listeners | `ChartContainer` wraps `ResponsiveContainer` automatically | Built into shadcn chart |
| Chart tooltips | Custom tooltip divs | `ChartTooltip` + `ChartTooltipContent` | Styled consistently with shadcn theme |
| Number formatting in charts | Manual `toLocaleString()` calls | Recharts `tickFormatter` prop on axes | Handles locale-appropriate number display |

**Key insight:** The shadcn chart wrapper handles the hardest parts (theming, responsiveness, tooltip styling). Use it as-is.

## Common Pitfalls

### Pitfall 1: Recharts SSR Hydration Mismatch
**What goes wrong:** Recharts uses browser APIs (window dimensions) that don't exist server-side, causing hydration mismatches.
**Why it happens:** Next.js server-renders components by default.
**How to avoid:** Every chart component file MUST have `"use client"` directive at the top. The shadcn `ChartContainer` already has it, but your wrapper components need it too.
**Warning signs:** Console errors about hydration mismatch, charts rendering with wrong dimensions initially.

### Pitfall 2: Chart Colors Not Working in Dark Mode
**What goes wrong:** Hard-coded colors (e.g., `fill="#8884d8"`) ignore the theme.
**Why it happens:** Not using the CSS variable system from `ChartConfig`.
**How to avoid:** Always use `color: "hsl(var(--chart-N))"` in ChartConfig, and reference via `var(--color-keyname)` in chart props.
**Warning signs:** Charts look fine in light mode but colors are wrong/invisible in dark mode.

### Pitfall 3: Translation Keys for Financial Data
**What goes wrong:** Putting numeric data in translation files, leading to maintenance burden.
**Why it happens:** Treating everything as translatable content.
**How to avoid:** Separate concerns: translation files hold labels/descriptions only. Chart data arrays live in code (or a shared data constant file). Only format numbers with locale-aware formatting.
**Warning signs:** Translation files contain arrays of numbers or financial figures.

### Pitfall 4: Chart Aspect Ratio on Mobile
**What goes wrong:** Charts are too small or overflow on mobile screens.
**Why it happens:** Default `aspect-video` class on `ChartContainer` may be too wide.
**How to avoid:** Override with `className="min-h-[300px] w-full"` or similar. Test on mobile viewport.
**Warning signs:** Charts appear as thin slivers on mobile.

## Code Examples

### Chart with Translated Legend (Full Pattern)
```typescript
// Source: Derived from existing shadcn/ui chart.tsx + project patterns
"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface PricingChartProps {
  title: string;
  description: string;
  labels: {
    basic: string;
    pro: string;
    enterprise: string;
  };
}

const data = [
  { plan: "Basic", price: 29, features: 5 },
  { plan: "Pro", price: 79, features: 12 },
  { plan: "Enterprise", price: 199, features: 25 },
];

export function PricingChart({ title, description, labels }: PricingChartProps) {
  const chartConfig = {
    price: { label: labels.basic, color: "hsl(var(--chart-1))" },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="plan" />
            <YAxis tickFormatter={(v) => `€${v}`} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="price" fill="var(--color-price)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
```

### Page Structure Following Project Conventions
```typescript
// Source: Existing pages (technology/page.tsx, solution/page.tsx)
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeInSection } from "@/components/shared/fade-in-section";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("results");

  return (
    <article className="mx-auto max-w-5xl px-4 pt-24 pb-16">
      {/* Same header pattern as all other pages */}
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{t("subtitle")}</p>
      </header>

      {/* Results / Market Differentiation section (static content) */}
      <FadeInSection className="mt-16">
        <SectionHeader title={t("market.title")} />
        {/* ... content cards ... */}
      </FadeInSection>

      {/* Financial Projections section (with charts) */}
      <FadeInSection className="mt-20">
        <SectionHeader title={t("financials.title")} subtitle={t("financials.subtitle")} />
        {/* Client chart components here */}
      </FadeInSection>
    </article>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Custom Recharts styling | shadcn/ui ChartContainer wrapper | shadcn charts release (2024) | Automatic dark mode, consistent theming |
| `getServerSideProps` for translations | `getTranslations` (server) in App Router | Next.js 13+ / next-intl 3+ | Simpler async server components |

**Deprecated/outdated:**
- Direct `<ResponsiveContainer>` usage: Use `ChartContainer` instead (wraps it with theming)

## Open Questions

1. **What specific financial data to display?**
   - What we know: Need pricing model, 3-year forecast, scenario analysis
   - What's unclear: Exact numbers for projections (this is content, not technical)
   - Recommendation: Planner should define placeholder data structure; actual numbers come from project content (possibly from `finanzplan_diagramm_schoen.png` or the Projektbericht documents in the repo)

2. **What results/market differentiation content exists?**
   - What we know: Nav already has "results" route, but no translation keys beyond `nav.results`
   - What's unclear: Exact text content for results section
   - Recommendation: Planner should create translation key structure; content can reference the project reports in repo

## Sources

### Primary (HIGH confidence)
- `components/ui/chart.tsx` - Existing shadcn chart wrapper in project (verified by reading file)
- `package.json` - Recharts 2.15.4 already installed (verified by reading file)
- Existing page patterns (`technology/page.tsx`, `solution/page.tsx`) - Verified project conventions

### Secondary (MEDIUM confidence)
- shadcn/ui chart documentation patterns - Derived from examining the chart.tsx implementation

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed and configured in the project
- Architecture: HIGH - Following established patterns from 5 existing pages
- Pitfalls: HIGH - SSR/hydration and theming issues are well-documented Recharts concerns

**Research date:** 2026-01-31
**Valid until:** 2026-03-01 (stable stack, no expected changes)
