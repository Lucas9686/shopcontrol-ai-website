# Phase 4: Polish & Media - Research

**Researched:** 2026-01-31
**Domain:** Framer Motion animations, Next.js SEO/OG, video embedding
**Confidence:** HIGH

## Summary

Phase 4 covers three distinct areas: (1) adding Framer Motion animations across all pages, (2) proper SEO meta tags with Open Graph image, and (3) embedding a demo video. The project already has `framer-motion@12.24.5` installed and a working `FadeInSection` component used on 5 content pages. The home page (`app/[locale]/page.tsx`) currently has NO animations — it's a server component with static markup. The layout already has basic `metadata` export but lacks Open Graph image, per-page titles, and structured metadata.

Lenis smooth scroll component exists (`components/smooth-scroll.tsx`) but is NOT used anywhere in the layout. It needs to be integrated.

**Primary recommendation:** Create a small set of reusable animation components (already started with FadeInSection), add them to the home page (converting hero to client or wrapping with animation components), configure Next.js generateMetadata with OG image, and embed a YouTube/video player for the demo.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| framer-motion | 12.24.5 | Animations (text reveal, scroll-triggered, shimmer) | Already installed, industry standard for React animations |
| next (Metadata API) | 16.0.10 | SEO meta tags, OG image generation | Built-in, no extra library needed |
| lenis | 1.3.17 | Smooth scroll behavior | Already installed |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @vercel/og (ImageResponse) | Built into Next.js | Dynamic OG image generation | If dynamic OG image needed (alternative: static PNG) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Dynamic OG (ImageResponse) | Static OG PNG | Static is simpler, dynamic allows locale-specific text. Static recommended for this project — simpler and sufficient |
| YouTube embed | HTML5 video with `<video>` tag | YouTube has free hosting + controls. Self-hosted gives more control but needs storage. YouTube recommended if video is on YouTube |

**Installation:** No new packages needed. Everything is already installed.

## Architecture Patterns

### Current Animation State
```
components/
├── shared/fade-in-section.tsx    # ✓ Used on 5 pages (problem, solution, technology, about, results)
├── smooth-scroll.tsx             # ✗ NOT integrated into layout
├── hero.tsx                      # Old template hero (NOT used, has motion animations)
app/[locale]/
├── page.tsx                      # Home page — NO animations, server component
├── layout.tsx                    # Has static metadata export, no OG image
```

### Pattern 1: Animation Components Strategy
**What:** Reuse existing `FadeInSection` for scroll-triggered fade-ins. Add 2-3 new animation utilities for variety.
**When to use:** Every section heading and content block across all pages.

Key animation types needed for NAV-05:
1. **Text reveal** — Already demonstrated in old `hero.tsx` template with `textRevealVariants` (clipPath/y translate)
2. **FadeInSection** — Already built, used on content pages
3. **Shimmer/glow** — CSS animation on buttons or headings (Tailwind `animate-` class, no framer-motion needed)
4. **Stagger children** — Framer Motion `staggerChildren` in parent variant

### Pattern 2: Home Page Animation
**What:** The home page is currently a server component. To add Framer Motion, either:
- (A) Convert entire page to client component — simplest
- (B) Create a client `<HeroAnimated>` wrapper component that receives translated text as props — preserves server rendering for translations

**Recommended:** Option B. Keep `page.tsx` as server component (consistent with all other pages), pass translated strings to a client animation wrapper.

### Pattern 3: Next.js Metadata with OG
**What:** Use `generateMetadata` function in layout.tsx for dynamic locale-aware metadata, plus a static OG image file.
**How:**
```typescript
// app/[locale]/layout.tsx
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isDE = locale === "de";
  return {
    title: {
      default: "ShopControl AI - Jugend Innovativ 2026",
      template: "%s | ShopControl AI",
    },
    description: isDE
      ? "KI-gestützte Automatisierung für Online-Shops."
      : "AI-powered automation for online shops.",
    openGraph: {
      title: "ShopControl AI - Jugend Innovativ 2026",
      description: isDE
        ? "KI-gestützte Automatisierung für Online-Shops."
        : "AI-powered automation for online shops.",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      images: ["/og-image.png"],
    },
  };
}
```

