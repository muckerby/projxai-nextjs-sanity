# Session 25 Kick-off Prompt

## Start of session
Read `docs/CLAUDE_UPDATED.md`, `docs/STYLE_GUIDE.md`, and `docs/Claude Session Notes/Session_24_Summary.md` before doing anything else.

## Context
The audit tool is now working end-to-end (streaming architecture, Sonnet model, Supabase save). Session 24 ended with three major design decisions to make before the next build sprint.

## Three decisions to confirm at session start (ask Michael)

1. **Question system redesign** — branching narrative approach agreed in principle. Wizard form or conversational chat interface (AI asks one question at a time, responds to each answer)?

2. **Brand names in reports** — proposed rule: brand names stay in visible/ungated summary sections (credibility), but implementation detail (the HOW — specific steps, integrations, 90-day specifics) uses generic language. Agree?

3. **Post-report portal** — "at your pace" exploration space where users click into opportunities and chat with AI until ready to book a call. Feature inside existing site (report email = login), or separate authenticated product?

## Session 25 Priorities

### Priority 1 — Audit question system redesign
Design the branching narrative question architecture:
- Map the universal context questions (4–5)
- Map the topic silos (Customer Comms, Admin/Ops, Sales/Leads, Finance/Reporting, Marketing, People/HR)
- Design the branching logic (which bottleneck answer → which silos)
- Decide: wizard form vs. conversational chat UI
- Build the new question flow in `/audit/page.tsx`
- Update system prompt to use richer answer data

### Priority 2 — Post-report portal design + Phase 1 build
If time permits: design the portal architecture and begin Phase 1:
- Auth: report email → magic link or token-based login
- Opportunity cards with "Tell me more" / "Add more context" / "I'm interested" actions
- Claude API chat with report JSON as context
- Escalation: "Book a call" → Cal.com with full conversation summary attached

### Priority 3 — End-to-end verification (quick, 10 mins)
- Confirm Resend email delivery after email gate submission
- Confirm HubSpot contact upserted with 10 properties + note
- Confirm Supabase `audit_reports` row has email + `email_captured_at`

### Deferred (later sessions)
- ROAS Calculator build (Phase 2)
- CLAUDE.md session history table update (Sessions 20–24)
