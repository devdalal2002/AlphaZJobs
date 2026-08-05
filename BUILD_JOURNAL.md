# AlphaZJobs — Build Journal

## Tools used
- **Replit** — initial scaffold and rapid UI generation (React + Vite + TypeScript + Tailwind + shadcn/ui), following an upfront detailed build prompt. Handled the first pass of Landing, Onboarding, Discover, Profile, Messages, Rooms, AI Match, and the "Chronically Online" language system.
- **Claude Code** — continued development after Replit's agent usage ran out mid-project. Handled bug fixes, the Receipts system, the mobile swipe view, the employer side, and deployment.
- **GitHub** — version control, shared between both tools.
- **Vercel** — production hosting, deployed via the Vercel CLI.

Switching tools mid-build wasn't the plan — it happened because Replit's AI agent credits ran out. Continuing in a different AI tool against the same GitHub repo turned out to be a reasonable adaptation: same codebase, same conventions, no rework needed to switch.

## Important prompts used with AI

**Initial build prompt (Replit), condensed:**
> You are building AlphaZJobs, a professional social platform for Gen Z and Gen Alpha... Problem: Gen Z doesn't see influencer, creator, and emerging jobs as "real careers" on LinkedIn. AlphaZJobs normalizes ALL job types and lets users find alike people... Differentiator: DMs + Rooms... AI JOB MATCHING FEATURE (CORE DIFFERENTIATOR)... Language: "English (Chronically Online)" as DEFAULT, with toggle to "English (US)"...

**Follow-up bug-fix prompt (after manual review found dead buttons and missing state), condensed:**
> FOLLOW-UP FIXES for AlphaZJobs — the prototype has several dead/fake interactions that need to be made real... 1. WIRE ONBOARDING TO THE ACTUAL PROFILE... 3. MAKE DMs AND ROOMS ACTUALLY SEND MESSAGES... 6. ADD GEN ALPHA / MINOR-SAFETY CONSIDERATIONS (required by the brief, currently absent)...

**Direct iterative prompts in Claude Code** (once Replit ran out): plain-language asks like "saved jobs are nowhere to be found, create a light and dark mode toggle," "can we add swipe option for mobile mode? like tinder," and "we need an employer side too and i was considering job posting primary revenue source" — each answered with a concrete implementation, typecheck, commit, and redeploy before moving to the next.

## What AI did well
- Scaffolded a full working app matching a fairly detailed aesthetic/tone brief (Gen Z voice, dark-mode-first, minimalist job cards) in one shot on Replit.
- Root-caused subtle bugs precisely rather than surface-patching them. Example: a reported "page refreshes on every swipe" turned out to be mobile browsers hijacking the horizontal drag gesture as their own native pull-to-refresh/edge-navigation gesture, because nothing told them not to — the fix was `touch-action: pan-y` and `overscroll-behavior-y: contain`, not a rewrite of the swipe logic. Diagnosing that required tracing the actual browser behavior, not just "the animation feels off."
- Kept a growing, 
interconnected data model consistent across many features (Receipts threading through Profile, Discover, the apply flow, and later the employer Applicants view) without breaking previously-shipped functionality — verified via a clean TypeScript build before every commit.

## Where AI produced incorrect or weak results
Several concrete gaps shipped before being caught, all missed by the AI at build time rather than anything wrong with the request:
- The first swipe-card implementation set a hard `dragConstraints={{left:0,right:0}}` that fought the drag gesture instead of following it, and was missing `touch-action`/`overscroll-behavior` CSS entirely. On mobile this meant the browser's own native pull-to-refresh gesture hijacked the horizontal swipe — invisible from the code alone, only surfaced once actually tested on a touchscreen.
- The swipe card's own action buttons sat inside the draggable element with nothing stopping Framer Motion's drag recognizer from swallowing their taps — the Apply button silently didn't register clicks until it was reported as broken.
- A later full review pass caught several features that looked done but weren't: age fields with no real bounds (accepted age 1 or age 999), a Notifications toggle that visually flipped but was never wired to any state or persisted, a Settings page that promised "18+ jobs show a notice before you can apply" as copy without that notice ever being built, and a delete-account flow that was only wired into the adult branch — silently leaving minor accounts with no way to delete their own data at all.

None of these were caught by TypeScript or a clean build — every one compiled fine and looked plausible in a quick glance. They only surfaced through deliberate testing and dedicated review passes, which is the real takeaway below.

## What I changed manually (overriding the AI's suggestion)
Rejected a 15-point "make it a Tinder+Instagram+Discord hybrid" redesign prompt outright. It would have added a second, redundant job-browsing screen alongside the existing one, buried Community (a required capability) out of primary navigation, and generally worked against the challenge brief's own explicit scoring criteria ("we will not give higher scores simply for producing more screens"). Cherry-picked only the two ideas from it that were actually on-thesis — a real skills/interest match breakdown, and tying Receipts into the apply flow — and built those properly instead.

## The hardest decision
Whether Receipts should be *required* to apply to jobs (a hard gate) or stay fully optional. A gate would make the credibility signal stronger and more consistent, but it would lock out the exact users the platform exists to serve — people with no experience and no Receipts yet. Chose to keep Receipts optional and voluntary everywhere (never consumed, reusable across applications, never blocking an application), while still making them the primary way credibility is *displayed* wherever they exist. The follow-up employer-side conversation reinforced this was right: job-specific Challenges now give employers a way to ask for stronger evidence on a per-role basis without the platform itself gating anyone out globally.

## What I learned
A clean TypeScript build and a passing typecheck say nothing about whether a feature is actually complete or correctly wired — unbound form validation, a fake toggle, an unenforced safety promise, and a flow that only worked for one branch of users all shipped silently because they compiled fine. Treating "it builds" as a floor rather than a finish line, and running deliberate review passes that check each page against what it claims to do (not just whether it renders), was the only thing that actually caught these.

## What I'd do with one additional week
- Build the "Rising" surface — a Discover view highlighting people with strong Receipts but low visibility, as an explicit counter to popularity-as-the-only-signal.
- Add real return-driver notifications ("3 new matches since you last checked") — right now nothing pulls a user back after their first session.
- Add verified employer/mentor badges — Settings and Profile both describe minors as only messageable by "mentors and verified employers," but nothing actually marks an account as verified, so that restriction can't be enforced yet, only described.
- A proper on-device QA pass across iOS/Android for the swipe gesture and mobile layout — everything was verified by code review and TypeScript, not a real touchscreen, since no browser automation was available in the build environment.
