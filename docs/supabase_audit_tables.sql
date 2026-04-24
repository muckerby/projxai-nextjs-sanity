-- AI Opportunity Audit — Supabase table setup
-- Run this in: supabase.com → projxai project → SQL Editor → New query
-- Session 20, 24 April 2026

-- ============================================================
-- Table 1: audit_sessions
-- Created at start of audit (before submission)
-- ============================================================
CREATE TABLE IF NOT EXISTS audit_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'in_progress', -- in_progress | submitted | gated | complete
  answers JSONB,
  ip_country TEXT,
  referrer TEXT
);

-- Index for status queries
CREATE INDEX IF NOT EXISTS idx_audit_sessions_status ON audit_sessions(status);
CREATE INDEX IF NOT EXISTS idx_audit_sessions_created_at ON audit_sessions(created_at DESC);

-- ============================================================
-- Table 2: audit_reports
-- Created after Claude API call completes
-- ============================================================
CREATE TABLE IF NOT EXISTS audit_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES audit_sessions(id),
  generated_at TIMESTAMPTZ DEFAULT now(),
  report_json JSONB NOT NULL,
  score INTEGER,
  email TEXT,
  email_captured_at TIMESTAMPTZ,
  hubspot_contact_id TEXT,
  sanity_lead_id TEXT,
  access_token TEXT UNIQUE DEFAULT gen_random_uuid()::TEXT,
  token_expires_at TIMESTAMPTZ DEFAULT (now() + INTERVAL '12 months')
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_audit_reports_session_id ON audit_reports(session_id);
CREATE INDEX IF NOT EXISTS idx_audit_reports_email ON audit_reports(email);
CREATE INDEX IF NOT EXISTS idx_audit_reports_access_token ON audit_reports(access_token);
CREATE INDEX IF NOT EXISTS idx_audit_reports_score ON audit_reports(score);
CREATE INDEX IF NOT EXISTS idx_audit_reports_generated_at ON audit_reports(generated_at DESC);

-- ============================================================
-- Row Level Security — disable for service role (API calls use service_role key)
-- Enable RLS but allow service role bypass (default Supabase behaviour)
-- ============================================================
ALTER TABLE audit_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_reports ENABLE ROW LEVEL SECURITY;

-- Allow anon to INSERT a new session (session created client-side if needed)
-- For now, all writes go via server-side API routes using service_role key
-- so no anon policies needed. Add if Phase 2 requires client-side writes.

-- ============================================================
-- Verification query — run after creating tables
-- ============================================================
SELECT table_name, column_name, data_type
FROM information_schema.columns
WHERE table_name IN ('audit_sessions', 'audit_reports')
ORDER BY table_name, ordinal_position;
