# Release Blocker Register

> **Status:** Active
>
> **Scope:** QuizArena v1.0 Production Stabilization
>
> **Framework:** HC AI SDLC
>
> **Purpose:** Authoritative source for tracking launch readiness. Every issue preventing a successful production release shall be tracked here.

---

## Release Dashboard

| Metric | Value |
|--------|-------|
| **Total Blockers** | 10 |
| **Open P0** | 4 |
| **Open P1** | 3 |
| **Open P2** | 3 |
| **Closed** | 0 |
| **Launch Readiness** | **0%** |

*(Launch Readiness is based only on resolved blockers)*

---

## Priority Levels

* **P0 — Launch Blocker**: Must be resolved before production release (Build failures, TypeScript/Prisma failures, Authentication broken, Security vulnerabilities).
* **P1 — High Priority**: Should be resolved before launch but does not prevent deployment (Missing validation, broken UX flows, integrations).
* **P2 — Improvement**: Can be completed after launch (UI polish, minor animations, responsive refinements).

---

## Registry

### P0 - Launch Blockers

#### [BLK-P0-001] Prisma Client Generation Fails on Vercel
* **Title:** Prisma Client Generation Fails on Vercel
* **Priority:** P0
* **Category:** Deployment
* **Description:** Production deployment fails because Prisma Client is not generated during the Vercel build.
* **Root Cause:** Missing `postinstall` script in `package.json` to trigger generation.
* **Current Status:** Open
* **Owner:** Engineering Team
* **Verification Criteria:** Successful Vercel deployment without Prisma initialization errors.
* **Resolution Notes:** N/A
* **Date Opened:** 2026-07-22
* **Date Closed:** N/A

#### [BLK-P0-002] Repository Production Pipeline Not Yet Verified
* **Title:** Repository Production Pipeline Not Yet Verified
* **Priority:** P0
* **Category:** Infrastructure
* **Description:** GitHub → Vercel deployment pipeline must be verified using the official QuizArenaLab repository.
* **Root Cause:** To be determined
* **Current Status:** Open
* **Owner:** Engineering Team
* **Verification Criteria:** Commit pushed to official repository triggers successful production deployment.
* **Resolution Notes:** N/A
* **Date Opened:** 2026-07-22
* **Date Closed:** N/A

#### [BLK-P0-003] Missing Supabase Environment Variables
* **Title:** Missing Supabase Environment Variables
* **Priority:** P0
* **Category:** Configuration
* **Description:** Critical environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) are missing from `.env` and Vercel.
* **Root Cause:** Environment variables not migrated or configured.
* **Current Status:** Open
* **Owner:** Engineering Team
* **Verification Criteria:** Application connects to Supabase without runtime crashing.
* **Resolution Notes:** N/A
* **Date Opened:** 2026-07-22
* **Date Closed:** N/A

#### [BLK-P0-004] Hardcoded Localhost in Production Emails
* **Title:** Hardcoded Localhost in Production Emails
* **Priority:** P0
* **Category:** Configuration
* **Description:** Verification and password reset emails use `http://localhost:3004` as a fallback, which will break production links if `NEXT_PUBLIC_APP_URL` fails to load.
* **Root Cause:** Hardcoded fallback values in `src/lib/emails/mailer.ts`.
* **Current Status:** Open
* **Owner:** Engineering Team
* **Verification Criteria:** No `localhost` references exist as fallbacks for email generation.
* **Resolution Notes:** N/A
* **Date Opened:** 2026-07-22
* **Date Closed:** N/A

---

### P1 - High Priority

#### [BLK-P1-001] Forgot Password Flow Completion
* **Title:** Forgot Password Flow Completion
* **Priority:** P1
* **Category:** Authentication
* **Description:** The Forgot Password flow requires functional completion.
* **Root Cause:** Implementation pending
* **Current Status:** Open
* **Owner:** Engineering Team
* **Verification Criteria:** User can successfully trigger, receive, and complete a password reset.
* **Resolution Notes:** N/A
* **Date Opened:** 2026-07-22
* **Date Closed:** N/A

#### [BLK-P1-002] Amazon SES Email Integration Verification
* **Title:** Amazon SES Email Integration Verification
* **Priority:** P1
* **Category:** Integration
* **Description:** Amazon SES email integration requires end-to-end verification.
* **Root Cause:** Verification pending
* **Current Status:** Open
* **Owner:** Engineering Team
* **Verification Criteria:** Real emails are successfully delivered via SES in a production-like environment.
* **Resolution Notes:** N/A
* **Date Opened:** 2026-07-22
* **Date Closed:** N/A

#### [BLK-P1-003] Email Provider Configuration Mismatch
* **Title:** Email Provider Configuration Mismatch
* **Priority:** P1
* **Category:** Configuration
* **Description:** `.env` supplies AWS SES credentials, but `mailer.ts` requires SMTP credentials and falls back to a hardcoded Brevo configuration.
* **Root Cause:** Integration code was not updated to reflect AWS SES infrastructure changes.
* **Current Status:** Open
* **Owner:** Engineering Team
* **Verification Criteria:** Environment variables cleanly map to the email service implementation without unused keys.
* **Resolution Notes:** N/A
* **Date Opened:** 2026-07-22
* **Date Closed:** N/A

---

### P2 - Improvements

#### [BLK-P2-001] Authentication UI Refinements
* **Title:** Authentication UI Refinements
* **Priority:** P2
* **Category:** UI/UX
* **Description:** General UI polish and refinements across authentication views.
* **Root Cause:** Polish pending
* **Current Status:** Open
* **Owner:** Engineering Team
* **Verification Criteria:** Design review approval.
* **Resolution Notes:** N/A
* **Date Opened:** 2026-07-22
* **Date Closed:** N/A

#### [BLK-P2-002] Button Interactions
* **Title:** Button Interactions
* **Priority:** P2
* **Category:** UI/UX
* **Description:** Enhance button hover, active, and loading states.
* **Root Cause:** Polish pending
* **Current Status:** Open
* **Owner:** Engineering Team
* **Verification Criteria:** Interactions pass UX review.
* **Resolution Notes:** N/A
* **Date Opened:** 2026-07-22
* **Date Closed:** N/A

#### [BLK-P2-003] Responsive Polish
* **Title:** Responsive Polish
* **Priority:** P2
* **Category:** UI/UX
* **Description:** Minor responsive refinements across varied screen sizes.
* **Root Cause:** Polish pending
* **Current Status:** Open
* **Owner:** Engineering Team
* **Verification Criteria:** UI scales correctly on mobile, tablet, and desktop without visual breakage.
* **Resolution Notes:** N/A
* **Date Opened:** 2026-07-22
* **Date Closed:** N/A

---

## HC AI SDLC Engineering Rules

1. Every future Implementation Plan **must** check the Release Blocker Register.
2. If a related blocker exists, reference the Blocker ID in the plan.
3. When implementation finishes, update the blocker status here.
4. A blocker may **only** be closed after Verification Criteria have been successfully met.
