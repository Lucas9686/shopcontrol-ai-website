# Requirements: v1.2 Content Restructure & Accuracy

## Milestone Requirements

### Umlauts

- [x] **UML-01**: Alle ASCII-Umlaute (ae→ä, oe→ö, ue→ü, ss→ß) in de.json durch echte Zeichen ersetzen
- [x] **UML-02**: Alle ASCII-Umlaute in en.json durch echte Zeichen ersetzen (falls vorhanden)

### Seitenstruktur

- [x] **NAV-01**: Navigation umstrukturieren: Startseite | Supportagent | Buchhaltungstool | Technologien | Ergebnisse | Finanzplan | Über uns
- [x] **ROUTE-01**: Neue Routen anlegen (/support-agent, /accounting, /finance-plan), alte entfernen (/problem, /solution)
- [x] **PAGE-01**: Supportagent-Seite: Problem → Lösung → 6-Schritte-Workflow step-by-step mit Bildern, RAG-System, Tools & Sub-Agents, Sicherheitsfeatures
- [x] **PAGE-02**: Buchhaltungstool-Seite: Problem → Lösung → 5-Schritte-Workflow step-by-step mit Bildern, Datenquellen, WhatsApp-Trigger
- [ ] **PAGE-03**: Finanzplan als eigene Seite (Kostenstruktur, Preismodell, 3-Jahres-Prognose, Szenarioanalyse)
- [ ] **PAGE-04**: Ergebnisse-Seite aktualisieren (Erreichte Ergebnisse, Marktabgrenzung, Zielgruppe, Geschäftsmodell — ohne Finanzplan)

### Inhalt

- [ ] **CONTENT-01**: Startseite an neue Struktur anpassen (Links, CTAs, Übersicht beider Systeme)
- [ ] **CONTENT-02**: Technologien-Seite mit Bericht abgleichen (Tech-Stack-Tabelle, Herausforderungen & Learnings)
- [ ] **CONTENT-03**: Über-uns-Seite prüfen und korrigieren
- [ ] **CONTENT-04**: Alle Texte gegen Zusammenfassungs-PDF und Projektbericht auf Fehler prüfen

## Traceability

| Requirement | Phase |
|-------------|-------|
| UML-01, UML-02 | 7 |
| NAV-01, ROUTE-01 | 7 |
| PAGE-01, PAGE-02 | 8 |
| PAGE-03, PAGE-04 | 9 |
| CONTENT-01 | 9 |
| CONTENT-02, CONTENT-03, CONTENT-04 | 9 |

## Future Requirements

(None deferred)

## Out of Scope

- Interaktiver Chatbot/Demo auf der Webseite
- Backend/API-Anbindung
- Neue Animationen oder Design-Änderungen (bestehende werden beibehalten)
- Demo-Video-Platzhalter ersetzen (eigenes Todo, nicht Teil von v1.2)
