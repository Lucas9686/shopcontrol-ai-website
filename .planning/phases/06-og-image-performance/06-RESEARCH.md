# Phase 6: OG Image & Performance - Research

**Researched:** 2026-01-31
**Domain:** Open Graph meta tags, Next.js image optimization, Lighthouse performance
**Confidence:** HIGH

## Summary

This phase has two distinct tasks: (1) replacing the OG image and logo with branded versions, and (2) achieving Lighthouse 90+ on mobile for the homepage.

The OG image infrastructure is already in place in `webapp/app/[locale]/layout.tsx` with correct meta tags (1200x630, `summary_large_image`). The source OG image (`Matrealien/SchopControl OG logo.png`) is only 256x290, so it must be composited onto a 1200x630 canvas with a branded background rather than simply copied.

The biggest Lighthouse wins are: (a) removing `images: { unoptimized: true }` from next.config.mjs to enable Next.js image optimization via `sharp` (already installed), (b) converting large PNGs to WebP, (c) converting `<img>` tags to `next/image`, and (d) evaluating Lenis smooth-scroll and framer-motion bundle impact.

**Primary recommendation:** Create a 1200x630 OG image using sharp (logo centered on dark branded background), enable Next.js image optimization, convert images to WebP, and use `next/image` everywhere.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| sharp | ^0.34.5 | Image processing (resize, composite, format conversion) | Already installed; used by Next.js internally |
| next/image | (Next.js 16.1.6) | Optimized image component with lazy loading, WebP | Built-in, automatic optimization |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Lighthouse CI | latest | Automated performance auditing | Verification of 90+ score |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| sharp CLI for OG composite | Manual Photoshop/Figma | sharp is scriptable and reproducible |
| next/image | Manual WebP conversion | next/image handles format negotiation automatically |

## Architecture Patterns

### Pattern 1: OG Image as Static Asset
**What:** Generate the 1200x630 OG image once via a build script or manually, place in `public/og-image.png`
**When to use:** Site-wide single OG image (our case)
**Approach:**
- Use sharp to composite the 256x290 logo onto a 1200x630 dark background
- Output as PNG (OG images must be PNG or JPEG for maximum compatibility)
- Replace `webapp/public/og-image.png`

### Pattern 2: Next.js Image Optimization
**What:** Remove `unoptimized: true` from next.config.mjs to enable automatic WebP/AVIF serving
**When to use:** Always in production
**Key detail:** `sharp` is already in dependencies, so Next.js will use it automatically

### Pattern 3: Logo Replacement
**What:** Replace placeholder-logo files with the branded `ShcopControl Logo.png`
**Files affected:**
- `webapp/public/placeholder-logo.png` (735x201 source -> replace)
- `webapp/public/placeholder-logo.svg` (may need to keep as SVG trace or remove references)
- No component references to `placeholder-logo` were found in code (grep returned 0 matches)

### Anti-Patterns to Avoid
- **Serving unoptimized PNGs:** The current config has `unoptimized: true` which bypasses all Next.js image optimization
- **Using `<img>` instead of `next/image`:** Hero component uses raw `<img>` tags for avatars - these bypass lazy loading and format optimization

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image format conversion | Manual ffmpeg/imagemagick scripts | Next.js image optimization (remove `unoptimized: true`) | Handles WebP/AVIF negotiation, caching, resizing |
| Lazy loading images | Custom IntersectionObserver | `next/image` with `loading="lazy"` | Built-in, handles placeholder blur |
| OG image generation | Complex canvas/SVG pipeline | Simple sharp composite script | One-time generation, not per-request |

## Common Pitfalls

### Pitfall 1: OG Image Source Too Small
**What goes wrong:** The source OG logo is 256x290 but needs to be on a 1200x630 canvas
**Why it happens:** Logo is a logo, not a pre-made OG card
**How to avoid:** Use sharp to composite: create a 1200x630 dark background, center the logo on it
**Warning signs:** Blurry/pixelated preview when shared on social media

### Pitfall 2: images.unoptimized Kills Performance
**What goes wrong:** All images served as original format/size, no WebP, no resizing
**Why it happens:** `next.config.mjs` has `images: { unoptimized: true }`
**How to avoid:** Remove `unoptimized: true` or set to `false`. Ensure `sharp` is installed (it is).
**Warning signs:** Lighthouse flags "Serve images in next-gen formats" and "Properly size images"

### Pitfall 3: Large PNG Workflow Images
**What goes wrong:** Multiple PNGs over 500KB on technology page (support-agent-ablauf.png is 1.2MB)
**Why it happens:** Screenshots saved as uncompressed PNGs
**How to avoid:** Use `next/image` with width/height props so Next.js can resize and serve WebP
**Warning signs:** Lighthouse "Avoid enormous network payloads"

### Pitfall 4: Framer Motion Bundle Size
**What goes wrong:** framer-motion adds ~40-60KB gzipped to the JS bundle
**Why it happens:** Large animation library imported on every page
**How to avoid:** This is a known cost; the decision says no animation sacrifices. Use `next/dynamic` with `ssr: false` if components are below the fold. Ensure tree-shaking works (import `{ motion }` not `* as motion`).
**Warning signs:** Lighthouse "Reduce JavaScript execution time"

### Pitfall 5: Lenis Smooth Scroll RAF Loop
**What goes wrong:** Continuous `requestAnimationFrame` loop runs even when idle, consuming CPU
**Why it happens:** Current implementation in `smooth-scroll.tsx` uses infinite RAF loop
**How to avoid:** This may or may not impact Lighthouse (Lighthouse measures load, not idle). Monitor TBT score. If problematic, delay Lenis init or use `lenis.stop()` when not scrolling.
**Warning signs:** High "Total Blocking Time" in Lighthouse

