# AlphaZJobs

**A professional platform for Gen Z and Gen Alpha where credibility is earned by doing, not claimed on a résumé.**

**[Live prototype →](https://alphazjobs.vercel.app)**

Users complete small, real **Challenges** ("fix this bug", "edit this reel", "design this hero section"). Each one earns a verified, timestamped **Receipt** tied to specific skills, and Receipts attach directly to job applications as evidence. A 16-year-old with no work history and three verified Receipts is more credible here than an empty LinkedIn profile.

## Features

- **Receipts.** Verified proof of completed work, either generic or tied to a specific employer's job. They're optional and never gate an application.
- **Quests.** Chains of 2–3 related Challenges that unlock priority consideration for a real role.
- **Squad Up.** Team up with a skill-matched partner on a Challenge and share the Receipt.
- **AI Match.** A role-fit score split into *skills match* and *interest fit*, each with a plain-language explanation instead of one opaque percentage.
- **Built for minors.** Under-18 users show an age range rather than an exact age, and employer mode is unavailable to them.
- **Native Gen Z UX.** Mobile-first swipe browsing for jobs and a "Chronically Online" language mode.

## Stack

TypeScript · React · Vite · Tailwind CSS · Radix UI · TanStack Query · Framer Motion · Express · PostgreSQL + Drizzle · pnpm workspaces

## Run locally

```bash
pnpm install
pnpm --filter @workspace/alphazjobs dev     # frontend
pnpm run build                              # typecheck + build all packages
```

## Docs

- [`PRODUCT_OVERVIEW.md`](PRODUCT_OVERVIEW.md): product thesis, target users, and how it differs from LinkedIn
- [`BUILD_JOURNAL.md`](BUILD_JOURNAL.md): build decisions and trade-offs
