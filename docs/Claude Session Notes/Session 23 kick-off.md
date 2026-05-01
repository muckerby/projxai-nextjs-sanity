# Session 24 Kick-off

The Audit v2 is live at projxai.com.au/audit (commit c78048a). Header has Tools dropdown → /audit (commit ea324f0). /tools page hero + first card point to /audit.

**Critical rule:** NEVER use Edit tool on projxai workspace files — FUSE null bytes break Turbopack. Use bash heredoc or `sed -i` only.

**Priorities:**
1. End-to-end live test as "Sunrise Accounting" through projxai.com.au/audit
2. Fix any issues found
3. Homepage cross-link to /audit
4. (Optional) CLAUDE.md session history update
