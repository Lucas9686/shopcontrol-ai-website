# Roadmap: ShopControl AI Webseite

## Milestones

- **v1.0 Jugend Innovativ Webseite** — Phases 1-4 (shipped 2026-01-31) | [Archive](milestones/v1.0-ROADMAP.md)
- **v1.1 Content Accuracy & Deploy Fix** — Phases 5-6 (shipped 2026-01-31) | [Archive](milestones/v1.1-ROADMAP.md)
- **v1.2 Content Restructure & Accuracy** — Phases 7-9 (shipped 2026-01-31)

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|---------------|--------|-----------|
| 1. Foundation & Layout | v1.0 | 2/2 | Complete | 2026-01-30 |
| 2. Core Content Pages | v1.0 | 3/3 | Complete | 2026-01-31 |
| 3. Results & Financials | v1.0 | 1/1 | Complete | 2026-01-31 |
| 4. Polish & Media | v1.0 | 2/2 | Complete | 2026-01-31 |
| 5. Deploy Fix & Content Accuracy | v1.1 | 2/2 | Complete | 2026-01-31 |
| 6. OG Image & Performance | v1.1 | 2/2 | Complete | 2026-01-31 |
| 7. Umlauts & Route Restructure | v1.2 | 2/2 | Complete | 2026-01-31 |
| 8. Supportagent & Buchhaltungstool Pages | v1.2 | 2/2 | Complete | 2026-01-31 |
| 9. Content Updates & Verification | v1.2 | 4/4 | Complete | 2026-01-31 |

## v1.2 Phase Details

### Phase 7: Umlauts & Route Restructure

**Goal:** Alle ASCII-Umlaute durch echte Zeichen ersetzen, Routen-Struktur umbauen, Navigation aktualisieren.

**Requirements:** UML-01, UML-02, NAV-01, ROUTE-01

**Plans:** 2 plans
Plans:
- [x] 07-01-PLAN.md — Replace ASCII umlauts with real Unicode characters in de.json and en.json
- [x] 07-02-PLAN.md — Restructure routes (3 new, 2 removed) and update navigation

**Success criteria:**
1. de.json und en.json enthalten keine ae/oe/ue/ss Ersatzzeichen mehr
2. Navigation zeigt: Startseite | Supportagent | Buchhaltungstool | Technologien | Ergebnisse | Finanzplan | Über uns
3. Routen /support-agent, /accounting, /finance-plan existieren und laden
4. Alte Routen /problem, /solution sind entfernt
5. Site baut fehlerfrei und deployed auf Vercel

### Phase 8: Supportagent & Buchhaltungstool Pages

**Goal:** Zwei neue Seiten mit Problem->Lösung->Step-by-Step-Struktur erstellen, mit Screenshots aus dem Projektbericht.

**Requirements:** PAGE-01, PAGE-02

**Plans:** 2 plans
Plans:
- [x] 08-01-PLAN.md — Support Agent page with WorkflowStepVertical component and DE/EN translations
- [x] 08-02-PLAN.md — Accounting page with images, DE/EN translations, and Technology page restructure

**Success criteria:**
1. Supportagent-Seite zeigt: Problem (Zeitfresser Support) -> Lösung (autonomer Agent) -> 6-Schritte-Workflow mit Bildern -> RAG-System -> Tools & Sub-Agents -> Sicherheitsfeatures
2. Buchhaltungstool-Seite zeigt: Problem (verstreute Finanzdaten) -> Lösung (automatische Berichte) -> 5-Schritte-Workflow mit Bildern -> Datenquellen -> WhatsApp-Trigger
3. Alle Inhalte stimmen mit dem Projektbericht überein
4. Bilder aus dem Bericht (Workflow-Screenshots) sind eingebunden
5. Beide Sprachen (DE/EN) vollständig

### Phase 9: Content Updates & Verification

**Goal:** Verbleibende Seiten aktualisieren, Finanzplan als eigene Seite, alle Inhalte gegen Bericht verifizieren.

**Requirements:** PAGE-03, PAGE-04, CONTENT-01, CONTENT-02, CONTENT-03, CONTENT-04

**Plans:** 4 plans
Plans:
- [x] 09-01-PLAN.md — Build full Finanzplan page with charts and content from PDF
- [x] 09-02-PLAN.md — Restructure Results page (remove financials, add Zielgruppe/Geschaeftsmodell)
- [x] 09-03-PLAN.md — Add homepage overview CTA grid linking to key pages
- [x] 09-04-PLAN.md — Fix Technology discrepancies, verify About page, final content sweep

**Success criteria:**
1. Finanzplan-Seite zeigt: Kostenstruktur, Preismodell (3 Stufen), 3-Jahres-Prognose mit Charts, Szenarioanalyse
2. Ergebnisse-Seite zeigt: Erreichte Ergebnisse, Marktabgrenzung, Zielgruppe, Geschäftsmodell (ohne Finanzplan)
3. Startseite CTAs und Links verweisen auf neue Seitenstruktur
4. Technologien-Seite stimmt mit Bericht überein (Tech-Stack-Tabelle, Herausforderungen)
5. Über-uns-Seite ist korrekt
6. Alle Texte sind gegen beide PDFs verifiziert -- keine inhaltlichen Fehler
