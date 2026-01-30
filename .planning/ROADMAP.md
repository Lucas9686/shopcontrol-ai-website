# Roadmap: ShopControl AI Webseite

## Overview

This roadmap delivers a bilingual presentation website for the ShopControl AI diploma thesis at the Jugend Innovativ competition. The journey starts with technical foundation (i18n routing, dark theme, shared layout, Vercel deployment), then builds content pages covering the project's problem, solution, and technical depth, followed by a dedicated results/financials page for the entrepreneurship category, and finishes with animation polish, SEO metadata, and demo video integration.

## Phases

- [ ] **Phase 1: Foundation & Layout** - Bilingual navigation shell with dark theme deployed on Vercel
- [x] **Phase 2: Core Content Pages** - Problem, solution, technical deep-dive, about, and legal pages
- [x] **Phase 3: Results & Financials** - Business results, market differentiation, and financial projections
- [ ] **Phase 4: Polish & Media** - Scroll animations, SEO metadata, and demo video

## Phase Details

### Phase 1: Foundation & Layout
**Goal**: Users can navigate a bilingual, dark-blue-themed site shell deployed on Vercel
**Depends on**: Nothing (first phase)
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, TECH-01, TECH-02, TECH-03, TECH-04, TECH-05
**Success Criteria** (what must be TRUE):
  1. User can navigate between pages via a responsive navbar that works on mobile, tablet, and desktop
  2. User can switch between German and English and the URL updates with the locale prefix
  3. User sees a hero section on the landing page with project headline and call-to-action
  4. User sees a consistent dark blue SaaS-style theme across all pages with footer visible
  5. Site is live on Vercel with optimized images loading via Next.js Image component
**Plans**: 2 plans

Plans:
- [ ] 01-01-PLAN.md — i18n infrastructure, dark blue theme, locale routing setup
- [ ] 01-02-PLAN.md — Navbar, language switcher, hero section, footer, Vercel deploy

### Phase 2: Core Content Pages
**Goal**: Users can read the full project story across dedicated content pages in both languages
**Depends on**: Phase 1
**Requirements**: CONT-01, CONT-02, CONT-03, META-01, META-02
**Success Criteria** (what must be TRUE):
  1. User can read the problem statement explaining why small online shops need AI automation
  2. User sees the feature overview with cards/icons for both the Support Agent and Buchhaltung pillars
  3. User can explore the technical deep-dive with 6 workflow steps, RAG explanation, tools, and security -- with diagrams and screenshots
  4. User can visit the about page showing Lucas Nessel, HTL Klagenfurt, and supervisors
  5. User can access Impressum/Datenschutz page with legally required information
**Plans**: 3 plans

Plans:
- [x] 02-01-PLAN.md — Problem & solution pages with shared components and images
- [x] 02-02-PLAN.md — Technology deep-dive page with workflow steps and screenshots
- [x] 02-03-PLAN.md — About and Impressum/Datenschutz pages

### Phase 3: Results & Financials
**Goal**: Users can explore business viability through results, market differentiation, and financial projections
**Depends on**: Phase 2
**Requirements**: CONT-04
**Success Criteria** (what must be TRUE):
  1. User can view project results and market differentiation section
  2. User can see financial projections with charts (pricing model, 3-year forecast, scenario analysis)
  3. All financial content is available in both DE and EN
**Plans**: 1 plan

Plans:
- [x] 03-01-PLAN.md — Results page with market differentiation content and three financial charts

### Phase 4: Polish & Media
**Goal**: Site feels professionally polished with animations, proper SEO, and a demo video
**Depends on**: Phase 3
**Requirements**: NAV-05, META-03, META-04
**Success Criteria** (what must be TRUE):
  1. User experiences smooth Framer Motion animations (text reveal, shimmer, scroll-triggered effects) across all pages
  2. Page has proper SEO meta tags and Open Graph image that renders correctly when shared on social media
  3. User can watch an embedded demo video showing the ShopControl AI agent in action
**Plans**: 2 plans

Plans:
- [ ] 04-01-PLAN.md — Framer Motion hero animations, shimmer CSS, SmoothScroll integration
- [ ] 04-02-PLAN.md — SEO generateMetadata with OG image, demo video embed

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|---------------|--------|-----------|
| 1. Foundation & Layout | 2/2 | Complete | 2026-01-30 |
| 2. Core Content Pages | 3/3 | Complete | 2026-01-31 |
| 3. Results & Financials | 1/1 | Complete | 2026-01-31 |
| 4. Polish & Media | 0/TBD | Not started | - |
