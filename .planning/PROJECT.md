# ShopControl AI — Jugend Innovativ Webseite

## What This Is

Eine mehrseitige, zweisprachige (DE/EN) Prasentationswebseite fuer die Diplomarbeit "ShopControl AI" von Lucas Nessel (HTL Klagenfurt, Mechatronik). Die Webseite stellt das Projekt beim Jugend Innovativ Wettbewerb visuell und inhaltlich dar — ein vollautonomer KI-Support-Agent und eine automatisierte Buchhaltungsloesung fuer Online-Shops, gebaut mit n8n, RAG/Pinecone und Shopify-Integration.

## Current State

**Shipped:** v1.0 (2026-01-31)
**Live:** https://shopcontrol-ai-website.vercel.app
**Repo:** https://github.com/Lucas9686/shopcontrol-ai-website

v1.0 liefert 7 Seiten (Home, Problem, Solution, Technology, Results, About, Impressum) in DE/EN mit dunklem SaaS-Design, Framer Motion Animationen, 3 Finanz-Charts, SEO-Metadaten und Demo-Video-Embed. Web-App liegt in `webapp/` Unterordner.

## Core Value

Die Jury und Besucher muessen auf einen Blick verstehen, was ShopControl AI macht, warum es innovativ ist, und wie es technisch funktioniert — visuell ansprechend und professionell.

## Requirements

### Validated

- Hero-Sektion mit Projekt-Headline und Kurzbeschreibung — v1.0
- Problemdarstellung: Warum brauchen kleine Online-Shops KI-Automatisierung — v1.0
- Feature-Uebersicht: KI-Support-Agent + Buchhaltungs-Automatisierung — v1.0
- Technischer Deep-Dive: 6 Workflow-Schritte mit Diagrammen/Screenshots — v1.0
- RAG-System Erklaerung mit Visualisierung — v1.0
- Tools & Sub-Agents Sektion (Shopify-Agent, Sheets-Agent) — v1.0
- Sicherheitsfeatures Darstellung — v1.0
- Ergebnisse & Marktabgrenzung — v1.0
- Finanzplan-Visualisierung (Preismodell, 3-Jahres-Prognose, Szenarioanalyse) — v1.0
- Ueber-mich-Seite (Lucas Nessel, HTL Klagenfurt, Betreuer) — v1.0
- Zweisprachig: Deutsch + Englisch mit Sprachwechsel — v1.0
- Responsive Design (Mobile, Tablet, Desktop) — v1.0
- Screenshots und Diagramme aus dem Projektbericht eingebunden — v1.0
- Dunkles SaaS-Landing-Page-Design mit dunkelblauem Farbschema — v1.0
- Framer Motion Animationen (Text-Reveal, Shimmer, Scroll-Effekte) — v1.0
- Deployment-ready fuer Vercel via GitHub — v1.0

### Active

## Current Milestone: v1.1 Content Accuracy & Deploy Fix

**Goal:** Fix Vercel deployment, correct all website content to match the Projektbericht exactly, replace OG image, optimize performance.

**Target features:**
- Fix Vercel build error (webapp/ root directory)
- Correct 6 workflow steps on Technology page to match report (E-Mail-Abruf, Filterung, Bild-Analyse, Support-Agent, E-Mail-Versand, Performance-Logging)
- Correct solution page accounting description (financial KPI reporting, not invoicing)
- Fix tech stack references (Claude/GPT, Supabase/PostgreSQL)
- Complete security section (4 layers instead of 3)
- Replace placeholder OG image
- Lighthouse performance optimization

### Out of Scope

- Interaktiver Chatbot/Demo auf der Webseite — zu komplex, nicht noetig fuer Praesentation
- Backend/API-Anbindung — rein statische Praesentation
- CMS oder Admin-Panel — Inhalte sind fix aus dem Projektbericht
- E-Commerce-Funktionalitaet — keine Kaufmoeglichkeit fuer ShopControl AI

## Context

- **Wettbewerb**: Jugend Innovativ, Kategorie Entrepreneurship/Businesskonzepte
- **Schule**: HTL Klagenfurt Lastenstrasse, Abteilung Mechatronik
- **Betreuer**: Mag. Albin Weiss B.Sc., MMag. Dr. Mario Kraiger
- **Einzelarbeit**: Gesamtes Projekt von Lucas Nessel allein umgesetzt
- **Tech Stack**: Next.js 16 + next-intl v4 + shadcn/ui + Tailwind v4 + Framer Motion + Recharts
- **Codebase**: ~9,600 LOC TypeScript/TSX/CSS/JSON in `webapp/`
- **Content-Quelle**: 27-seitiger Projektbericht (PDF) mit allen Inhalten
- **Zielgruppe**: Primaer Jugend Innovativ Jury, sekundaer allgemeines Publikum
- **Gewerbeschein**: Bereits vorhanden, SaaS-Produkt geplant

## Constraints

- **Tech Stack**: Next.js + shadcn/ui + Tailwind CSS v4 + Framer Motion
- **Deployment**: GitHub + Vercel (auto-deploy on push)
- **Sprachen**: Deutsch (primaer) + Englisch
- **Design**: Dunkles SaaS-Stil, dunkelblau OKLCH hue-260
- **Struktur**: Web-App in `webapp/` Unterordner

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js + shadcn/ui Stack | v0-Template bereits vorhanden, modern, Vercel-optimiert | Good |
| Dunkelblau statt Zinc | Passend zu ShopControl AI Branding, professioneller Look | Good |
| Mehrseitige Struktur | Bessere Gliederung fuer technische Tiefe + Finanzplan | Good |
| DE + EN bilingual | Jury ist DACH, aber internationaler Anspruch fuer SaaS-Produkt | Good |
| getTranslations (server) | Next.js 16 async pages erfordern Server-Side API | Good |
| Chart data hardcoded | Nur Labels aus Translations, Daten fix im Component | Good |
| Web-App in webapp/ | Trennung von Projektdateien (Berichte, Screenshots) | Good |

---
*Last updated: 2026-01-31 after v1.1 milestone started*
