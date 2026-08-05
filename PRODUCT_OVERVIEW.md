# AlphaZJobs — Product Overview

**Live prototype:** https://alphazjobs.vercel.app

## One-sentence concept
A professional platform for Gen Z and Gen Alpha where credibility is earned by *doing* — completing real Challenges for verified Receipts — instead of claimed with a résumé, a job title, or a connection count.

## Primary target users
1. **High-school and early-career creators/builders** (14–19) — self-taught developers, designers, and content creators with little or no formal work history, who currently have no way to prove what they can actually do.
2. **Employers and startups seeking high-potential emerging talent** — companies that want cheap, high-signal access to motivated early talent, evaluated on real evidence rather than a polished résumé.

## Product thesis
If résumés, job titles, and connection counts aren't the foundation of a professional identity, what replaces them is **proof of action**. AlphaZJobs replaces self-reported credentials with **Receipts** — verified records of Challenges actually completed, attached directly to job applications as evidence. A 16-year-old with zero work history and three verified Receipts is more credible on this platform than the same person with an empty "experience" section on LinkedIn.

## Signature differentiating feature: Receipts
Completing a **Challenge** (a small real task — "fix this bug," "edit this reel," "design this hero section") earns a verified, timestamped **Receipt** tied to specific skills. Receipts:
- Are optional and reusable, never gating an application — someone with zero Receipts can still apply to any job, they just have weaker supporting evidence than someone who has proof. This keeps the platform open to the exact users it serves: people who haven't built proof yet.
- Can be **generic** (community skill-building, posted by anyone) or **job-specific** — an employer posting a role can attach a Challenge tied to that exact job's requirements, and completing it earns a Receipt tagged to that employer, which is stronger evidence than a generic one.
- Are showcased directly in the apply flow: applying to a job opens a picker where you choose which verified Receipts to attach, plus a short note — the same interaction as attaching a portfolio link, but verifiable.

This is structurally hard for LinkedIn to copy without abandoning résumé/endorsement-based credibility, which is its entire existing model.

Two features build directly on Receipts: **Quests** chain 2-3 related Challenges into a track that unlocks priority consideration for a specific real job once completed, and **Squad Up** lets you team up with a skill-matched partner on a Challenge for a shared Receipt — turning Community from "follow people" into "build something with them."

## AI-native capability: AI Match
Analyzes a user's skills and interests against every open role and returns a match score broken into two honestly-computed components — **skills match** (real skill-set overlap) and **interest fit** (whether their stated interests align with the role) — with a plain-language explanation of why each role matched, rather than an opaque single percentage. (See build journal for how this is implemented and why it's deliberately simulated rather than backed by a live model call.)

## How this is different from LinkedIn
- **Credibility from doing, not claiming.** Receipts vs. a self-reported skills section.
- **Two-sided marketplace with real evidence.** Employers post jobs and job-specific Challenges, and review actual proof of skill from applicants — not just a résumé PDF.
- **Native Gen Z voice, not a reskin.** A "Chronically Online" language mode alongside standard English, mobile-first swipe browsing for jobs (alongside a normal list view), and a design language that doesn't read as corporate software.
- **Built for the fact that many users are minors.** Age shown as a range instead of an exact number for under-18 users, and employer mode is unavailable to minors entirely — both actually enforced. Settings also states a policy that DMs to minors should be limited to verified mentors/employers; that specific restriction is designed but not yet enforced in the prototype (see build journal). LinkedIn has no equivalent protections in place at all because it was never built for a userbase that includes 14-year-olds.

## Why it would attract its first 1,000 users
- **Zero-friction entry for people with nothing to show yet** — the core loop (complete a Challenge → earn a Receipt → apply with real evidence) works for someone with no formal experience at all, which is most of the target audience.
- **A reason to invite friends into Rooms** — community spaces organized by skill/interest area create a reason to return and bring others, not just a static profile.
- **A cheap, high-signal acquisition channel for employers** — small-dollar job posts with verified-evidence applicants are more attractive to early-stage companies than expensive traditional job boards, creating the two-sided flywheel: candidates join for opportunity and reputation-building, employers join for access to cheaper, better-evidenced early talent.
