# Feature Landscape

**Domain:** Project showcase website for Austrian tech competition (Jugend Innovativ)
**Project:** ShopControl AI -- diploma thesis, autonomous AI support agent + automated accounting
**Researched:** 2026-01-30
**Confidence:** MEDIUM (based on domain knowledge of competition websites, SaaS landing pages, and diploma thesis presentations; no live web verification possible this session)

## Table Stakes

Features the jury expects. Missing any of these signals "not serious" or "incomplete."

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Clear hero with project name + one-liner | Jury must understand what this is in 3 seconds | Low | "ShopControl AI -- Autonomer KI-Support und automatische Buchhaltung fuer Online-Shops" |
| Problem statement section | Jury evaluates whether the problem is real and relevant | Low | Pain points of small shop owners: manual support, accounting errors, cost |
| Solution / feature overview | Core of the evaluation -- what does it do? | Medium | Two pillars: AI support agent + accounting automation |
| Technical explanation with visuals | HTL thesis requires technical depth; jury expects diagrams | Medium | Workflow steps, RAG architecture, agent structure. Use existing screenshots. |
| About / team section | Jury wants to know who built it | Low | Solo project -- emphasize that. Photo, school, supervisors. |
| Responsive design | Jury may view on any device, especially tablets during judging | Medium | Already in requirements. Mobile-first. |
| Professional visual design | Signals competence. Sloppy design = sloppy project perception | Medium | Dark SaaS style is the right call -- looks professional and modern |
| Contact / impressum | Austrian legal requirement for published websites | Low | Required by Austrian Mediengesetz for any public website |
| German language (primary) | Jury is German-speaking, competition is Austrian | Low | DE as default, EN as secondary |
| Navigation between pages | Multi-page site needs clear nav; jury won't hunt for content | Low | Header nav with page links, mobile hamburger menu |
| Fast load times | Jury has limited patience; slow = bad impression | Low | Next.js + Vercel handles this well by default |
| Screenshots / real product visuals | Jury needs proof the product exists and works | Low | Use existing ~12 screenshots from project report |

## Differentiators

Features that create wow-factor and competitive advantage over other submissions.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Scroll-triggered animations (Framer Motion) | Makes the site feel like a real SaaS product, not a student project | Medium | Text reveals, fade-ins, parallax. Already planned. Do NOT overdo -- subtle > flashy. |
| Interactive workflow visualization | Jury can follow the 6-step AI workflow step-by-step instead of reading a wall of text | High | Step-by-step reveal with highlights. Could be scroll-driven or click-through. Big differentiator. |
| English language toggle | Shows international ambition -- jury loves "thinking big" in entrepreneurship category | Medium | i18n with next-intl or similar. Already planned. |
| Financial projections visualization | Entrepreneurship category demands business viability -- charts beat tables | Medium | 3-year forecast, pricing model, scenario analysis. Use charts (recharts or similar). |
| Before/after comparison | Show the pain (manual) vs. the solution (automated) side-by-side | Low | Simple two-column or slider. Very effective for jury comprehension. |
| Live demo video embed | 30-60s screen recording of the AI agent actually working beats any description | Low | Record a Loom/screen capture. Embed as video. Extremely high ROI for low effort. |
| Testimonial or pilot data | If any shop owner tested it, even informally -- quote them | Low | Even "tested with X shops" adds credibility. Only if real data exists. |
| Speed / performance metrics | "Responds in <2s" or "Processes 50 orders/hour" -- concrete numbers impress | Low | Pull from project report if available |
| Security section with visual trust signals | Shows maturity -- most student projects ignore security entirely | Low | Already planned. Checkmarks, icons, brief explanations. |
| Smooth page transitions | SaaS-level polish that student projects almost never have | Medium | Framer Motion layout animations between pages |
| Dark mode with brand color consistency | Unified dark-blue theme signals design intentionality | Low | Already planned. Stick to it consistently. |
| Favicon + OG meta tags + proper SEO | When jury shares the link, it looks professional in preview | Low | Often forgotten by students. Easy win. |

