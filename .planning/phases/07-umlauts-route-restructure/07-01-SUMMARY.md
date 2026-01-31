---
phase: 07
plan: 01
subsystem: i18n
tags: [umlauts, unicode, i18n, de.json, en.json]
dependency-graph:
  requires: []
  provides: [real-unicode-umlauts]
  affects: [07-02]
tech-stack:
  added: []
  patterns: [unicode-native-i18n]
key-files:
  created: []
  modified: [webapp/messages/de.json, webapp/messages/en.json]
decisions:
  - id: D-07-01-01
    description: "Preserved ss in Wissen, Impressum, Weiss, lassen, messen -- these are legitimate double-s, not ß substitutes"
  - id: D-07-01-02
    description: "Preserved ae/ue in Betreuer, manuell, textuell, eventuell, herausgefiltert -- these are not umlaut substitutes"
metrics:
  duration: ~3min
  completed: 2026-01-31
---

# Phase 7 Plan 1: ASCII Umlaut Replacement Summary

Replaced all ASCII-encoded umlaut substitutes (ae/oe/ue/ss) with real Unicode characters (ä/ö/ü/ß) across both translation files.

## What Was Done

### Task 1: de.json Umlaut Replacement
- Replaced ~53 lines containing ASCII umlaut substitutes
- Key replacements: Lösung, Über, für, größ, Straße, Österreich, Schüler, Gründer, führend, Kärnten, etc.
- Preserved legitimate ss: Wissen, Impressum, Weiss, aussortiert, angemessen
- Preserved legitimate ae/ue: Betreuer, manuell, textuell, eventuell

### Task 2: en.json German Proper Noun Fixes
- Lastenstrasse -> Lastenstraße (6 occurrences)
- Woerthersee -> Wörthersee (1 occurrence)
- No English text was modified -- only German proper nouns embedded in English translations

## Deviations from Plan

None -- plan executed exactly as written.

## Verification

- JSON validation: both files parse successfully
- No remaining ASCII umlaut patterns for German words
- All legitimate ss/ae/ue preserved
- Next.js build passes

## Commits

| # | Hash | Message |
|---|------|---------|
| 1 | a043f3d | feat(07-01): replace ASCII umlauts with real Unicode in de.json |
| 2 | 98e7103 | feat(07-01): fix ASCII umlauts in German proper nouns in en.json |