### Pitfall 6: Google Fonts Render-Blocking
**What goes wrong:** Inter font loaded via `next/font/google` can delay First Contentful Paint
**Why it happens:** Font loading blocks text rendering
**How to avoid:** Next.js `next/font` already handles this well with `font-display: swap` by default. Verify no additional font imports exist (hero references `--font-cal-sans` which may not be loaded).
**Warning signs:** Lighthouse "Ensure text remains visible during webfont load"

## Code Examples

### OG Image Generation Script (sharp)
```typescript
// scripts/generate-og-image.ts
import sharp from 'sharp';

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 630;

async function generateOGImage() {
  const logo = await sharp('Matrealien/SchopControl OG logo.png')
    .resize({ height: 300, fit: 'inside' })
    .toBuffer();

  const logoMeta = await sharp(logo).metadata();

  await sharp({
    create: {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      channels: 4,
      background: { r: 9, g: 9, b: 11, alpha: 1 }, // zinc-950
    },
  })
    .composite([{
      input: logo,
      left: Math.round((CANVAS_WIDTH - (logoMeta.width || 0)) / 2),
      top: Math.round((CANVAS_HEIGHT - (logoMeta.height || 0)) / 2),
    }])
    .png()
    .toFile('webapp/public/og-image.png');
}

generateOGImage();
```

### Enabling Image Optimization
```javascript
// next.config.mjs - REMOVE unoptimized: true
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  // images.unoptimized removed — sharp handles optimization
}
```

### Converting img to next/image
```tsx
// Before (hero.tsx)
<img src={avatar} alt="" className="w-10 h-10 rounded-full" />

// After
import Image from "next/image";
<Image src={avatar} alt="" width={40} height={40} className="rounded-full" />
```

## Current State Inventory

### Files to Replace
| Current File | Size | Action |
|-------------|------|--------|
| `webapp/public/og-image.png` | 37KB, 1200x630 | Replace with branded composite |
| `webapp/public/placeholder-logo.png` | exists | Replace with `ShcopControl Logo.png` |
| `webapp/public/placeholder-logo.svg` | exists | Remove or replace |

### Large Images (Lighthouse Concerns)
| File | Size | Used On |
|------|------|---------|
| `images/diagrams/support-agent-ablauf.png` | 1.28MB | Technology page |
| `professional-headshot-5.png` | 1.21MB | Hero (unused in current page.tsx) |
| `professional-headshot-4.png` | 1.09MB | Hero (unused in current page.tsx) |
| `professional-headshot-2.png` | 868KB | Hero (unused in current page.tsx) |
| `professional-headshot-3.png` | 783KB | Hero (unused in current page.tsx) |
| `images/workflows/gesamter-workflow.png` | 670KB | Technology page |

### Config Issues
| Issue | File | Impact |
|-------|------|--------|
| `images: { unoptimized: true }` | `next.config.mjs` | All image optimization disabled |
| Raw `<img>` tags in hero | `components/hero.tsx` | No lazy loading, no WebP |
| Continuous RAF loop | `components/smooth-scroll.tsx` | Potential TBT impact |

### OG Meta Tags (Already Correct)
- `openGraph.images`: `[{ url: "/og-image.png", width: 1200, height: 630 }]`
- `twitter.card`: `"summary_large_image"`
- `metadataBase`: properly set for Vercel
- Locale-aware descriptions: yes

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `images: { unoptimized: true }` | Remove; let Next.js optimize | Always was available | WebP/AVIF auto-serving, resizing |
| Raw `<img>` | `next/image` with width/height | Next.js 10+ | Lazy loading, blur placeholder, format negotiation |

## Open Questions

1. **Hero component references `--font-cal-sans`**
   - What we know: CSS variable referenced in `hero.tsx` style prop
   - What's unclear: Whether this font is actually loaded (not in Inter config, not in globals.css)
   - Recommendation: Check if this causes a FOIT/FOUT issue; if font not loaded, remove reference

2. **Professional headshot images appear unused on homepage**
   - What we know: `hero.tsx` (the old hero) references them, but `page.tsx` uses `HeroAnimated`
   - What's unclear: Whether `hero.tsx` is used on any other page
   - Recommendation: If unused, remove to reduce deploy size (5+ MB of PNGs)

3. **YouTube embed in DemoVideo**
   - What we know: Homepage embeds a YouTube video (`dQw4w9WgXcQ`)
   - What's unclear: Whether this is a real video or placeholder; YouTube iframes heavily impact Lighthouse
   - Recommendation: Use `loading="lazy"` on iframe, or use lite-youtube-embed facade pattern

## Sources

### Primary (HIGH confidence)
- Codebase inspection: `webapp/app/[locale]/layout.tsx` — OG meta tag structure
- Codebase inspection: `webapp/next.config.mjs` — `images: { unoptimized: true }`
- Codebase inspection: `webapp/package.json` — sharp ^0.34.5 already installed
- File system: Image dimensions and sizes measured directly

### Secondary (MEDIUM confidence)
- Next.js image optimization behavior with `sharp` — based on Next.js documentation knowledge
- Lighthouse scoring factors — based on established web performance knowledge

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all tools already in project, no new deps needed
- Architecture: HIGH — straightforward asset replacement + config change
- Pitfalls: HIGH — identified from direct codebase inspection

**Research date:** 2026-01-31
**Valid until:** 2026-03-01 (stable domain, nothing fast-moving)
