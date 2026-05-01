'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'

// ─── Types ────────────────────────────────────────────────────────────────────

type AppPhase = 'intro' | 'businessName' | 'questions' | 'submitting' | 'error'
type QuestionType = 'radio' | 'checkbox' | 'text'
type QuestionSilo = 'universal' | 'routing' | 'silo-a' | 'silo-b' | 'silo-c' | 'silo-d' | 'silo-e' | 'silo-f' | 'silo-g' | 'closing'

interface Question {
  id: string
  silo: QuestionSilo
  sectionLabel: string
  text: string
  type: QuestionType
  options?: string[]
  isOptionalText?: boolean
  otherTrigger?: string
  otherPlaceholder?: string
  otherMaxLength?: number
  textPlaceholder?: string
  textMaxLength?: number
}

interface Answers { [key: string]: string | string[] | undefined }

// ─── Routing Maps ─────────────────────────────────────────────────────────────

const BOTTLENECK_SILO_MAP: Record<string, QuestionSilo> = {
  'Too much time on manual data entry and admin': 'silo-b',
  'Customer enquiries and follow-ups take too long': 'silo-a',
  'Our reporting is slow, unreliable, or non-existent': 'silo-d',
  'Lead follow-up falls through the cracks': 'silo-c',
  "We can't see what's actually working in our marketing": 'silo-e',
  'Hiring, onboarding, or HR admin overwhelms us': 'silo-f',
  "We're not generating enough new enquiries or leads": 'silo-e',
  'Our quoting, proposals, or estimating takes too long': 'silo-c',
  "Our systems don't talk to each other — data is siloed everywhere": 'silo-g',
  "Staff can't find information or documents quickly": 'silo-b',
}

const BOTTLENECK_AREA_TO_SILO: Record<string, QuestionSilo> = {
  'Customer communication and enquiry management': 'silo-a',
  'Admin tasks and data entry': 'silo-b',
  'Sales pipeline and lead conversion': 'silo-c',
  'Business reporting and financial visibility': 'silo-d',
  'Marketing and lead generation': 'silo-e',
  'Hiring, HR, and people management': 'silo-f',
  'IT systems and integrations': 'silo-g',
}

const SILO_LABELS: Partial<Record<QuestionSilo, string>> = {
  'silo-a': 'Customer Comms',
  'silo-b': 'Admin & Ops',
  'silo-c': 'Sales & Leads',
  'silo-d': 'Finance & Reporting',
  'silo-e': 'Marketing & Growth',
  'silo-f': 'People & HR',
  'silo-g': 'IT & Systems',
}

const OTHER_BOTTLENECK = "Something else — I'll describe it below"

// ─── Question Definitions ─────────────────────────────────────────────────────

