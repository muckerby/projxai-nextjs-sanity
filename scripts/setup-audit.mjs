/**
 * Session 20 — Audit Setup Script
 * 1. Creates Supabase tables (audit_sessions + audit_reports)
 * 2. Runs Claude prompt test against 3 sample answer sets
 *
 * Run from repo root:
 *   node scripts/setup-audit.mjs
 *
 * Requires in .env:
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   ANTHROPIC_API_KEY
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load .env
try {
  const envFile = readFileSync(resolve(__dirname, '../.env'), 'utf-8')
  for (const line of envFile.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq)
    const val = trimmed.slice(eq + 1)
    if (!process.env[key]) process.env[key] = val
  }
} catch {
  // .env not found — rely on process env
}

// ─── Check required vars ───────────────────────────────────────────────────────

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

const PLACEHOLDER = (val) =>
  !val ||
  val === 'PASTE_FROM_SUPABASE_DASHBOARD' ||
  val === 'PASTE_FROM_VERCEL_OR_ANTHROPIC_CONSOLE' ||
  val === 'CHOOSE_A_SECRET_WORD'

const missing = []
if (PLACEHOLDER(SUPABASE_URL)) missing.push('SUPABASE_URL')
if (PLACEHOLDER(SUPABASE_SERVICE_ROLE_KEY)) missing.push('SUPABASE_SERVICE_ROLE_KEY')
if (PLACEHOLDER(ANTHROPIC_API_KEY)) missing.push('ANTHROPIC_API_KEY')

if (missing.length > 0) {
  console.error('\n❌  Missing env vars in .env:\n')
  missing.forEach((k) => console.error(`   • ${k}`))
  console.error('\n   Get from:')
  console.error('   • Supabase: supabase.com → projxai project → Project Settings → API')
  console.error('   • Anthropic: console.anthropic.com → API Keys')
  console.error('\n   Then re-run: node scripts/setup-audit.mjs\n')
  process.exit(1)
}

// ─── Step 1: Create Supabase tables ──────────────────────────────────────────

console.log('\n╔══════════════════════════════════════════════════════════════╗')
console.log('║  ProjxAI Audit — Session 20 Setup                             ║')
console.log('╚══════════════════════════════════════════════════════════════╝')

console.log('\n[1/2] Creating Supabase tables...')

const SQL = `
-- audit_sessions
CREATE TABLE IF NOT EXISTS audit_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'in_progress',
  answers JSONB,
  ip_country TEXT,
  referrer TEXT
);

CREATE INDEX IF NOT EXISTS idx_audit_sessions_status ON audit_sessions(status);
CREATE INDEX IF NOT EXISTS idx_audit_sessions_created_at ON audit_sessions(created_at DESC);

-- audit_reports
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

CREATE INDEX IF NOT EXISTS idx_audit_reports_session_id ON audit_reports(session_id);
CREATE INDEX IF NOT EXISTS idx_audit_reports_email ON audit_reports(email);
CREATE INDEX IF NOT EXISTS idx_audit_reports_access_token ON audit_reports(access_token);
CREATE INDEX IF NOT EXISTS idx_audit_reports_score ON audit_reports(score);
CREATE INDEX IF NOT EXISTS idx_audit_reports_generated_at ON audit_reports(generated_at DESC);

ALTER TABLE audit_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_reports ENABLE ROW LEVEL SECURITY;

SELECT 'Tables created successfully' AS result;
`

try {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ query: SQL }),
  })

  if (!res.ok) {
    // Try the SQL over HTTP directly — some Supabase versions use /sql endpoint
    const res2 = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      method: 'GET',
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
    })

    if (res2.ok) {
      console.log('   ⚠️  Direct SQL execution via REST not supported in this project tier.')
      console.log('   Run the SQL manually in the Supabase SQL Editor:')
      console.log('   → supabase.com → projxai project → SQL Editor → paste docs/supabase_audit_tables.sql')
      console.log('\n   (Continuing to Claude test — tables assumed created manually)\n')
    } else {
      console.log('   ⚠️  Could not connect to Supabase REST. Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.')
    }
  } else {
    console.log('   ✅  Tables created successfully via REST API')
  }
} catch (err) {
  console.log(`   ⚠️  Table creation via script failed: ${err.message}`)
  console.log('   Run manually: docs/supabase_audit_tables.sql in Supabase SQL Editor')
}

// ─── Step 2: Verify connection with a simple query ────────────────────────────

console.log('\n   Verifying Supabase connection...')
try {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/audit_sessions?limit=1`, {
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    },
  })
  if (res.ok) {
    console.log('   ✅  audit_sessions table accessible')
  } else {
    const body = await res.text()
    console.log(`   ❌  audit_sessions not accessible: ${res.status} ${body.slice(0, 100)}`)
    console.log('   → Run docs/supabase_audit_tables.sql in Supabase SQL Editor first')
  }

  const res2 = await fetch(`${SUPABASE_URL}/rest/v1/audit_reports?limit=1`, {
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    },
  })
  if (res2.ok) {
    console.log('   ✅  audit_reports table accessible')
  } else {
    console.log(`   ❌  audit_reports not accessible: ${res2.status}`)
  }
} catch (err) {
  console.log(`   ❌  Connection check failed: ${err.message}`)
}

// ─── Step 3: Claude prompt test (3 profiles) ─────────────────────────────────

console.log('\n[2/2] Running Claude prompt test (3 sample profiles)...')
console.log('   Model: claude-sonnet-4-6 | temp: 0.3 | max_tokens: 2000\n')

// Re-use test logic from test-audit-prompt.mjs
const { execFileSync } = await import('child_process')
try {
  execFileSync('node', [resolve(__dirname, 'test-audit-prompt.mjs')], { stdio: 'inherit' })
} catch {
  // test script exits with non-zero on failure — already printed results
}
