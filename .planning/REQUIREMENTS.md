# Requirements: ShopControl AI Webseite

**Defined:** 2026-01-30
**Core Value:** Jury und Besucher verstehen auf einen Blick was ShopControl AI macht, warum es innovativ ist, und wie es technisch funktioniert.

## v1 Requirements

### Navigation & Layout

- [ ] **NAV-01**: User can navigate between pages via responsive navbar
- [ ] **NAV-02**: User can switch language between DE and EN
- [ ] **NAV-03**: User sees animated hero section with project headline and CTA
- [ ] **NAV-04**: User sees footer with project info, HTL-Logo, links
- [ ] **NAV-05**: User experiences smooth scroll and Framer Motion animations

### Projekt-Inhalt

- [ ] **CONT-01**: User can read problem statement (why small shops need AI support)
- [ ] **CONT-02**: User sees feature overview (Support Agent + Buchhaltung) with cards/icons
- [ ] **CONT-03**: User can explore technical deep-dive (6 workflow steps, RAG, tools, security) with diagrams/screenshots
- [ ] **CONT-04**: User can view results, market differentiation, and financial projections with charts

### Extras & Meta

- [ ] **META-01**: User can visit about page (Lucas Nessel, HTL Klagenfurt, Betreuer)
- [ ] **META-02**: User can access Impressum/Datenschutz page
- [ ] **META-03**: Page has proper SEO meta tags and Open Graph image for social sharing
- [ ] **META-04**: User can watch embedded demo video showing the agent in action

### Technische Basis

- [ ] **TECH-01**: Site uses Next.js + shadcn/ui + Tailwind v4 + Framer Motion
- [ ] **TECH-02**: i18n routing with [locale] pattern (DE + EN)
- [ ] **TECH-03**: Optimized images (Next.js Image component for all screenshots)
- [ ] **TECH-04**: Dark blue SaaS-style design theme
- [ ] **TECH-05**: Deployable on Vercel

## v2 Requirements

### Interaktivitaet

- **INT-01**: Interactive workflow visualization (clickable steps)
- **INT-02**: Animated statistics/counters on scroll
- **INT-03**: Live chatbot demo (Erklaerbaer) embedded

### Erweiterte Inhalte

- **EXT-01**: Blog/Updates section
- **EXT-02**: Testimonials from pilot users
- **EXT-03**: Comparison table vs competitors (Zendesk, Freshdesk)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Live Chatbot Demo | Zu komplex, erfordert Backend-Anbindung |
| CMS/Admin Panel | Inhalte sind fix aus Projektbericht |
| E-Commerce/Kaufmoeglichkeit | Reine Praesentation, kein Shop |
| Backend/API | Statische Webseite, kein Server-Side Logic |
| Mobile App | Web-only fuer Wettbewerb |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| (populated during roadmap creation) | | |

**Coverage:**
- v1 requirements: 18 total
- Mapped to phases: 0
- Unmapped: 18

---
*Requirements defined: 2026-01-30*
*Last updated: 2026-01-30 after initial definition*