const ALL_QUESTIONS: Question[] = [

  // ── Universal ──────────────────────────────────────────────────────────────
  {
    id: 'businessType', silo: 'universal', sectionLabel: 'About your business',
    text: 'What best describes your business?', type: 'radio',
    options: [
      'Professional services (accounting, legal, consulting, financial planning)',
      'Retail & eCommerce', 'Hospitality & food & beverage', 'Trade & construction',
      'Healthcare & allied health', 'B2B / wholesale / distribution',
      'Not-for-profit or community organisation', 'Other',
    ],
    otherTrigger: 'Other', otherPlaceholder: 'Describe your business type…', otherMaxLength: 150,
  },
  {
    id: 'teamSize', silo: 'universal', sectionLabel: 'About your business',
    text: 'How many people work in your business (including yourself)?', type: 'radio',
    options: ['Just me (solo operator)', '2–5 people', '6–20 people', '21–50 people', '51+ people'],
  },
  {
    id: 'revenueModel', silo: 'universal', sectionLabel: 'About your business',
    text: 'How does your business primarily generate revenue?', type: 'radio',
    options: [
      'Project or job-based (invoiced per engagement or contract)',
      'Ongoing retainer or subscription clients',
      'Transactional sales (products, orders, bookings)',
      'Fee-for-service (professional time billed hourly or daily)',
      'Mixed — multiple models', 'Other',
    ],
    otherTrigger: 'Other', otherPlaceholder: 'Describe your revenue model…', otherMaxLength: 100,
  },
  {
    id: 'techComfort', silo: 'universal', sectionLabel: 'About your business',
    text: "How would you describe your team's comfort with new technology?", type: 'radio',
    options: [
      'High — we adopt new tools quickly and without much friction',
      'Medium — it takes a few weeks but people come around',
      'Low — technology change is a real challenge in our business',
      'Variable — some team members are great, others resist',
    ],
  },
  {
    id: 'aiToolUsage', silo: 'universal', sectionLabel: 'About your business',
    text: 'Which of these are you currently using AI tools for? Select all that apply.', type: 'checkbox',
    options: [
      'Writing emails, reports, or content', 'Customer service or live chat',
      'Data analysis or reporting', 'Social media or marketing',
      'Internal admin or scheduling', "None — we haven't started yet",
      "We've tried a few things but nothing stuck",
    ],
  },
  {
    id: 'bottleneck', silo: 'universal', sectionLabel: 'About your business',
    text: "What's your biggest operational bottleneck right now?", type: 'radio',
    options: [
      'Too much time on manual data entry and admin',
      'Customer enquiries and follow-ups take too long',
      'Our reporting is slow, unreliable, or non-existent',
      'Lead follow-up falls through the cracks',
      "We can't see what's actually working in our marketing",
      'Hiring, onboarding, or HR admin overwhelms us',
      "We're not generating enough new enquiries or leads",
      'Our quoting, proposals, or estimating takes too long',
      "Our systems don't talk to each other — data is siloed everywhere",
      "Staff can't find information or documents quickly",
      OTHER_BOTTLENECK,
    ],
    otherTrigger: OTHER_BOTTLENECK,
    otherPlaceholder: 'Describe your biggest bottleneck in your own words…',
    otherMaxLength: 200,
  },

  // ── Routing (only shown when bottleneck = Other) ───────────────────────────
  {
    id: 'bottleneckArea', silo: 'routing', sectionLabel: 'Your challenge',
    text: 'Which area of your business does this affect most?', type: 'radio',
    options: [
      'Customer communication and enquiry management',
      'Admin tasks and data entry',
      'Sales pipeline and lead conversion',
      'Business reporting and financial visibility',
      'Marketing and lead generation',
      'Hiring, HR, and people management',
      'IT systems and integrations',
    ],
  },

  // ── Silo A: Customer Comms ─────────────────────────────────────────────────
  {
    id: 'enquiryChannels', silo: 'silo-a', sectionLabel: 'Customer Comms deep-dive',
    text: 'How do most customer enquiries arrive?', type: 'radio',
    options: [
      'Mainly email', 'Mainly phone', 'Mainly website form or live chat',
      'Mainly social media (Facebook, Instagram, LinkedIn)',
      'Mixed — it comes in from everywhere', 'Walk-ins or in person',
    ],
  },
  {
    id: 'responseTimeExpectation', silo: 'silo-a', sectionLabel: 'Customer Comms deep-dive',
    text: 'How quickly are customers expecting a response?', type: 'radio',
    options: [
      'Within the hour', 'Same day', 'Within 24 hours',
      'Within a few days', 'No clear expectation set',
    ],
  },
  {
    id: 'afterFirstContact', silo: 'silo-a', sectionLabel: 'Customer Comms deep-dive',
    text: 'What typically happens after that first response?', type: 'radio',
    options: [
      'We have a documented follow-up process everyone follows',
      'It depends on who picked it up',
      'We try to follow up but things fall through the cracks',
      "We respond once and wait — the customer drives from there",
    ],
  },
  {
    id: 'crmUsage', silo: 'silo-a', sectionLabel: 'Customer Comms deep-dive',
    text: "Do you use a CRM or inbox tool to manage customer conversations?", type: 'radio',
    options: [
      "Yes — it's well set up and used consistently",
      "Yes — but it's messy or only used by some people",
      'No — we manage it through email and spreadsheets',
      "No — we don't have a system for this",
    ],
  },
  {
    id: 'commsCostOfSlow', silo: 'silo-a', sectionLabel: 'Customer Comms deep-dive',
    text: 'What does slow or inconsistent response actually cost you?', type: 'radio',
    options: [
      'Lost quotes or deals we know we missed',
      'Client complaints or damaged relationships',
      'Staff time chasing and following up',
      "Hard to measure — we're not sure",
      "We don't think it costs us much",
    ],
  },
  {
    id: 'commsWorkflowFreeText', silo: 'silo-a', sectionLabel: 'Customer Comms deep-dive',
    text: "Walk us through what happens from the moment a new enquiry comes in. Just describe it as it actually happens.",
    type: 'text', isOptionalText: true,
    textPlaceholder: 'e.g. Customer emails, Sarah in reception sees it, creates a job in our system, phones them back same day…',
    textMaxLength: 400,
  },

  // ── Silo B: Admin & Ops ────────────────────────────────────────────────────
  {
    id: 'adminTaskTypes', silo: 'silo-b', sectionLabel: 'Admin & Operations deep-dive',
    text: 'Which admin tasks take the most time? Select all that apply.', type: 'checkbox',
    options: [
      'Invoicing, billing, or accounts',
      'Data entry between systems',
      'Scheduling, rostering, or bookings',
      'Report or document preparation',
      'Compliance or regulatory paperwork',
      'Email management and internal communication',
    ],
  },
  {
    id: 'systemSwitching', silo: 'silo-b', sectionLabel: 'Admin & Operations deep-dive',
    text: 'How many different software systems does your team switch between in a typical day?', type: 'radio',
    options: [
      '1 or 2 — we keep it simple',
      '3 to 4 — manageable but could be better',
      "5 or more — we're constantly switching",
      'We mainly work in spreadsheets and email',
    ],
  },
  {
    id: 'dataAccuracy', silo: 'silo-b', sectionLabel: 'Admin & Operations deep-dive',
    text: 'How accurate and up-to-date is the data in your main business systems?', type: 'radio',
    options: [
      'Generally accurate — people keep it current',
      "Hit and miss — depends on the person or the week",
      "Frequently out of date — we don't trust it",
      'We have multiple sources of truth and it causes confusion',
    ],
  },
  {
    id: 'unusedAutomation', silo: 'silo-b', sectionLabel: 'Admin & Operations deep-dive',
    text: "Do any of your current tools have automation features you're not using?", type: 'radio',
    options: [
      "Yes — there's probably a lot we haven't set up",
      "Yes — we use some but know there's more",
      "Not sure — we've never really looked",
      "No — we use what's there",
    ],
  },
  {
    id: 'adminFreeText', silo: 'silo-b', sectionLabel: 'Admin & Operations deep-dive',
    text: 'Describe the most painful manual task your team does regularly. How long does it take and what does it involve?',
    type: 'text', isOptionalText: true,
    textPlaceholder: 'e.g. Every Monday we copy invoice data from our job system into Xero manually — takes about 2 hours…',
    textMaxLength: 400,
  },

  // ── Silo C: Sales & Leads ──────────────────────────────────────────────────
  {
    id: 'leadSources', silo: 'silo-c', sectionLabel: 'Sales & Leads deep-dive',
    text: 'Where do most of your leads come from? Select all that apply.', type: 'checkbox',
    options: [
      'Word of mouth and referrals',
      'Our website (organic or SEO)',
      'Social media',
      'Paid advertising (Google, Meta, etc.)',
      'Outbound / cold outreach',
      'Networking and events',
      'Existing client repeat business',
    ],
  },
  {
    id: 'leadProcess', silo: 'silo-c', sectionLabel: 'Sales & Leads deep-dive',
    text: 'What happens when a new lead or enquiry comes in?', type: 'radio',
    options: [
      'We have a structured process — everyone knows the steps',
      'It varies by person but we generally follow up well',
      "It's inconsistent — some leads get followed up, some don't",
      "No clear process — leads come in but there's no real system",
    ],
  },
  {
    id: 'salesCycleLength', silo: 'silo-c', sectionLabel: 'Sales & Leads deep-dive',
    text: 'How long does your typical sales cycle take — first contact to closed?', type: 'radio',
    options: [
      'Under a week', '1 to 4 weeks', '1 to 3 months', '3 months or more',
      'It varies a lot depending on the deal',
    ],
  },
  {
    id: 'salesCrmUsage', silo: 'silo-c', sectionLabel: 'Sales & Leads deep-dive',
    text: 'Do you use a CRM or pipeline tool to track leads and sales?', type: 'radio',
    options: [
      "Yes — it's up to date and used by the team",
      "Yes — but it's not consistently used",
      'No — we track it in spreadsheets or email',
      "No — most of it lives in people's heads",
    ],
  },
  {
    id: 'lostLeadCost', silo: 'silo-c', sectionLabel: 'Sales & Leads deep-dive',
    text: 'Do you know what a lost lead typically costs your business?', type: 'radio',
    options: [
      'Yes — we know our conversion rate and average deal value',
      'Rough idea — we could estimate it',
      "Hard to measure — we don't have the data",
      "We don't track this",
    ],
  },
  {
    id: 'salesFreeText', silo: 'silo-c', sectionLabel: 'Sales & Leads deep-dive',
    text: "Describe what happens from the moment someone shows interest to when they become a client — or when they don't.",
    type: 'text', isOptionalText: true,
    textPlaceholder: "e.g. Customer calls, we quote within 48 hours, follow up once by email — after that it's up to them…",
    textMaxLength: 400,
  },

  // ── Silo D: Finance & Reporting ────────────────────────────────────────────
  {
    id: 'reportingCadence', silo: 'silo-d', sectionLabel: 'Finance & Reporting deep-dive',
    text: 'How often do you produce or review business performance reports?', type: 'radio',
    options: [
      'Weekly — we have dashboards we review regularly',
      'Monthly — we pull reports at end of month',
      'Quarterly — usually before BAS or board meetings',
      'Ad hoc — only when someone asks for a number',
      "Rarely or never — we don't have a reporting process",
    ],
  },
  {
    id: 'reportingPreparation', silo: 'silo-d', sectionLabel: 'Finance & Reporting deep-dive',
    text: 'Who prepares your financial and performance reports?', type: 'radio',
    options: [
      'The business owner or director',
      'A dedicated finance person in the business',
      'Our external bookkeeper or accountant',
      "Nobody — we just check our bank balance",
    ],
  },
  {
    id: 'reportingTime', silo: 'silo-d', sectionLabel: 'Finance & Reporting deep-dive',
    text: 'How long does it take to pull together a meaningful performance report?', type: 'radio',
    options: [
      "Under 30 minutes — it's mostly automated",
      'Half a day — involves some manual steps',
      'A full day or more — it takes real effort',
      "We don't really produce one",
    ],
  },
  {
    id: 'reportingDataSources', silo: 'silo-d', sectionLabel: 'Finance & Reporting deep-dive',
    text: 'What data do you need to pull together for a complete picture of performance?', type: 'radio',
    options: [
      'Just our accounting software — tells us most of what we need',
      'Accounting plus CRM or job management data',
      'Multiple systems plus manual exports or spreadsheets',
      "Everything is scattered — there's no single place to look",
    ],
  },
  {
    id: 'reportingFreeText', silo: 'silo-d', sectionLabel: 'Finance & Reporting deep-dive',
    text: "What business decisions can't you make confidently right now because you don't have the right data?",
    type: 'text', isOptionalText: true,
    textPlaceholder: "e.g. We can't tell which service lines are actually profitable — we just know the overall P&L…",
    textMaxLength: 400,
  },

  // ── Silo E: Marketing & Growth ─────────────────────────────────────────────
  {
    id: 'marketingChannels', silo: 'silo-e', sectionLabel: 'Marketing & Growth deep-dive',
    text: 'Which marketing channels are you currently active on? Select all that apply.', type: 'checkbox',
    options: [
      'Organic social media (regular posting)',
      'Paid social media advertising',
      'Google Search or Display advertising',
      'SEO or content marketing / blog',
      'Email marketing or newsletters',
      'Events, networking, or partnerships',
      "We're not doing much active marketing right now",
    ],
  },
  {
    id: 'marketingTracking', silo: 'silo-e', sectionLabel: 'Marketing & Growth deep-dive',
    text: "How do you track whether your marketing is working?", type: 'radio',
    options: [
      'We use analytics tools (Google Analytics, Meta Ads Manager, etc.)',
      'We track it loosely in a spreadsheet',
      "Gut feel and asking customers how they found us",
      'Our agency reports back to us',
      "We don't really track it",
    ],
  },
  {
    id: 'marketingBudgetAllocation', silo: 'silo-e', sectionLabel: 'Marketing & Growth deep-dive',
    text: 'Where does most of your marketing effort or budget go?', type: 'radio',
    options: [
      'Social media ads',
      'Google or search advertising',
      'Content creation (posts, videos, blogs)',
      'Agency or freelancer fees',
      'Events and networking',
      "We don't have a dedicated marketing budget",
    ],
  },
  {
    id: 'marketingFocus', silo: 'silo-e', sectionLabel: 'Marketing & Growth deep-dive',
    text: "What's the bigger challenge right now?", type: 'radio',
    options: [
      'Getting more people to find us or enquire in the first place',
      'Understanding which marketing activities are actually working',
      'Producing enough content to stay visible',
      'Converting the leads we do get into paying clients',
    ],
  },
  {
    id: 'marketingFreeText', silo: 'silo-e', sectionLabel: 'Marketing & Growth deep-dive',
    text: "What's the marketing result you most want but can't seem to get consistently?",
    type: 'text', isOptionalText: true,
    textPlaceholder: "e.g. We get great results from Google Ads but can't afford to run them all the time and don't know what else to do…",
    textMaxLength: 400,
  },

  // ── Silo F: People & HR ────────────────────────────────────────────────────
  {
    id: 'hrTaskTypes', silo: 'silo-f', sectionLabel: 'People & HR deep-dive',
    text: 'Which people and HR tasks take the most time? Select all that apply.', type: 'checkbox',
    options: [
      'Recruiting and screening candidates',
      'Onboarding new staff',
      'Performance reviews and check-ins',
      'Rostering and scheduling',
      'Compliance and HR paperwork',
      'Handling payroll queries',
    ],
  },
  {
    id: 'recentHires', silo: 'silo-f', sectionLabel: 'People & HR deep-dive',
    text: 'How many people have you hired in the past 12 months?', type: 'radio',
    options: ['None', '1 to 2 people', '3 to 5 people', '6 or more people'],
  },
  {
    id: 'onboardingQuality', silo: 'silo-f', sectionLabel: 'People & HR deep-dive',
    text: 'What does your staff onboarding process look like?', type: 'radio',
    options: [
      "Structured and documented — there's a clear checklist and induction program",
      'Informal but effective — new people figure it out with help from the team',
      'Ad hoc — varies a lot depending on who starts',
      "We don't really have an onboarding process",
    ],
  },
  {
    id: 'hrSoftware', silo: 'silo-f', sectionLabel: 'People & HR deep-dive',
    text: 'Do you use dedicated HR or people management software?', type: 'radio',
    options: [
      'Yes — a dedicated HR platform (Employment Hero, BambooHR, etc.)',
      'Yes — HR is handled within our payroll software (Xero Payroll, MYOB, etc.)',
      'No — we manage HR in spreadsheets and email',
      'No — we outsource HR entirely',
    ],
  },
  {
    id: 'hrFreeText', silo: 'silo-f', sectionLabel: 'People & HR deep-dive',
    text: "What people or HR challenge is costing your business the most time or money right now?",
    type: 'text', isOptionalText: true,
    textPlaceholder: 'e.g. Onboarding a new tradesperson takes 3 weeks to get them productive — we have to teach everything from scratch each time…',
    textMaxLength: 400,
  },

  // ── Silo G: IT & Systems ───────────────────────────────────────────────────
  {
    id: 'systemCount', silo: 'silo-g', sectionLabel: 'IT & Systems deep-dive',
    text: 'How many software systems does your team use in a typical day?', type: 'radio',
    options: ['1 or 2 — lean', '3 to 4 — manageable', '5 to 7 — a lot of switching', '8 or more — fragmented'],
  },
  {
    id: 'systemDataSharing', silo: 'silo-g', sectionLabel: 'IT & Systems deep-dive',
    text: 'Do your main business systems share data automatically?', type: 'radio',
    options: [
      'Yes — most key systems are integrated',
      'Some are — but we manually bridge the gaps',
      'No — almost nothing connects, we re-enter data constantly',
      "Not sure — we haven't mapped it",
    ],
  },
  {
    id: 'manualReentry', silo: 'silo-g', sectionLabel: 'IT & Systems deep-dive',
    text: 'Where does data get re-entered manually most often? Select all that apply.', type: 'checkbox',
    options: [
      'CRM or sales system → accounting software',
      'Job or project management → invoicing',
      'Accounting → external reports or dashboards',
      'Customer portal or website → internal systems',
      'Between industry-specific software and general tools',
      'Email or spreadsheets → anywhere else',
    ],
  },
  {
    id: 'itManagement', silo: 'silo-g', sectionLabel: 'IT & Systems deep-dive',
    text: 'Who manages your technology stack and software decisions?', type: 'radio',
    options: [
      'An internal IT person or team',
      'A managed IT provider or MSP',
      'One of the business owners handles it',
      "Nobody — we figure it out as we go",
    ],
  },
  {
    id: 'itFreeText', silo: 'silo-g', sectionLabel: 'IT & Systems deep-dive',
    text: "What's the biggest integration or systems headache in your business right now?",
    type: 'text', isOptionalText: true,
    textPlaceholder: "e.g. Our job management software doesn't connect to Xero, so we manually create invoices for every completed job…",
    textMaxLength: 400,
  },

  // ── Closing ────────────────────────────────────────────────────────────────
  {
    id: 'softwareStack', silo: 'closing', sectionLabel: 'Your priorities',
    text: 'Which business software does your team use regularly? Select all that apply.', type: 'checkbox',
    options: [
      'Accounting software (Xero, MYOB, QuickBooks)',
      'CRM or contact management (HubSpot, Salesforce, Pipedrive)',
      'Project management (Asana, ClickUp, Monday, Trello)',
      'Email marketing (Mailchimp, ActiveCampaign, Klaviyo)',
      'Scheduling or booking software',
      'Industry-specific software (practice management, POS, ERP)',
      'None — we work mainly in spreadsheets and email',
    ],
  },
  {
    id: 'commsStack', silo: 'closing', sectionLabel: 'Your priorities',
    text: 'What is your primary productivity and communications platform?', type: 'radio',
    options: [
      'Microsoft 365 (Outlook, Teams, SharePoint, OneDrive)',
      'Google Workspace (Gmail, Google Drive, Meet, Docs)',
      'Both Microsoft 365 and Google Workspace',
      'Neither — we use other tools (Slack, Zoom, etc.) or nothing',
    ],
  },
  {
    id: 'hostingEnvironment', silo: 'closing', sectionLabel: 'Your priorities',
    text: "How would you describe your business's technology environment?", type: 'radio',
    options: [
      "Fully cloud-based SaaS — we don't manage any servers",
      'Cloud-hosted with our own workloads (AWS, Azure, Google Cloud)',
      'On-premise or self-hosted servers',
      'Mixed — some cloud, some on-premise',
      'Not sure — someone else handles this',
    ],
  },
  {
    id: 'itSupportModel', silo: 'closing', sectionLabel: 'Your priorities',
    text: 'How do you handle IT support and technology management?', type: 'radio',
    options: [
      'We have a managed IT provider (MSP) on a regular contract',
      'We call an IT provider when things break (ad hoc)',
      'We have an internal IT person or team',
      'A business owner or manager handles it themselves',
    ],
  },
  {
    id: 'annualItSpend', silo: 'closing', sectionLabel: 'Your priorities',
    text: 'Roughly how much does your business spend on software, IT, and technology per year?', type: 'radio',
    options: [
      'Under $10,000',
      '$10,000 to $50,000',
      '$50,000 to $150,000',
      'Over $150,000',
      "Not sure — I don't have visibility over this",
    ],
  },
  {
    id: 'budgetRange', silo: 'closing', sectionLabel: 'Your priorities',
    text: 'What budget are you considering for AI in the next 12 months?', type: 'radio',
    options: [
      "We're not budgeting for it yet", 'Under $5,000', '$5,000–$20,000',
      '$20,000–$50,000', 'Over $50,000', 'I need to understand the ROI before I can answer this',
    ],
  },
  {
    id: 'decisionMaker', silo: 'closing', sectionLabel: 'Your priorities',
    text: 'Who makes the final call on technology and operational investment?', type: 'radio',
    options: [
      'Me — I make the call', 'Me and a business partner or co-owner',
      'Me and a board or investors', 'I influence it but it goes to a finance or IT team',
      "It's complicated",
    ],
  },
]