## Anti-Features

Features to deliberately NOT build. Common traps for competition showcase websites.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Live chatbot demo on the website | Unreliable in demo situations, requires backend, breaks under load, jury may trigger edge cases | Embed a pre-recorded video of the chatbot working perfectly |
| Backend / API integration | Adds complexity, failure points, hosting costs for zero added value | Purely static site. All content from project report. |
| CMS or admin panel | Over-engineering. Content is fixed. | Hardcode content. Change directly in code if needed. |
| Complex 3D animations / Three.js | Slow on older devices, high effort, distracts from content | Subtle Framer Motion is enough. Content > spectacle. |
| User accounts / login | No reason for it. Adds complexity for zero value. | Public site, no auth. |
| Analytics dashboard showing "real data" | Fake data is obvious, real data requires backend | Use static charts with real numbers from project report |
| Overly long pages | Jury skims. Walls of text lose them. | Short, punchy sections. "One idea per screen." |
| Auto-playing audio/music | Universally hated. Instant negative impression. | No audio whatsoever. |
| Pricing page with "Buy Now" | Product is not for sale yet. Looks presumptuous. | Show pricing MODEL as part of business plan, not as a purchase flow. |
| Cookie banner (if no tracking) | If no analytics/cookies, adding a banner is unnecessary noise | Skip analytics entirely or use privacy-friendly (Plausible) with no banner needed |

## Feature Dependencies

```
Navigation ─────────────────────────> All pages (required first)
i18n setup (DE+EN) ────────────────> All content (must be early)
Design system (colors, typography) ─> All components
Hero section ──────────────────────> Landing page (first impression)
Problem statement ─────────────────> Solution section (logical flow)
Solution / features ───────────────> Technical deep-dive (builds on overview)
Technical deep-dive ───────────────> RAG visualization (subset of tech)
Financial projections ─────────────> Charts library (recharts or similar)
Scroll animations ─────────────────> All sections (apply after content exists)
Page transitions ──────────────────> Navigation + Framer Motion (apply last)
OG meta / favicon ─────────────────> Deployment (do before going live)
```

**Critical path:** Design system -> Navigation -> i18n -> Hero -> Content sections -> Animations -> Polish

## MVP Recommendation

For a first deployable version that already impresses:

**Phase 1 -- Structure + Core Content (table stakes):**
1. Navigation + page structure
2. i18n framework (DE+EN)
3. Hero section
4. Problem statement
5. Solution / feature overview
6. About section + Impressum
7. Responsive design

**Phase 2 -- Technical Depth + Business (differentiators that matter for jury):**
1. Technical deep-dive with workflow visualization
2. RAG system explanation
3. Tools & sub-agents section
4. Security features
5. Financial projections with charts
6. Screenshots integration

**Phase 3 -- Polish + Wow-Factor:**
1. Scroll animations (Framer Motion)
2. Page transitions
3. Before/after comparison
4. Demo video embed
5. OG meta tags + favicon
6. Performance optimization

**Defer entirely:**
- Live chatbot demo: Too risky, use video instead
- Analytics: Not needed for competition
- Any backend functionality: Static only

## Key Insight for This Project

The biggest differentiator is NOT technical complexity of the website itself -- it is **clarity of communication**. The jury evaluates the PROJECT (ShopControl AI), not the website. The website is a vehicle. Therefore:

- Every feature should serve comprehension, not show off web dev skills
- A clean, fast, well-structured site with great content beats a flashy site with confusing content
- The workflow visualization is the single highest-ROI differentiator because it makes a complex AI system understandable
- The video demo is the second highest-ROI because it proves the product works

## Sources

- Domain knowledge: Austrian competition websites, SaaS landing page patterns, diploma thesis presentation conventions
- Project context: PROJECT.md with validated requirements and constraints
- Confidence: MEDIUM -- recommendations are based on established patterns for competition/showcase websites, not verified against current Jugend Innovativ judging criteria documents