### Pattern 4: Video Embedding
**What:** Embed demo video using either YouTube iframe or HTML5 `<video>` tag.
**Recommended approach:**
- If video is on YouTube: Use lite-youtube-embed pattern (lazy iframe) or simple `<iframe>` with loading="lazy"
- If self-hosted: Use `<video>` tag with poster image
- Wrap in a dedicated section on the home page or a dedicated page
- Use `aspect-video` Tailwind class for responsive container

### Anti-Patterns to Avoid
- **Animating everything:** Only animate elements entering viewport. Don't animate navigation or footer.
- **Layout animations on server components:** Framer Motion requires `"use client"`. Don't try to use `motion.div` in server components.
- **Heavy OG image generation:** Don't use `@vercel/og` ImageResponse for this simple use case. A static 1200x630 PNG is simpler and faster.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-triggered animations | Custom IntersectionObserver | Framer Motion `whileInView` | Already using this pattern in FadeInSection |
| Smooth scrolling | Custom scroll hijacking | Lenis (already installed) | Handles edge cases, touch, accessibility |
| OG image | Canvas-based generator | Static PNG file at `public/og-image.png` | Simplest solution, no runtime cost |
| Video responsive container | Custom CSS | Tailwind `aspect-video` class | One class vs custom padding-bottom hack |

**Key insight:** This phase is about integration and polish, not building new systems. Most tools are already installed.

## Common Pitfalls

### Pitfall 1: Forgetting "use client" for animation components
**What goes wrong:** Importing `motion` from framer-motion in a server component causes build errors.
**Why it happens:** Next.js app router defaults to server components.
**How to avoid:** All components using `motion` must have `"use client"` directive. The existing `FadeInSection` already does this correctly.
**Warning signs:** Build error mentioning "motion" not being a function.

### Pitfall 2: SmoothScroll component not integrated
**What goes wrong:** `components/smooth-scroll.tsx` exists but is not used in any layout. Lenis smooth scroll is not active.
**Why it happens:** It was copied from the template but never wired into the `[locale]/layout.tsx`.
**How to avoid:** Wrap the page content in `<SmoothScroll>` in the locale layout. Note: it's a client component, so it needs to wrap children properly.
**Warning signs:** Scroll feels default/jerky.

### Pitfall 3: Static metadata export blocks generateMetadata
**What goes wrong:** Layout currently uses `export const metadata: Metadata = {...}`. You cannot have BOTH a static `metadata` export AND a `generateMetadata` function in the same file.
**Why it happens:** Next.js only allows one metadata approach per route segment.
**How to avoid:** Remove the static `metadata` export when adding `generateMetadata`.

### Pitfall 4: OG image path must be absolute URL for social sharing
**What goes wrong:** Relative paths like `/og-image.png` won't work when shared on social media.
**Why it happens:** Social media crawlers need full URLs.
**How to avoid:** Use `metadataBase` in root layout: `metadataBase: new URL("https://your-domain.vercel.app")`. Next.js will resolve relative paths against this base.

### Pitfall 5: Video embed blocking page load
**What goes wrong:** YouTube iframe loads ~1MB of JS, slowing initial page load.
**Why it happens:** Eager iframe loading.
**How to avoid:** Use `loading="lazy"` on the iframe, or use a click-to-load pattern with a poster/thumbnail.

## Code Examples

### Animated Hero Wrapper (client component)
```typescript
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function HeroAnimated({
  headline,
  subheadline,
  cta,
}: {
  headline: string;
  subheadline: string;
  cta: ReactNode;
}) {
  return (
    <motion.div initial="hidden" animate="visible" className="text-center">
      <motion.h1 custom={0} variants={fadeUp} className="text-4xl font-bold md:text-6xl">
        {headline}
      </motion.h1>
      <motion.p custom={1} variants={fadeUp} className="mt-4 text-lg text-muted-foreground">
        {subheadline}
      </motion.p>
      <motion.div custom={2} variants={fadeUp} className="mt-8">
        {cta}
      </motion.div>
    </motion.div>
  );
}
```