// ─── Sequence Computation ─────────────────────────────────────────────────────

function getActiveSilo(answers: Answers): QuestionSilo | null {
  const b = answers.bottleneck as string | undefined
  if (!b) return null
  if (b === OTHER_BOTTLENECK) {
    const area = answers.bottleneckArea as string | undefined
    return area ? (BOTTLENECK_AREA_TO_SILO[area] ?? null) : null
  }
  return BOTTLENECK_SILO_MAP[b] ?? null
}

function computeSequence(answers: Answers): Question[] {
  const isOther = (answers.bottleneck as string | undefined) === OTHER_BOTTLENECK
  const activeSilo = getActiveSilo(answers)
  return [
    ...ALL_QUESTIONS.filter(q => q.silo === 'universal'),
    ...(isOther ? ALL_QUESTIONS.filter(q => q.silo === 'routing') : []),
    ...(activeSilo ? ALL_QUESTIONS.filter(q => q.silo === activeSilo) : []),
    ...ALL_QUESTIONS.filter(q => q.silo === 'closing'),
  ]
}

// ─── Loading Messages ─────────────────────────────────────────────────────────

const LOADING_MSGS = [
  (n: string) => `Analysing ${n}'s AI opportunity…`,
  () => 'Reviewing your operations profile…',
  () => 'Identifying your highest-value opportunities…',
  () => 'Building your 90-day plan…',
  () => 'Your report is almost ready…',
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function CompassLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="18" fill="#6B3FE7" />
      <polygon points="18,4 21,18 18,16 15,18" fill="white" />
      <polygon points="32,18 18,21 20,18 18,15" fill="white" opacity="0.7" />
      <polygon points="18,32 15,18 18,20 21,18" fill="white" opacity="0.85" />
      <polygon points="4,18 18,15 16,18 18,21" fill="white" opacity="0.6" />
      <circle cx="18" cy="18" r="2.5" fill="#6B3FE7" />
    </svg>
  )
}

