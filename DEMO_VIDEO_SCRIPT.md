# AlphaZJobs — Demo Video Script (target: under 5 minutes)

Record your screen (phone or browser at mobile width works best — this is a mobile-first product) with voiceover. Lines below are a starting point, not a script to read word-for-word — say it in your own voice.

---

## 1. The problem (0:00–0:30)

**Show:** LinkedIn's homepage or your own LinkedIn profile for 2–3 seconds, then cut to AlphaZJobs Landing page.

**Say:**
> "LinkedIn is built around résumés, job titles, and connection counts — which works if you already have a career. It doesn't work if you're 16, self-taught, and have never had a job. Gen Z already treats LinkedIn as 'their parents' social media.' AlphaZJobs is a professional platform built around proof of what you can actually do, not what you claim you can do."

---

## 2. Primary user journey (0:30–3:00)

**Show → Say**, in order:

1. **Onboarding** (~20s) — walk through name/age/skills/interests/photo.
   > "Onboarding builds an identity from skills and interests, not a job history."
2. **Discover → Jobs, List view** (~15s) — scroll the feed, open the filter popover, apply a skill filter.
3. **Discover → Jobs, Swipe mode** (~20s) — tap the Swipe toggle, show it going full-screen, swipe left to pass on one job, swipe right on the next to open Apply.
   > "On mobile, jobs can also be swiped through, Tinder-style — swipe left to pass, right to apply. Apply always opens the same flow you'd get anywhere else in the app."
4. **QuickApplyDialog** (~15s) — show the Receipts picker and note field, submit.
   > "Applying lets you attach verified Receipts as proof, not just a cover letter."
5. **Discover → Challenges tab** (~25s) — point out a Quest card at the top (2 Challenges chained to unlock a real job), then open a Challenge, submit for review, show the "pending → verified" status change.
   > "A Receipt is earned by actually completing a small real task, then it's verified. Quests chain a couple of related Challenges together to unlock priority consideration for a specific job."
6. **Profile** (~20s) — scroll through Receipts section, connected platforms ("Your vibe"), saved jobs.
7. **Discover → People tab → View profile** (~15s) — click into Jordan or Sam's profile, show their Receipts.
   > "Anyone's Receipts are visible before you even message them — that's the credibility signal."
8. **Rooms** (~15s) — open a room, send a message.
9. **Employer side** (~30s) — Settings → toggle "I'm hiring" → Post a Job → attach a Challenge → mock payment → Dashboard → View Applicants → show a showcased Receipt.
   > "The other half of the marketplace: employers post jobs, optionally attach a role-specific Challenge, and review applicants by actual evidence."

---

## 3. Key design decisions (3:00–3:45)

**Show:** Split-screen or quick cuts between Profile's Receipts section and a LinkedIn skills section (if you want the contrast), plus the Settings minor-safety section.

**Say (pick 2-3, don't try to cover everything):**
> "The signature decision was making Receipts optional, not a gate — anyone can apply with zero Receipts, they just have weaker evidence than someone who has proof. Locking people out would defeat the point of a platform for people who haven't built a career yet."

> "Since a lot of this userbase is literally minors, age shows as a range instead of an exact number, DMs are restricted to verified mentors/employers for under-18 accounts, and employer mode is disabled entirely for minors."

---

## 4. The AI-native feature (3:45–4:30)

**Show:** AI Match page — the loading state, then the results with the skills-match / interest-fit breakdown bars.

**Say:**
> "AI Match doesn't just give a black-box percentage — it breaks the score into skills match and interest fit, computed from your actual profile data, and explains in plain language why each job matched. It's honest about being a real computation from your real skills, not marketing copy."

*(Optional, strengthens "AI collaboration" transparency — mention build process:)*
> "I built this with Claude Code and Replit — worth noting the AI-generated matching logic here is deliberately simulated rather than backed by a live model call, which I documented rather than hid."

---

## 5. What you'd test next (4:30–5:00)

**Show:** Nothing new needed — talking head or a static shot of the app.

**Say:**
> "What I'd test next: whether the swipe interaction actually holds up on real devices across iOS and Android — I built and verified this by code review since I didn't have hands-on device testing during the build. I'd also want to test whether Receipts genuinely change who gets a callback compared to a plain application, and whether the 'I'm hiring' flow converts real early-stage founders, since that's the whole revenue thesis."

---

## Notes
- Total run time above is ~4:45 — trims easily if you go over.
- If time is tight, cut section 3 (design decisions) to one line rather than skipping the user journey or the AI feature — those two are explicitly required.
- Production quality doesn't matter per the brief ("clear thinking is") — don't over-invest in editing.
