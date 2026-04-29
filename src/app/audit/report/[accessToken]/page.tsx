import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getSupabaseClient } from '@/lib/supabase'
import ReportClient from './ReportClient'

interface PageProps {
  params: Promise<{ accessToken: string }>
}

export const metadata: Metadata = {
  title: 'Your AI Opportunity Report | ProjxAI',
  description: 'Your personalised AI Opportunity Report from ProjxAI -- built for Australian SMEs.',
  robots: { index: false, follow: false },
}

// No static caching -- report pages are always fresh
export const dynamic = 'force-dynamic'

export default async function ReportPage({ params }: PageProps) {
  const { accessToken } = await params

  if (!accessToken || accessToken.length < 10) {
    return notFound()
  }

  try {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from('audit_reports')
      .select('id, report_json, score, email, generated_at')
      .eq('access_token', accessToken)
      .single()

    if (error || !data || !data.report_json) {
      return notFound()
    }

    return (
      <ReportClient
        report={data.report_json as Record<string, unknown>}
        reportId={data.id}
        accessToken={accessToken}
        alreadyGated={!!data.email}
      />
    )
  } catch (err) {
    console.error('ReportPage fetch error:', err)
    return notFound()
  }
}