function SectionBadge({ label }: { label: string }) {
  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
      style={{ backgroundColor: '#f3eefe', color: '#6B3FE7' }}>
      {label}
    </span>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AuditPage() {
  const router = useRouter()
  const [appPhase, setAppPhase] = useState<AppPhase>('intro')
  const [businessName, setBusinessName] = useState('')
  const [abn, setAbn] = useState('')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [otherText, setOtherText] = useState<Record<string, string>>({})
  const [freeText, setFreeText] = useState<Record<string, string>>({})
  const [advTimer, setAdvTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [loadingIdx, setLoadingIdx] = useState(0)
  const loadingRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const bnRef = useRef<HTMLInputElement>(null)
  const [bypassMode, setBypassMode] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('bypass'))
      setBypassMode(true)
  }, [])

  useEffect(() => {
    if (appPhase === 'businessName') setTimeout(() => bnRef.current?.focus(), 80)
  }, [appPhase])

  useEffect(() => {
    if (appPhase === 'submitting') {
      setLoadingIdx(0)
      loadingRef.current = setInterval(() => setLoadingIdx(i => (i + 1) % LOADING_MSGS.length), 2200)
    } else {
      if (loadingRef.current) { clearInterval(loadingRef.current); loadingRef.current = null }
    }
    return () => { if (loadingRef.current) clearInterval(loadingRef.current) }
  }, [appPhase])

  const sequence = useMemo(() => computeSequence(answers), [answers])
  const activeSilo = useMemo(() => getActiveSilo(answers), [answers])
  const totalQ = sequence.length

  // Clamp index if sequence shrinks (bottleneck change)
  useEffect(() => {
    if (currentQ >= totalQ && totalQ > 0) setCurrentQ(totalQ - 1)
  }, [totalQ, currentQ])

  const question = sequence[currentQ]

  // Phase progress
  const phaseOf = (q: Question) =>
    q.silo === 'universal' || q.silo === 'routing' ? 'context'
    : q.silo === 'closing' ? 'closing'
    : 'deepdive'
  const currentPhase = question ? phaseOf(question) : 'context'
  const phaseQs = question ? sequence.filter(q => phaseOf(q) === currentPhase) : []
  const indexInPhase = phaseQs.indexOf(question)
  const phaseLabel = currentPhase === 'context' ? 'About your business'
    : currentPhase === 'closing' ? 'Your priorities'
    : activeSilo ? (SILO_LABELS[activeSilo] ?? 'Deep-dive') + ' deep-dive'
    : 'Deep-dive'

  const phases = ['Context', ...(activeSilo ? [SILO_LABELS[activeSilo] ?? 'Deep-dive'] : []), 'Priorities']
  const currentPhaseIdx = currentPhase === 'context' ? 0 : currentPhase === 'deepdive' ? 1 : phases.length - 1

  // ── Answer helpers ─────────────────────────────────────────────────────────

  const advanceQuestion = () => {
    if (advTimer) clearTimeout(advTimer)
    if (currentQ < totalQ - 1) setCurrentQ(p => p + 1)
    else doSubmit()
  }

  const goBack = () => {
    if (advTimer) clearTimeout(advTimer)
    if (currentQ > 0) setCurrentQ(p => p - 1)
    else setAppPhase('businessName')
  }

  const setRadio = (qId: string, value: string) => {
    // Clear stale silo+routing answers if bottleneck changes
    if (qId === 'bottleneck') {
      setAnswers(prev => {
        if (prev.bottleneck && prev.bottleneck !== value) {
          const keep: Answers = {}
          ALL_QUESTIONS.filter(q => q.silo === 'universal' || q.silo === 'closing')
            .forEach(q => { if (prev[q.id] !== undefined) keep[q.id] = prev[q.id] })
          return { ...keep, bottleneck: value }
        }
        return { ...prev, [qId]: value }
      })
    } else {
      setAnswers(prev => ({ ...prev, [qId]: value }))
    }
    if (advTimer) clearTimeout(advTimer)
    const isOtherTrigger = ALL_QUESTIONS.find(q => q.id === qId)?.otherTrigger === value
    if (!isOtherTrigger) {
      const t = setTimeout(advanceQuestion, 380)
      setAdvTimer(t)
    }
  }

  const toggleCheck = (qId: string, value: string) => {
    setAnswers(prev => {
      const cur = (prev[qId] as string[]) || []
      const noneOpts = [
        "None — we haven't started yet", "We've tried a few things but nothing stuck",
        'None — we work mainly in spreadsheets and email',
        "We're not doing much active marketing right now",
      ]
      if (cur.includes(value)) return { ...prev, [qId]: cur.filter(v => v !== value) }
      if (noneOpts.includes(value)) return { ...prev, [qId]: [value] }
      return { ...prev, [qId]: [...cur.filter(v => !noneOpts.includes(v)), value] }
    })
  }

  const canContinue = () => {
    if (!question) return true
    if (question.type === 'text') return true
    const ans = answers[question.id]
    if (question.type === 'radio') {
      if (!ans) return false
      if (question.otherTrigger && ans === question.otherTrigger)
        return (otherText[question.id] || '').trim().length > 0
      return true
    }
    return Array.isArray(ans) && ans.length > 0
  }

  // ── Submit ─────────────────────────────────────────────────────────────────

  const doSubmit = async () => {
    setAppPhase('submitting')
    const payload: Record<string, unknown> = {
      businessName: businessName.trim(),
      ...(abn.trim() && { abn: abn.replace(/\s/g, '') }),
      activeSilo: activeSilo ?? 'general',
      ...answers,
    }
    for (const [k, v] of Object.entries(otherText)) if (v.trim()) payload[`${k}_other`] = v.trim()
    for (const [k, v] of Object.entries(freeText)) if (v.trim()) payload[k] = v.trim()

    try {
      const res = await fetch('/api/audit/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: payload }),
      })
      if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error || 'Server error') }
      if (!res.body) throw new Error('No stream received')
      const reader = res.body.getReader()
      const dec = new TextDecoder()
      let full = ''
      while (true) { const { done, value } = await reader.read(); if (done) break; full += dec.decode(value, { stream: true }) }
      if (full.includes('__ERROR__:')) throw new Error(full.split('__ERROR__:')[1]?.trim() || 'Report failed')
      let sessionId = '', jsonText = full
      if (full.startsWith('__SESSION__:')) {
        const nl = full.indexOf('\n')
        sessionId = full.slice('__SESSION__:'.length, nl).trim()
        jsonText = full.slice(nl + 1)
      }
      const fb = jsonText.indexOf('{'), lb = jsonText.lastIndexOf('}')
      if (fb === -1 || lb === -1) throw new Error('Invalid report format')
      const reportJson = JSON.parse(jsonText.slice(fb, lb + 1))
      const saveRes = await fetch('/api/audit/save', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, reportJson }),
      })
      if (!saveRes.ok) { const d = await saveRes.json().catch(() => ({})); throw new Error(d.error || 'Save failed') }
      const { accessToken } = await saveRes.json()
      router.push(`/audit/report/${accessToken}`)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error')
      setAppPhase('error')
    }
  }

  useEffect(() => () => { if (advTimer) clearTimeout(advTimer) }, [advTimer])

  // ── Render: INTRO ──────────────────────────────────────────────────────────
  if (appPhase === 'intro') return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: '#fafafa' }}>
      <div className="h-20" />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          <div className="flex justify-center mb-8"><CompassLogo size={56} /></div>
          <div className="mb-4">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ backgroundColor: '#f3eefe', color: '#6B3FE7' }}>Free · No credit card</span>
          </div>
          <h1 className="font-bold leading-tight mb-5"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)', color: '#151c27' }}>
            Find out where AI can make the biggest difference in your business.
          </h1>
          <p className="mb-8 mx-auto max-w-xl" style={{ color: '#4a5568', fontSize: '1.125rem', lineHeight: '1.7' }}>
            About 10–15 minutes. A personalised assessment tailored to your biggest operational challenge — not a generic checklist.
          </p>
          <div className="flex items-center justify-center gap-2 mb-10 text-sm" style={{ color: '#6b7280' }}>
            <CompassLogo size={18} />
            <span>Built by ProjxAI — founded by a 30+ year Australian digital operator.</span>
          </div>
          <button onClick={() => setAppPhase('businessName')}
            className="inline-block px-10 py-4 rounded-xl font-semibold text-white text-lg transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#6B3FE7' }}>
            Start the Audit →
          </button>
          <p className="mt-4 text-sm" style={{ color: '#9ca3af' }}>Free. No credit card. Personalised to your business.</p>
          {bypassMode && <p className="mt-3 text-xs" style={{ color: '#6B3FE7' }}>✓ Operator access — email gate skipped.</p>}
        </div>
      </div>
    </main>
  )

  // ── Render: BUSINESS NAME ──────────────────────────────────────────────────
  if (appPhase === 'businessName') return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: '#fafafa' }}>
      <div className="h-20" />
      <div className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <div className="rounded-2xl p-8 md:p-10"
            style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(107,63,231,0.06)' }}>
            <SectionBadge label="Before we start" />
            <p className="font-semibold leading-snug mb-2" style={{ color: '#151c27', fontSize: 'clamp(1.1rem, 3vw, 1.3rem)' }}>
              What&apos;s the name of your business?
            </p>
            <p className="text-sm mb-5" style={{ color: '#6b7280' }}>
              Your report will be personalised to your business — this makes all the difference.
            </p>
            <input ref={bnRef} type="text" value={businessName}
              onChange={e => setBusinessName(e.target.value.slice(0, 100))}
              placeholder="e.g. Smith & Jones Accounting"
              className="w-full px-4 py-3 rounded-xl border text-base mb-1 focus:outline-none transition"
              style={{ borderColor: '#e5d7fd', color: '#151c27' }}
              onFocus={e => { e.currentTarget.style.borderColor = '#6B3FE7'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107,63,231,0.1)' }}
              onBlur={e => { e.currentTarget.style.boxShadow = 'none' }}
              onKeyDown={e => { if (e.key === 'Enter' && businessName.trim()) { setAppPhase('questions'); setCurrentQ(0) } }}
            />
            <p className="text-xs mb-6" style={{ color: '#9ca3af' }}>{businessName.length}/100 · Required</p>
            <p className="text-sm font-medium mb-2" style={{ color: '#374151' }}>
              ABN <span className="font-normal" style={{ color: '#9ca3af' }}>— optional, enriches your report with verified details</span>
            </p>
            <input type="text" value={abn}
              onChange={e => setAbn(e.target.value.replace(/[^\d\s]/g, '').slice(0, 14))}
              placeholder="e.g. 12 345 678 901"
              className="w-full px-4 py-3 rounded-xl border text-base mb-8 focus:outline-none transition"
              style={{ borderColor: '#e5d7fd', color: '#151c27' }}
              onFocus={e => { e.currentTarget.style.borderColor = '#6B3FE7'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107,63,231,0.1)' }}
              onBlur={e => { e.currentTarget.style.boxShadow = 'none' }}
            />
            <div className="flex items-center justify-between">
              <button onClick={() => setAppPhase('intro')} className="text-sm font-medium hover:underline" style={{ color: '#6B3FE7' }}>← Back</button>
              <button onClick={() => { setAppPhase('questions'); setCurrentQ(0) }} disabled={!businessName.trim()}
                className="px-8 py-3 rounded-xl font-semibold text-white text-sm transition hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#6B3FE7' }}>Continue →</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )

  // ── Render: SUBMITTING ─────────────────────────────────────────────────────
  if (appPhase === 'submitting') {
    const name = businessName.trim() || 'your business'
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: '#151c27' }}>
        <div className="text-center">
          <div className="flex justify-center mb-8 animate-spin" style={{ animationDuration: '3s' }}><CompassLogo size={64} /></div>
          <p key={loadingIdx} className="text-white text-xl font-medium mb-2" style={{ minHeight: '2rem' }}>
            {LOADING_MSGS[loadingIdx](name)}
          </p>
          <p style={{ color: '#9ca3af' }}>This usually takes 15–20 seconds.</p>
        </div>
      </main>
    )
  }

  // ── Render: ERROR ──────────────────────────────────────────────────────────
  if (appPhase === 'error') return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6"><CompassLogo size={48} /></div>
        <h2 className="text-2xl font-bold mb-3" style={{ color: '#151c27' }}>Something went wrong</h2>
        <p className="mb-6" style={{ color: '#6b7280' }}>We couldn&apos;t generate your report. Please try again.</p>
        {errorMsg && <p className="text-xs mb-6 font-mono" style={{ color: '#9ca3af' }}>{errorMsg}</p>}
        <button onClick={() => { setAppPhase('questions'); setCurrentQ(Math.max(0, totalQ - 1)) }}
          className="px-8 py-3 rounded-lg font-semibold text-white" style={{ backgroundColor: '#6B3FE7' }}>
          Try again
        </button>
      </div>
    </main>
  )

  // ── Render: QUESTIONS ──────────────────────────────────────────────────────
  if (!question) return null
  const isTextQ = question.type === 'text'
  const isLastQ = currentQ === totalQ - 1
  const selAnswer = answers[question.id]

  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: '#fafafa' }}>
      <div className="h-20" />
      <div className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-2xl">

          {/* Progress bar + phase dots */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm" style={{ color: '#6b7280' }}>
                {phaseLabel} · {indexInPhase + 1} of {phaseQs.length}
              </span>
              <span className="text-sm font-semibold" style={{ color: '#6B3FE7' }}>
                {Math.round(((currentQ + 1) / totalQ) * 100)}%
              </span>
            </div>
            <div className="w-full rounded-full h-1.5" style={{ backgroundColor: '#e5e7eb' }}>
              <div className="h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.round(((currentQ + 1) / totalQ) * 100)}%`, backgroundColor: '#6B3FE7' }} />
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {phases.map((label, i) => {
                const active = i === currentPhaseIdx
                const done = i < currentPhaseIdx
                return (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full transition-all duration-300"
                      style={{ backgroundColor: active ? '#6B3FE7' : done ? '#c4b5fd' : '#e5e7eb' }} />
                    <span className="text-xs" style={{ color: active ? '#6B3FE7' : done ? '#9ca3af' : '#d1d5db', fontWeight: active ? 600 : 400 }}>
                      {label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Question card */}
          <div className="rounded-2xl p-8 md:p-10"
            style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(107,63,231,0.06)' }}>

            <SectionBadge label={question.sectionLabel} />

            {isTextQ && question.isOptionalText && (
              <p className="text-sm font-medium mb-2" style={{ color: '#6B3FE7' }}>
                Optional — but this is where your report gets specific to you.
              </p>
            )}

            <p className="font-semibold leading-snug mb-7"
              style={{ color: '#151c27', fontSize: 'clamp(1.1rem, 3vw, 1.3rem)' }}>
              {question.text}
            </p>

            {/* Radio */}
            {question.type === 'radio' && question.options && (
              <div className="flex flex-col gap-2">
                {question.options.map(opt => {
                  const sel = selAnswer === opt
                  const isOther = question.otherTrigger === opt
                  return (
                    <div key={opt}>
                      <button onClick={() => setRadio(question.id, opt)}
                        className="w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-150"
                        style={{ borderColor: sel ? '#6B3FE7' : '#e5e7eb', backgroundColor: sel ? '#f3eefe' : 'white', color: sel ? '#6B3FE7' : '#374151', boxShadow: sel ? '0 0 0 2px rgba(107,63,231,0.15)' : 'none' }}>
                        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border mr-3 flex-shrink-0"
                          style={{ borderColor: sel ? '#6B3FE7' : '#d1d5db', backgroundColor: sel ? '#6B3FE7' : 'white', verticalAlign: 'middle' }}>
                          {sel && <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'white' }} />}
                        </span>
                        {opt}
                      </button>
                      {isOther && sel && (
                        <div className="mt-2 ml-1">
                          <input type="text" autoFocus value={otherText[question.id] || ''}
                            onChange={e => setOtherText(p => ({ ...p, [question.id]: e.target.value.slice(0, question.otherMaxLength || 200) }))}
                            placeholder={question.otherPlaceholder}
                            className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none"
                            style={{ borderColor: '#6B3FE7', boxShadow: '0 0 0 3px rgba(107,63,231,0.1)', color: '#151c27' }}
                            onKeyDown={e => { if (e.key === 'Enter' && (otherText[question.id] || '').trim()) advanceQuestion() }}
                          />
                          <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>
                            {(otherText[question.id] || '').length}/{question.otherMaxLength || 200} chars
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {/* Checkbox */}
            {question.type === 'checkbox' && question.options && (
              <div className="flex flex-col gap-2">
                {question.options.map(opt => {
                  const sel = ((selAnswer as string[]) || []).includes(opt)
                  return (
                    <button key={opt} onClick={() => toggleCheck(question.id, opt)}
                      className="w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-150"
                      style={{ borderColor: sel ? '#6B3FE7' : '#e5e7eb', backgroundColor: sel ? '#f3eefe' : 'white', color: sel ? '#6B3FE7' : '#374151', boxShadow: sel ? '0 0 0 2px rgba(107,63,231,0.15)' : 'none' }}>
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded border mr-3 flex-shrink-0"
                        style={{ borderColor: sel ? '#6B3FE7' : '#d1d5db', backgroundColor: sel ? '#6B3FE7' : 'white', verticalAlign: 'middle' }}>
                        {sel && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </span>
                      {opt}
                    </button>
                  )
                })}
              </div>
            )}

            {/* Free text */}
            {isTextQ && (
              <>
                <textarea value={freeText[question.id] || ''}
                  onChange={e => setFreeText(p => ({ ...p, [question.id]: e.target.value.slice(0, question.textMaxLength || 400) }))}
                  placeholder={question.textPlaceholder}
                  rows={5}
                  className="w-full rounded-xl border px-4 py-3 text-base resize-none focus:outline-none transition"
                  style={{ borderColor: '#e5d7fd', backgroundColor: '#fafafa', color: '#151c27' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#6B3FE7'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107,63,231,0.1)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#e5d7fd'; e.currentTarget.style.boxShadow = 'none' }}
                />
                <p className="text-xs mt-2" style={{ color: '#9ca3af' }}>
                  {(freeText[question.id] || '').length}/{question.textMaxLength || 400} characters
                </p>
              </>
            )}

            <div className="mt-8 flex items-center justify-between">
              <button onClick={goBack} className="text-sm font-medium hover:underline" style={{ color: '#6B3FE7' }}>← Back</button>
              <div className="flex gap-3 items-center">
                {isTextQ && (
                  <button onClick={advanceQuestion} className="text-sm font-medium hover:underline" style={{ color: '#9ca3af' }}>
                    Skip this
                  </button>
                )}
                {(question.type === 'checkbox' || isTextQ ||
                  (question.type === 'radio' && question.otherTrigger && selAnswer === question.otherTrigger)) && (
                  <button onClick={advanceQuestion} disabled={!canContinue()}
                    className="px-6 py-2.5 rounded-lg font-semibold text-white text-sm transition hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#6B3FE7' }}>
                    {isLastQ ? 'Generate my report →' : 'Continue →'}
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
