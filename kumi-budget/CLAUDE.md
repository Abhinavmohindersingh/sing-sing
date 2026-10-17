# Kumi pilot budget: handoff

Budget and quote builder for the **Kumi** Grade 3 pilot (PNG, Tok Pisin), for Brian Bell. Sing Singh AI builds the platform only; the partner runs the pilot on the ground.
Never mention Solomon Kings, Kingi or "the club" anywhere. Write **Tok Pisin**, never Pijin. Plain, short wording; the user prefers short replies and wants to be asked before big changes.

## Run it
```
cd kumi-budget
python3 plain_breakdown.py   # the quote builder -> kumi-cost-breakdown-full.html (open it in a browser; it holds internal day rates, do not publish)
python3 build_tiers.py       # the live budget page -> ../public/kumi-pilot-budget.html (no rates) + dist/ (with rates)
```
`plain_breakdown.py` refuses to build if its totals drift from `gen_v2.py` (agreed Core = Tier 1; the raw task data must also add up to Tier 3 before the foundation scaling). Keep those checks passing.

## Files
- `gen_v2.py`: the budget. One run = one tier (`TIER=0..3`). Tasks are in the `W` list; markup `⟦0:a¦3:b⟧` picks wording by tier and `[2]` / `[2-2]` bullet prefixes pick bullets by tier.
  - Switches (env vars) used only by the quote builder: `PLATFORM`, `CUT`, `KEYWORDS`, `OWNAI`. **With none set, the live page must build byte-identical.** Check this after any change to the generator.
- `build_tiers.py`: joins tiers 0–3 into the public page (rail, calculator, tiers).
- `plain_breakdown.py`: the quote builder (starts at $0, every line struck through, tick steps to build the quote).
- `doc_style.py`, `doc_head.html`, `cmt_widget.html`: page styles and the comment widget.

## Quote builder: decisions so far
- Steps: foundation (required); app (desktop, online, offline, student login and profiles, teacher screen); lessons; AI content curation (Claude **or** our own model); AI speech; extras.
- **Online and Offline** are separate ticks. Both together adds the sync engine. Claude, ElevenLabs and the teacher screen are locked until Online is ticked. Offline only forces our own AI model and our own speech model.
- **Lessons:** "Subjects" is the main tick (its ▾ shows the cost by subject); under it Numeracy, Literacy and Personal development, each with its own hours (default 10, 10, off). Hours of content = the ticked subjects' hours. Content is provided to us by default (the designer animates it, $518 an hour). Ticking "We prepare the content" adds $518 an hour. No PNG teacher help.
- **AI speech:** one-way (Core) or two-way (add-on). English via ElevenLabs; Tok Pisin needs our own speech models. Keyword listening (halivim, gen, nekis, mi no save, pinis) is a Core task, B10.
- **Hardware for our own AI model:** one GPU server per school (desktop with a 16 GB graphics card, on the lab network; the school's 8 GB computers stay). Buy about A$3,000 or lease about A$110 a month. The "Schools" field sets how many. Provisional: get real quotes.
- Cut from scope and shown struck as "Not in our scope": on-ground pilot work (installation, travel, pilot support, comparison class, reports), headsets, criminal checks.
- Project management is 3 weeks at Core. Testing is trimmed to release readiness.
- **Project foundation is planning only:** setup, requirements, architecture, safeguarding and project management, fixed. The cloud backend (A5) and security, backup and monitoring (A6) come with Online. Release testing (`POOL`: G1–G5, G8, G9) is priced with each feature as about 28% of its build work (lesson hours excluded), shown as one ▸ Release testing line in each step's ▾; G6 AI safety testing stays with the AI. Set so Core still = Tier 1.
- **Claude during the build** is priced from the workload (prompt tuning, ~18,000 test lessons, ~15,000 safety tests graded by Sonnet 5.5 in batches, load tests, help bank, +50% re-runs): about A$2,500, set in `gen_v2.py` under `PLATFORM` only, so the live page is untouched.
- **Our own AI model:** 30,000 training examples written and checked with Sonnet 5.5 (~A$745), 100 GPU-hours to tune (A$500), plus data prep in D5 (80/10/10 split, 500-example hand-checked test set: +1 wk AI engineer, +1 wk content developer).
- Totals (20 hours of content, content prepared by us): Core **$164,103**; everything at 30 hours **$285,472** (the live budget page's Tier 1 and Tier 3 are unchanged).

## Open items
- The live page (`/kumi-pilot-budget`) is older than the generator: the Tier 1 "English voice only, Tok Pisin on screen" change is built but not published (it would make Tier 1 $239,420).
- Check "no major provider supports Tok Pisin speech" and have a native speaker confirm the Tok Pisin keywords before an investor sees them.
- The GPU server needs a local lab network (no internet needed). The network is the partner's job, so no line for it in the quote.
- GPU size: the RTX 4060 Ti 16 GB suits one class (~20 at once); for ~100 at once use an RTX 5090 32 GB, or two smaller servers for a backup. An H100 is overkill. Not yet in the quote.
- "Teacher support" was taken to mean the Grade 3 Teacher role (removed). The optional Expert teacher check stays.
- Pricing context: PNG Government proposal is $550k for 15 schools (development about $225k, $259k with 15% contingency); Brian Bell Tier 1 is about $240k.