### Shimmer Effect (CSS only, no JS)
```css
/* Add to globals.css */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.shimmer-text {
  background: linear-gradient(90deg, currentColor 40%, oklch(0.8 0.15 260) 50%, currentColor 60%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s ease-in-out infinite;
}
```

### Integrating SmoothScroll in Layout
```typescript
// In app/[locale]/layout.tsx — wrap children with SmoothScroll
import { SmoothScroll } from "@/components/smooth-scroll";

// Inside the JSX:
<SmoothScroll>
  <Navbar />
  <main>{children}</main>
  <Footer />
</SmoothScroll>
```

### Lazy YouTube Embed
```typescript
"use client";

export function DemoVideo({ videoId }: { videoId: string }) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl border border-border">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="ShopControl AI Demo"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="h-full w-full"
      />
    </div>
  );
}
```

### generateMetadata with metadataBase
```typescript
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isDE = locale === "de";
  return {
    metadataBase: new URL("https://shopcontrol-ai.vercel.app"),
    title: {
      default: "ShopControl AI - Jugend Innovativ 2026",
      template: "%s | ShopControl AI",
    },
    description: isDE
      ? "KI-gestützte Automatisierung für Online-Shops. Ein Projekt der HTL Klagenfurt."
      : "AI-powered automation for online shops. A project by HTL Klagenfurt.",
    openGraph: {
      title: "ShopControl AI",
      description: isDE
        ? "KI-gestützte Automatisierung für Online-Shops."
        : "AI-powered automation for online shops.",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      type: "website",
      locale: isDE ? "de_AT" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Static `metadata` export | `generateMetadata` function | Next.js 13.2+ | Allows dynamic/locale-aware metadata |
| `next-seo` package | Built-in Metadata API | Next.js 13+ | No external package needed |
| Custom scroll libraries | Lenis | 2023+ | Lightweight, framework-agnostic smooth scroll |
| Heavy YouTube embed | `loading="lazy"` iframe | Always available | Prevents blocking page load |

## Open Questions

1. **Demo video source**
   - What we know: META-04 requires an embedded demo video of ShopControl AI agent
   - What's unclear: Is the video on YouTube, or will it be a self-hosted file? Does it exist yet?
   - Recommendation: Build the component to accept a YouTube video ID. If video doesn't exist yet, use a placeholder with a poster image. The component can be updated later with the real video ID.

2. **OG image design**
   - What we know: Need a 1200x630 PNG for social sharing
   - What's unclear: Should it be designed externally or generated?
   - Recommendation: Create a simple static PNG with project name, logo, and tagline. Can be made in any design tool or even as a simple HTML screenshot.

3. **Vercel deployment URL for metadataBase**
   - What we know: Need an absolute URL for OG image resolution
   - What's unclear: Exact production domain
   - Recommendation: Use `VERCEL_PROJECT_PRODUCTION_URL` env var if available, fallback to a hardcoded URL. Vercel auto-provides this.

## Sources

### Primary (HIGH confidence)
- Codebase analysis: `package.json`, `app/[locale]/layout.tsx`, `components/shared/fade-in-section.tsx`, `components/smooth-scroll.tsx`, `components/hero.tsx` (template)
- Next.js Metadata API: Built-in to Next.js 16, well-documented pattern for `generateMetadata` and OG images

### Secondary (MEDIUM confidence)
- Framer Motion `whileInView` and stagger patterns: Verified by existing working code in `fade-in-section.tsx` and template `hero.tsx`
- Lenis smooth scroll integration: Component exists, API matches documented usage

### Tertiary (LOW confidence)
- Exact `metadataBase` behavior with Vercel auto-URLs: Based on training data, needs validation during implementation

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed and partially used
- Architecture: HIGH - Patterns verified from existing codebase code
- Pitfalls: HIGH - Identified from concrete codebase issues (unused SmoothScroll, static metadata conflict)

**Research date:** 2026-01-31
**Valid until:** 2026-03-01 (stable stack, no fast-moving concerns)
