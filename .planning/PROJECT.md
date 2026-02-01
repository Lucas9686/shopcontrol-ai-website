# ShopControl AI — Jugend Innovativ Webseite

## What This Is

Eine mehrseitige, zweisprachige (DE/EN) Prasentationswebseite fuer die Diplomarbeit "ShopControl AI" von Lucas Nessel (HTL Klagenfurt, Mechatronik). Die Webseite stellt das Projekt beim Jugend Innovativ Wettbewerb visuell und inhaltlich dar — ein vollautonomer KI-Support-Agent und eine automatisierte Buchhaltungsloesung fuer Online-Shops, gebaut mit n8n, RAG/Pinecone und Shopify-Integration.

## Current State

**Shipped:** v1.2 (2026-02-01)
**Live:** https://shopcontrol-ai-website.vercel.app
**Repo:** https://github.com/Lucas9686/shopcontrol-ai-website

v1.2 shipped: Seitenstruktur umgebaut mit dedizierten Supportagent- und Buchhaltungstool-Seiten (Problem→Lösung→Workflow), Finanzplan als eigene Seite, echte Unicode-Umlaute, scroll-basierte Workflow-Animationen mit Metallic-Blue-Glow, alle Inhalte gegen Projektbericht verifiziert. 8 Seiten in DE/EN, dunkles SaaS-Design, Framer Motion + scroll-reaktive Animationen, 3 Finanz-Charts.

## Current Milestone: Planning next milestone

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
- Vercel-Deployment funktioniert (webapp/ Root Directory korrekt in git) — v1.1
- Alle Inhalte stimmen mit Projektbericht ueberein (6 Schritte, 4 Sicherheitsebenen, 3 Tools) — v1.1
- Gebrandetes OG-Bild fuer Social Sharing — v1.1
- Lighthouse Performance 90+ mobile — v1.1

- Echte Umlaute in allen Translations — v1.2
- Seitenstruktur: Supportagent + Buchhaltungstool eigene Seiten mit Problem→Lösung→Detail — v1.2
- Finanzplan als eigene Seite — v1.2
- Content-Accuracy gegen Projektbericht — v1.2
- Scroll-reaktive Workflow-Animationen mit Metallic-Blue-Glow — v1.2

### Active

(None — define in next milestone)

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
- **Codebase**: ~10,000 LOC TypeScript/TSX/CSS/JSON in `webapp/`
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
| ASCII-safe German in JSON | Konsistent mit Codebase, vermeidet Encoding-Probleme | Reversed in v1.2 — echte Umlaute |
| Agent ist email-basiert | Report beschreibt E-Mail-Support-Agent, kein Chatbot | Good |
| Buchhaltung = WhatsApp KPI-Reporting | Report Kapitel 4.6 beschreibt WhatsApp-basierte Berichte | Good |
| Lenis autoRaf | Saubereres Lifecycle-Management statt manueller RAF-Loop | Good |

---
*Last updated: 2026-02-01 after v1.2 milestone complete*
