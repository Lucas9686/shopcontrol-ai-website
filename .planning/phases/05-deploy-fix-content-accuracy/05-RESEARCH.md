# Phase 5: Deploy Fix & Content Accuracy - Research

**Researched:** 2026-01-31
**Domain:** Git tracking fix, Next.js i18n content corrections
**Confidence:** HIGH

## Summary

This phase has two distinct workstreams: (1) fixing the Vercel deployment by resolving a git tracking issue, and (2) correcting inaccurate content across multiple pages to match the Jugend Innovativ report.

The deploy fix is straightforward: git currently tracks 52 source files at the repo root (e.g., `app/`, `components/`), but these files physically live in `webapp/`. The files at root are marked as deleted in git status. The fix is to remove the root-level tracked files from git and add the `webapp/` files to git tracking.

The content fixes are text-only changes in `messages/de.json` and `messages/en.json`, plus adjustments to TSX component structure (technology page needs 6 correct workflow steps, 4 security layers, 3 tools; solution page needs corrected accounting description and tech stack).

**Primary recommendation:** Fix git tracking first (DEPLOY-01), then do all content fixes in the i18n JSON files and TSX components.

## Standard Stack

No new libraries needed. This phase modifies existing code only.

### Core (already in use)
| Library | Purpose | Relevant to this phase |
|---------|---------|----------------------|
| next-intl | i18n translations | All content lives in `messages/de.json` and `messages/en.json` |
| Next.js | Framework | Vercel build target |
| Vercel | Hosting | Deploy target with `webapp/` as root directory |

## Architecture Patterns

### Git Tracking Fix Pattern

The problem: Files were committed at repo root, then moved to `webapp/`, but git was never told. Result: git tracks ghost files at root, real files in `webapp/` are untracked.

**Fix approach:**
```bash
# 1. Remove old root-level files from git index (keep on disk is irrelevant, they don't exist)
git rm --cached app/[locale]/about/page.tsx  # ... all 52 tracked root files

# 2. Add all webapp/ files to git
git add webapp/

# 3. Commit
git commit -m "fix: move git tracking from root to webapp/"
```

After this, Vercel's "Root Directory: webapp" setting will find the files.

**Alternative (simpler):**
```bash
git rm -r --cached app/ components/ components.json i18n/ messages/ next.config.mjs package.json pnpm-lock.yaml postcss.config.mjs proxy.ts public/ tsconfig.json
git add webapp/
git commit -m "fix: move git tracking from root to webapp/"
```

### Content Fix Pattern

All user-facing text lives in two JSON files:
- `webapp/messages/de.json` (German)
- `webapp/messages/en.json` (English)

Component structure changes happen in TSX files. The technology page at `webapp/app/[locale]/technology/page.tsx` defines the steps array and section structure.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Git file move | Manual file copying | `git rm --cached` + `git add` | Preserves history cleanly |
| Content changes | Direct TSX string edits | Edit i18n JSON files | All content is already externalized via next-intl |

## Common Pitfalls

### Pitfall 1: Using `git rm` without `--cached`
**What goes wrong:** `git rm` deletes files from disk. The root files are already gone, but for safety always use `--cached` to only affect the index.
**How to avoid:** Always use `git rm --cached` or `git rm -r --cached`.

### Pitfall 2: Forgetting to update BOTH language files
**What goes wrong:** Fixing de.json but not en.json (or vice versa) leaves one language incorrect.
**How to avoid:** Every content change must touch both `messages/de.json` and `messages/en.json`.

### Pitfall 3: Changing component structure without updating translation keys
**What goes wrong:** If the technology page changes from 4 tools to 3 tools, the TSX must remove tool cards AND the JSON must have matching keys.
**How to avoid:** Always change TSX and JSON in the same commit.

### Pitfall 4: Screenshot mapping errors
**What goes wrong:** Workflow steps reference wrong screenshot files.
**How to avoid:** Map each of the 6 required steps to available screenshots explicitly.

## Current State Analysis

### DEPLOY-01: Git Tracking Issue

**52 files tracked at root** (all showing as deleted because files physically live in `webapp/`):
- `app/` directory (9 files)
- `components/` directory (14 files)
- `i18n/` directory (3 files)
- `messages/` directory (2 files)
- `public/` directory (15 files)
- Config files (9 files: package.json, tsconfig.json, etc.)

**137 files in `webapp/` untracked** by git.

### TECH-01 through TECH-03: Workflow Steps

**Current (WRONG):** 6 steps but wrong names/descriptions:
1. "Kundenanfrage empfangen" (generic)
2. "KI-Agent analysiert" (generic)
3. "RAG-Wissensabfrage" (this is a separate section, not a step)
4. "Shopify-Datenabfrage" (not a workflow step per report)
5. "Antwort generieren" (generic)
6. "Buchhaltung automatisch" (wrong - this is about invoices)

**Required (from report 5.2):** 6 steps:
1. E-Mail-Abruf (5.2.1)
2. Filterung (5.2.2)
3. Bild-Analyse (5.2.3)
4. Support-Agent-Verarbeitung (5.2.4)
5. E-Mail-Versand (5.2.5)
6. Performance-Logging (5.2.6)

**Available screenshots** that map to these steps:
- `get-emails.png` -> E-Mail-Abruf
- `filter-sektion.png` -> Filterung
- `bildanalyse-sektion.png` -> Bild-Analyse
- `support-agent-mit-tools.png` -> Support-Agent-Verarbeitung
- `send-emails.png` -> E-Mail-Versand
- `performance-logging.png` -> Performance-Logging

