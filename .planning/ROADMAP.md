# Roadmap: ShopControl AI Webseite

## Milestones

- **v1.0 Jugend Innovativ Webseite** — Phases 1-4 (shipped 2026-01-31) | [Archive](milestones/v1.0-ROADMAP.md)
- **v1.1 Content Accuracy & Deploy Fix** — Phases 5-6 (in progress)

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|---------------|--------|-----------|
| 1. Foundation & Layout | v1.0 | 2/2 | Complete | 2026-01-30 |
| 2. Core Content Pages | v1.0 | 3/3 | Complete | 2026-01-31 |
| 3. Results & Financials | v1.0 | 1/1 | Complete | 2026-01-31 |
| 4. Polish & Media | v1.0 | 2/2 | Complete | 2026-01-31 |
| 5. Deploy Fix & Content Accuracy | v1.1 | 2/2 | Complete | 2026-01-31 |
| 6. OG Image & Performance | v1.1 | 0/2 | Not started | - |

---

## v1.1 Content Accuracy & Deploy Fix

**Milestone Goal:** Fix Vercel deployment, correct all content inaccuracies against the report, and optimize performance.

### Phase 5: Deploy Fix & Content Accuracy

**Goal**: Website deploys successfully on Vercel and all page content matches the Jugend Innovativ report exactly
**Depends on**: Phase 4
**Requirements**: DEPLOY-01, TECH-01, TECH-02, TECH-03, TECH-04, TECH-05, TECH-06, SOL-01, SOL-02, CROSS-01
**Success Criteria** (what must be TRUE):
  1. `vercel build` succeeds with webapp/ as root directory and site is live
  2. Technology page shows exactly 6 workflow steps matching report section 5.2 with correct names, descriptions, and screenshots
  3. Technology page security section lists all 4 layers, tools section shows correct 3 tools, and RAG section matches report 5.3
  4. Solution page accounting pillar describes WhatsApp-based KPI reporting (not invoice generation) and tech stack matches report Table 7.1
  5. Support agent is described as E-Mail-based (not chat widget) on every page that mentions it
**Plans**: 2 plans

Plans:
- [x] 05-01-PLAN.md — Fix git tracking (remove root ghost files, add webapp/ to git)
- [x] 05-02-PLAN.md — Correct all content inaccuracies (technology steps, security, tools, RAG, accounting, tech stack, chatbot refs)

### Phase 6: OG Image & Performance

**Goal**: Website has branded social sharing image and scores well on Lighthouse
**Depends on**: Phase 5
**Requirements**: OG-01, PERF-01
**Success Criteria** (what must be TRUE):
  1. Sharing a page URL on social media / messaging apps shows a branded ShopControl AI preview image (not placeholder)
  2. Lighthouse performance score is 90+ on mobile for the home page
  3. No render-blocking resources or unoptimized images flagged by Lighthouse
**Plans**: 2 plans

Plans:
- [ ] 06-01-PLAN.md — Generate branded OG image and replace placeholder logo
- [ ] 06-02-PLAN.md — Lighthouse performance optimization (image opt, next/image, smooth scroll)