**Current screenshot mapping (WRONG):**
1. `gesamter-workflow.png` -> should not be a step screenshot
2. `support-agent-mit-tools.png` -> correct for step 4
3. `rag-auto-upload.png` -> not a step screenshot
4. `tools-von-agent.png` -> not a step screenshot
5. `support-agent-ohne-tools.png` -> not a step screenshot
6. `buchhaltung-workflow.png` -> not a step screenshot

### TECH-04: Security Section

**Current (WRONG):** 3 items (Prompt Injection, Fehler-Trigger, Eskalation)
**Required:** 4 layers (Jailbreak Detection, NSFW Filter, Topical Alignment, Output Guardrails)

### TECH-05: Tools Section

**Current (WRONG):** 4 tools (Shopify-Agent, Google Sheets-Agent, E-Mail-Tool, Bildanalyse)
**Required:** 3 tools (Chat Memory/PostgreSQL, Shopify-Agent, Support-Fall-Agent/Sheets-Agent)

### TECH-06: RAG Section

**Current:** Mentions Pinecone but missing Cohere Reranker and embedding model details.
**Required:** Pinecone, Cohere Reranker, embedding model per report 5.3.

### SOL-01: Accounting Pillar

**Current (WRONG):** "Rechnungen werden automatisch erstellt, per E-Mail versendet..." (invoice generation)
**Required:** Financial KPI reporting via WhatsApp, data from Shopify/Facebook Ads/bank.

This is the biggest content error -- the entire accounting pillar description is wrong.

### SOL-02: Tech Stack

**Current (WRONG):** 5 items: n8n, Pinecone, Shopify, OpenAI (GPT-4 only), Google Sheets
**Required:** Claude/GPT (not just OpenAI), Supabase for DB, Cohere Reranker, WhatsApp API, Telegram

### CROSS-01: Support Agent Description

**Current (WRONG):** References "Chat-Widget" and "Chatbot" in:
- `de.json` line 52: "vollautonomer Chatbot"
- `de.json` line 117: "Chat-Widget oder per E-Mail"
- `en.json` line 52: "fully autonomous chatbot"
- `en.json` line 117: "chat widget or email"

**Required:** E-Mail-based agent, no chat widget references.

## Code Examples

### Corrected steps array for technology page
```typescript
const steps = [
  { key: "step1", image: "/images/workflows/get-emails.png" },
  { key: "step2", image: "/images/workflows/filter-sektion.png" },
  { key: "step3", image: "/images/workflows/bildanalyse-sektion.png" },
  { key: "step4", image: "/images/workflows/support-agent-mit-tools.png" },
  { key: "step5", image: "/images/workflows/send-emails.png" },
  { key: "step6", image: "/images/workflows/performance-logging.png" },
];
```

### Security section needs 4 cards instead of 3
```typescript
// Current: 3-column grid with 3 cards
// Required: 4 cards for Jailbreak Detection, NSFW Filter, Topical Alignment, Output Guardrails
// Consider 2x2 grid: md:grid-cols-2
```

### Tools section needs 3 cards instead of 4
```typescript
// Current: 4 cards (Shopify, Sheets, Email, Vision)
// Required: 3 cards (Chat Memory/PostgreSQL, Shopify-Agent, Support-Fall-Agent/Sheets-Agent)
```

## Files That Need Changes

| File | Changes | Requirement |
|------|---------|-------------|
| Git index | Remove 52 root files, add 137 webapp/ files | DEPLOY-01 |
| `webapp/messages/de.json` | Rewrite technology.workflow steps 1-6, security section (4 layers), tools section (3 tools), RAG section, solution.pillars.accounting, solution.techStack, fix "Chatbot"/"Chat-Widget" refs | TECH-01-06, SOL-01-02, CROSS-01 |
| `webapp/messages/en.json` | Same changes as de.json in English | TECH-01-06, SOL-01-02, CROSS-01 |
| `webapp/app/[locale]/technology/page.tsx` | Update steps array (images), security section (4 cards), tools section (3 cards) | TECH-01, TECH-03, TECH-04, TECH-05 |
| `webapp/app/[locale]/solution/page.tsx` | Update techItems array to match new tech stack | SOL-02 |

## Open Questions

1. **Exact report text for step descriptions (TECH-02)**
   - What we know: Step names from requirements (5.2.1-5.2.6)
   - What's unclear: Exact description text for each step (report PDF exists in Matrealien/ but cannot be reliably extracted here)
   - Recommendation: Planner should note that implementer needs to reference the report PDF in `Matrealien/da_webshop_agent_bericht (7).pdf` for exact wording

2. **Exact accounting pillar description (SOL-01)**
   - What we know: It should be about financial KPI reporting via WhatsApp, data from Shopify/Facebook Ads/bank
   - What's unclear: Exact feature bullet points
   - Recommendation: Implementer references report chapter 6

## Sources

### Primary (HIGH confidence)
- Direct file inspection of `webapp/messages/de.json`, `webapp/messages/en.json`
- Direct file inspection of `webapp/app/[locale]/technology/page.tsx`, `solution/page.tsx`
- `git status` and `git ls-files` output
- `.planning/REQUIREMENTS.md` for exact requirement text
- Available screenshot files in `webapp/public/images/workflows/`

## Metadata

**Confidence breakdown:**
- Deploy fix (DEPLOY-01): HIGH - git state fully understood from direct inspection
- Content gaps (TECH-01 through CROSS-01): HIGH - exact current vs required state mapped from files and requirements
- Exact replacement text: MEDIUM - step names known, but full descriptions need report PDF reference

**Research date:** 2026-01-31
**Valid until:** No expiry (project-specific factual findings)
